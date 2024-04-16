from flask import Blueprint, jsonify, request, abort
import json
import random

soil_monitoring_bp = Blueprint('soil_monitoring', __name__)

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

import logging

@soil_monitoring_bp.route('/soil-monitoring/<int:data_id>', methods=['PUT'])
def update_soil_monitoring_data(data_id):
    logging.basicConfig(level=logging.DEBUG)  # Set logging level to DEBUG
    
    # Load and log data from iotTemp.json
    with open('data/iotTemp.json', 'r') as file:
        iot_temp_data = json.load(file)
        logging.debug(f'iot_temp_data: {iot_temp_data}')
    
    # Generate and log temp_object
    random_index = random.randint(0, len(iot_temp_data) - 1)
    temp_object = iot_temp_data[random_index]
    logging.debug(f'temp_object: {temp_object}')

    # Load and log map_data from map.json
    with open('data/map.json', 'r') as map_file:
        map_data = json.load(map_file)
        logging.debug(f'map_data before update: {map_data}')

    # Update map_data and log it
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
