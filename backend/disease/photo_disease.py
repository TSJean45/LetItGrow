import cv2
from ultralytics import YOLO
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image
import numpy as np

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

model = YOLO("/AI models/disease.pt").to(device)
model.eval()

classNames = ["leaf spot", "lack of calcium", "fungal leaf spot", "bacterial leaf blight", "yellow vein moasic virus", "yellow leaf curl virus"]

def photos(image):
     
    return image