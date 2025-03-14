void feed(char* payload) {
  openTheDoor();
  
  client.publish("pet/feed/response", "Comporta aberta, animal servido!");
}

void openTheDoor() {
  float balance = readBalance();
  while (balance < config.portion) {
    float proportion = balance / config.portion;
    Serial.print("Proportion: ");
    Serial.println(proportion);
    Serial.println();

    spin(steps);

    balance = readBalance(); 
  } 
}