from flask import Flask, jsonify, request
import paho.mqtt.client as mqtt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
BROKER = '150.165.85.30'
USERNAME = ''
PASSWORD = ''
PORT = 1883

client = mqtt.Client()

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
    client.subscribe("testeplaca")

# Função de callback para recebimento de mensagens
def on_message(client, userdata, msg):
    print(f"Tópico: {msg.topic}, Mensagem: {msg.payload.decode()}")
    client.publish("teste", "AAAA")
    
client.on_connect = on_connect
client.on_message = on_message

client.connect(BROKER, PORT)

# @app.route('/teste', methods=['GET'])
# def teste():
#     client.publish("teste", '{"message": "Hello, World!"}')
#     return jsonify({"message": "Hello, World!"})

@app.route('/', methods=['GET'])
def init():
    client.publish("teste", '{"message": "Hello, World!"}')
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
            client.publish("teste", data_store["feeding_time"])
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
        return jsonify({'status': 'success', 'data': data})

@app.route('/api/v1/add', methods=['POST'])
def add():
    data = request.get_json() 
    x = data.get('x')
    y = data.get('y')
    return jsonify({"result": x + y})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
