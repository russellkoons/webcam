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
    // take out pixels
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with them
    pixels = redEffect(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0)
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

function redEffect(px) {
  for (let i = 0; i < px.data.length; i += 4) {
    px.data[i + 0] = px.data[i + 0] + 100 // RED
    px.data[i + 1] = px.data[i + 1] - 50 // GREEN
    px.data[i + 2] = px.data[i + 2] * 0.5 // BLUE
  }

  return px;
}

getVid();

video.addEventListener('canplay', paintToCanvas);