import cv2
from ultralytics import YOLO

def play_video(video_path):
    video = cv2.VideoCapture(video_path)
    model = YOLO("backend/AI models/disease-detection-yolov8n.pt")

    while True:
        ret, frame = video.read()

        if not ret:
            break
        
        results = model(frame)
        
        for r in results:
            boxes = r.boxes

            for box in boxes:
                conf = box.conf
                cls = int(box.cls[0])
                
                if conf > 0.2:

                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, w, h = int(x1), int(y1), int(x2 - x1), int(y2 - y1)

                    cv2.rectangle(frame, (x1, y1), (x1 + w, y1 + h), (0, 255, 0), 2)

        cv2.imshow("Video", frame)

        if cv2.waitKey(25) & 0xFF == ord("q"):
            break

    video.release()
    cv2.destroyAllWindows()

video_path = "backend/sources/grape2.mp4"
play_video(video_path)
