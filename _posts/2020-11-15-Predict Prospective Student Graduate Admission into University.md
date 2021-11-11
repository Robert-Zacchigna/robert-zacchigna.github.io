---
layout: post
title: Predict Prospective Student Graduate Admission into University
tags: Jupyter Notebook, Pandas, Profiling, Python, College/University, Models, PCA, Hyperparameter
category: Machine Learning, ML, Regression
summary: Attempts to predict the chance of a prospective student being admitted into a university's graduate program.
---

# Overview

There are a lot of universities that offer the same graduate program but it can be difficult for prospective students to 
determine which university program they would most likely be admitted into. A prospective student being able to determine 
which university they would most likely be admitted into (given their scores) would save them both time from filling and 
sending out applications and money, since there is usually a cost/fee associated with putting in an application to the 
university itself. 

This project compares the performance of different types regression models 
([Linear Regression](https://machinelearningmastery.com/linear-regression-for-machine-learning/){:target="_blank"}, 
[Random Forest](https://en.wikipedia.org/wiki/Random_forest){:target="_blank"}, 
[K-Nearest Neighbor](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm){:target="_blank"} -KNN- and 
[Decision Tree](https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052){:target="_blank"})
with and without using feature reduction methods ([PCA](https://towardsdatascience.com/a-one-stop-shop-for-principal-component-analysis-5582fb7e0a9c){:target="_blank"}) 
to see if it helps improve model training and/or performance results.

The notebook explores several different types of regression models (see above), along with exploring different feature reduction methods 
([Principal Component Analysis](https://towardsdatascience.com/a-one-stop-shop-for-principal-component-analysis-5582fb7e0a9c){:target="_blank"} 
-PCA- and [SelectKBest](https://www.datatechnotes.com/2021/02/seleckbest-feature-selection-example-in-python.html){:target="_blank"}) 
to see if they can improve modeling time and/or results.

{% assign part = "" %}
{% assign notebook_page = "Predict Prospective Student Graduate Admission into University.html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Predict%20Prospective%20Student%20Graduate%20Admission%20into%20University" %}

{% include view-notebook.html html=content %}


# Methodology

Each model type (Linear Regression, Random Forest, K-Nearest Neighbor, and Decision Tree) will be trained and have their
[hyperparameters](https://en.wikipedia.org/wiki/Hyperparameter_(machine_learning)){:target="_blank"} fine-tuned with and 
without using PCA feature reduction. The idea being to see if the feature reduction will actually help improve the model 
performance over a model without feature reduction, along with trying to predict the chances of a prospective graduate 
student being admitted into a university graduate program.

[Pandas Profiling](https://github.com/pandas-profiling/pandas-profiling){:target="_blank"} was also used to profile the 
dataset to get an overview of what it looks like and adjust any of my planned analysis if necessary.


## Variable Histograms

Histograms of the numerical variables to see their overall distributions in the dataset:

<img style="margin: 0;" src="{{ "/assets/images/Predict Prospective Student Graduate Admission into University/Variable Histograms.png" | prepend: site.baseurl }}" title="Variable Histograms">


## Correlation Matrix

Using a correlation matrix, we see which variables have a strong correlation towards the target variable, `Chance of Admit`, 
and other variables in the dataset. From the matrix below, we can see that there are some strong correlations between 
several variables: `Chance of Admit and CGPA`, `CGPA and GRE Score`, `TOEFL Score and GRE Score`, `TOEFL and Chance of Admit`.

<img style="margin: 0;" src="{{ "/assets/images/Predict Prospective Student Graduate Admission into University/Correlation Matrix.png" | prepend: site.baseurl }}" title="Correlation Matrix">


## Parallel Coordinates

From the [Parallel Coordinate](https://en.wikipedia.org/wiki/Parallel_coordinates "Common way of visualizing and analyzing high-dimensional datasets"){:target="_blank"} graph below, we can 
see that (overall) prospective students that had research experience had higher scores in each variable category (including 
admission chance) than those that did not have any research experience.

Thus, judging from the graph above, it is evident that students that have research experience are generally perceived to 
be better performers academically and have higher chances of being admitted into their graduate program.

<img style="margin: 0;" src="{{ "/assets/images/Predict Prospective Student Graduate Admission into University/Parallel Coordinates - Research Experience.png" | prepend: site.baseurl }}" title="Parallel Coordinates - Research Experience">


## Feature Reduction

I took a look at two different feature reduction methods: [Principal Component Analysis](https://towardsdatascience.com/a-one-stop-shop-for-principal-component-analysis-5582fb7e0a9c){:target="_blank"}
(PCA) and [SelectKBest](https://www.datatechnotes.com/2021/02/seleckbest-feature-selection-example-in-python.html){:target="_blank"}. 
I ended up deciding to use PCA for the comparison of the models without feature reduction, there is no real reasoning for 
this choice other than it's just the feature reduction method I wanted to explore.

My prediction at this point in the project was that because my dataset is so small, with already few variables, that there
is not a large enough benefit to warrant the utilization of feature reduction techniques, let alone PCA. We shall if I was
right in my final [results](#results).


### Principal Component Analysis (PCA)

Looking at the graph below, we can see that the first 5-6 components explains roughly `95-98%` of the dataset, thus I
decided to use `5 components` for the number of component reductions for PCA.

<img style="margin: 0;" src="{{ "/assets/images/Predict Prospective Student Graduate Admission into University/PCA - Explained Variance.png" | prepend: site.baseurl }}" title="PCA - Explained Variance">


### SelectKBest

SelectKBest was the other reduction technique I looked at but decided to use PCA instead. Again, there was no real reason
for this other than I just wanted to explore using PCA instead.

<img style="margin: 0;" src="{{ "/assets/images/Predict Prospective Student Graduate Admission into University/SelectKBest Scores.png" | prepend: site.baseurl }}" title="SelectKBest Scores">


## Tuning Model Hyperparameters

The python library [sklearn](https://scikit-learn.org/stable/index.html){:target="_blank"} has a function that allows you 
to run your models with a multitude of different parameters to find the best ones for your model. The function in question 
is [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html){:target="_blank"},
it makes fine-tuning models and getting the best possible hyperparameters *soooo* much easier.


### GridSearchCV Example

Below is an excerpt from the linked [notebook](#view-jupyter-notebook) for this project on what GridSearchCV looks like 
in practice, in this case using Random Forest.

Model **without** feature reduction:

<img style="margin: 0;" src="{{ "/assets/images/Predict Prospective Student Graduate Admission into University/GridSearchCV Model Tuning Example - Random Forest.png" | prepend: site.baseurl }}" title="GridSearchCV Model Tuning Example - Random Forest">

The only change from the example above is the first cell, the pipeline has another line for implementing the PCA feature reduction:

* `('pca', PCA(n_components=5)),`

<img style="margin: 0;" src="{{ "/assets/images/Predict Prospective Student Graduate Admission into University/PCA Pipeline Example - Random Forest.png" | prepend: site.baseurl }}" title="PCA Pipeline Example - Random Forest">


# Results - Random Forest

In the end it turned out that the best model was `Random Forest` **without** PCA feature reduction, it had an 
[Adjusted R^2 Score](https://www.statisticshowto.com/probability-and-statistics/statistics-definitions/adjusted-r2/){:target="_blank"} 
of `0.7801` and its PCA counterpart had a score of `0.7385`.

<img style="margin: 0;" src="{{ "/assets/images/Predict Prospective Student Graduate Admission into University/Adj R^2 Score Model Comparison.png" | prepend: site.baseurl }}" title="Adj R^2 Score Model Comparison.png">


## Best Parameters

The best parameters for the `random forest` model was the following:

<div class="language-text highlighter-rouge" style="max-width: 424px !important;">
<pre class="highlight">
Best Random Forest Regression Parameters
========================================
               max_depth: 6
            max_features: log2
        min_samples_leaf: 1
       min_samples_split: 5
            n_estimators: 1000
</pre>
</div>

The table above shows that in all model types, except one, PCA feature reduction did not improve the performance of the 
model. The only exception being decision tree regression, which did improve slightly (`~0.0074`) over the decision 
tree model without PCA reduction. All the models (except decision tree) had a notable decrease in performance with PCA 
reductions, with a performance drop ranging between `~0.0125` and `~0.042` across the three other models.

Thus, it appears that my [prediction](#feature-reduction) from before was correct, PCA feature reduction did not really provide any meaningful 
improvements to the performance results of the models.
