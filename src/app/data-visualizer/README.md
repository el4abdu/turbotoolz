# Data Visualizer Tool

The Data Visualizer is a powerful tool that allows users to upload CSV and JSON files to create interactive charts and analyze data. This tool is part of the TurboToolz collection.

## Features

- **File Upload**: Support for CSV and JSON file formats
- **Multiple Chart Types**: Bar, Line, Pie, and Scatter charts
- **Interactive Configuration**: Customize your chart with various options
- **Data Analysis**: View statistics and insights about your data
- **Export Options**: Download your data in CSV or JSON format
- **Chart Download**: Save your chart as a PNG image
- **Sample Data**: Try the tool with pre-loaded sample datasets
- **Responsive Design**: Works on desktop and mobile devices

## Technical Implementation

The Data Visualizer is built using:

- React and Next.js for the UI framework
- Recharts for chart rendering
- TypeScript for type safety
- TailwindCSS for styling
- HTML5 File API for file handling
- html2canvas for chart image export

## Usage

1. **Upload Data**: Click the upload area or drag and drop a CSV or JSON file
2. **Configure Chart**: Select chart type, axes, and other options
3. **View Chart**: Interact with your visualization
4. **Analyze Data**: Switch between chart, data table, and statistics views
5. **Export Results**: Download your chart as an image or your data in various formats

## Data Format Requirements

### CSV Files
- Must have a header row
- Columns should be separated by commas
- Text containing commas should be enclosed in quotes

### JSON Files
- Must be an array of objects
- Each object should have the same structure
- Nested objects are supported but may require flattening

## Sample Data

The tool includes two sample datasets:
- **Sales Data**: Monthly sales figures by product category and region
- **Population Data**: Population statistics for various countries over time

## Future Enhancements

- Additional chart types (Heatmap, Radar, etc.)
- Advanced data filtering options
- Custom color palettes
- Data transformation tools
- Dashboard creation and sharing 