from flask import Flask, jsonify, request
import paho.mqtt.client as mqtt

app = Flask(__name__)

BROKER = ''
USERNAME = ''
PASSWORD = ''

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

@app.route('/', methods=['GET'])
def init():
    client.publish("marilia_te_amo_minha_muie", {"message": "Hello, World!"})
    return jsonify({"message": "Hello, World!"})

@app.route('/pet/information', methods=['POST'])
def setAnimalData():
    return jsonify({"message": "Hello, World!"})

@app.route('/client/information', methods=['POST'])
def setClientData():
    return jsonify({"message": "Hello, World!"})

@app.route('/pet/history', methods=['POST'])
def setAnimalMedicalHistory():
    return jsonify({"message": "Hello, World!"})

@app.route('/client/time', methods=['POST'])
def setTimeToEat():
    return jsonify({"message": "time to eat"})

@app.route('/pet/time', methods=['GET'])
def timeToEat():
    return jsonify({"message": "get time to eat"})

@app.route('/pet/feed', methods=['POST'])
def openTheDoor():
    return jsonify({"message": "open the door"})

@app.route('/api/v1/add', methods=['POST'])
def add():
    data = request.get_json() 
    x = data.get('x')
    y = data.get('y')
    return jsonify({"result": x + y})

if __name__ == '__main__':
    app.run(debug=True)
