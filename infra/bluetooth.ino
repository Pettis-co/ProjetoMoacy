#include "BluetoothSerial.h"
#include "WiFi.h"

BluetoothSerial SerialBT;  // Instancia o Bluetooth Serial

void setupBluetooth(const char* deviceName) {
    if (!SerialBT.begin(deviceName)) {
        Serial.println("Erro ao iniciar Bluetooth");
    } else {
        Serial.println("Bluetooth pronto. Conecte-se ao ESP32.");
    }
}

void listWiFiNetworks() {
    SerialBT.println("Buscando redes WiFi...");
    int numNetworks = WiFi.scanNetworks();

    if (numNetworks == 0) {
        SerialBT.println("Nenhuma rede encontrada.");
    } else {
        for (int i = 0; i < numNetworks; i++) {
            SerialBT.print(i + 1);
            SerialBT.print(": ");
            SerialBT.print(WiFi.SSID(i));  // Nome da rede
            SerialBT.print(" (");
            SerialBT.print(WiFi.RSSI(i));  // Intensidade do sinal
            SerialBT.println(" dBm)");
        }
    }
}

void receiveWiFiCredentials() {
    SerialBT.println("Digite o SSID da rede:");
    while (!SerialBT.available()) {}  // Espera o usuário digitar
    String ssid = SerialBT.readStringUntil('\n');
    ssid.trim();

    SerialBT.println("Digite a senha da rede:");
    while (!SerialBT.available()) {}
    String password = SerialBT.readStringUntil('\n');
    password.trim();

    configureWiFi(ssid.c_str(), password.c_str());
}

void returnWiFiStatus() {
    if (WiFi.status() == WL_CONNECTED) {
        SerialBT.println("Conexão WiFi estabelecida!");
        SerialBT.println("Acesse: https://www.google.com");
    } else {
        SerialBT.println("Falha na conexão. Tente novamente.");
        receiveWiFiCredentials();
    }
}

void configureWiFi(const char* ssid, const char* password) {
    WiFi.begin(ssid, password);
    SerialBT.println("Conectando ao WiFi...");

    int attempts = 10;
    while (WiFi.status() != WL_CONNECTED && attempts > 0) {
        delay(1000);
        SerialBT.print(".");
        attempts--;
    }
}

