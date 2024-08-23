
# flip-forex

## Overview
`flip-forex` is a Python script designed to analyze and visualize the price data of currency pairs. The script fetches the latest hourly data, inverts the DataFrame, and generates a side-by-side comparison plot for better analysis. The output is saved as an image file with the currency pair and the current date in the filename.

## How to Execute
To run the script, you need to pass the symbol of the currency pair you want to analyze as an argument. For example:

```bash
python3 flip.py GBP/USD
```

Replace `GBP/USD` with any other currency pair you wish to analyze (e.g., `AUD/USD`).

## Output
The script will generate and save a plot in the `./public/` directory. The file will be named based on the currency pair and the current date, following this pattern: `<CURRENCY_PAIR>_<DATE>_plot.png`.
