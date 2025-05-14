---
title: "Foraging for mushrooms in random forests"
date: 2024-12-10T10:00:00-05:00
draft: false
summary: "Using supervised machine learning techniques to classify mushrooms as either poisonous or edible, emphasizing the importance of model evaluation metrics."
tags: ["Machine Learning"]
image: https://storage.googleapis.com/ei-dev-assets/assets/mushroom-gills-gpt.png
imageCredit: "Image created by author using ChatGPT"
github: https://github.com/eriktuck/death-cap-ml
liveDemo: https://github.com/eriktuck/death-cap-ml/blob/main/kaggle_data.ipynb
---

This project demonstrates the application of various supervised machine learning techniques to classify mushrooms as either poisonous or edible, using the UC Irvine Mushroom Dataset. The analysis highlights the critical importance of model evaluation metrics like precision in high-stakes classification problems and compares the performance of different algorithms.

The project contrasts the performance of a single Decision Tree, a pruned Decision Tree, Random Forests (an ensemble bagging method), and Histogram-Based Gradient Boosting (an ensemble boosting method). The primary goal is to build a model with high precision to minimize the risk of incorrectly classifying a poisonous mushroom as edible.

## Key Components

### Data Exploration and Preprocessing

-   Analyzed a large dataset of mushroom characteristics from the UC Irvine Machine Learning Repository (expanded by Kaggle).
-   Addressed data quality issues arising from the synthetic nature of the Kaggle dataset, including inconsistent categorical and boolean values, which were replaced with `NaN`.
-   Converted boolean features to numerical representations (0 and 1).
-   Identified and removed outliers in numerical features based on z-scores.
-   Split the data into training and testing sets, stratifying by the target variable ('class') to maintain class proportions.

### Feature Engineering and Transformation

-   Implemented a `ColumnTransformer` with separate pipelines for boolean, categorical, and numerical features.
-   Utilized `SimpleImputer` to handle missing values using the most frequent strategy for categorical and boolean features and the mean for numerical features.
-   Applied `OneHotEncoder` to convert categorical features into a numerical format suitable for machine learning models.
-   Scaled numerical features using `StandardScaler`.

### Model Implementation and Evaluation

-   **Decision Tree:** Trained a base `DecisionTreeClassifier` and evaluated its performance, noting a high initial accuracy but also a potential for false negatives.
-   **Pruned Decision Tree:** Implemented cost complexity pruning to improve the generalization of the Decision Tree. Explored the relationship between the pruning parameter (alpha) and model performance, identifying a slightly improved precision with an optimally pruned tree.
-   **Random Forests:** Trained a `RandomForestClassifier`, an ensemble of decision trees, which significantly improved the test precision. Feature importances were extracted to understand which mushroom characteristics were most predictive.
-   **Histogram-Based Gradient Boosting:** Implemented a `HistGradientBoostingClassifier`, another ensemble method. While computationally efficient, it did not outperform the Random Forest on this dataset. Hyperparameter tuning using `GridSearchCV` was conducted to optimize its performance.
-   **Model Evaluation:** Primarily used precision as the key metric to assess model performance, emphasizing the importance of minimizing false negatives (classifying poisonous mushrooms as edible). Confusion matrices and ROC curves were used for further evaluation and visualization of model performance.

### Results and Insights

The analysis demonstrated that while all the implemented models achieved high accuracy, the Random Forest classifier yielded the highest test precision (99%), making it the most reliable model for minimizing the risk of misclassifying poisonous mushrooms. The project underscores the importance of selecting evaluation metrics aligned with the problem's specific risks and the potential benefits of ensemble methods in achieving robust classification performance.
