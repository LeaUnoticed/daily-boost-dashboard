const playBtn = document.getElementById("play-music");
const songTitle = document.getElementById("song-title");
const volumeSlider = document.getElementById("volume-slider");

const audio = new Audio("assets/music/music.mp3");
audio.loop = true;
audio.volume = 0.5;

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "⏸";
    songTitle.textContent = "Lofi chill 🎵";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
    songTitle.textContent = "Lofi chill";
  }
  isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", (e) => {
  const vol = e.target.value;
  audio.volume = vol / 100;
});
