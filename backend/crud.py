from flask import Blueprint, jsonify, request, abort
import json
import random
import logging

soil_monitoring_bp = Blueprint('soil_monitoring', __name__)
space_mapping_bp = Blueprint('space_mapping', __name__)

@soil_monitoring_bp.route('/soil-monitoring/<int:data_id>', methods=['GET'])
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

@soil_monitoring_bp.route('/soil-monitoring/<int:data_id>', methods=['PUT'])
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


@soil_monitoring_bp.route('/soil-monitoring/<int:data_id>', methods=['DELETE'])
def delete_soil_monitoring_data(data_id):
    # Logic to delete a soil monitoring entry by ID
    # Remove the data from your JSON file or database
    # Return a JSON response indicating success or failure
    pass

@space_mapping_bp.route('/space-mapping', methods=['POST'])
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


@space_mapping_bp.route('/space-mapping/<int:data_id>', methods=['GET'])
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

@space_mapping_bp.route('/space-mapping/all', methods=['GET'])
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