import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

export const DashboardGoals = () => {
  const uvValue = 72;
  const totalValue = 100;

  const data = [
    { name: 'Sales', uv: uvValue },
    { name: 'Empty', uv: totalValue - uvValue },
  ];

  const COLORS = ['#4a3aff', '#e5eafc'];

  return (
    <div>
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          cx="48%"
          cy="80%"
          startAngle={180}
          endAngle={0}
          innerRadius={140}
          outerRadius={180}
          cornerRadius={8}
          dataKey="uv"
        >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            value={`${uvValue}%`}
            position="center"
            fill="#333" // Set the color of the label
            fontSize={60} // Set the font size of the label
            fontWeight="bold"
            dy={-40}
          />
        </Pie>
      </PieChart>
    </div>
  );
};