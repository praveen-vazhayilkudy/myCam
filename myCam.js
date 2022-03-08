var myCam = function(){
    let video = document.querySelector("#video");
    let btnPlay = document.querySelector("#btnPlay");
    let btnPause = document.querySelector("#btnPause");   
    //const screenshotsContainer = document.querySelector("#screenshots");
    let canvas = document.querySelector("#canvas");
    const constraints = {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
        },
    };

    let useFrontCamera = true;
    let videoStream;

    function stopVideoStream() {
        if (videoStream) {
          videoStream.getTracks().forEach((track) => {
            track.stop();
          });
        }
    }

    function resetDefaults(){
        video = document.querySelector("#video");
        btnPlay = document.querySelector("#btnPlay");
        btnPause = document.querySelector("#btnPause");   
        canvas = document.querySelector("#canvas");
    }

    async function initializeCamera() {
        stopVideoStream();
        resetDefaults();
        constraints.video.facingMode = useFrontCamera ? "user" : "environment";
    
        try {
          videoStream = await navigator.mediaDevices.getUserMedia(constraints);
          video.srcObject = videoStream;
        } catch (err) {
          alert("Could not access the camera");
        }
    }

    return {
        init: initializeCamera,
        play: function(){
            //btnPlay.addEventListener("click", function () {
                video.play();
                btnPlay.classList.add("is-hidden");
                btnPause.classList.remove("is-hidden");
              //});
         },
         pause: function() {
            //btnPause.addEventListener("click", function () {
                video.pause();
                btnPause.classList.add("is-hidden");
                btnPlay.classList.remove("is-hidden");
              //});
        },
        takePhoto: function(){
            //btnScreenshot.addEventListener("click", function () {
                const img = document.createElement("img");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext("2d").drawImage(video, 0, 0);
                img.src = canvas.toDataURL("image/png");
                screenshotsContainer.prepend(img);
              //});
        },
        switchCamer: function(){
            //btnChangeCamera.addEventListener("click", function () {
                useFrontCamera = !useFrontCamera;
            
                initializeCamera();
              //});
        }
      }
}();
