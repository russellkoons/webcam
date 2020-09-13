const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
// const snap = document.querySelector('.snap');

function getVid() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(mediaStream => {
      console.log(mediaStream);
      video.srcObject = mediaStream;
      video.play();
    })
    .catch(err => console.error('OH NO!!!', err))
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16)
}

function takePhoto() {
  // snap.currentTime = 0;
  // snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Ugly bwoy" />`
  strip.insertBefore(link, strip.firstChild);
}



getVid();

video.addEventListener('canplay', paintToCanvas);