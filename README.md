# Image Inpainting GAN

This approach is based on deep convolutional neural networks trained for the image
completion task. A single completion network is used for the image completion. Two additional
networks, the global and the local context discriminator networks, are used in order to train this
network to realistically complete images. During the training, the discriminator networks are
trained to determine whether or not an image has been completed, while the completion network
is trained to fool them. Only by training all the three networks together is it possible for the
completion network to realistically complete a diversity of images.
 
