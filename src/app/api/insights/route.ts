import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { metrics, flags } = await request.json();

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        insights: "AI insights are not available. Please configure your OpenAI API key to enable this feature."
      });
    }

    const prompt = `You are a financial analyst providing insights on a company's P&L data. Based on the following information, provide 3-4 concise, actionable insights in plain language:

Financial Metrics:
- Total Revenue: $${metrics.totalRevenue?.toLocaleString() || 0}
- Net Profit: $${metrics.netProfit?.toLocaleString() || 0}
- Gross Margin: ${metrics.grossMargin?.toFixed(1) || 0}%
- Net Margin: ${metrics.netMargin?.toFixed(1) || 0}%

Detected Issues/Trends:
${flags.length > 0 ? flags.join('\n') : 'No specific issues detected'}

Please provide insights as bullet points, focusing on:
1. Overall financial health assessment
2. Key areas of concern or opportunity
3. Actionable recommendations

Keep each insight to 1-2 sentences and use simple business language.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    const insights = completion.choices[0]?.message?.content || 'Unable to generate insights at this time.';

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}