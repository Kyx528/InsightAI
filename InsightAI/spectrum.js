const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const microphone = audioContext.createMediaStreamSource(stream);

microphone.connect(analyser);

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const drawAudioSpectrum = () => {
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  const barWidth = width / dataArray.length;
  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i];
    ctx.fillStyle = `rgb(${barHeight}, ${barHeight}, ${barHeight})`;
    ctx.fillRect(i * barWidth, height - barHeight, barWidth, barHeight);
  }
};

setInterval(drawAudioSpectrum, 100);