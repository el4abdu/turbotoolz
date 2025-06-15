import React from 'react';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis
} from 'recharts';

interface DataPoint {
  [key: string]: any;
}

interface ScatterChartProps {
  data: DataPoint[];
  xAxis: string;
  yAxis: string;
  colorBy?: string;
  height?: number;
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', 
  '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'
];

const ScatterChart: React.FC<ScatterChartProps> = ({ 
  data, 
  xAxis, 
  yAxis, 
  colorBy,
  height = 400 
}) => {
  // Transform data for scatter plot
  const transformedData = data.map(item => ({
    x: Number(item[xAxis]) || 0,
    y: Number(item[yAxis]) || 0,
    name: String(item[xAxis]),
    colorValue: colorBy ? item[colorBy] : undefined
  }));

  // If colorBy is provided, we need to group the data
  if (colorBy && colorBy !== xAxis && colorBy !== yAxis) {
    // Group data by colorBy values
    const groupedData = transformedData.reduce((acc: Record<string, any[]>, item) => {
      const colorValue = String(item.colorValue);
      if (!acc[colorValue]) {
        acc[colorValue] = [];
      }
      acc[colorValue].push(item);
      return acc;
    }, {});
    
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name={xAxis}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name={yAxis}
            tick={{ fontSize: 12 }}
          />
          <ZAxis dataKey="name" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          {Object.entries(groupedData).map(([colorValue, points], index) => (
            <Scatter 
              key={colorValue} 
              name={colorValue} 
              data={points} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </RechartsScatterChart>
      </ResponsiveContainer>
    );
  }
  
  // Simple scatter chart
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsScatterChart
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="x" 
          name={xAxis}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name={yAxis}
          tick={{ fontSize: 12 }}
        />
        <ZAxis dataKey="name" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name={`${xAxis} vs ${yAxis}`} data={transformedData} fill="#8884d8" />
      </RechartsScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChart; 