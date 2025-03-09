#ifndef TIME_H
#define TIME_H

#include <NTPClient.h>
#include <WiFiUdp.h>
#include <RTClib.h>
#include "feed.h"
#include "mqtt_dependencies.h"

WiFiUDP udp;
NTPClient timeClient(udp, "a.st1.ntp.br", -3 * 3600, 60000); 

const int maxAlarms = 10;
DateTime alarms[maxAlarms];
int alarmCount = 0;

// Mutex para sincronização de acesso aos alarmes
SemaphoreHandle_t alarmMutex = xSemaphoreCreateMutex();
TaskHandle_t AlarmHandle;
// TaskHandle_t MqttLoopHandle;

void setAlarms(DateTime firstAlarm, int numberOfAlarms);

// Função para verificar e disparar os alarmes
void checkAlarms();

// Tarefa para gerenciar o tempo e os alarmes (executada no Core 0)
void taskAlarmManager(void* parameter);

#endif