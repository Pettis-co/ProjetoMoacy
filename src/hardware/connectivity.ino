#include "connectivity.h"

const char* apSSID = "ESP32-Config";
const char* apPassword = "12345678";  // Senha para o modo AP

WebServer server(80);

void handleRoot() {
    String html = "<form action='/connect' method='POST'>";
    html += "SSID: <input type='text' name='ssid'><br>";
    html += "Senha: <input type='password' name='password'><br>";
    html += "<input type='submit' value='Conectar'>";
    html += "</form>";
    server.send(200, "text/html", html);
}

void handleConnect() {
    String ssid = server.arg("ssid");
    String password = server.arg("password");

    if (ssid.length() > 0 && password.length() > 0) {
        server.send(200, "text/plain", "Conectando à rede...");
        WiFi.begin(ssid.c_str(), password.c_str());

        int attempts = 10;
        while (WiFi.status() != WL_CONNECTED && attempts > 0) {
            delay(1000);
            attempts--;
        }

        if (WiFi.status() == WL_CONNECTED) {
            server.send(200, "text/plain", "Conectado! IP: " + WiFi.localIP().toString());
            server.close();
            Serial.println("Esp conectada ao WiFi! Parabens, moacy vai amar o projeto");
        } else {
            server.send(200, "text/plain", "Falha na conexão. Tente novamente.");
            Serial.println("Falha na conexão. Tente novamente.");
        }
    } else {
        server.send(400, "text/plain", "SSID e senha são obrigatórios.");
        Serial.println("SSID e senha são obrigatórios.");
    }
}

void connectToWifi() {
    // Inicia o modo AP
    WiFi.softAP(apSSID, apPassword);
    Serial.println("Modo AP iniciado. Conecte-se à rede: " + String(apSSID));

    // Configura o servidor web
    server.on("/", handleRoot);
    server.on("/connect", handleConnect);
    server.begin();
    Serial.println("Servidor web iniciado.");

    Serial.println("Modo AP iniciado.");
    Serial.print("Conecte-se à rede: ");
    Serial.println(apSSID);
    Serial.print("Senha: ");
    Serial.println(apPassword);

    // Mostra o endereço IP do servidor web
    IPAddress IP = WiFi.softAPIP();
    Serial.print("Acesse o servidor web em: http://");
    Serial.println(IP);

    Serial.println("Servidor configurado. Aguardando conexão");
}

void taskWiFiServer() {
  connectToWifi();

  while (!WiFi.isConnected()) {
    server.handleClient();
  }
}