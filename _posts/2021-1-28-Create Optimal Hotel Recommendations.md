---
layout: post
title: Create Optimal Hotel Recommendations
tags: Jupyter Notebook, Python, Pandas, Profiling, Hotel, Expedia, Models, PCA, Hyperparameter
category: Machine Learning, ML, Classification
summary: Analyzes Expedia customer information with the objective of creating a model to optimize user’s hotel recommendations.
git_prepend: https://github.com/Robert-Zacchigna/Portfolio/tree/main/
specific_git_link: 
has_notebook: yes
notebooks: Create Optimal Hotel Recommendations.html
---

# Overview

The dataset and problem were actually part of a [Kaggle competition](https://www.kaggle.com/c/expedia-hotel-recommendations/overview){:target="_blank"} 
set forth by [Expedia](https://www.expedia.com/){:target="_blank"} to improve their hotel recommendation algorithm. I did 
not take part in the competition as I didn't know about it at the time but it still seemed like an interesting  problem to 
tackle. My notebook goes about this problem by creating multiple different classification models, fine-tuning their
[hyperparameters](https://en.wikipedia.org/wiki/Hyperparameter_(machine_learning)){:target="_blank"} and comparing their 
results so see which one preformed the best with the data. 

This notebook explores several different classification models ([Random Forest](https://en.wikipedia.org/wiki/Random_forest){:target="_blank"} 
and [Decision Tree](https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052){:target="_blank"}) 
for selecting the best hotel recommendations for Expedia users.

{% assign part = "" %}
{% assign notebook_page = "Create Optimal Hotel Recommendations.html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Create%20Optimal%20Hotel%20Recommendations" %}

{% include view-notebook.html html=content %}


# Methodology

[Pandas Profiling](https://github.com/pandas-profiling/pandas-profiling){:target="_blank"} was used to profile the dataset 
to get an understanding of what I was working with and 
[PCA](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html){:target="_blank"}
(**P**rincipal **C**omponent **A**nalysis) feature reduction was needed to vastly reduce the number of columns so that I 
could complete the modeling in a reasonable amount of time.

## PCA - Explained Variance

The graph below shows that of the 149 total components, using only the first 10 will account for almost 81% of the destination 
column data. As a result, using the first 10 components to explain the destination column data would greatly reduce the 
amount of processing and modeling time.

<img style="margin: 0;" src="/assets/images/Create Optimal Hotel Recommendations/PCA - Explained Variance Ratio.png" title="PCA - Explained Variance Ratio">


## Tuning Model Hyperparameters

The python library [sklearn](https://scikit-learn.org/stable/index.html){:target="_blank"} has a function that allows you 
to run your models with a multitude of different parameters to find the best ones for your model. The function in question 
is [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html){:target="_blank"},
it makes fine-tuning models and getting the best possible hyperparameters *so* much easier.


### GridSearchCV Example

Below is an excerpt from the linked [notebook](#view-jupyter-notebook) for this project on what GridSearchCV looks like in practice.

<img style="margin: 0;" src="/assets/images/Create Optimal Hotel Recommendations/Example - RandomForest GridSearchCV.png" title="Example - RandomForest GridSearchCV">


# Results - Random Forest

The best model ended up being a `Random Forest` Classifier with an accuracy score of `~0.11`:

<img style="margin: 0;" src="/assets/images/Create Optimal Hotel Recommendations/Model Accuracy Scores.png" title="Model Accuracy Scores">

With the following parameters:

<div class="language-text highlighter-rouge" style="max-width: 424px !important;">
<pre class="highlight">
Best Random Forest Classifier Parameters
========================================
         class_weight: balanced
            criterion: entropy
            max_depth: 6
         max_features: sqrt
     min_samples_leaf: 3
    min_samples_split: 3
         n_estimators: 200
</pre>
</div>

After all of my analysis, my modeling results were unfortunately not very good, I ended up with a final accuracy score 
of `0.2666` after training on the entire dataset. The score would most likely improve with a larger sample size and a 
differently tuned model (and a stronger computer to train the model). I had originally decided to use 
[XGBoost](https://xgboost.readthedocs.io/en/latest/index.html){:target="_blank"}but the model training was taking far 
too long than what was feasible for me (even with the small sample size) and thus was forced to change to a different model.