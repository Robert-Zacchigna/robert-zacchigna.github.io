---
layout: post
title: Analysis of World Happiness Reports (2015-2019)
tags: Jupyter Notebook, Python, Pandas, Happiness Rank, Maps, Graphs
category: Data Analysis, Geographic Plotting
summary: Analysis of World Happiness Reports from 2015-2019 to see what trends there might be from countries all over the world.
git_prepend: https://github.com/Robert-Zacchigna/Portfolio/tree/main/
specific_git_link: 
has_notebook: yes
notebooks: Analysis of World Happiness Reports (2015-2019).html
---

# Overview

The purpose of this project was to collect and analyze the data collected in the [World Happiness Reports](https://worldhappiness.report/){:target="_blank"} 
from 2015-2019 to get a deeper understanding of what the reports are collecting and what the data actually means. This project 
also explores the criticisms of the measured metrics of the reports to see if they hold true or not, specifically that a 
country's GDP has a skewed impact on the overall happiness score. Meaning, countries with a higher GDP, like most western countries, 
will inherently have much higher happiness scores than those countries that are not as developed.

<ins>The metrics looked at in the consolidated reports are:</ins>
* GDP
* Family
* Life Expectancy
* Freedom
* Generosity
* Government Trustworthiness
* Overall Happiness Score

The notebook below goes through the process of parsing and merging of all the different reports together into a single 
dataset for easier usage and analysis, analyzing the metrics and graphing the data points on interactive map plots to help 
bring the data into a more holistic world view.

{% assign part = "" %}
{% assign notebook_page = "Analysis of World Happiness Reports (2015-2019).html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Analysis%20of%20World%20Happiness%20Reports%20(2015-2019)" %}

{% include view-notebook.html html=content %}


# Findings

Main points of the analysis of the reports, correlations/relationships of the metrics in the reports and some graphs that were created to help visualize the data.

## Correlation Matrix of Happiness Score Metrics

We can see from the below correlation matrix that `GDP`, `Family`, and `Life Expectancy` are strongly correlated with the `Happiness_Score`. 
`Freedom` also correlates very well with the Happiness score, but it's also correlated quite well with all data columns (except `Rank`) 
and `Gov_Trustworthiness` has a moderate correlation with Happiness score.

<img style="margin: 0;" src="{{ "/assets/images/Analysis of World Happiness Reports (2015-2019)/Annotated Correlation Matrix of Combined Dataset.png" | prepend: site.baseurl }}" title="Correlation Matrix">

Since its clear from the above that GDP, Family, and Life_Expectancy are the main drivers for a country's happiness score,
it will be the main focus of the report analysis.

## Birds Eye of View of Column Distributions and Correlations

Below is a pairwise comparison of our variables to give us a birds eye view of the distributions and correlations of the dataset. 
The color is based on quartiles of the Happiness_Score so `(0%-25%, 25%-50%, 50%-75%, 75%-100%)`.

In the scatterplots, we see that `GDP`, `Family`, and `Life_Expectancy` are quite linearly correlated with some noise. 
It is to see interesting that the correlation of `Gov_Trustworthiness` has distributions all over the place, with no straightforward pattern evident.

> **Note:** right-click the graph and select "Open Image in New Tab" to zoom in to get a better view.

<div style="max-width: 900px;">
    <img style="margin: 0;" src="{{ "/assets/images/Analysis of World Happiness Reports (2015-2019)/Birds Eye of View of Column Distributions and Correlations.png" | prepend: site.baseurl }}" title="Birds Eye of View of Column Distributions and Correlations">
</div>


## Top Rankings

It hs become no secret that the countries of Northern Europe (Denmark, Finland, Iceland, Norway and Sweden) are among the 
most developed and happiest countries in the world. As a result, they have consistently topped the world happiness report's 
rankings, with Finland, Denmark and Norway trading places in the top 3 spots from 2015-2019.

It should also be noted that much of the countries that ranked in the top quarter of the report are mostly North American 
and European countries.


## Bottom Rankings

Given the countries that are consistently in the top of the rankings in the report, it should be no surprise that those 
countries that are not nearly as developed would be in the bottom rankings. As a result, the bottom rankings almost exclusively
contains African and lesser developed Asian countries.

It becomes very evident from just looking at the rankings that there is an inherent bias towards countries that are more 
developed and have higher GDPs.


## Maps

Below are some map plots of the metrics in the report. There are interactive maps in the linked [notebook](#view-jupyter-notebook) 
that provides more information about each country and is more intuitive to the report timelines.

### Happiness Score vs. GDP

<img style="margin: 0;" src="{{ "/assets/images/Analysis of World Happiness Reports (2015-2019)/World Maps/World - Happiness Score vs. GDP.png" | prepend: site.baseurl }}" title="World - Happiness Score vs. GDP">

<img style="margin: 0;" src="{{ "/assets/images/Analysis of World Happiness Reports (2015-2019)/Europe Maps/Europe - Happiness Score vs. GDP.png" | prepend: site.baseurl }}" title="Europe - Happiness Score vs. GDP">


### Happiness Score vs. Family

<img style="margin: 0;" src="{{ "/assets/images/Analysis of World Happiness Reports (2015-2019)/World Maps/World - Happiness Score vs. Family.png" | prepend: site.baseurl }}" title="World - Happiness Score vs. Family">

<img style="margin: 0;" src="{{ "/assets/images/Analysis of World Happiness Reports (2015-2019)/Europe Maps/Europe - Happiness Score vs. Family.png" | prepend: site.baseurl }}" title="Europe - Happiness Score vs. Family">


### Happiness Score vs. Life_Expectancy

<img style="margin: 0;" src="{{ "/assets/images/Analysis of World Happiness Reports (2015-2019)/World Maps/World - Happiness Score vs. Life Expectancy.png" | prepend: site.baseurl }}" title="World - Happiness Score vs. Life Expectancy">

<img style="margin: 0;" src="{{ "/assets/images/Analysis of World Happiness Reports (2015-2019)/Europe Maps/Europe - Happiness Score vs. Life Expectancy.png" | prepend: site.baseurl }}" title="Europe - Happiness Score vs. Life Expectancy">


## Overall

From the analysis, it seems like some of the criticism for "The World Happiness Report" ring true, there is a high focus 
on a country's `GDP` along with strongly correlated features such as `Family` and `Life_Expectancy`.

It does make sense to an extent that not only having money but also having a good social net (`Family`) is important and 
does make it easier for people to advance in life in whatever direction they so choose. This also translates quite well 
to `Life_Expectancy` because of a greater ability to provide for yourself (and your Family), thus having access to better options in general.

*Suffice to say, money can indeed buy happiness.*