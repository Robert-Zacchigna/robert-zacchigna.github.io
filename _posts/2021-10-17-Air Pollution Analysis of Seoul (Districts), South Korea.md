---
layout: post
title: Air Pollution Analysis of Seoul (Districts), South Korea
---

This project focused on collection and analysis air pollution data from the districts in Seoul, South Korea from multiple different data sources and merges them together.

The project has four parts:
* [Part 1 - Data Collection from CSV](#part-1---data-collection-from-csv)
* [Part 2 - Data Collection from Web-Scraping](#part-2---data-collection-from-web-scraping)
* [Part 3 - Data Collection from an API](#part-3---data-collection-from-an-api)
* [Part 4 - Merging, Querying and Graphing Data from sqliteDB](#part-4---merging-querying-and-graphing-data-from-sqlitedb)

# Part 1 - Data Collection from CSV

This part deals with parsing a CSV dataset (from [Kaggle](https://www.kaggle.com/bappekim/air-pollution-in-seoul){:target="_blank"}) containing air pollution data
from different districts in Seoul. 

The [AQI](https://en.wikipedia.org/wiki/Air_quality_index){:target="_blank"} (**A**ir **Q**uality **I**ndex) is also calculated 
and appended to the dataset based on the PM2.5 measurements in accordance with the different levels specified by the 
[EPA](https://www.airnow.gov/aqi/aqi-basics/){:target="_blank"} (**E**nvironmental **P**rotection **A**gency).

{% assign part = "Part-1" %}
{% assign notebook_page = "Part 1 - Parse and Reformat South Korean Air Pollution Data (CSV).html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Air%20Pollution%20Analysis%20and%20Data%20Scraping%20of%20Seoul%20(Districts)%2C%20South%20Korea" %}

{% include view-notebook.html html=content %}

# Part 2 - Data Collection from Web-Scraping

More content here...

{% assign part = "Part-2" %}
{% assign notebook_page = "Part 2 - Parse and Reformat South Korean Air Pollution Data (Website).html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Air%20Pollution%20Analysis%20and%20Data%20Scraping%20of%20Seoul%20(Districts)%2C%20South%20Korea" %}

{% include view-notebook.html html=content %}

# Part 3 - Data Collection from an API

More content here...

{% assign part = "Part-3" %}
{% assign notebook_page = "Part 3 - Parse and Reformat South Korean Air Pollution Data (API)" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Air%20Pollution%20Analysis%20and%20Data%20Scraping%20of%20Seoul%20(Districts)%2C%20South%20Korea" %}

{% include view-notebook.html html=content %}

# Part 4 - Merging, Querying and Graphing Data from sqliteDB

More content here...

{% assign part = "Part-4" %}
{% assign notebook_page = "Part 4 - Merging & Querying All South Korean Air Pollution Data" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Air%20Pollution%20Analysis%20and%20Data%20Scraping%20of%20Seoul%20(Districts)%2C%20South%20Korea" %}

{% include view-notebook.html html=content %}