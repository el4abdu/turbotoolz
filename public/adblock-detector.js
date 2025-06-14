(function() {
  // Store detection result in window object
  window.adBlockDetected = false;
  
  // Function to set detected flag
  function setDetected() {
    window.adBlockDetected = true;
    
    // Dispatch custom event for React components to listen to
    if (typeof window.CustomEvent === 'function') {
      const event = new CustomEvent('adBlockDetected');
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
      'ad-placeholder', 'ad-leaderboard'
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
  }
})(); 