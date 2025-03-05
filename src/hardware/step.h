#ifndef STEP_H
#define STEP_H

#include <Stepper.h>

int steps = 2048;

const int IN_1 = 23;
const int IN_2 = 25;
const int IN_3 = 26;
const int IN_4 = 27;
const int TEN_RPM = 10;

Stepper myStep(steps, IN_1, IN_2, IN_3, IN_4); 

void spin(int steps);

#endif