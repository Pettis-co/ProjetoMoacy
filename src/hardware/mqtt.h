#include <cstdio>
#include "pgmspace.h"
#include "esp32-hal-gpio.h"
#ifndef MQTT_H
#define MQTT_H

#define LED_BUILTIN 26

#include <PubSubClient.h>
#include <WiFi.h>
#include "my_time.h"
// MQTT Broker
const char *mqtt_broker = "150.165.85.30";
const char *ttopic = "teste";
const char *mqtt_username = "";
const char *mqtt_password = "";
const int mqtt_port = 1883;

// topics
typedef struct Command_T {
  const char* key;
  void (*command)(char*);
} Command;

void feed(char* payload);
void alarmService(char* payload);

Command commands[] = {
  {"pet/feed", feed},
  {"pet/time", alarmService},
};

WiFiClient espClient;
PubSubClient client(espClient);

void setupMQTT();
void callback(char *topic, byte *payload, unsigned int length);

#endif
