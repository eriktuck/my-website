---
date: '2025-04-17T09:19:09-06:00'
draft: false
title: Translating image styles with CycleGAN from Monet to photos
summary: Using the CycleGAN generative adversarial network to stylize photos in the style of Monet.
tags: ["Deep Learning", "Computer Vision"]
image: https://storage.googleapis.com/ei-dev-assets/assets/sunflower-fibonacci-black.png
imageCredit: "Image created by author using GPT-4"
github: https://github.com/eriktuck/monet-gan
liveDemo: https://www.kaggle.com/code/erikanderson1/gan-for-generating-art-in-the-style-of-monet/
---

This project implements a CycleGAN (Cycle-Consistent Generative Adversarial Network) to transform photographs into paintings that mimic Claude Monet's artistic style. The implementation follows the architecture described in the paper "Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks."

## Dataset

The project utilizes two primary datasets:
- 300 Monet paintings (256x256 pixels)
- 7,038 photographs (256x256 pixels)

Both datasets are provided in TFRecord format for efficient processing.

## Technical Implementation

### Data Preprocessing
- Images undergo random jittering (resizing to 286x286 and random cropping to 256x256)
- Random horizontal flipping for data augmentation
- Normalization to the range [-1, 1]

### Model Architecture
1. **Generator**: Uses a modified U-Net architecture with:
   - Downsampling path with skip connections
   - Instance normalization for style consistency
   - Dropout layers for improved generalization
   
2. **Discriminator**: Outputs a 32x32 patch map classifying regions as real or fake, rather than a single binary classification

3. **CycleGAN**: Combines two generators and two discriminators:
   - Monet-to-photo generator and discriminator
   - Photo-to-Monet generator and discriminator

### Loss Functions
The model utilizes multiple loss components:
- Generator loss: Encourages generators to produce convincing images
- Discriminator loss: Helps discriminators distinguish real from generated images
- Cycle consistency loss: Ensures $F(G(X))≈X$ and $G(F(Y))≈Y$ where $F$ and $G$ are the mapping functions
- Identity loss: Stabilizes training by encouraging generators to maintain content

### Training
- Adam optimizer with learning rate 2e-4 and beta_1=0.5
- The model learns bidirectional mappings simultaneously

## Results

The final model successfully transforms photographs into images with characteristics of Monet's painting style, including:
- Softer edges
- Impressionistic brush stroke effects
- Modified color palettes typical of Monet's work

The project demonstrates how deep learning techniques like GANs can be used for creative applications in art style transfer, providing an automated way to reimagine ordinary photographs as if painted by a master impressionist.