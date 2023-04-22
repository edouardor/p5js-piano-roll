const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const midiFileInput = document.getElementById('midiFileInput');
const startButton = document.getElementById('startButton');
const channelSelect = document.getElementById('channelSelect');

import { MidiParser } from './MidiParser.js';

let audioContext;
let gainNode;

startButton.addEventListener('click', () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
  }

  audioContext.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});

function onFileSelected(event) {
  const file = event.target.files[0];
  if (!file) {
    console.log('No file selected');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const midiFile = MidiParser.parse(data, 'binary');
    console.log(midiFile);

    populateTrackSelect(midiFile);
  };

  reader.readAsArrayBuffer(file);
}


function populateTrackSelect(midiFile) {
  const trackSelect = document.getElementById('trackSelect');

  // Remove the existing options first
  while (trackSelect.firstChild) {
    trackSelect.removeChild(trackSelect.firstChild);
  }

  // Add the default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a MIDI track';
  trackSelect.appendChild(defaultOption);

  // Add the available tracks
  midiFile.track.forEach((track, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Track ${index + 1}`;
    trackSelect.appendChild(option);
  });

  trackSelect.disabled = false;
}
const trackSelect = document.getElementById('trackSelect');

trackSelect.addEventListener('change', function (event) {
  const selectedTrack = parseInt(event.target.value);

  if (!isNaN(selectedTrack)) {
    // Draw notes from the selected track on the canvas
    // You can implement a function to draw notes from the specific track
    drawNotesFromTrack(midiFile, selectedTrack);
  }
});

midiFileInput.addEventListener('change', onFileSelected);
