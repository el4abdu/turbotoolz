(function() {
  // Store detection result in window object
  window.adBlockDetected = false;
  window.adBlockChecked = false;
  
  // Function to set detected flag
  function setDetected() {
    window.adBlockDetected = true;
    window.adBlockChecked = true;
    
    // Dispatch custom event for React components to listen to
    if (typeof window.CustomEvent === 'function') {
      const event = new CustomEvent('adBlockDetected');
      window.dispatchEvent(event);
    }
    
    // Block all content with CSS if ad blocker detected
    if (!document.getElementById('adblock-blocker-style')) {
      const style = document.createElement('style');
      style.id = 'adblock-blocker-style';
      style.innerHTML = `
        body > *:not(.adblock-modal) {
          display: none !important;
        }
        body {
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  function setNotDetected() {
    window.adBlockDetected = false;
    window.adBlockChecked = true;
    
    // Dispatch custom event for React components to listen to
    if (typeof window.CustomEvent === 'function') {
      const event = new CustomEvent('adBlockNotDetected');
      window.dispatchEvent(event);
    }
  }

  // Method 1: Check for common ad script
  function checkAdScript() {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.onerror = function() {
      setDetected();
      document.body.removeChild(script);
    };
    script.onload = function() {
      document.body.removeChild(script);
    };
    document.body.appendChild(script);
  }

  // Method 2: Check for ad container visibility
  function checkAdContainer() {
    const fakeAd = document.createElement('div');
    fakeAd.className = 'ad_unit ad-unit ad-zone ad-space adsbox ads advertisement';
    fakeAd.style.position = 'absolute';
    fakeAd.style.height = '10px';
    fakeAd.style.width = '10px';
    fakeAd.style.top = '-999px';
    fakeAd.innerHTML = '&nbsp;';
    document.body.appendChild(fakeAd);

    setTimeout(function() {
      if (fakeAd.offsetHeight === 0 || 
          fakeAd.clientHeight === 0 || 
          getComputedStyle(fakeAd).display === 'none' || 
          getComputedStyle(fakeAd).visibility === 'hidden') {
        setDetected();
      }
      document.body.removeChild(fakeAd);
    }, 100);
  }

  // Method 3: Check for bait classes that ad blockers target
  function checkBaitClasses() {
    const baitClasses = [
      'banner_ad', 'sponsored', 'ad-banner', 'ad-container', 
      'ad-placeholder', 'ad-leaderboard', 'adsense', 'adsbygoogle'
    ];
    
    const testDiv = document.createElement('div');
    testDiv.style.position = 'absolute';
    testDiv.style.top = '-999px';
    document.body.appendChild(testDiv);
    
    const detected = baitClasses.some(className => {
      testDiv.className = className;
      const rect = testDiv.getBoundingClientRect();
      const result = rect.height === 0 || 
                    getComputedStyle(testDiv).display === 'none' || 
                    getComputedStyle(testDiv).visibility === 'hidden';
      return result;
    });
    
    if (detected) {
      setDetected();
    }
    
    document.body.removeChild(testDiv);
  }
  
  // Method 4: Check if our ad placeholders are hidden
  function checkAdPlaceholders() {
    setTimeout(function() {
      const adPlaceholders = document.querySelectorAll('.ad-banner, .ad-sidebar, .ad-unit, .ad-zone');
      let detected = false;
      
      for (let i = 0; i < adPlaceholders.length; i++) {
        const placeholder = adPlaceholders[i];
        if (placeholder.offsetHeight === 0 || 
            placeholder.clientHeight === 0 || 
            getComputedStyle(placeholder).display === 'none' || 
            getComputedStyle(placeholder).visibility === 'hidden') {
          detected = true;
          break;
        }
      }
      
      if (detected) {
        setDetected();
      } else if (adPlaceholders.length > 0 && !window.adBlockChecked) {
        setNotDetected();
      }
    }, 500); // Give more time for ad blockers to act
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runDetection);
  } else {
    runDetection();
  }

  function runDetection() {
    // Run all detection methods
    checkAdScript();
    checkAdContainer();
    checkBaitClasses();
    checkAdPlaceholders();
    
    // Run continuous checks
    setInterval(function() {
      checkAdPlaceholders();
    }, 3000);
  }
})(); 