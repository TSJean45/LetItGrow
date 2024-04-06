from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/plant_simulation", methods=["POST"])
def plant_simulation():
    data = request.json

    plant = data["plant"]["value"]
    stage = data["stage"]
    temperature = data["temperature"]
    watering = data["watering"]
    soil = data["soil"]["value"]
    fertilizer = data["fertilizer"]["value"]
    light = data["light"]["value"]

    # print(
    #     f"plant:{plant}, stage:{stage}, temperature:{temperature}, watering:{watering}, soil:{soil}, fertilizer:{fertilizer}, light:{light}"
    # )
    
    from huggingchat import plantsimulation
    
    result = plantsimulation(plant, stage, temperature, watering, soil, fertilizer, light)

    return jsonify({"result": str(result)})

@app.route("/growbot", methods=["POST"])
def growbot():
    question = request.json
    
    print(question)
    
    from huggingchat import growbot
    
    response = growbot(question)
    
    return jsonify({"result": str(response)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True, use_reloader=False, debug=True)
