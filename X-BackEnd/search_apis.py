from fastapi import FastAPI, File, UploadFile
from object_detector import ObjectDetector
import cv2
import numpy as np
import base64
from serpapi import GoogleSearch
import os
import uuid
import boto3
import json

app = FastAPI()

# TESTING

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCSES_KEY,
    region_name=AWS_REGION
)


@app.post("/recognize")
async def recognize(file: UploadFile = File( ... )):
    contents = await file.read()
    
    # with open("uploads/upload.jpg", "wb") as f:
    #     f.write(contents)

    detector = ObjectDetector()
    return detector.crop_objects(contents)


@app.post("/searchImage")
async def searchImage(file: UploadFile = File( ... )):
    # api_key = os.getenv("SERPAPI_KEY")

    contents = await file.read()

    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    img = cv2.resize(img, (1024, int(img.shape[0] * 1024 / img.shape[1])))
    _, buffer = cv2.imencode(".jpg", img, [cv2.IMWRITE_JPEG_QUALITY, 80])

    key = f"lens/{uuid.uuid4().hex}.jpg"

    s3.put_object(
        Bucket=AWS_S3_BUCKET,
        Key=key,
        Body=buffer.tobytes(),
        ContentType="image/jpeg",
        ACL="public-read"
    )

    image_url = f"https://{AWS_S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{key}"

    params = {
        "engine": "google_lens",
        "type": "products",
        "url": image_url,
        "api_key": SERPAPI_KEY
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    if "visual_matches" not in results:
        return "NOT FOUND"
    visual_matches = results["visual_matches"]
    return visual_matches

@app.get("/test")
async def getTest():
    with open("search_test.json", 'r', encoding="utf-8") as file:
        data = json.load(file)
    return data["visual_matches"]