// #include "mqtt.h"

void setupMQTT() {

  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);

  Serial.println("Tentando conectar ao broker");
  while (!client.connected()) {
    String client_id = "esp32-client-";
    client_id += String(WiFi.macAddress());
    // Serial.printf("O client %s foi conectado ao broker\n", client_id.c_str());
    if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
      // Serial.println("MQTT broker connected");
    }  else {
      // Serial.print("failed with state ");
      // Serial.print(client.state());
      vTaskDelay(pdMS_TO_TICKS(2000));
    }
  }

  client.subscribe(test_topic);

  Serial.print("Quantidade de topicos: ");
  Serial.println(size);

  for (int i = 0; i < size; ++i) {
    client.subscribe(commands[i].key);
  }

  client.publish("teste", "Mqtt broker online e conectado na placa");
}

DateTime stringToDateTime(String horaString) {
    int horas = horaString.substring(0, 2).toInt();
    int minutos = horaString.substring(3, 5).toInt();

    // Pegamos a data atual para construir o DateTime
    DateTime now = timeClient.getEpochTime();
    
    // Criamos um novo DateTime com a data atual e a hora/minuto convertidos
    return DateTime(now.year(), now.month(), now.day(), horas, minutos, 0);
}

// Função para desserializar o JSON
void deserializeJson(const String& json) {
  // Cria um buffer para armazenar o JSON
  StaticJsonDocument<200> doc;

  // Desserializa o JSON
  DeserializationError error = deserializeJson(doc, json);

  // Verifica se houve erro na desserialização
  if (error) {
    Serial.print("Erro ao desserializar o JSON: ");
    Serial.println(error.c_str());
    return;
  }

  // Preenche a estrutura FeedConfig com os dados do JSON
  config.timesPerDay = doc["timesPerDay"];
  config.totalOnDay = doc["totalOnDay"];
  config.portion = doc["portion"];
  config.firstAlarm = stringToDateTime(doc["firstAlarm"].as<String>());
}

void callback(char *topic, byte *payload, unsigned int length) {
  for (int i = 0; i < size; ++i) {
    if (!strcmp(topic, commands[i].key)) {
      commands[i].command((char*) payload);
    }
  }
}

void openTheDoor() {
  int balance = readBalance();
  while (balance <= config.portion) {
    float proportion = balance / config.portion;

    if (proportion <= 0.10) {
      spin(steps);
    } else if (proportion <= 0.25) {
      spin(div(steps, 4).quot * 3);
    } else if (proportion <= 0.50) {
      spin(div(steps, 2).quot);
    } else if (proportion <= 0.75) {
      spin(div(steps, 4).quot);
    } else{
      spin(div(steps, 10).quot);
    }

    balance = readBalance(); 
  }
}

void feed(char* payload) {
  // openTheDoor();
  // Serial.println("AAAAAAAAAAA");
  client.publish("pet/feed/response", "Comporta aberta, animal servido!");
}

void alarmService(char* payload) {
  // deve apenas configurar o alarme
  // deve dessrializar a hora
  // setAlarm();
  client.publish("pet/time/response", "Alarme configurado, bem na hora!");
}

void balanceService(char* payload) {
  // blinkLed();
  char buffer[15];

  // readBalance();
  dtostrf(readBalance(), 10, 2, buffer);

  Serial.printf("%s", buffer);
  client.publish("pet/balance/response", buffer);
}

void setupService(char* payload) {
  deserializeJson(payload);

  setAlarms(config.firstAlarm, config.timesPerDay);

  client.publish("pet/setup/response", "Esp configurada");
}

void taskMqttClient(void* pvParameters) {
  // while (!WiFi.isConnected());
  setupMQTT();

  while (true) {
    client.loop();
  }
}
