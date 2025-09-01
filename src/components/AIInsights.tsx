'use client';

import { useState, useEffect } from 'react';
import { AnalysisResult } from '@/types';

interface AIInsightsProps {
  analysis: AnalysisResult;
}

export default function AIInsights({ analysis }: AIInsightsProps) {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (analysis.overallMetrics.totalRevenue > 0) {
      generateInsights();
    }
  }, [analysis]);  // eslint-disable-line react-hooks/exhaustive-deps

  const generateInsights = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics: analysis.overallMetrics,
          flags: analysis.flags,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const data = await response.json();
      setInsights(data.insights);
    } catch {
      setError('Unable to generate AI insights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (analysis.overallMetrics.totalRevenue === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">AI-Powered Insights</h3>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-sm font-medium text-blue-600">Powered by AI</span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <span className="text-sm text-gray-600">Generating insights...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {insights && !loading && !error && (
        <div className="prose prose-sm max-w-none">
          <div className="text-gray-700 whitespace-pre-line">{insights}</div>
        </div>
      )}
    </div>
  );
}