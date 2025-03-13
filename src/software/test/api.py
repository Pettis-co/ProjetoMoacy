import threading
from flask import Flask, jsonify, request
import paho.mqtt.client as mqtt
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)
BROKER = '150.165.85.30'
USERNAME = ''
PASSWORD = ''
PORT = 1883
TOPICO = "teste"
balanca = 0.0

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

mqtt_client = mqtt.Client()

def on_connect(client, userdata, flags, rc):
    
    print("Conectado ao broker com código de resultado:", rc)
    client.subscribe("pet/balance/response")
    client.subscribe(TOPICO)

def on_message(client, userdata, msg):
    if msg.topic == "teste":
        global data_store
        mqtt_client.publish("pet/setup", json.dumps(data_store))
        mqtt_client.publish("pet/balance")
    if msg.topic == "pet/balance/response":
       
        global balanca
        balanca = float(msg.payload.decode())
        
    print(f"Mensagem recebida: {msg.topic} -> {msg.payload.decode()}")

mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message


def run_mqtt():
    mqtt_client.connect(BROKER, PORT)  # Adicione a porta aqui
    mqtt_client.loop_forever()

mqtt_thread = threading.Thread(target=run_mqtt)
mqtt_thread.daemon = True
mqtt_thread.start()

@app.route('/', methods=['GET'])
def init():
    mqtt_client.publish("teste", '{"message": "Hello, World!"}')
    return jsonify({"message": "Hello, World!"})

DATA_FILE = "data.json"

default_data = {
    "timesOnDay": 0.0,
    "totalOnDay": 0.0,
    "portion": 0.0,
    "firstAlarm": "00:00"
}

# Função para carregar os dados do arquivo JSON
def load_data():
    global data_store
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r") as f:
                data_store = json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            print("Erro ao carregar JSON, recriando arquivo...")
            data_store = default_data.copy()
            save_data()
    else:
        data_store = default_data.copy()
        save_data()

# Função para salvar os dados no arquivo JSON
def save_data():
    try:
        with open(DATA_FILE, "w") as f:
            json.dump(data_store, f, indent=4)
        print("Dados salvos com sucesso:", data_store)
    except Exception as e:
        print("Erro ao salvar JSON:", e)

# Carrega os dados ao iniciar o servidor
load_data()

@app.route("/data", methods=["GET"])
def get_data():
    """Retorna os dados armazenados"""
    return jsonify(data_store)

@app.route("/data", methods=["POST"])
def update_data():
    """Atualiza os dados com os valores recebidos"""
    global data_store
    new_data = request.json

    # Debug: Exibir os dados recebidos
    print("Dados recebidos:", new_data)

    if not new_data:
        return jsonify({"error": "Nenhum dado enviado"}), 400

    # Atualiza somente as chaves que existem no dicionário
    updated = False
    for key in new_data:
        data_store[key] = new_data[key]
    
        updated = True

    if updated:
        mqtt_client.publish("pet/setup", json.dumps(data_store))
        save_data()  # Salva os dados no arquivo
        return jsonify({"message": "Dados atualizados", "data": data_store})
    else:
        return jsonify({"error": "Nenhuma chave válida enviada"}), 400
    
@app.route('/pet/time', methods=['GET', 'POST'])
def timeToEat():
    if request.method == 'GET':
        return jsonify({
            'status': 'success', 
            'feeding_time': data_store["feeding_time"]
        })
    elif request.method == 'POST':
        data = request.json
        if 'feeding_time' in data:
            data_store["feeding_time"] = data['feeding_time']
            save_data()
            return jsonify({
                'status': 'success',
                'message': 'Feeding time updated',
                'feeding_time': data_store["feeding_time"]
            })
        else:
            return jsonify({'status': 'error', 'message': 'No feeding_time provided'}), 400

@app.route('/pet/feed', methods=['GET', 'POST'])
def openTheDoor():
    if request.method == 'POST':
        data = request.json
        if 'feed_now' in data and data['feed_now']:
            mqtt_client.publish("pet/feed", json.dumps(data))
            return jsonify({'status': 'success', 'message': 'Comando recebido para alimentar agora'})
        else:
            return jsonify({'status': 'error', 'message': 'Comando inválido ou ausente'}), 400
    return jsonify({'status': 'success', 'message': 'GET request received'})

@app.route('/pet/balance', methods=['GET'])
def balance():
    mqtt_client.publish("pet/balance")
    return jsonify({'status': 'success', 'balance': balanca})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=24300)
    