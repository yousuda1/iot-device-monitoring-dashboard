from flask import Flask, render_template, jsonify
import random
from datetime import datetime
import os

app = Flask(__name__)

def generate_sensor_data():
    temperature = round(random.uniform(22.0, 32.0), 1)
    humidity = round(random.uniform(40.0, 75.0), 1)
    battery = random.randint(45, 100)
    status = random.choice(["Online", "Online", "Online", "Offline"])
    timestamp = datetime.now().strftime("%H:%M:%S")

    return {
        "temperature": temperature,
        "humidity": humidity,
        "battery": battery,
        "status": status,
        "timestamp": timestamp
    }

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data")
def api_data():
    return jsonify(generate_sensor_data())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)