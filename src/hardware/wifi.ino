#include "wifi.h"

void connectToWifi() {
  WiFi.begin(ssid, password);

  while (!WiFi.isConnected()) {
    Serial.println("Conectando ao wifi");
    // delay de 4 segundos
    delay(5000);
  }

  Serial.println("Conectado ao WiFi");
}