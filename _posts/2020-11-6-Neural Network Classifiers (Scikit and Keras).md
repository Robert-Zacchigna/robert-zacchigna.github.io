---
layout: post
title: Neural Network Classifiers (Scikit and Keras)
tags: Jupyter Notebook, Python, Pandas, Images, Tensorflow, Keras, Scikit
category: Machine Learning, ML, Classification, Neural Network
summary: Creating several neural network classification models, using Scikit and Keras, to categorize text comments and identify images.
---

# Overview

This analysis goes through creating three different neural networks using two different python libraries: 
[Scikit](https://scikit-learn.org/stable/){:target="_blank"} and [Keras](https://keras.io/){:target="_blank"}. Two of those
neural networks are for categorizing reddit comments and the third will be a Keras model for identifying 
[MNIST](https://en.wikipedia.org/wiki/MNIST_database){:target="_blank"} images.

<ins>This analysis has two parts:</ins>
* [Part 1 - Neural Network Classifiers with Scikit and Keras](#part-1---neural-network-classifiers-with-scikit-and-keras)
  * [Scikit - Building and Tuning the Model](#scikit---building-and-tuning-the-model)
  * [Keras - Building and Tuning the Model](#keras---building-and-tuning-the-model)
* [Part 2 - Classifying MNIST Images](#part-2---classifying-mnist-images)

The notebook takes a look at different [neural network](https://en.wikipedia.org/wiki/Neural_network){:target="_blank"}
classifiers ([Scikit](https://scikit-learn.org/stable/){:target="_blank"} and [Keras](https://keras.io/){:target="_blank"})
and how they can be utilized in an analysis pipeline. The analysis is done with a categorized text based dataset 
([reddit](https://reddit.com/){:target="_blank"} comments) and a fairly popular image dataset, [MNIST](https://en.wikipedia.org/wiki/MNIST_database){:target="_blank"}.

{% assign part = "" %}
{% assign notebook_page = "Neural Network Classifiers (Scikit and Keras).html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Neural%20Network%20Classifiers%20(Scikit%20and%20Keras)" %}

{% include view-notebook.html html=content %}


# Part 1 - Neural Network Classifiers with Scikit and Keras

This first part involves cleaning the text in the dataset and then building the Scikit and Keras models to identify the
comments categories.

This is a brief look at what the text/data looks like (where "cat" is Category and "txt" is the comment):

<img style="margin: 0;" src="/assets/images/Neural Network Classifiers (Scikit and Keras)/Text Dataframe Head.png" title="Text Dataframe Head">


## Text Cleaning

Before we start model training, we need to parse and clean the text in the dataset, which means: 

* Lower text case
* Remove all punctuation (!, ?, ", ., ', [, ], /, etc...)
* Remove [stopwords](https://en.wikipedia.org/wiki/Stop_word){:target="_blank"}
* Remove [stem words](https://searchenterpriseai.techtarget.com/definition/stemming){:target="_blank"}

This is more or less the starting basis for any **N**atural **L**anguage **P**rocessing ([NLP](https://machinelearningmastery.com/natural-language-processing/){:target="_blank"}).


## Scikit - Building and Tuning the Model

Once the text has been processed, we can split the data into train and tests sets (which is made very easy by using sklern's
[train_test_split](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html){:target="_blank"} function).

Next we can setup the pipeline for vectorizing the text, creating our classifier (in this case the
[MLPClassifier](https://scikit-learn.org/stable/modules/generated/sklearn.neural_network.MLPClassifier.html){:target="_blank"}) 
and tune the model using [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html){:target="_blank"}.


### GridSearchCV Pipeline

Below is what the full pipeline looks like:

<img style="margin: 0;" src="/assets/images/Neural Network Classifiers (Scikit and Keras)/Scikit Pipeline.png" title="Scikit Pipeline">


### Best Parameters

Here are what the best parameters ended up being for the model:

<style>
    .language-text {
        max-width: 434px !important;
    }
</style>

```text
Best Classification Parameters
==============================
      activation: logistic
	   alpha: 0.0001
   learning_rate: constant
	  solver: adam
```


### Classification Metric Scores

The classification metric scores of the model after predicting on the test set:

```text
Model Classification Metric Scores
==================================
	 Accuracy: 75.00%
	Precision: 69.47%
	   Recall: 75.00%
	       F1: 70.75%
```

Ended up with an accuracy score of `75%`, which isn't too bad. With some finer tuning and longer training, it could improve
greatly.


## Scikit - Confusion Matrix

We can see that model mostly identifies comments as belonging to the "Video Games" category and interestingly enough, 
nothing to the "Science and Technology" Category. The "Video Games" category is the most prevlant in the dataset and I 
can see how comments related to sports could be misconstrued as talk about video games, at least from the point-of-view
of a machine anyways...

<img style="margin: 0;" src="/assets/images/Neural Network Classifiers (Scikit and Keras)/Scikit - Confusion Matrix.png" title="Scikit - Confusion Matrix">

<hr style="z-index: -1; border: none; border-top: 1px solid gray;">

## Keras - Building and Tuning the Model

We build the model much the same as the Scikit model but instead we build a portion of the Keras model and then feed it 
to the [KerasClassifier](https://www.tensorflow.org/versions/r1.15/api_docs/python/tf/keras/wrappers/scikit_learn/KerasClassifier){:target="_blank"}
to be used in [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html){:target="_blank"}
for model tuning. See text sample [here](#part-1---neural-network-classifiers-with-scikit-and-keras).


### GridSearchCV Pipline

Below is what the full pipeline looks like:

<img style="margin: 0;" src="/assets/images/Neural Network Classifiers (Scikit and Keras)/Keras Pipeline.png" title="Keras Pipeline">

The best params for the model ended up being: `batch size of 10`, and running for `25 epochs`.


### Classification Metric Scores

The classification metric scores of the model after predicting on the test set:

```text
Model Keras Metric Scores
=========================
     Accuracy: 66.44%
    Precision: 58.97%
       Recall: 66.44%
       F1: 61.92%
```

Ended up with an accuracy score of `~66%`, which quite a bit worse than the Scikit model (`~9%` [drop](#classification-metric-scores)). 
Finer tuning and longer training will definitely need to be done in order to improve this model.


## Keras - Confusion Matrix

We can see, just like in the Scikit model, the Keras model mostly identified comments as belonging to the "Video Games" 
category but this time there were a few comments that were mistaken for the "Science and Technology" category. 
It's pretty much the same story of the sports comments being misconstrued for video game comments.

<img style="margin: 0;" src="/assets/images/Neural Network Classifiers (Scikit and Keras)/Keras - Confusion Matrix.png" title="Keras - Confusion Matrix">


# Part 2 - Classifying MNIST Images

We are now switching to the [MNIST](https://en.wikipedia.org/wiki/MNIST_database){:target="_blank"} image dataset to try 
and classify some handwritten numbers. Like before, we will need to split the dataset into train and test sets.

This is a sample of what the images look like:

<img style="margin: 0;" src="/assets/images/Neural Network Classifiers (Scikit and Keras)/Mnist Examples.png" title="Mnist Examples">


## Keras Model Summary

The built keras model has the following layers and parameters:

<img style="margin: 0;" src="/assets/images/Neural Network Classifiers (Scikit and Keras)/Keras (MNIST) - Model Summary.png" title="Keras (MNIST) - Model Summary">


## Model Accuracy and Loss Scores

The model was trained for only 2 epochs, which took about 1min to complete, below are the scores:

```text
  Keras Image Classification Accuracies
=========================================
Epoch 1: Accuracy = 81.83%, Loss = 58.62%
Epoch 2: Accuracy = 94.24%, Loss = 19.77%
```

The model ended with an accuracy score of `~94%`, which is excellent considering it only ran for 2 epochs. This is a very
popular dataset to use for image classification and its usually used as a tutorial for people just starting out with 
machine learning and neural networks. I hope this was helpful to you.