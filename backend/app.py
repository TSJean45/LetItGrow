from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from ultralytics import YOLO
import cv2
import os
import shutil
import json
import random
import logging

# from flask_sqlalchemy import SQLAlchemy
# from dotenv import load_dotenv
# import os
# from flask_marshmallow import Marshmallow
# from flask_migrate import Migrate

# import database bodels from models.py
# from models import db, Users, Accounts, Farms

# #for reading .env
# load_dotenv()

app = Flask(__name__)
CORS(app)

model = YOLO("../backend/AI models/disease-detection-yolov8n.pt")

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/letitgrow'
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# SQLALCHEMY_TRACK_MODIFICATIONS = False
# SQLALCHEMY_ECHO=True


# migrate = Migrate(app,db)
# db.init_app(app)

# with app.app_context():
#     db.create_all()

# ma=Marshmallow(app)
# class UserSchema(ma.Schema):
#     class Meta:
#         fields = ("id", "firstName", "lastName", "userName", "email", "password")

# users_schema = UserSchema(many=True)

crop_models = {
    "banana": "../backend/AI models/Banana_random_forest_model.pkl",
    "chilli": "../backend/AI models/Chilli_random_forest_model.pkl",
    "corn": "../backend/AI models/corn_random_forest_model.pkl",
    "peanut": "../backend/AI models/pnut_random_forest_model.pkl",
    "potato": "../backend/AI models/potato_random_forest_model.pkl",
    "rice": "../backend/AI models/rice_random_forest_model.pkl",
    "sugarcane": "../backend/AI models/s_cane_random_forest_model.pkl",
    "sweetpotato": "../backend/AI models/Sweet_p_random_forest_model.pkl",
    "tapioca": "../backend/AI models/Tapioca_random_forest_model.pkl",
    "wheat": "../backend/AI models/Wheat_random_forest_model.pkl",
}


@app.route("/yield_prediction", methods=["POST"])
def yield_prediction():
    try:
        data = request.json
        print(data)

        crop = data.get("cropLabel")
        model_path = crop_models.get(crop)

        if model_path is None:
            return jsonify({"error": "Model not found for selected crop."})

        model = joblib.load(model_path)
        print("Model loaded: ", model_path)
        area = data.get("area")
        annual_rainfall = data.get("rain")
        fertilizer = data.get("fertilizer")
        pesticide = data.get("pesticide")

        feature_names = ["Area", "Annual_Rainfall", "Fertilizer", "Pesticide"]
        features = [[area, annual_rainfall, fertilizer, pesticide]]
        features_2d = np.array(features)
        df = pd.DataFrame(features_2d, columns=feature_names)
        print("Input features:", df)

        # Make predictions using the model
        prediction = model.predict(df)
        print("Prediction:", prediction)  # Debugging: Print prediction
        prediction_list = prediction.tolist()

        return jsonify({"prediction": prediction_list})
    except Exception as e:
        return jsonify({"error": str(e)})


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

    result = plantsimulation(
        plant, stage, temperature, watering, soil, fertilizer, light
    )

    return jsonify({"result": str(result)})

@app.route('/personal-plant/<int:data_id>', methods=['GET'])
def get_plant_data(data_id):
    try:
        with open("data/personal.json", 'r') as plant_file:
            plant_data = json.load(plant_file)
            for item in plant_data:
                if item['id'] == data_id:
                    return jsonify(item)
            abort(404, description="Data not found for the provided ID")
    except FileNotFoundError:
        abort(500, description="Plant data file not found")
    except Exception as e:
        abort(500, description=str(e))

@app.route('/personal-plant/all', methods=['GET'])
def get_all_plant():
    try:
        with open("data/personal.json", 'r') as plant_file:
            plant_data = json.load(plant_file)
            return jsonify(plant_data)
    except FileNotFoundError:
        abort(500, description="Map data file not found")
    except Exception as e:
        abort(500, description=str(e))

    # In case of any other unexpected error
    abort(500, description="Failed to fetch space mapping data")

@app.route('/personal-plant/<int:data_id>', methods=['PUT'])
def update_room_temperature(data_id):
    logging.basicConfig(level=logging.DEBUG) 
    
    with open('data/plantTemp.json', 'r') as file:
        temp_data = json.load(file)
        logging.debug(f'iot_temp_data: {temp_data}')
    
    random_index = random.randint(0, len(temp_data) - 1)
    temp_object = temp_data[random_index]
    logging.debug(f'temp_object: {temp_object}')

    with open('data/personal.json', 'r') as map_file:
        map_data = json.load(map_file)
        logging.debug(f'map_data before update: {map_data}')

    for item in map_data:
        if item['id'] == data_id:
            item['temperature'] = temp_object['temp']
            break
    logging.debug(f'map_data after update: {map_data}')

    # Write updated map_data back to map.json
    with open('data/personal.json', 'w') as map_file:
        json.dump(map_data, map_file, indent=4)
    
    return jsonify({'message': 'Data updated successfully', 'updated_data': item})

@app.route('/soil-monitoring/<int:data_id>', methods=['GET'])
def get_soil_monitoring_data(data_id):
    try:
        with open("data/map.json", 'r') as map_file:
            map_data = json.load(map_file)
            for item in map_data:
                if item['id'] == data_id:
                    return jsonify(item)
            abort(404, description="Data not found for the provided ID")
    except FileNotFoundError:
        abort(500, description="Map data file not found")
    except Exception as e:
        abort(500, description=str(e))

    # In case of any other unexpected error
    abort(500, description="Failed to fetch soil monitoring data")

@app.route('/soil-monitoring/<int:data_id>', methods=['PUT'])
def update_soil_monitoring_data(data_id):
    logging.basicConfig(level=logging.DEBUG) 
    
    with open('data/iotTemp.json', 'r') as file:
        iot_temp_data = json.load(file)
        logging.debug(f'iot_temp_data: {iot_temp_data}')
    
    random_index = random.randint(0, len(iot_temp_data) - 1)
    temp_object = iot_temp_data[random_index]
    logging.debug(f'temp_object: {temp_object}')

    with open('data/map.json', 'r') as map_file:
        map_data = json.load(map_file)
        logging.debug(f'map_data before update: {map_data}')

    for item in map_data:
        if item['id'] == data_id:
            item['temp'] = temp_object['temp']
            item['moisture'] = temp_object['moisture']
            item['ph'] = temp_object['ph']
            item['fertility'] = temp_object['fertility']
            item['light'] = temp_object['light']
            break
    logging.debug(f'map_data after update: {map_data}')

    # Write updated map_data back to map.json
    with open('data/map.json', 'w') as map_file:
        json.dump(map_data, map_file, indent=4)
    
    return jsonify({'message': 'Data updated successfully', 'updated_data': item})

@app.route('/space-mapping', methods=['POST'])
def add_space_mapping_data():
    try:
        data = request.get_json()
        print(data)

        required_fields = ['name', 'plantVariety', 'plantingDate', 'plantCounts', 'note', 'growingArea', 'polygons']

        for field in required_fields:
            if field not in data:
                abort(400, description=f"Field '{field}' is required")
                
        
        data.setdefault('temp', None)       # Default to None if not provided
        data.setdefault('moisture', None)   # Default to None if not provided
        data.setdefault('ph', None)         # Default to None if not provided
        data.setdefault('fertility', "")    # Default to an empty string if not provided
        data.setdefault('light', "")   
        data.setdefault('percentage', "50")  
        data.setdefault('image', "mapImage-1.png")  
        data.setdefault('pMessage', "Nearly all of the field has been watered")  
        data.setdefault('status', "You haven't watered this field!")  # Default to an empty string if not provided
        data.setdefault('icon', "bell")     # Default to "bell" if not provided
        data.setdefault('button', True)     # Default to True if not provided



        print(data)
        # Write the data to map.json
        with open('data/map.json', 'r+') as map_file:
            map_data = json.load(map_file)
            new_id = max(map_data, key=lambda x: x['id'])['id'] + 1
            print(new_id)
            data['id'] = new_id
            map_data.append(data)
            map_file.seek(0)
            json.dump(map_data, map_file, indent=4)
            map_file.truncate()

        return jsonify({'message': 'Data added successfully', 'new_data': data}), 201
    except KeyError:
        abort(500, description="Invalid data format: 'id' field not found in map_data")
    except Exception as e:
        abort(500, description=str(e))


@app.route('/space-mapping/<int:data_id>', methods=['GET'])
def get_space(data_id):
    try:
        with open("data/map.json", 'r') as map_file:
            map_data = json.load(map_file)
            for item in map_data:
                if item['id'] == data_id:
                    return jsonify(item)
            abort(404, description="Data not found for the provided ID")
    except FileNotFoundError:
        abort(500, description="Map data file not found")
    except Exception as e:
        abort(500, description=str(e))

    # In case of any other unexpected error
    abort(500, description="Failed to fetch soil monitoring data")

@app.route('/space-mapping/all', methods=['GET'])
def get_all_space_mapping():
    try:
        with open("data/map.json", 'r') as map_file:
            map_data = json.load(map_file)
            return jsonify(map_data)
    except FileNotFoundError:
        abort(500, description="Map data file not found")
    except Exception as e:
        abort(500, description=str(e))

    # In case of any other unexpected error
    abort(500, description="Failed to fetch space mapping data")

@app.route("/disease_detect_image", methods=["POST"])
def disease_detect_image():
    file = request.files["image"]

    nparr = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    print("test 1")

    # Delete previous results directory (optional)
    if os.path.exists("../frontend/src/detection-result-img/predict"):
        try:
            shutil.rmtree(
                "../frontend/src/detection-result-img/predict"
            )  # Use shutil.rmtree for safer deletion
            print("Deleted previous results directory.")
        except OSError as e:
            print(f"Error deleting directory: {e}")

    results = model(img, save=True, show_conf=False, conf=0.5, project="../frontend/src/detection-result-img")

    try:
        result = results[0]
        print(result)
        box = result.boxes[0]
        class_id = result.names[box.cls[0].item()]
        print("object:", class_id)

        imageurl = "../frontend/src/detection-result-img/predict/image0.jpg"
        return jsonify({"result": str(class_id), "imageURL": imageurl})
    
    except (IndexError, AttributeError):
        print("Error: Could not access detection data.")
        return jsonify(
            {"result": "No disease detected", "imageURL": "", "num_objects": 0}
        )


@app.route("/growbot", methods=["POST"])
def growbot():
    question = request.json

    print(question)

    from huggingchat import growbot

    response = growbot(question)

    return jsonify({"result": str(response)})


# Registration
# @app.route('/registerUser', methods=['POST'])
# def registerUser():
#     data = request.json

#     firstName = data['firstName']
#     lastName = data['lastName']
#     userName = data['userName']
#     email = data['email']
#     password = data['password']

#     newUser = Users(firstName=firstName, lastName=lastName, userName=userName, email=email, password=password)

#     db.session.add(newUser)
#     db.session.commit()

#     try:
#         db.session.commit()
#         return jsonify({"message": "User registered successfully"})
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True, use_reloader=False, debug=True)
