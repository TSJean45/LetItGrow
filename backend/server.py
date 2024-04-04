from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/plant_simulation", methods=["POST"])
def plant_simulation():
    data = request.json
    print("Received data from frontend:", data)

    return jsonify({"message": "Data received successfully!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True, use_reloader=False, debug=True)
