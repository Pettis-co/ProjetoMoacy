#ifndef WIFI_H
#define WIFI_H

#include <WiFi.h>
#include <WebServer.h>

// bool setupBluetooth(const char* deviceName);

// void listWiFiNetworks();

// void receiveWiFiCredentials();

// void returnWiFiStatus();

// void configureWiFi(const char* ssid, const char* password);

void taskWiFiServer();

void connectToWifi();
#endif
