import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  [key: string]: any;
}

interface PieChartProps {
  data: DataPoint[];
  xAxis: string;
  yAxis: string;
  colorBy?: string;
  height?: number;
}

interface PieDataItem {
  name: string;
  value: number;
}

interface LabelProps {
  name: string;
  percent: number;
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', 
  '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'
];

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  xAxis, 
  yAxis, 
  colorBy,
  height = 400 
}) => {
  // For pie charts, we need to transform the data
  // We'll use xAxis as the name and yAxis as the value
  const transformedData: PieDataItem[] = data.map(item => ({
    name: String(item[xAxis]),
    value: Number(item[yAxis]) || 0
  }));

  // If there are too many data points, aggregate the smallest ones
  const MAX_SLICES = 10;
  let pieData = transformedData;
  
  if (transformedData.length > MAX_SLICES) {
    // Sort by value (descending)
    const sorted = [...transformedData].sort((a, b) => b.value - a.value);
    
    // Take the top MAX_SLICES-1 items
    const topItems = sorted.slice(0, MAX_SLICES - 1);
    
    // Aggregate the rest
    const otherItems = sorted.slice(MAX_SLICES - 1);
    const otherValue = otherItems.reduce((sum, item) => sum + item.value, 0);
    
    pieData = [
      ...topItems,
      { name: 'Other', value: otherValue }
    ];
  }

  // Custom label renderer with proper typing
  const renderCustomizedLabel = ({ name, percent }: LabelProps) => {
    return `${name}: ${(percent * 100).toFixed(1)}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={height / 3}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={renderCustomizedLabel}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => value.toLocaleString()} />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart; 