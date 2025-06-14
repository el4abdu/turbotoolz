(function() {
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
        // Create blocking overlay
        var overlay = document.createElement('div');
        overlay.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); z-index: 9999; display: flex; align-items: center; justify-content: center; color: white; font-family: sans-serif;');
        
        var content = document.createElement('div');
        content.setAttribute('style', 'background-color: #fff; color: #333; border-radius: 8px; padding: 20px; max-width: 500px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);');
        
        content.innerHTML = `
          <div style="background-color: #e53e3e; color: white; padding: 15px; margin: -20px -20px 15px -20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">Ad Blocker Detected</h2>
          </div>
          <h3 style="color: #e53e3e; font-size: 20px; margin-bottom: 15px;">Access Denied</h3>
          <p style="margin-bottom: 15px;"><strong>This website cannot be used with an ad blocker enabled.</strong></p>
          <p style="margin-bottom: 15px;">Please disable your ad blocker and refresh the page to continue.</p>
          <button onclick="window.location.reload()" style="background-color: #e53e3e; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px;">Refresh Page</button>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        
        // Hide all other content
        var style = document.createElement('style');
        style.innerHTML = 'body > *:not(:last-child) { display: none !important; }';
        document.head.appendChild(style);
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