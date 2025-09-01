'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyMetrics } from '@/types';

interface RevenueChartProps {
  data: MonthlyMetrics[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  if (data.length === 0) return null;

  const chartData = data.map(month => ({
    month: month.month,
    revenue: month.totalRevenue,
    netProfit: month.netProfit
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue & Net Profit Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Revenue"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="netProfit" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Net Profit"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}