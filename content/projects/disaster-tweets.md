---
date: '2025-04-16T12:07:05-06:00'
draft: false
title: 'Using NLP with Twitter to monitor natural disasters'
summary: "When disaster strikes, real-time social media monitoring can be a powerful tool for early warning and response. This project analyzes Twitter data to identify posts that describe actual natural disasters, which could potentially serve as an early warning system for governmental and humanitarian organizations."
tags: ["NLP", "spaCy", "Deep Learning"]
image: "https://storage.googleapis.com/ei-dev-assets/assets/disaster-tweets-post.png"
imageCredit: "Image created by author using ChatGPT"
github: "https://github.com/eriktuck/nlp-disaster-tweets"
liveDemo: "https://www.kaggle.com/code/erikanderson1/nlp-to-monitor-twitter-for-natural-disasters"
---

This project demonstrates how to build and compare two different NLP models for disaster tweet classification. The project analyzes Twitter data to identify posts that describe actual natural disasters, which could potentially serve as an early warning system for governmental and humanitarian organizations.

## Key Components:

### Data Overview

-   Uses a dataset of human-labeled tweets where some describe natural disasters
-   Binary classification task: predict whether a tweet describes a true natural disaster
-   Training set: 7,613 tweets (balanced class distribution)
-   Test set: 3,263 tweets

### Data Preprocessing

-   Cleaned duplicate tweets
-   Visualized class distribution (balanced dataset)
-   Analyzed text length distributions by category
-   Used spaCy for text vectorization and tokenization

### Model 1: GRU Architecture

-   Preprocessed tweets using spaCy's word embeddings
-   Limited to first 30 tokens with padding
-   Used a simple GRU neural network with dropout
-   Achieved strong training accuracy (97%) but validation accuracy plateaued at ~73%
-   Shows signs of overfitting after early epochs

### Model 2: OPT Large Language Model

-   Utilized the OPT-1.3B model from Keras Hub
-   Implemented a LastTokenPooler for sequence classification
-   Applied LoRA for efficient fine-tuning
-   Achieved better validation accuracy (~82%)
-   Required significantly more computational resources

### Performance Analysis

-   Created confusion matrices to evaluate model performance
-   Compared F1 scores between models
-   Tracked training vs. validation accuracy to detect overfitting
-   Generated predictions for submission

### Technical Implementation Details

-   Used TensorFlow/Keras for model building
-   Implemented mixed precision training
-   Carefully managed GPU memory constraints
-   Demonstrated effective handling of NLP preprocessing pipeline

## Results and Insights

The notebook highlights the tradeoffs between simpler, more efficient models (GRU) and larger, more accurate but resource-intensive language models (OPT-1.3B), providing valuable insights for real-world NLP applications in disaster monitoring.

