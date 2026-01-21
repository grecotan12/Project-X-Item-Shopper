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
from pydantic import BaseModel
from html_cleaner import HtmlCleaner
import http.client

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


@app.post("/searchImage/{category}")
async def searchImage(category: str, file: UploadFile = File( ... )):
    # api_key = os.getenv("SERPAPI_KEY")

    contents = await file.read()

    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    img = cv2.resize(img, (1024, int(img.shape[0] * 1024 / img.shape[1])))
    _, buffer = cv2.imencode(".jpg", img, [cv2.IMWRITE_JPEG_QUALITY, 80])

    key = f"lens/{category}/{uuid.uuid4().hex}.jpg"

    s3.put_object(
        Bucket=AWS_S3_BUCKET,
        Key=key,
        Body=buffer.tobytes(),
        ContentType="image/jpeg",
        ACL="public-read"
    )

    image_url = f"https://{AWS_S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{key}"

    conn = http.client.HTTPSConnection("google.serper.dev")
    payload = json.dumps({
        "url": image_url
    })
    headers = {
        'X-API-KEY': SERPDEV_API_KEY,
        'Content-Type': 'application/json'
    }
    conn.request("POST", "/lens", payload, headers)
    res = conn.getresponse()
    data = json.loads(res.read().decode("utf-8"))
    return data["organic"]

class URLPayLoad(BaseModel):
    url: str

@app.post("/cleanHtml")
def cleanHtml(payload: URLPayLoad):
    url = payload.url
    print(url)
    cleaner = HtmlCleaner(url)
    html = cleaner.fetch_html()

    soup = cleaner.clean_html(html)
    contents = cleaner.content_extraction(soup)
    cleaner.clean_contents(contents)
    cleaned_contents = cleaner.remove_dublicate(contents)

    final_contents = cleaner.flatten_contents(cleaned_contents)
    return final_contents