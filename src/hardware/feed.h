#ifndef FEED_H
#define FEED_H

#include "hx711.h"
#include "step.h"
#include "mqtt_dependencies.h"

void feed(char* payload);
void openTheDoor();

#endif
