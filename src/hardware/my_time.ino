/*********
  Rui Santos
  Complete project details at https://randomnerdtutorials.com
  Based on the NTP Client library example
*********/

#include "my_time.h"

void setupTime() {

// Initialize a NTPClient to get time
  timeClient.begin();
  // Set offset time in seconds to adjust for your timezone, for example:
  // GMT +1 = 3600
  // GMT +8 = 28800
  // GMT -1 = -3600
  // GMT 0 = 0
  timeClient.setTimeOffset(-10800);

  while(!timeClient.update()) {
    timeClient.forceUpdate();
  }

  struct tm dateTime;
  long epoch = timeClient.getEpochTime();

  rtc.setTime(epoch);  // 17th Jan 2021 15:24:30
}

void setAlarm() {
  // função pra settar o alarme
  // rtc.setAlarm("00:00:10");
  Serial.println("============");
  Serial.println(rtc.getDateTime(true));
  Serial.println("============");
  // Attach interrupt for alarm
  // rtc.attachInterrupt(alarmISR);
  return ;
}

void IRAM_ATTR alarmISR() {
  Serial.println("Alarm triggered!");
}
