#ifndef TIME_H
#define TIME_H

#include <NTPClient.h>
#include <WiFiUdp.h>
#include <time.h>
#include <ESP32Time.h>

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
ESP32Time rtc(0); 

// Variables to save date and time
String formattedDate;
String dayStamp;
String timeStamp;

void setAlarm();
void setupTime();

#endif