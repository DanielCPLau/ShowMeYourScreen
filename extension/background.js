/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    getId(sendResponse);
    return true;
  });

/**
 * Grabs the desktop capture feed from the browser, requesting
 * desktop capture. Requires the permissions
 * for desktop capture to be set in the manifest.
 *
 * @see https://developer.chrome.com/apps/desktopCapture
 */

//logo #60b0f4
function getId(sendResponse) {
  chrome.tabs.query(
  {currentWindow: true, active : true},
  (tabs) => {
    chrome.desktopCapture.chooseDesktopMedia(["screen", "window", "tab", "audio"], tabs[0], (id) => sendResponse({id}));
  }
)
  
}