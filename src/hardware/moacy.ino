#include "mqtt.h"

void setup() {
  Serial.begin(115200);
  
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  connectToWifi();
  setupMQTT();
  setupTime();

  // Publish and subscribe
  client.publish(ttopic, "oi");
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!client.connected()) setupMQTT();

  // printLocalTime();
  client.loop();
}
