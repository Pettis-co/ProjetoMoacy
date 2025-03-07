#include "hx711.h"

void calibrate(int base) {
  // sera usada pra auto calibar a balanca
}

void setupBalance() {
  Serial.println("Configurando balanca");
  scale.begin(PIN_DT, PIN_SCK);  
  scale.set_scale(ESCALA); // zera a escala da balanca     

  // vTaskDelay(pdMS_TO_TICKS(2000));
  scale.tare();  

  scale.power_up();
  Serial.println("Balanca configurada");
}

float readBalance() {
  Serial.println("Lendo balanca");
  float result = scale.get_units(10);
  Serial.print("Resultado: ");
  Serial.println(result);
  return result;
}
