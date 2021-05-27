# Image Inpainting GAN

This approach is based on deep convolutional neural networks trained for the image
completion task. A single completion network is used for the image completion. Two additional
networks, the global and the local context discriminator networks, are used in order to train this
network to realistically complete images. During the training, the discriminator networks are
trained to determine whether or not an image has been completed, while the completion network
is trained to fool them. Only by training all the three networks together is it possible for the
completion network to realistically complete a diversity of images.

## Software Dependencies
* Python 3.8 or higher
* Flask 2.0.0
* Flask-Cors 3.0.10
* Pillow 8.2.0
* Open cv 4.2.0.34
* Tensoflow 2.4.1

## Steps to run
1. Make sure that the dependecies are already intalled on your system.
   Once the required libraries are installed open the current folder and and run app.py
2. Go to the browser and enter url http://localhost:5000
3. Choose the image on which you want to perform inpainting
4. Click on Save button

## Snapshots
![landing page](/images/frontend.jpg)

![main ui](/images/back.jpg)

![demo]/images/demo.png)
