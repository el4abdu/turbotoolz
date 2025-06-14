(function() {
  // Check if the user has already dismissed the ad blocker warning
  if (localStorage.getItem('adBlockDismissed')) {
    return;
  }
  
  // Early detection of ad blockers
  function detectAdBlocker() {
    // Create a bait element
    var bait = document.createElement('div');
    bait.setAttribute('class', 'ads ad adsbox doubleclick ad-placement carbon-ads');
    bait.setAttribute('style', 'height: 1px; width: 1px; position: absolute; left: -10000px; top: -1000px;');
    bait.innerHTML = '&nbsp;';
    document.body.appendChild(bait);
    
    // Check if the bait is hidden
    setTimeout(function() {
      var detected = false;
      
      if (bait.offsetHeight === 0 ||
          bait.clientHeight === 0 ||
          window.getComputedStyle(bait).display === 'none' ||
          window.getComputedStyle(bait).visibility === 'hidden') {
        detected = true;
      }
      
      document.body.removeChild(bait);
      
      if (detected) {
        // Store detection in window object for React components
        window.adBlockDetected = true;
        window.adBlockChecked = true;
        
        // Create a nicer notification instead of blocking the entire page
        var notification = document.createElement('div');
        notification.setAttribute('id', 'early-adblock-notification');
        notification.setAttribute('style', 
          'position: fixed; bottom: 20px; right: 20px; max-width: 300px; background-color: white; ' +
          'border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); z-index: 9999; ' +
          'padding: 16px; transform: translateY(0); transition: transform 0.3s ease; ' +
          'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;'
        );
        
        notification.innerHTML = `
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div style="background-color: #f87171; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <span style="font-weight: 600; color: #1f2937;">Ad Blocker Detected</span>
          </div>
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563;">
            Please disable your ad blocker to fully enjoy our website.
          </p>
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button id="early-adblock-dismiss" style="background: none; border: none; font-size: 14px; color: #6b7280; cursor: pointer; padding: 6px 12px;">
              Dismiss
            </button>
            <button id="early-adblock-refresh" style="background-color: #10b981; color: white; border: none; border-radius: 4px; padding: 6px 12px; font-size: 14px; cursor: pointer;">
              I've Disabled It
            </button>
          </div>
        `;
        
        document.body.appendChild(notification);
        
        // Add event listeners to buttons
        document.getElementById('early-adblock-dismiss').addEventListener('click', function() {
          notification.style.transform = 'translateY(calc(100% + 20px))';
          setTimeout(function() {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 300);
          localStorage.setItem('adBlockDismissed', 'true');
        });
        
        document.getElementById('early-adblock-refresh').addEventListener('click', function() {
          window.location.reload();
        });
        
        // Auto-hide after 10 seconds
        setTimeout(function() {
          if (document.body.contains(notification)) {
            notification.style.transform = 'translateY(calc(100% + 20px))';
            setTimeout(function() {
              if (document.body.contains(notification)) {
                document.body.removeChild(notification);
              }
            }, 300);
          }
        }, 10000);
      }
    }, 100);
  }
  
  // Run detection when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', detectAdBlocker);
  } else {
    detectAdBlocker();
  }
})(); 