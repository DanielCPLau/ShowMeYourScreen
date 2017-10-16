/**
 * Grabs the desktop capture feed from the browser, requesting
 * desktop capture. Requires the permissions
 * for desktop capture to be set in the manifest.
 *
 * @see https://developer.chrome.com/apps/desktopCapture
 */

 //logo #60b0f4
var desktop_sharing = false;
var local_stream = null;
function toggle() {
    if (!desktop_sharing) {
        chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], onAccessApproved);
    } else {
        desktop_sharing = false;

        if (local_stream) {
            mediaTracks = local_stream.getTracks();
            mediaTrack = mediaTracks[0];
            mediaTrack.stop();
        }
        local_stream = null;

        vid = document.getElementById("video");
        vid.pause();
        vid.removeAttribute("src");
        vid.load();

        document.querySelector('button').innerHTML = "Start Screen Share";
        document.getElementById("button").className = "emerald";
        console.log('Desktop sharing stopped...');
    }
}

function onAccessApproved(desktop_id) {
    if (!desktop_id) {
        console.log('Desktop Capture access rejected.');
        return;
    }
    desktop_sharing = true;
    document.querySelector('button').innerHTML = "Stop Broadcasting Screen";
    document.getElementById("button").className = "ruby";
    console.log("Desktop sharing started.. desktop_id:" + desktop_id);

    navigator.webkitGetUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: desktop_id,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
            }
        }
    }, gotStream, getUserMediaError);

    function gotStream(stream) {
        local_stream = stream;
        vid = document.getElementById("video");
        vid.style.background = "black url(logo.png) center no-repeat";
        document.querySelector('video').src = URL.createObjectURL(stream);
        stream.onended = function() {
            if (desktop_sharing) {
                toggle();
            }
        };
    }

    function getUserMediaError(e) {
      console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
    }
}

/**
 * Click handler to init the desktop capture grab
 */
document.querySelector('button').addEventListener('click', function(e) {
    toggle();
});