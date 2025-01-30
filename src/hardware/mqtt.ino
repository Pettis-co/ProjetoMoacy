#include "mqtt.h"

void setupMQTT() {
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);

  while (!client.connected()) {
    String client_id = "esp32-client-";
    client_id += String(WiFi.macAddress());
    Serial.printf("The client %s connects to the MQTT broker\n", client_id.c_str());
    if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("MQTT broker connected");
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

  client.subscribe(ttopic);
  client.subscribe(commands[0].key);
  client.subscribe(commands[1].key);
}

void callback(char *topic, byte *payload, unsigned int length) {
  for (int i = 0; i < 2; ++i) {
    if (!strcmp(topic, commands[i].key)) {
      commands[i].command((char*) payload);
    }
  }
}

void blinkLed() {
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  delay(1000);                      // wait for a second
}

void feed(char*) {
  blinkLed();
  client.publish("pet/feed/response", "Comporta aberta, animal servido!");
  // client.flush();
}

void alarmService(char* payload) {
  blinkLed();
  client.publish("pet/time/response", "Alarme configurado");
  // client.flush();
}
