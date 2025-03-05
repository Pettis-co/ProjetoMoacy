#include "wifi.h"

void connectToWifi() {
  WiFi.begin(ssid, password);

  Serial.print("Conectando ao wifi");

  while (!WiFi.isConnected()) {
    Serial.print(".");
    delay(5000);
  }

  // int size = sizeof(ssid)/sizeof(char*);

  // for (int i = 0;  i < size; ++i) {
  //   bool close = false;
  //   WiFi.begin(ssid[i], password[i]);

  //   while (!WiFi.isConnected()) {
  //     if (retry >= 5) {
  //       close = true;
  //       break;  
  //     }
  //     Serial.println("Conectando ao wifi");
  //     // delay de 4 segundos
  //     delay(5000);
  //     retry++;
  //   }

  //   if (close) {
  //     Serial.println("Conectado ao WiFi");
  //     return;
  //   }

  //   retry = 0;
  // }
}