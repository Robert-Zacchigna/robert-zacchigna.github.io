---
layout: post
title: Predicting Credit Card Customer Attrition (Churn)
tags: Jupyter Notebook, Pandas, Python, Models, Plotly, PCA, SMOTE
category: Machine Learning, ML, Classification
summary: Explores a customer churn dataset that aims to create a model that could be used to predict when customers might drop a banks credit card (churn).
git_prepend: https://github.com/Robert-Zacchigna/Portfolio/tree/main/
specific_git_link: 
has_notebook: yes
notebooks: Predicting Credit Card Customer Attrition (Churn).html
---

# Overview

Customer churning (or customer attrition rate) is a problem for any business in the service industry, you only make money 
by keeping customers interested in your product. In the financial service industry this usually takes the form of credit 
cards and so the more people that use their credit card service, the more money they will make.

This project compares the performance of several different classification models 
([Logistic Regression](https://towardsdatascience.com/logistic-regression-detailed-overview-46c4da4303bc){:target="_blank"},
[Random Forest](https://en.wikipedia.org/wiki/Random_forest){:target="_blank"},
[Decision Tree](https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052){:target="_blank"}, and
[XGBoost](https://machinelearningmastery.com/gentle-introduction-xgboost-applied-machine-learning/){:target="_blank"}) 
using [Principal Component Analysis](https://towardsdatascience.com/a-one-stop-shop-for-principal-component-analysis-5582fb7e0a9c){:target="_blank"} 
(PCA) feature reduction and [SMOTE](https://machinelearningmastery.com/smote-oversampling-for-imbalanced-classification/){:target="_blank"} 
up-sampling (**S**ynthetic **M**inority **O**versampling **T**echnique, for balancing the dataset) in order to create the 
best model possible for predicting which customers are going to drop the banks credit card and leave for a competitor. 
For model scoring, the [Recall](https://en.wikipedia.org/wiki/Precision_and_recall){:target="_blank"} metric will be used 
to see which model performed the best with the data.

This notebook explores several different types of classification models (see above) along with utilizing 
[PCA](https://towardsdatascience.com/a-one-stop-shop-for-principal-component-analysis-5582fb7e0a9c){:target="_blank"} feature 
reduction and [SMOTE](https://machinelearningmastery.com/smote-oversampling-for-imbalanced-classification/){:target="_blank"}
(to balance the dataset) to create the best model possible for predicting if a customer will drop a banks credit card (churn).

{% assign part = "" %}
{% assign notebook_page = "Predicting Credit Card Customer Attrition (Churn).html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Predicting%20Credit%20Card%20Customer%20Attrition%20(Churn)" %}

{% include view-notebook.html html=content %}


# Methodology

Each classification model type (Logistic Regression, Random Forest, XGBoost, and Decision Tree) will be trained and have their
[hyperparameters](https://en.wikipedia.org/wiki/Hyperparameter_(machine_learning)){:target="_blank"} fine-tuned with PCA 
feature reduction. Due to the nature of the modeling type, classification, there will be a lot of variables that need to 
be [OneHotEncoded](https://hackernoon.com/what-is-one-hot-encoding-why-and-when-do-you-have-to-use-it-e3c6186d008f){:target="_blank"}
in order to be used in the modeling process. [SMOTE](https://machinelearningmastery.com/smote-oversampling-for-imbalanced-classification/){:target="_blank"} 
up-sampling will also need to be done in order to balance the dataset so that it doesn't cause the models to have a
bias toward any particular person in the dataset.


## Exploratory Data Analysis (EDA)

The following are several graphs were created to get a better idea of the overall structure and distribution of the data
in the dataset. This helps to see anything that might need to be accounted for or changed before starting analysis and modeling. 


### Variable Histograms

Histograms of the numerical variables to see their overall distributions in the dataset:

<div style="max-width: 800px;">
    <img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Variable Histograms.png" title="Variable Histograms">
</div>


### Data Proportions

<div>
    <div style="display: inline-block;">
        <img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Proportion of Customer Genders.png" title="Proportion of Customer Genders">
    </div>
    <div style="display: inline-block;">
        <img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Proportion of Attrited vs Existing Customers.png" title="Proportion of Attrited vs Existing Customers">
    </div>
</div>

We can see that while the gender of the dataset is relatively balanced, the majority of the customer data we have is of 
existing customers. Thus, this is where [SMOTE](https://machinelearningmastery.com/smote-oversampling-for-imbalanced-classification/){:target="_blank"}  
comes in to help balance the data by up-sampling the attrited samples to match them with the regular customer sample size. 
This should balance out the skewed data and also help improve the performance of the models.

<div>
    <div style="display: inline-block;">
        <img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Proportion of Different Income Levels.png" title="Proportion of Different Income Levels">
    </div>
    <div style="display: inline-block;">
        <img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Proportion of Education Levels.png" title="Proportion of Education Levels">
    </div>
</div>

The majority of customers are making 60k or less and have either completed high school or have a graduate degree.


## SMOTE Up-sampling and Feature Reduction (PCA)

SMOTE up-sampling just involves using the SMOTE function from the [imblearn](https://imbalanced-learn.org/stable/install.html){:target="_blank"}
library on the relevant column in the data, in this case the `Attrition_Flag` column.

Once up-sampling is completed we can take a look at [PCA](https://towardsdatascience.com/a-one-stop-shop-for-principal-component-analysis-5582fb7e0a9c){:target="_blank"}
for reducing the number of the features in the dataset, see below:

<img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Explained Variance Ratio Using 17 Components.png" title="Explained Variance Ratio Using 17 Components">

The graph above shows the explained variance of each PCA component, along with the cumulative sum of the components above. 
Looking at the values above, using `8` of the `17` PCA components could be a good idea because it reduces the total number of encoded 
features by over half, while still explaining roughly `80%` of the encoded data. With up-sampling and feature reduction
completed, we can move on to splitting the dataset into train/test sets, creating and training the models.


## Tuning Model Hyperparameters

The python library [sklearn](https://scikit-learn.org/stable/index.html){:target="_blank"} has a function that allows you 
to run your models with a multitude of different parameters to find the best ones for your model. The function in question 
is [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html){:target="_blank"},
it makes fine-tuning models and getting the best possible hyperparameters *soooo* much easier.


### GridSearchCV Example

Below is an excerpt from the linked [notebook](#view-jupyter-notebook) for this project on what GridSearchCV looks like 
in practice, in this case using Logistic Regression.

<img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Logistic Regression - GridSearchCV Example.png" title="Logistic Regression - GridSearchCV Example">


# Results - XGBoost

After training all the models, `XGBoost` classifier is the model that came out on top with a recall score of `~0.98`:

<img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Model Recall Scores.png" title="Model Recall Scores">


## Best Parameters

The best parameters for the `XGBoost` model was the following:

<div class="language-text highlighter-rouge" style="max-width: 380px !important;">
<pre class="highlight">
Best XG Boost Classifier Parameters
===================================
              booster: gbtree
     colsample_bytree: 0.8
          eval_metric: logloss
      importance_type: weight
        learning_rate: 0.2
            max_depth: 6
           reg_lambda: 0.2
            subsample: 0.8
    use_label_encoder: False
</pre>
</div>


## Confusion Matrix

After the best model was selected, the model was used to predict on the un-sampled dataset (no up-sampling)
to see how it would perform and the model ended up performing very well, see the matrix below:

<img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/XGBoost Classifier Confusion Matrix (Original Data).png" title="XGBoost Classifier Confusion Matrix (Original Data)">


## Precision-Recall Curve

<img style="margin: 0;" src="/assets/images/Predicting Credit Card Customer Attrition (Churn)/Precision-Recall Curve.png" title="Precision-Recall Curve">


# Conclusion

From the above [Confusion Matrix](#confusion-matrix) and [Precision-Recall Curve](l#precision-recall-curve) graphs, 
it is evident that the XGBoost Classifier (with tuned hyperparameters) performed very well with the data and made some 
very good predictions using the test set and original dataset (without up-sampling). Due to all of the analysis and the 
final results, I am quite confident that this XGBoost Classifier model will perform very well for the bank for predicting 
customer attrition with their credit card.