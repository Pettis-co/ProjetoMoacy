#include "mqtt.h"


void setup() {
  Serial.begin(115200);

  // setup connectivity
  taskWiFiServer();
  setupMQTT();
  setupBalance();

  timeClient.begin();
  timeClient.update();

  // Criar as tarefas em núcleos diferentes
  xTaskCreatePinnedToCore(
    taskAlarmManager,  // Função da tarefa
    "AlarmManager",    // Nome da tarefa
    10000,             // Tamanho da pilha (em palavras)
    NULL,              // Parâmetro da tarefa
    1,                 // Prioridade da tarefa
    NULL,              // Handle da tarefa
    1                  // Núcleo onde a tarefa será executada (Core 0)
  );

  // Publish and subscribe
  client.publish(test_topic, "Mqtt broker online e conectado na placa");
}

void loop() {
  client.loop();
  // Serial.println("AAA");
}
