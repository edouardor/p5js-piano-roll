var canvas;
var fileDropped = false; // Flag to keep track of whether a file has been dropped
let sceneNum = 0;
let file;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(200);
  canvas.drop(gotFile);
  // look for mic:
  mic = new p5.AudioIn(print("mic detected"),
  function() {
    print("no mic detected")
  });
  mic.start(print("mic on"),
  function() {
    print("mic off")
  });

  fft = new p5.FFT(0.8,1024);
  fft.setInput(mic);
}

  function draw() {
    switch(sceneNum){
      case 0:
        background(200);
        fill(100);
        noStroke();
        textSize(24);
        textAlign(CENTER);
        text('Arrastre aquí el fichero midi', windowWidth / 2, windowHeight / 2);
        break;

      case 1:
        background(10,50);
        freq = getLoudestFrequency();
        print(freq);
        noStroke();
        pitch = map(freq,0,2000,400,0);
        ellipse(frameCount,pitch,5,5);

        break;

      }
    }
  function gotFile(file){
    if (!fileDropped && file.type == 'audio'){
      fileDropped = true; // Set the flag to true since a file has been dropped
      sceneNum ++
      background(0);
      var img = createImg(file.data, file.name);
      img.hide();//Hide image element in dom
      image(img, 0, 0, width, height - 100);
      fill(255);
      textSize(16);
      textAlign(CENTER);
      text("Type of File: "+file.type, width / 2, height - 70);
      text("File Name: "+file.name, width / 2, height - 50);
      text("File Size: "+file.size, width / 2, height - 30); 
 
    }
  } 

  function mousePressed(){
    noStroke();
    fill(0, random(255), 200);
    ellipse(mouseX, mouseY, 15, 15); 
  }

  function windowResized() {
    // Only resize the canvas if a file hasn't been dropped yet
  if (!fileDropped) {
    resizeCanvas(windowWidth, windowHeight);
    }
  }  

  function getLoudestFrequency() {
    var nyquist = sampleRate() / 2; // 22050
    var spectrum = fft.analyze(); // array of amplitudes in bins
    var numberOfBins = spectrum.length;
    var maxAmp = 0;
    var largestBin;

    for (var i = 0; i < numberOfBins; i++) {
        var thisAmp = spectrum[i]; // amplitude of current bin
        if (thisAmp > maxAmp) {
            maxAmp = thisAmp;
            largestBin = i;
        }
    }

    var loudestFreq = largestBin * (nyquist / numberOfBins);
    return loudestFreq;
  }


