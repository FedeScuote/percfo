import { PLData, FinancialMetrics, MonthlyMetrics, AnalysisResult } from '@/types';

export function calculateFinancialMetrics(data: PLData[]): AnalysisResult {
  if (data.length === 0) {
    return {
      overallMetrics: {
        totalRevenue: 0,
        totalExpenses: 0,
        netProfit: 0,
        grossMargin: 0,
        netMargin: 0,
        grossProfit: 0
      },
      monthlyMetrics: [],
      flags: []
    };
  }

  const monthlyMetrics: MonthlyMetrics[] = [];
  const flags: string[] = [];

  // Calculate monthly metrics with growth rates
  data.forEach((row, index) => {
    const totalExpenses = row.cogs + row.marketing + row.operations + row.otherExpenses;
    const grossProfit = row.revenue - row.cogs;
    const netProfit = row.revenue - totalExpenses;
    
    const metrics: MonthlyMetrics = {
      month: row.month,
      totalRevenue: row.revenue,
      totalExpenses,
      netProfit,
      grossProfit,
      grossMargin: row.revenue > 0 ? (grossProfit / row.revenue) * 100 : 0,
      netMargin: row.revenue > 0 ? (netProfit / row.revenue) * 100 : 0
    };

    // Calculate growth rates (compared to previous month)
    if (index > 0) {
      const prevMonth = data[index - 1];
      const prevTotalExpenses = prevMonth.cogs + prevMonth.marketing + prevMonth.operations + prevMonth.otherExpenses;
      const prevNetProfit = prevMonth.revenue - prevTotalExpenses;

      metrics.revenueGrowth = prevMonth.revenue > 0 ? ((row.revenue - prevMonth.revenue) / prevMonth.revenue) * 100 : 0;
      metrics.expenseGrowth = prevTotalExpenses > 0 ? ((totalExpenses - prevTotalExpenses) / prevTotalExpenses) * 100 : 0;
      metrics.profitGrowth = prevNetProfit !== 0 ? ((netProfit - prevNetProfit) / Math.abs(prevNetProfit)) * 100 : 0;
    }

    monthlyMetrics.push(metrics);

    // Flag detection
    if (netProfit < 0) {
      flags.push(`❌ ${row.month}: Negative profit ($${netProfit.toLocaleString()})`);
    }
    
    if (metrics.expenseGrowth && metrics.expenseGrowth > 25) {
      flags.push(`⚠️ ${row.month}: Expense spike (+${metrics.expenseGrowth.toFixed(1)}%)`);
    }

    if (metrics.revenueGrowth && metrics.revenueGrowth < -10) {
      flags.push(`📉 ${row.month}: Revenue decline (${metrics.revenueGrowth.toFixed(1)}%)`);
    }

    if (metrics.grossMargin < 20) {
      flags.push(`💡 ${row.month}: Low gross margin (${metrics.grossMargin.toFixed(1)}%)`);
    }
  });

  // Calculate overall metrics
  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const totalCogs = data.reduce((sum, row) => sum + row.cogs, 0);
  const totalMarketing = data.reduce((sum, row) => sum + row.marketing, 0);
  const totalOperations = data.reduce((sum, row) => sum + row.operations, 0);
  const totalOtherExpenses = data.reduce((sum, row) => sum + row.otherExpenses, 0);
  
  const totalExpenses = totalCogs + totalMarketing + totalOperations + totalOtherExpenses;
  const grossProfit = totalRevenue - totalCogs;
  const netProfit = totalRevenue - totalExpenses;

  const overallMetrics: FinancialMetrics = {
    totalRevenue,
    totalExpenses,
    netProfit,
    grossProfit,
    grossMargin: totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0,
    netMargin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0
  };

  // Check for trends
  if (monthlyMetrics.length >= 3) {
    const lastThreeMonths = monthlyMetrics.slice(-3);
    const improvingMargins = lastThreeMonths.every((month, index) => 
      index === 0 || month.netMargin >= lastThreeMonths[index - 1].netMargin
    );
    
    if (improvingMargins) {
      flags.push('✅ Net margin improving for 3 consecutive months');
    }
  }

  return {
    overallMetrics,
    monthlyMetrics,
    flags
  };
}