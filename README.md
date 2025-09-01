# FreeCodeCamp Heatmap Challenge Solution

This project is my solution to the **FreeCodeCamp Data Visualization Certification challenge: Visualize Data with a Heat Map**.  
It uses **D3.js** to fetch, process, and display global temperature variance data as a heatmap.

## Overview

- **Data Source:**  
  [FreeCodeCamp Global Temperature Dataset](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json)

- **Main Features:**
  - Fetches the dataset asynchronously with `fetch()`
  - Displays a **heatmap** using `rect` elements in an SVG
  - Axes for **years** (x-axis) and **months** (y-axis)
  - **Color scale** with `d3.interpolateRdYlBu` to represent temperature variance
  - **Interactive tooltip** on hover, showing year, month, temperature, and variance
  - **Legend** with a linear scale and gradient color reference

## Technologies Used

- **JavaScript (ES6+)**
- **D3.js v7**
- **HTML5 / CSS3**

## Project Structure

- `index.html` – Base structure of the page with a container for the visualization
- `script.js` – Main logic: fetching data, building scales, axes, heatmap, legend, and tooltip
- `style.css` – Custom styling to provide a modern and clean interface

## How to Run

1. Clone or download the project files.
2. Open `index.html` in your browser.
3. The heatmap should render automatically with interactive tooltips.

## Demo

You can view the live version of this project here:    
**[Heat Map Live App](https://dallatikes.github.io/freeCodeCamp-d3-heatmap/)**

The visualization shows global temperature variance across years and months.  
- **X-axis:** Years (with ticks every 10 years)  
- **Y-axis:** Months (January → December)  
- **Colors:** Blue to red, representing cold to hot temperatures  
- **Tooltip:** Appears when hovering over a cell  

## Notes

This solution passes all the FreeCodeCamp automated tests for the Heatmap challenge.  
It was built with clarity, interactivity, and modern styling in mind.

---
