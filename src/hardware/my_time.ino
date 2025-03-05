// #include "my_time.h"

void setAlarms(DateTime firstAlarm, int numberOfAlarms) {
    xSemaphoreTake(alarmMutex, portMAX_DELAY); // Bloqueia o acesso aos alarmes
    alarmCount = numberOfAlarms;
    int interval = 24 * 60 * 60 / numberOfAlarms; // Intervalo em segundos

    for (int i = 0; i < numberOfAlarms; i++) {
        // Adiciona o intervalo em segundos ao horário inicial
        alarms[i] = firstAlarm + interval * i;
    }
    xSemaphoreGive(alarmMutex); // Libera o acesso aos alarmes
}

// Função para verificar e disparar os alarmes
void checkAlarms() {
    DateTime now = timeClient.getEpochTime();

    xSemaphoreTake(alarmMutex, portMAX_DELAY); // Bloqueia o acesso aos alarmes
    for (int i = 0; i < alarmCount; i++) {
        if (now >= alarms[i]) {
            // Disparar o evento
            Serial.println("Alarme disparado!");
            // Aqui você pode adicionar o código para disparar o evento

            // Recalcular o próximo alarme
            alarms[i] = alarms[i] + 24 * 60 * 60; // Adiciona 24 horas
        }
    }
    xSemaphoreGive(alarmMutex); // Libera o acesso aos alarmes
}

// Tarefa para gerenciar o tempo e os alarmes (executada no Core 0)
void taskAlarmManager(void* parameter) {
    while (true) {
        // Atualizar o tempo
        timeClient.update();

        // Verificar e disparar os alarmes
        checkAlarms();

        vTaskDelay(pdMS_TO_TICKS(1000)); // Verificar a cada segundo
    }
}
