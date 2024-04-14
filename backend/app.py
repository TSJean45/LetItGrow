from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib 
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
# from flask_sqlalchemy import SQLAlchemy
# from dotenv import load_dotenv
# import os
# from flask_marshmallow import Marshmallow
# from flask_migrate import Migrate

#import database bodels from models.py
# from models import db, Users, Accounts, Farms

# #for reading .env
# load_dotenv()

app = Flask(__name__)
CORS(app)

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

@app.route("/yield_prediction", methods=['POST'])
def yield_prediction():
    try:
        model = joblib.load('../backend/AI models/Banana_random_forest_model.pkl')
        # Parse the form data
        data = request.json
        print(data)
        
        area = data.get('area')  # Use 'area' instead of 'Area' to match the key in JSON data
        annual_rainfall = data.get('rain')  # Assuming 'rain' is the key for Annual_Rainfall
        fertilizer = data.get('fertilizer')  # Assuming 'fertilizer' is the key for Fertilizer
        pesticide = data.get('pesticide')  # Ass

        feature_names = ['Area', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
        features = [[area, annual_rainfall, fertilizer, pesticide]]
        features_2d = np.array(features)
        df = pd.DataFrame(features_2d, columns=feature_names)
        print("Input features:", df)  # Debugging: Print input features

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
    
    result = plantsimulation(plant, stage, temperature, watering, soil, fertilizer, light)

    return jsonify({"result": str(result)})

@app.route("/growbot", methods=["POST"])
def growbot():
    question = request.json
    
    print(question)
    
    from huggingchat import growbot
    
    response = growbot(question)
    
    return jsonify({"result": str(response)})


#Registration
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
