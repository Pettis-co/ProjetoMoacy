#ifndef HX711_H
#define HX711_H

#include <HX711.h>
// #include "mqtt_dependencies.h"

#define PIN_DT  21
#define PIN_SCK  18

const float ESCALA = 317.91;

HX711 scale;

float medida = 0;

void setupBalance();

//será usado pra auto calibrar a balança 
void calibrate(int base);

float readBalance();

void balanceService(char* payload);

#endif