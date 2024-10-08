---
layout: post
title: Predicting Video Game Sales
tags: Jupyter Notebook, Python, Pandas, Profiling, Plotly, Models, Video Games
category: Machine Learning, ML, Regression
summary: This examines video game sales by region, with information about the type of video game being sold, in order to 
         create a model to predict the expected sales performance.
git_prepend: https://github.com/Robert-Zacchigna/Portfolio/tree/main/
specific_git_link: 
has_notebook: yes
notebooks: Predicting Video Game Sales.html
project_download_size: 5.26 MB
---

# Overview

The video game market has only continued to grow over the years and is now spanning all genres. With this growing 
market the various gaming publishers will want to capitalize on the interests of the various gamers within it and picking 
the right kind of game to develop and put out into the market could make or break a gaming publisher/studio.

This project compares the performance of several different regression models 
([Linear Regression](https://machinelearningmastery.com/linear-regression-for-machine-learning/){:target="_blank"}, 
[Random Forest](https://en.wikipedia.org/wiki/Random_forest){:target="_blank"}, 
[K-Nearest Neighbor (KNN)](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm){:target="_blank"} and 
[Decision Tree](https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052){:target="_blank"}) 
in order to analyze which model performs the best for predicting sales performance over time. For model scoring, 
the [Adjusted R^2](https://www.statisticshowto.com/probability-and-statistics/statistics-definitions/adjusted-r2/){:target="_blank"} metric will be used to see which model performed the best with the data.

This notebook explores several different types of regression models (see above), in order to find the best model possible 
that can predict the expected sales performance of a video game.

{% assign part = "" %}
{% assign notebook_page = "Predicting Video Game Sales.html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Predicting%20Video%20Game%20Sales" %}

{% include view-notebook.html html=content %}

{% include view-notebook-buttons.html html=content %}


# Methodology

Each regression model type (Linear Regression, Random Forest, K-Nearest Neighbor, and Decision Tree) will be trained and have their
[hyperparameters](https://en.wikipedia.org/wiki/Hyperparameter_(machine_learning)){:target="_blank"} fine-tuned using 
[GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html){:target="_blank"}.
Due to the nature of the modeling type, regression, there are a few variables that need to be 
[OneHotEncoded](https://hackernoon.com/what-is-one-hot-encoding-why-and-when-do-you-have-to-use-it-e3c6186d008f){:target="_blank"}
in order to be used in the modeling process. After modeling training, their performance will be compared to each using the
`Adjusted R^2` metric to see which of the models is the best for making video game predictions.


## Exploratory Data Analysis (EDA)

The following are several graphs were created to get a better idea of the overall structure and distribution of the data
in the dataset. This helps to see anything that might need to be accounted for or changed before starting analysis and modeling. 

Here is a sample of what the data looks like:

<img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/Video Game Sales Data Sample.png" | prepend: site.baseurl }}" title="Video Game Sales Data Sample">


### Variable Histograms

Histograms of the numerical variables to see their overall distributions in the dataset:

<div style="max-width: 870px;">
    <img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/Numerical Column Histograms.png" | prepend: site.baseurl }}" title="Numerical Column Histograms">
</div>

<p></p>

We can see that the `rank` graph is not useful, it appears to be a column index carryover from when the data was collected. 
The `year` graph shows a normal distribution of collected data and the remaining `sales` graphs all look the same with minor 
count differences. 


### Proportion of Global Video Game Sales by Genre

The pie chart shows us that `action` and `sports` video games are the most popular genres by far:

<img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/Proportion of Global Video Game Sales by Genre.png" | prepend: site.baseurl }}" title="Proportion of Global Video Game Sales by Genre">


### Top 25 Video Game Sales by Platform and Region

The stacked barchart below makes it clear that there is quite a large gap between the first six platforms and the rest of 
them, with an even larger gap between the first one ([PS2 - Playstaion 2](https://en.wikipedia.org/wiki/PlayStation_2){:target="_blank"}) 
and the second one ([X360 - Xbox 360](https://en.wikipedia.org/wiki/Xbox_360){:target="_blank"}). It is 
also worthy to note that of those top six gaming platforms, three of them were created by 
[Sony](https://en.wikipedia.org/wiki/Sony){:target="_blank"}: `PS2`, `PS3`, and `PS`.

<img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/Top 25 Video Game Sales by Platform and Region.png" | prepend: site.baseurl }}" title="Top 25 Video Game Sales by Platform and Region">


### Top 10 Video Game Publishers by Global Sales Per Year

The sales chart below shows that by far [Nintendo](https://en.wikipedia.org/wiki/Nintendo){:target="_blank"} has continued
to be an industry leader (with [Electronic Arts](https://en.wikipedia.org/wiki/Electronic_Arts){:target="_blank"} being a 
modest second) in gaming throughout the years all the way back to the initial gaming boom in the 1980s. It is interesting 
to see that while [Sony](https://en.wikipedia.org/wiki/Sony){:target="_blank"} seems to dominate the console gaming platforms, 
their share of game sales is far lower than you would be led to believe.

<img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/Top 10 Video Game Publishers by Global Sales Per Year.png" | prepend: site.baseurl }}" title="Top 10 Video Game Publishers by Global Sales Per Year">


### Correlation Matrices

The correlation matrix below shows that both the `Rank` and `Year` columns have no significant relationship with any of the 
`sales` columns and thus they can be safely dropped from the dataset.

<img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/Annotated Correlation Matrix of Sales Columns.png" | prepend: site.baseurl }}" title="Annotated Correlation Matrix of Sales Columns.png">

Due to the number of categorical values in each of the categorical columns (`Genre`, `Platform` and `Publisher`) and the
massive increase in modeling time that be caused by [OneHotEncoded](https://hackernoon.com/what-is-one-hot-encoding-why-and-when-do-you-have-to-use-it-e3c6186d008f){:target="_blank"}
all of them, the only column that could be encoded and utilized in the data is the `Genre` column. This is mainly due to 
the fact that there were not that many different genres in the dataset (12 genres, compared to 587 different publishers and 30 different platforms). 

Thus, below is what the final dataset looks like (via correlation matrix), the following columns were dropped in the 
process: `Rank`, `Name`, `Year`, `Publisher`, and `Platform`.

<img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/Final Annotated Correlation Matrix with OneHotEncoded Genre Columns.png" | prepend: site.baseurl }}" title="Final Correlation Matrix with OneHotEncoded Genre Columns">

> **NOTE:** While all of the genre's have very low correlations with the sales regions, the `Role-Playing` genre has a 
> noticeably higher correlation with `JP (Japan) Sales` (0.18) than other genre's and regions.


## Tuning Model Hyperparameters

The python library [sklearn](https://scikit-learn.org/stable/index.html){:target="_blank"} has a function that allows you 
to run your models with a multitude of different parameters to find the best ones for your model. The function in question 
is [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html){:target="_blank"},
it makes fine-tuning models and getting the best possible hyperparameters *soooo* much easier.


### GridSearchCV Example

Below is an excerpt from the linked [notebook](#view-jupyter-notebook) for this project on what GridSearchCV looks like 
in practice, in this case using Linear Regression (not many parameters to tune).

<img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/GridSearchCV Example - Linear Regression.png" | prepend: site.baseurl }}" title="GridSearchCV Example - Linear Regression">


# Results - Linear Regression

After training all the models, `Linear Regression` is the model that came out on top with an 
[Adjusted R^2](https://www.statisticshowto.com/probability-and-statistics/statistics-definitions/adjusted-r2/){:target="_blank"}
score of `~0.9999`. However, all of the models performed very well and they ended up with scores that were `0.95+`:

<img style="margin: 0;" src="{{ "/assets/images/Predicting Video Game Sales/Model Adj R^2 Scores.png" | prepend: site.baseurl }}" title="Model Adj R^2 Scores">

With the following parameters:

<div class="language-text highlighter-rouge" style="max-width: 357px !important;">
<pre class="highlight">
Best Linear Regression Parameters
=================================
      fit_intercept: True
          normalize: True
</pre>
</div>

# Conclusion

Based on the analysis and experimentation, I am confident that the selected final model is the best performing model for 
utilization in making predictions on future video game sales. I would say that the model could be improved by also utilizing 
the other columns that needed to be encoded (platform and publisher) but due to the limitations of my current hardware, 
modeling would simply take too long than would be feasible.

I would also recommend that using some kind of feature reduction method 
([PCA](https://towardsdatascience.com/a-one-stop-shop-for-principal-component-analysis-5582fb7e0a9c){:target="_blank"}, 
[SelectKBest](https://www.datatechnotes.com/2021/02/seleckbest-feature-selection-example-in-python.html){:target="_blank"}, 
etc..) could also help in reducing the number of features and the length of modeling time at the cost of a small loss in scoring.
