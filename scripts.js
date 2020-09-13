const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVid() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(mediaStream => {
      console.log(mediaStream);
      video.srcObject = mediaStream;
      video.play();
    });
}

getVid();