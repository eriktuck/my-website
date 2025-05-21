---
date: '2025-02-25T11:31:25-06:00'
draft: false
title: 'An unsupervised learning approach to cat vocalizations'
summary: 'An analysis of cat vocalizations using machine learning techniques to identify patterns in cat meows across different contexts. The project uses the Cat Meow Classification dataset from Kaggle, which contains 440 audio recordings of cat meows in three specific contexts: brushing, waiting for food, and isolation in an unfamiliar environment.'
tags: ["Machine Learning"]
image: https://storage.googleapis.com/ei-dev-assets/assets/puma-spots.png
imageCredit: "Image created by author using GPT-4"
github: https://github.com/eriktuck/the-cats-meow
liveDemo: https://github.com/eriktuck/the-cats-meow/blob/main/meow.ipynb
---

This project presents an analysis of cat vocalizations using machine learning techniques to identify patterns in cat meows across different contexts. The project uses the Cat Meow Classification dataset from Kaggle, which contains 440 audio recordings of cat meows in three specific contexts: brushing, waiting for food, and isolation in an unfamiliar environment.

## Key Components of the Analysis:

1. **Data Exploration**:
   - The dataset includes meows from cats with metadata on context, breed (Maine Coon and European Shorthair), and sex
   - The notebook explores class balance across these categories with visualization
   - Audio samples were examined with waveform visualizations across different contexts

2. **Feature Engineering**:
   - Audio preprocessing included trimming silence, resampling to a standard rate, and normalization
   - Feature extraction used librosa to generate 35 features including:
     - MFCCs (Mel Frequency Cepstral Coefficients)
     - Chroma features
     - Spectral contrast
     - Zero crossing rate
     - Spectral centroid and roll-off

3. **Dimensionality Reduction**:
   - PCA was used to reduce the feature space to 2 dimensions for visualization
   - The visualization showed some but limited natural separation between contexts

4. **Unsupervised Learning**:
   - K-means clustering was applied with different values of k (3-12)
   - Hierarchical clustering with various linkage methods and distance metrics was evaluated
   - Cluster accuracy was evaluated against cat metadata (context, sex, breed)
   - A statistical association was found between clusters and context/sex (Chi-square p<0.001)
   - Maximum accuracy achieved with hierarchical clustering was 25.4% using cosine distance

5. **Supervised Approach**:
   - For comparison, a Random Forest classifier was trained to predict the meow context
   - The supervised model achieved 68% accuracy, significantly better than unsupervised methods

6. **Visualizations**:
   - Waveform comparisons across contexts and clusters
   - PCA-reduced feature visualization
   - Confusion matrices for evaluation

The project concludes that while unsupervised learning revealed some natural patterns in cat meows, these patterns only partially aligned with the context in which the meows were recorded. The supervised approach proved more effective at predicting the context from the audio features, suggesting that with additional feature engineering and domain expertise, further progress could be made in understanding cat vocalizations.