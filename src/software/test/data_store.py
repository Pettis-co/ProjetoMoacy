import json

DATA_FILE = "data.json"
data_store = {}

def load_data():
    """Carrega os dados do arquivo JSON"""
    global data_store
    try:
        with open(DATA_FILE, "r") as f:
            data_store = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data_store = {}

def save_data():
    """Salva os dados no arquivo JSON"""
    with open(DATA_FILE, "w") as f:
        json.dump(data_store, f)

# Carrega os dados ao iniciar
load_data()
