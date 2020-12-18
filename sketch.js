var myRec = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
myRec.interimResults = true; // allow partial recognition (faster, less accurate)
myRec.continuous = true; // do continuous recognition

let gameState = null;
let x = 1;
let go;
let bg, stars, skull1, skull2, cloud1, cloud2, witch1, witch2, tomb, zoom;
let a = 0;
let timer = 12;
// var serial; // variable to hold an instance of the serialport library


function setup() {
  // serial = new p5.SerialPort('10.18.150.45'); // fill in your own IP address in place of the one shown here
  createCanvas(windowWidth, windowHeight);
  background(200);
  textFont('Yeseva One');
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  fill(255);
  myRec.start();
  myRec.onResult = showResult; // bind callback function to trigger when speech is recognized
}

function draw() {
  if (gameState === null) {
    welcomeScreen();
  } else if (gameState === 'example') {
    exampleScreen();
  } else if (gameState === 'play') {
    readySetGo();
  } else if (gameState === 'win') {
    winnerScreen();
  }
}

function preload() {
  bg = loadImage('images/background.gif');
  stars = loadImage('images/stars.png');
  skull1 = loadImage('images/skull1.png');
  skull2 = loadImage('images/skull2.png');
  cloud1 = loadImage('images/cloud1.png');
  cloud2 = loadImage('images/cloud2.png');
  tomb = loadImage('images/tomb.png');
  zoom = loadImage('images/zoom.png');
  witch1 = loadImage('images/witch1.png');
  witch2 = loadImage('images/witch2.png');
}

function welcomeScreen() {
  drawBg();
  image(skull1, (width * .13), height / 2 + wobble(.4, 30), 200, 200);
  image(skull2, width * .75, height / 2 + wobble(.5, 40), 200, 200);

  textSize(150);
  text('Witch Race', width / 2, height / 3);

  textSize(42);
  text('Press the space bar to begin', width / 2, height / 2);
}

function exampleScreen() {
    drawBg();
    image(skull1, (width * .13), height / 2 + wobble(.4, 30), 200, 200);
    image(skull2, width * .75, height / 2 + wobble(.5, 40), 200, 200);

    textSize(62);
    text('How to Play:', width / 2, height / 8)

    textSize(42);
    text('Race your rival', width / 2, height / 4)
    text('Laugh into the skull to move forward', width / 2, height / 3)
    text('May the best witch win', width / 2, height / 2.4)
    text('Press the space bar to race!', width / 2, height * (.65))
}

function readySetGo() {
    drawBg();
    textSize(100);
    // print(timer);
    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
    if (timer == 12 || timer == 11) {
      text('Ready', width / 2, height / 2);
    } else if (timer == 10 || timer == 9) {
      text('Set', width / 2, height / 2);
    } else if (timer == 8 || timer == 7) {
      text('Go!!', width / 2, height / 2);
      go = true;
    } else if (timer == 0) {
      textSize(80);
    }
    //witches ride across the screen
    if (go) {
      x++;
    }
    image(witch1, x, height / 2 + wobble(.6, 120));
    image(witch2, x, height * .1 + wobble(.6, 80));


    // text('Winner, press the space bar!', width/2, height/2)
}

function winnerScreen() {
    drawBg();    
    // let a = 30;
    // a++;
    // fill(255, 255, 255, a)
    // print(a);
      textSize(42)
    text('YOU WON!!!', width / 2, height / 5);
    text('What do you have to say to your enemy?', width / 2, height / 3.25);

    showResult();
}

function showResult() {
  if (myRec.resultValue == true) {
    push();
    textFont('Chewy');
    fill(255);
    textSize(100);
    let textRec = myRec.resultString;
    text(textRec, width / 2, height*.65 + wobble(.5, 100));
    pop();
  }
}

function drawBg() {
  image(bg, 0, 0, width, height);
  image(zoom, 1 + wobble(.4, 50), 0)
  image(cloud1, 0, 0 + wobble(.5, 30))
  image(cloud2, 0 + wobble(.1, 30), 0 + wobble(.4, 30))
}

function wobble(slightwobble, bigwobble) {
  let value = sin(frameCount * slightwobble) * bigwobble;
  return value;
}

function keyPressed() {
  if (keyCode == 32) {
    if (gameState === null) {
      gameState = 'example';
    } else if (gameState === 'example') {
      gameState = 'play';
    } else if (gameState === 'play' && go === true) {
      gameState = 'win';
    } else if (gameState === 'win') {
      gameState = 'null';
    }
  }

}