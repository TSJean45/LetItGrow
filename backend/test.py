from ultralytics import YOLO

# Load a pretrained YOLOv8n model
model = YOLO("backend/AI models/disease-detection-yolov8n.pt")

# Define path to the image file
source = 'backend/sources/leaf7.jpg'

# Run inference on the source
results = model(source, save=True)  # list of Results objects