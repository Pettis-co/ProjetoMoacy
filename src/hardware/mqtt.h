#ifndef MQTT_H
#define MQTT_H

#define LED_BUILTIN 26

// #include <PubSubClient.h>
// #include "hx711.h"
// #include "connectivity.h"
// #include "step.h"
// #include "feed.h"

#include "my_time.h"
#include <ArduinoJson.h>
#include <stdlib.h>
#include "mqtt_dependencies.h"

// MQTT Broker
const char *mqtt_broker = "150.165.85.30";
const char *test_topic = "teste";
const char *mqtt_username = "";
const char *mqtt_password = "";
const int mqtt_port = 1883;

struct FeedConfig {
  int timesPerDay;
  float totalOnDay;
  float portion;
  DateTime firstAlarm;
} config ;

// topics
typedef struct Command_T {
  const char* key;
  void (*command)(char*);
} Command;

// void feed(char* payload);
// void balanceService(char* payload);
void alarmService(char* payload);
void setupService(char* payload);

Command commands[] = {
  {"pet/feed", feed},
  {"pet/balance", balanceService},
  {"pet/setup", setupService},
};

int size = (int)sizeof(commands)/sizeof(commands[0]);

// WiFiClient espClient;
// PubSubClient client(espClient);

void setupMQTT();
void callback(char *topic, byte *payload, unsigned int length);

#endif
