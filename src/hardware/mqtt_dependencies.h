#ifndef MQTT_DEPENDENCIES_H
#define MQTT_DEPENDENCIES_H

#include <PubSubClient.h>
#include "connectivity.h"

WiFiClient espClient;
PubSubClient client(espClient);

#endif
