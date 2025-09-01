'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PLData } from '@/types';

interface ExpenseChartProps {
  data: PLData[];
}

export default function ExpenseChart({ data }: ExpenseChartProps) {
  if (data.length === 0) return null;

  const chartData = data.map(month => ({
    month: month.month,
    COGS: month.cogs,
    Marketing: month.marketing,
    Operations: month.operations,
    'Other Expenses': month.otherExpenses
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Categories</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Bar dataKey="COGS" fill="#ef4444" name="COGS" />
            <Bar dataKey="Marketing" fill="#f97316" name="Marketing" />
            <Bar dataKey="Operations" fill="#eab308" name="Operations" />
            <Bar dataKey="Other Expenses" fill="#6b7280" name="Other Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}