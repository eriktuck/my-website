---
title: "Classifying transactions with deep learning for financial models"
date: 2025-04-20T10:00:00-05:00
draft: false
summary: "An AI-powered classifier for financial transactions"
tags: ["Deep Learning"]
image: https://storage.googleapis.com/ei-dev-assets/assets/dragonfly-wing-gpt.png
imageCredit: "Image created by author using GPT-4"
github: https://github.com/eriktuck/txn-classifier
liveDemo: https://colab.research.google.com/drive/1aBjRTEzCOstnZ6Pyae6QRgce-VLhsZsu#scrollTo=UCsEB0tO9ynK
---

This project implements a machine learning pipeline to automate the categorization of personal financial transactions. By leveraging **Generative Adversarial Networks (GANs)** for data augmentation and **Transformer-based models (BERT)** for text classification, the system organizes raw bank data into actionable categories compatible with Ramit Sethi’s "Conscious Spending Plan."

![Project Header Image](https://github.com/eriktuck/txn-classifier/raw/main/output.png)
*Figure 1: Per label accuracy of the model.*

### The Problem

Effective financial modeling requires accurate historical data to establish spending patterns. However, raw transaction data exported from banks or services like Plaid often comes with vague or messy descriptions (e.g., `ACH DEBIT HOTEL 5432`).

Furthermore, standard bank categories rarely align with specific budgeting philosophies. For instance, the "Conscious Spending Plan" requires high-level distinctions between **Fixed Costs** (rent, utilities) and **Discretionary/Guilt-Free Spending** (dining out, hobbies), alongside granular sub-labels. Manually relabeling thousands of past transactions to fit this model is tedious and error-prone.

### The Solution

The project tackles this challenge in two distinct phases:

1.  **Data Augmentation with CTGAN:** Since properly labeled personal finance data is often scarce, I used a **Conditional Tabular GAN (CTGAN)** to generate realistic synthetic transaction data from a small sample of manually labeled examples.
2.  **Classification with Transformers:** I trained and compared two neural network architectures—a custom Transformer-based network and a fine-tuned **BERT** model—to predict transaction categories based on the merchant name and transaction amount.

### Technical Implementation

#### Data Pipeline
The workflow begins with raw transaction data following the **Plaid** schema. Key features include:
*   `date`: Transaction timestamp.
*   `merchant_name`: The raw string provided by the bank.
*   `amount`: Transaction value.
*   `cat_label`: The target variable (e.g., "Fixed - Housing", "Discretionary - Dining").

I also included scripts to extract and normalize data from **Monarch Money**, ensuring the model can fit into a modern personal finance stack.

#### Synthetic Data Generation
To address the class imbalance and small dataset size common in personal finance, I employed **CTGAN**. This deep learning model learns the statistical distribution of the input rows and generates new, synthetic rows that preserve the relationships between merchant names, amounts, and categories. This allowed for a more robust training set without compromising privacy or requiring manual labeling of thousands of rows.

#### Model Architecture
Two primary approaches were evaluated for the classification task:
*   **Custom Transformer:** A lightweight transformer architecture designed to learn embeddings for merchant descriptions and classify them.
*   **Fine-Tuned BERT:** Leveraging the pre-trained knowledge of BERT (Bidirectional Encoder Representations from Transformers) to handle the nuances of abbreviated and messy transaction text.

### Workflow & Environment

The project was developed using **Google Colab** for GPU acceleration, with environment management handled via **Conda**.

*   **Training:** The `txn-data-gen.ipynb` notebook handles the training of the CTGAN and generation of synthetic data.
*   **Inference:** The `txn-data-classifier.ipynb` notebook ingests the augmented dataset to train the classifiers and output predictions.

### Future Work

Future iterations of this project will focus on deploying the model as a lightweight API or integrating it directly into spreadsheet workflows (like Google Sheets) to allow for real-time categorization of new expenses as they occur.
