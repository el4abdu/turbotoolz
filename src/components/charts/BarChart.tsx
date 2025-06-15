import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  [key: string]: any;
}

interface BarChartProps {
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

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  xAxis, 
  yAxis, 
  colorBy,
  height = 400 
}) => {
  // If colorBy is provided, we need to transform the data
  if (colorBy && colorBy !== xAxis && colorBy !== yAxis) {
    // Group data by colorBy values
    const uniqueColorValues = Array.from(new Set(data.map(item => item[colorBy])));
    
    // Transform data for grouped bar chart
    const transformedData = data.reduce((acc: any[], item) => {
      const xValue = item[xAxis];
      const existingItem = acc.find(i => i[xAxis] === xValue);
      
      if (existingItem) {
        existingItem[item[colorBy]] = item[yAxis];
      } else {
        const newItem: any = { [xAxis]: xValue };
        newItem[item[colorBy]] = item[yAxis];
        acc.push(newItem);
      }
      
      return acc;
    }, []);
    
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxis} 
            angle={-45} 
            textAnchor="end" 
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {uniqueColorValues.map((value, index) => (
            <Bar 
              key={String(value)} 
              dataKey={String(value)} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  }
  
  // Simple bar chart
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={xAxis} 
          angle={-45} 
          textAnchor="end" 
          height={70}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yAxis} fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart; 