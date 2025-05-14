---
title: "News topic modeling with matrix factorization"
date: 2025-04-14T10:00:00-05:00
draft: false
summary: "A comparative analysis of unsupervised and supervised machine learning techniques for classifying news articles into predefined categories"
tags: ["Machine Learning", "NLP", "spaCy"]
image: https://storage.googleapis.com/ei-dev-assets/assets/river-delta-gpt.png
imageCredit: "Image created by author with ChatGPT"
github: https://github.com/eriktuck/news-topic-modelling-nmf
liveDemo: https://www.kaggle.com/code/erikanderson1/bbc-news-classification-using-matrix-factorization?scriptVersionId=233863373
---

I implement and compare different approaches to classify BBC news articles into five categories: business, entertainment, politics, sports, and technology. The project specifically contrasts Non-negative Matrix Factorization (NMF), an unsupervised technique, with Histogram-Based Gradient Boosting Classification (HGBC), a supervised learning approach.

## Key Components

### Data Exploration and Preprocessing

-   Analyzed a dataset of 2,225 BBC news articles, with 1,490 available for training
-   Performed text preprocessing using spaCy, including lemmatization and removal of stop words
-   Evaluated class distribution and text length characteristics across categories
-   Applied TF-IDF vectorization to convert text into a numerical representation

### Unsupervised Approach: Non-negative Matrix Factorization

-   Implemented NMF to decompose the TF-IDF matrix into topic distributions
-   Achieved 91.25% accuracy on training data and 92.52% on the test set with default parameters
-   Performed hyperparameter tuning via GridSearchCV to optimize model performance
-   Visualized results using confusion matrices to analyze classification patterns

### Supervised Approach: Histogram-Based Gradient Boosting

-   Implemented HGBC as a comparative supervised technique
-   Analyzed performance across different training data proportions (10% to 90%)
-   Observed accuracy improvements as training data increased, with optimal performance at 70%
-   Achieved 94.69% accuracy on the test set, outperforming the unsupervised approach

### Model Evaluation

-   Created confusion matrices to identify classification patterns and errors
-   Submitted predictions to Kaggle for independent evaluation
-   Analyzed trade-offs between model complexity, accuracy, and potential overfitting

## Results and Insights

The analysis revealed that while the unsupervised NMF approach provided impressive accuracy (92.52%) without requiring labeled data, the supervised HGBC method achieved slightly higher accuracy (94.69%) when sufficient training data was available. This project demonstrates the effectiveness of both approaches and provides insights into their relative strengths for text classification tasks.
