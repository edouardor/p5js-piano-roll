const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
const midiFileInput = document.getElementById('midi-file-input');

function onFileSelected(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = e.target.result;
    const midiFile = MidiParser.parse(data, 'binary');
    console.log(midiFile);
  };

  midiFileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const data = e.target.result;
      const midiFile = MidiParser.parse(data, 'binary');
      console.log(midiFile);
    };
  reader.readAsBinaryString(file);
});


