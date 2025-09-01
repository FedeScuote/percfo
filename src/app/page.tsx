'use client';

import { useState, useMemo } from 'react';
import FileUpload from '@/components/FileUpload';
import DataPreview from '@/components/DataPreview';
import ErrorDisplay from '@/components/ErrorDisplay';
import Dashboard from '@/components/Dashboard';
import { parseCSV } from '@/lib/csvParser';
import { calculateFinancialMetrics } from '@/lib/financialCalculations';
import { PLData } from '@/types';

export default function Home() {
  const [data, setData] = useState<PLData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const analysis = useMemo(() => {
    return calculateFinancialMetrics(data);
  }, [data]);

  const handleFileSelect = async (file: File) => {
    try {
      const csvText = await file.text();
      const { data: parsedData, errors: parseErrors } = parseCSV(csvText);
      
      setData(parsedData);
      setErrors(parseErrors);
    } catch {
      setErrors(['Failed to read the uploaded file']);
      setData([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">P&L Analyzer</h1>
          <p className="text-gray-600 mt-1">Upload your P&L data and get instant insights</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <FileUpload onFileSelect={handleFileSelect} />
        
        <ErrorDisplay errors={errors} />
        
        {data.length > 0 && errors.length === 0 && (
          <>
            <Dashboard analysis={analysis} rawData={data} />
            <DataPreview data={data} />
          </>
        )}
      </main>
    </div>
  );
}
