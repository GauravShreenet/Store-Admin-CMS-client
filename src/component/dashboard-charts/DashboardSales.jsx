import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export const DashboardSales = () => {
    const data = [
        {
            name: 'Jan-Mar',
            amt: 140,
        },
        {
            name: 'Apr-Jun',
            amt: 221,
        },
        {
            name: 'Jul-Sep',
            amt: 329,
        },
        {
            name: 'Oct-Dec',
            amt: 380,
        },
    ]
    return (
        <div>
            <BarChart width={350} height={250} data={data} barSize={40}>
                <XAxis dataKey="name" padding={{ left: 10, right: 10 }}/>
                <YAxis unit="K" ticks={[0, 100, 200, 300, 400]} />
                <Bar dataKey="amt" fill='#4a3aff' />
            </BarChart>
        </div>
        

    )
}
