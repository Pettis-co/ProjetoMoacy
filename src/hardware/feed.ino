void feed(char* payload) {
  openTheDoor();
  // Serial.println("AAAAAAAAAAA");
  client.publish("pet/feed/response", "Comporta aberta, animal servido!");
}

void openTheDoor() {
  float balance = readBalance();
  while (balance < config.portion) {
    float proportion = balance / config.portion;
    Serial.print("Protion: ");
    Serial.println(proportion);
    Serial.println();

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