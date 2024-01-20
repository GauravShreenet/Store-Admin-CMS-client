import React from 'react'
import { PieChart, Pie, Label, Cell } from 'recharts';
import { FaCircle } from "react-icons/fa";

export const DashboardVisitor = () => {
    const data = [
        { name: 'Register', value: 70 },
        { name: 'Not Register', value: 30 },
    ];

    const Color = ['#FF0000', "#0000FF"]

    const Radian = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Radian);
        const y = cy + radius * Math.sin(-midAngle * Radian);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <PieChart width={420} height={230}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="48%"
                    cy="50%"
                    outerRadius={105}
                    fill="#8884d8"
                    label={renderCustomizedLabel}
                    labelLine={false}
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={Color[index % Color.length]} />
                        ))
                    }
                </Pie>
            </PieChart>
            <div className="d-flex justify-content-around">
                <span><FaCircle className="text-danger fs-5 me-1" />Register</span>
                <span><FaCircle className="text-primary fs-5 me-1" />Not-Register</span>
            </div>
        </div>
    );
};
