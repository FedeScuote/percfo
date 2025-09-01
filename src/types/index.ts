export interface PLData {
  month: string;
  revenue: number;
  cogs: number;
  marketing: number;
  operations: number;
  otherExpenses: number;
}

export interface ParsedCSVData {
  data: PLData[];
  errors: string[];
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  grossMargin: number;
  netMargin: number;
  grossProfit: number;
}

export interface MonthlyMetrics extends FinancialMetrics {
  month: string;
  revenueGrowth?: number;
  expenseGrowth?: number;
  profitGrowth?: number;
}

export interface AnalysisResult {
  overallMetrics: FinancialMetrics;
  monthlyMetrics: MonthlyMetrics[];
  flags: string[];
}