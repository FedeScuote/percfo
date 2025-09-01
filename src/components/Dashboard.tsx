import { AnalysisResult, PLData } from '@/types';
import KPICards from './KPICards';
import RevenueChart from './RevenueChart';
import ExpenseChart from './ExpenseChart';
import AIInsights from './AIInsights';

interface DashboardProps {
  analysis: AnalysisResult;
  rawData: PLData[];
}

export default function Dashboard({ analysis, rawData }: DashboardProps) {
  return (
    <div className="space-y-8">
      <KPICards metrics={analysis.overallMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart data={analysis.monthlyMetrics} />
        <ExpenseChart data={rawData} />
      </div>

      <AIInsights analysis={analysis} />

      {analysis.flags.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-2">
            {analysis.flags.map((flag, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-sm text-gray-700">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}