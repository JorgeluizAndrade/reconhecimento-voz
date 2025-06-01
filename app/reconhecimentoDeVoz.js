const elementoChute = document.getElementById("chute");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const downloadButton = document.getElementById("downloadButton");

let transcricaoCompleta = "";
let ultimaFrase = "";
let reconhecimentoAtivo = false;

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.lang = "pt-BR";
recognition.continuous = true; // Mantém ouvindo continuamente

function onSpeak(e) {
  const frase = e.results[e.results.length - 1][0].transcript.trim();

  // Evita duplicação e adiciona nova linha
  if (frase !== ultimaFrase) {
    ultimaFrase = frase;
    transcricaoCompleta += `${frase}\n`;
    atualizarTela(transcricaoCompleta);
  }
}

function atualizarTela(texto) {
  elementoChute.innerHTML = `
    <div>Transcrição ao vivo:</div>
    <pre class="box">${texto}</pre>
  `;
}

if (!reconhecimentoAtivo) {
  stopButton.hidden = true;
}

startButton.addEventListener("click", () => {
  if (!reconhecimentoAtivo) {
    recognition.start();
    stopButton.hidden = false;
    reconhecimentoAtivo = true;
    startButton.textContent = "Ouvindo...";
  }
});

stopButton.addEventListener("click", () => {
  recognition.stop();
  stopButton.hidden = true;
  reconhecimentoAtivo = false;
  startButton.textContent = "Iniciar Gravação";
});

downloadButton.addEventListener("click", () => {
  const blob = new Blob([transcricaoCompleta], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transcricao.txt";
  a.click();
  URL.revokeObjectURL(url);
});

recognition.addEventListener("result", onSpeak);
