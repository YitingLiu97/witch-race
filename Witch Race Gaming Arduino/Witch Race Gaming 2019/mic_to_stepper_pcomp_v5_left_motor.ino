#include <Stepper.h>

//power supply: 8.9 v, 1.7 a

const int stepsPerRevolution = 200;  // change this to fit the number of steps per revolution
// for your motor

// initialize the stepper library on pins 8 through 11:
Stepper myStepper(stepsPerRevolution, 6, 9, 10, 11);

int soundSensor = A0;
int soundValue;
int speedforMotor;
boolean loud = false;
boolean vloud = false;
boolean vvloud = false;
//int mappedsoundValue;
//int mappedthreshold = 200;
int threshold =60;
int totalsteps = 2000;
int count1 = 0;
int count2 = 0;
int count3 = 0;
int stepcount = 0;


void setup() {
  pinMode(soundSensor, INPUT);
  // set the speed at 60 rpm:
  myStepper.setSpeed(60);
  Serial.begin(9600);

  // pinMode(LED,OUTPUT);

}

void loop() {
  soundValue = analogRead(soundSensor);
  Serial.print("soundValue");
  Serial.print(" ");
  Serial.print(soundValue);
  Serial.println(",");

//  mappedsoundValue= constrain(soundValue, threshold, mappedthreshold);  // limits range of sensor values to between 30 and 200

//  Serial.print("mappedsoundValue");
//  Serial.print(" ");
//  Serial.print(mappedsoundValue);
//  Serial.println(",");
  
  if (soundValue > threshold && soundValue < threshold * 2) {
    loud = true;
  } if (soundValue > threshold * 2 && soundValue<threshold*3) {
    vloud = true;
  }     if (soundValue > threshold * 3) {
    vvloud = true;
  }
  
  if (loud) {
    myStepper.step(40);
    count1++;
    loud = false;
  }
  if (vloud) {
    myStepper.step(80);
    count2++;
    vloud = false;
  }
  if (vvloud) {
    myStepper.step(120);
    count3++;
    vvloud = false;
  }

  stepcount = count1 * 40 + count2 * 80 + count3 * 120;
  Serial.print("stepcount before");
  Serial.println(stepcount);

  if (stepcount >= totalsteps) {
    //maybe we can use serial out from p5 later
    delay(5000);
    count1 = 0;
    count2 = 0;
    count3 = 0;
    stepcount = 0;
    myStepper.step(-1 * totalsteps);
    delay(2000);
  }

}
