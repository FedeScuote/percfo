import { FinancialMetrics } from '@/types';

interface KPICardsProps {
  metrics: FinancialMetrics;
}

export default function KPICards({ metrics }: KPICardsProps) {
  const kpis = [
    {
      title: 'Total Revenue',
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Net Profit',
      value: `$${metrics.netProfit.toLocaleString()}`,
      bgColor: metrics.netProfit >= 0 ? 'bg-green-50' : 'bg-red-50',
      textColor: metrics.netProfit >= 0 ? 'text-green-900' : 'text-red-900',
      iconColor: metrics.netProfit >= 0 ? 'text-green-500' : 'text-red-500'
    },
    {
      title: 'Gross Margin',
      value: `${metrics.grossMargin.toFixed(1)}%`,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-900',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Net Margin',
      value: `${metrics.netMargin.toFixed(1)}%`,
      bgColor: metrics.netMargin >= 0 ? 'bg-emerald-50' : 'bg-red-50',
      textColor: metrics.netMargin >= 0 ? 'text-emerald-900' : 'text-red-900',
      iconColor: metrics.netMargin >= 0 ? 'text-emerald-500' : 'text-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <div key={index} className={`${kpi.bgColor} rounded-lg p-6`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 ${kpi.iconColor} flex items-center justify-center`}>
                {index === 0 && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
                {index === 3 && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className={`text-sm font-medium ${kpi.textColor} truncate`}>
                  {kpi.title}
                </dt>
                <dd className={`text-2xl font-bold ${kpi.textColor}`}>
                  {kpi.value}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}