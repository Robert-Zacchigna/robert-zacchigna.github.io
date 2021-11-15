---
layout: post
title: Project Title Here (Sample)
tags: These, are, post-tags
category: These are, post-categories
summary: This is a sample post, I hope you like it.
git_prepend: https://github.com/Robert-Zacchigna/Portfolio/tree/main/
specific_git_link: 
has_notebook: yes
notebooks: Notebook1, Notebook2
project_download_size: 69.69 MB
---

# Overview

Project Overview...


Info about the jupyter notebook...

{% assign part = "" %}
{% assign notebook_page = "" %}
{% assign github_notebook = "" %}

{% include view-notebook.html html=content %}

{% include view-notebook-buttons.html html=content %}

