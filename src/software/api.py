import threading
from flask import Flask, json, jsonify, request
import paho.mqtt.client as mqtt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
BROKER = '150.165.85.30'
USERNAME = ''
PASSWORD = ''
PORT = 1883


topics = {
    'client': {
        'information': 'client/information',
        'time': 'client/time'
    },
    'pet': {
        'information': 'pet/information',
        'time': 'pet/time',
        'history': 'pet/history',
        'feed': 'pet/feed'
    }
}

data_store = {
    "feeding_time": None  
}


def on_connect(client, userdata, flags, rc):
    print(f"Conectado com código de retorno: {rc}")

# Função de callback para recebimento de mensagens
def on_message(client, userdata, msg):
    print(f"Tópico: {msg.topic}, Mensagem: {msg.payload.decode()}")
    client.publish("teste", "teste da api")

mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

mqtt_client.connect(BROKER)



# Start the MQTT client in a separate thread

# @app.route('/teste', methods=['GET'])
# def teste():
#     client.publish("teste", '{"message": "Hello, World!"}')
#     return jsonify({"message": "Hello, World!"})

@app.route('/', methods=['GET'])
def init():
    mqtt_client.publish("teste", '{"message": "Hello, World!"}')
    return jsonify({"message": "Hello, World!"})

@app.route('/pet/information', methods=['GET', 'POST'])
def setAnimalData():
    return jsonify({"message": "Hello, World!"})

@app.route('/client/information', methods=['POST'])
def setClientData():
    return jsonify({"message": "Hello, World!"})

@app.route('/pet/history', methods=['POST'])
def setAnimalMedicalHistory():
    return jsonify({"message": "Hello, World!"})

@app.route('/pet/time', methods=['GET', 'POST'])
def timeToEat():
    if request.method == 'GET':
        if data_store["feeding_time"]:
            json_data = json.dumps(data_store)

            mqtt_client.publish("pet/time", json_data)
            return jsonify({'status': 'success', 'feeding_time': data_store["feeding_time"]})
        else:
            return jsonify({'status': 'success', 'message': 'Feeding time not set yet'})

    elif request.method == 'POST':
        data = request.json
        if 'feeding_time' in data:
            data_store["feeding_time"] = data['feeding_time']
            return jsonify({'status': 'success', 'message': 'Feeding time updated', 'feeding_time': data_store["feeding_time"]})
        else:
            return jsonify({'status': 'error', 'message': 'No feeding_time provided'}), 400

    
@app.route('/pet/feed', methods=['GET', 'POST'])
def openTheDoor():
    if request.method == 'GET':
        return jsonify({'status': 'success', 'message': 'GET request received'})

    elif request.method == 'POST':
        data = request.json
        json_data = json.dumps(data)

        mqtt_client.publish("pet/feed", json_data)
        if 'feed_now' in data and data['feed_now']:
            print("Comando recebido: Alimentar agora!")
            return jsonify({'status': 'success', 'message': 'Comando recebido para alimentar agora'})
        else:
            return jsonify({'status': 'error', 'message': 'Comando inválido ou ausente'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=24300)
    mqtt_client.loop_forever()
 
