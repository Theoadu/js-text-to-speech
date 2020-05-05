const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const contentInput = document.getElementById("content");
const speedInput = document.getElementById("speed");

let currentCharacter;

playButton.addEventListener("click", () => {
  readContent(contentInput.value);
});

pauseButton.addEventListener("click", pauseSpeech);

stopButton.addEventListener("click", stopSpeech);

speedInput.addEventListener("input", () => {
  stopSpeech();
  readContent(utterance.text.substring(currentCharacter));
});

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("end", () => {
  contentInput.disabled = false;
});
utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex;
});

function readContent(content) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  utterance.text = content;
  utterance.rate = speedInput.value || 1;

  contentInput.disabled = true;
  speechSynthesis.speak(utterance);
}

function pauseSpeech() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopSpeech() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
