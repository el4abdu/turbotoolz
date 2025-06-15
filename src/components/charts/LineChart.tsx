import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
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

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  xAxis, 
  yAxis, 
  colorBy,
  height = 400 
}) => {
  // Sort data by x-axis for better line visualization
  const sortedData = [...data].sort((a, b) => {
    if (typeof a[xAxis] === 'number' && typeof b[xAxis] === 'number') {
      return a[xAxis] - b[xAxis];
    }
    return String(a[xAxis]).localeCompare(String(b[xAxis]));
  });

  // If colorBy is provided, we need to transform the data
  if (colorBy && colorBy !== xAxis && colorBy !== yAxis) {
    // Group data by colorBy values
    const uniqueColorValues = Array.from(new Set(data.map(item => item[colorBy])));
    
    // Transform data for multiple lines
    const transformedData = sortedData.reduce((acc: any[], item) => {
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
        <RechartsLineChart
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
            <Line 
              key={String(value)} 
              type="monotone"
              dataKey={String(value)} 
              stroke={COLORS[index % COLORS.length]} 
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  }
  
  // Simple line chart
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={sortedData}
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
        <Line 
          type="monotone" 
          dataKey={yAxis} 
          stroke="#8884d8" 
          activeDot={{ r: 8 }} 
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart; 