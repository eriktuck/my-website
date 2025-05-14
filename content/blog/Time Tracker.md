---
title: "Build a time tracking app with Google Apps Script and Plotly"
date: 2024-08-20T10:00:00-05:00
draft: false
summary: "Extend Google Sheets to create your own custom tools"
tags: ["Google Apps Script", "Tutorial"]
image: https://storage.googleapis.com/ei-dev-assets/assets/Arc_QOGNMtWkfq.png
image-credit: Screen capture by author
---
Title: Build a time tracking app with Google Apps Script and Plotly
Subtitle: Extend Google Sheets to create your own custom tools

![data entry](https://storage.googleapis.com/ei-dev-assets/assets/Arc_QOGNMtWkfq.png)

Have you ever had an idea for an app but you just can't find the right combination of features in what's available on the web? Have you ever wanted to prototype something but weren't sure where to start? What if I told you that you could extend Google Sheets to build your own custom tools?

In this gentle introduction to Google Apps Script, I will show you how to supercharge a Google Sheet with automations and custom data visualizations. 

Apps Script is like Excel's VBA, but way better. Why? Because you write JavaScript instead of some arcane language that you need to learn for a single application. After this tutorial, you'll be ready to start using Apps Script to automate your workflows, create custom tools, and even build and deploy web apps. 
## what you'll learn
This tutorial will introduce you to the Apps Script platform. You'll also get experience with JavaScript, HTML and some basic web development concepts, including working with third-party libraries (we'll be using Plotly's JavaScript library). You don't need to know JavaScript or HTML for this tutorial, but I hope your newfound power inspires you to keep learning!

The tutorial is presented in three parts. You can follow along or jump in at any part using the completed templates I've linked below. 
- Part 1: build the data entry form for a time tracking app using Google Sheets ([completed template](https://docs.google.com/spreadsheets/d/1tUwRvQpkjJOs3F4deWPFyR9uvGd2FyBagJQufUTf790/template/preview))
- Part 2: use Google Apps Script to automate key processes ([completed template](https://docs.google.com/spreadsheets/d/1oRAuKNwlFVG0-CSmHCuL4o0OoeWTyBP8Z3tUcddBMIg/template/preview))
- Part 3: use the Plotly JavaScript library to create data visualizations ([completed template](https://docs.google.com/spreadsheets/d/1Bum_QZRrsMcKgWUDVv0M3QxWcSDjZ4sn4DLxqeTu7ag/template/preview))
## the project
I've worked as a consultant for over ten years, which means I've become very accustomed to tracking and billing my time. I've tried every tool and technique out there. What I found works best for me is a simple Google Sheet where I can log the time anytime I switch tasks.

Follow along to build and deploy your own version. We'll create the data entry form, add automation for data logging, and finally build an interactive data visualization. Then you'll be ready to build your own tools using  Apps Script.

![gif of time tracker operation](https://storage.googleapis.com/ei-dev-assets/assets/time-tracker-full5.gif)

You could of course opt to use Pivot Tables and Google Sheets' built-in charts to analyze and visualize the data. However, using a third-party library like Plotly gives us more control and offers an opportunity to experiment.
## project objectives
I want to understand two things using my time tracking app:
- How much time am I spending on each project?
- If I'm not working on a project during my work day, what am I doing instead?

Note that I don't need to track every hour of my day to answer these questions. I only need to track (1) what I'm doing during the workday and (2) any time I spend working outside of my typical working hours.

I also want to make it as easy as possible to log a new task. I want to simply log the current time, the task name, and allow space to capture a few notes for myself. 
 
Now that we know where we're going, let's get started!

Next: [Time Tracker - part 1](https://eriktuck.com/time-tracker---part-1)

## Archive
Whenever I begin a new project, I always take the time to clearly define what I am trying to accomplish, and more importantly, why.

You've just completed a great analysis and uncovered a stunning insight. You're ready to share with decision makers at your organization. You're about to open a slide deck and drop in some charts. Then you think, "there's got to be a better way...". 

The "last mile of analytics"[^1] is the distance between your analysis and the decision makers. Static reports and slide decks fall flat because they don't allow your audience to interact with the data, adapting the analysis to help them with the decisions they face. 

Luckily, there is a better way. Google Apps Script allows you to quickly create applications that integrate with Google Workspace.

Apps Script is like Excel's VBA, but way better. Why? Because you write JavaScript instead of some arcane language that you need to learn for a single application. It is also a fully-fledged application development platform with free web hosting. I would argue that Google Apps Script is one of the better kept secrets for building and deploying lightweight web applications. 

Anyone can get started building applications with Apps Script for free. If your organization has a Google Workspace account, it is a great choice for creating business applications that integrate with Google Workspace. 

Subtitle: Google Apps Script is the best kept secret for building and deploying data applications.

[^1]: Brahm, Chris. (2017), [_Chris Brahm: The Last Mile of Analytics_](https://www.bain.com/insights/chris-brahm-the-last-mile-of-analytics-video/), Bain & Company.