import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

export const DashboardGoals = () => {
  const uvValue = 72;
  const totalValue = 100;
  const amtValue = 24000

  const data = [
    { name: 'Sales', uv: uvValue, amt: amtValue },
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
          <Label
            value={`Sales: $${amtValue}`}
            position="center"
            fill="#333" // Set the color of the label
            fontSize={20} // Set the font size of the label
            dy={10}
          />
        </Pie>
      </PieChart>
    </div>
  );
};