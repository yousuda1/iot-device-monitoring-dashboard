from flask import Flask, render_template, jsonify
import random
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data")
def api_data():
    return {
        "temperature": 26,
        "humidity": 55,
        "battery": 90,
        "status": "Online",
        "timestamp": datetime.now().strftime("%H:%M:%S")
    }

if __name__ == "__main__":
    app.run(debug=True)