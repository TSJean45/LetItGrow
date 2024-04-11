from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from flask_marshmallow import Marshmallow

#import database bodels from models.py
from models import db, Users, Accounts, Farms

#for reading .env
load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/letitgrow'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO=True

db.init_app(app)
        
with app.app_context():
    db.create_all()
    
ma=Marshmallow(app)
class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "firstName", "lastName", "userName", "email", "password")
        
users_schema = UserSchema(many=True)
    
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
@app.route('/registerUser', methods=['POST'])
def registerUser():
    data = request.json
    
    firstName = data['firstName']
    lastName = data['lastName']
    userName = data['userName']
    email = data['email']
    password = data['password']
    
    newUser = Users(firstName=firstName, lastName=lastName, userName=userName, email=email, password=password)
    
    db.session.add(newUser)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True, use_reloader=False, debug=True)
