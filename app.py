from flask import Flask,render_template, request
import numpy as np
from PIL import Image
import re
from io import  BytesIO
from flask_cors import CORS
import base64
from random import randint
import matplotlib.pyplot as plt
import cv2 

from tensorflow.keras.models import load_model

generator = load_model('generator.h5')

img_name="img.jpg"

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/brush")
def brush():
    return render_template('newbrush.html')

@app.route('/output', methods=['GET'])
def get_output():
    return render_template('output.html', img_name=img_name)


@app.route('/model', methods=['POST'])
def get_image():
    image_b64 = request.values['imageBase64']
    
    image_data = base64.b64decode(re.sub('^data:image/.+;base64,', '', image_b64))
    image_PIL = Image.open( BytesIO(image_data))
    image_np = np.array(image_PIL)
    image_np = cv2.cvtColor(image_np, cv2.COLOR_RGBA2RGB)
    image_np = cv2.resize(image_np, (128,128), interpolation = cv2.INTER_CUBIC)
    
    print(image_np.shape)
    
    image_norm = image_np/127.5-1
    image_pred = image_norm
    image_pred = np.expand_dims(image_pred, axis=0)
    for i in range(5):
        image_pred = generator.predict(image_pred)
    
    image_pred = np.array(image_pred[0])
    image_res = np.array(image_np)
    for i in range(128):
        for j in range(128):
            if(image_np[i][j][0]>=230 and image_np[i][j][1]>=230 and image_np[i][j][2]>=230):
                image_res[i][j] = (image_pred[i][j]+1)*127.5

    
    image_np = cv2.resize(image_np, (486,286), interpolation = cv2.INTER_CUBIC)
    image_res = cv2.resize(image_res, (486,286), interpolation = cv2.INTER_CUBIC)
    
    #print(image_np, image_norm, image_res)
    print(image_pred.min(), image_pred.max())
    global img_name
    img_name = "img"+str(randint(11,99))+".jpg"
    plt.imsave('./static/images/'+img_name, image_np)
    plt.imsave('./static/images/o'+img_name, image_res)

    return "success"

app.run(debug=True)