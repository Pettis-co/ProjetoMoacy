#ifndef HX711_H
#define HX711_H

#include <HX711.h>

#define PIN_DT  21
#define PIN_SCK  18

HX711 scale;

float medida = 0;

void setupBalance();

//será usado pra auto calibrar a balança 
void calibrate(int base);

float readBalance();

void powerOn();
void powerOff();
void restart();

#endif