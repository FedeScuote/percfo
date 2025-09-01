# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a P&L Analyzer PoC - a standalone web tool for financial data analysis. The application allows users to upload CSV files with P&L data and instantly receive:
- Key financial metrics (Revenue, Gross Margin, Net Profit, Expenses breakdown)
- Interactive charts and visualizations
- AI-generated insights and alerts

## Architecture

**Tech Stack (as planned):**
- Frontend: Next.js with React and Tailwind CSS
- Charts: Recharts or Chart.js for data visualization
- Backend: Next.js API routes for CSV parsing and analysis
- AI: OpenAI API integration for generating insights
- State: Stateless application (no database, in-memory processing)

**Key Design Principles:**
- No user authentication required (frictionless demo experience)
- Stateless processing for maximum simplicity
- Focus on immediate visual impact and insights
- Optimized for demo presentations to stakeholders

## Development Status

This is a new project currently in the planning phase. The main planning document is `prd.md` which contains the complete Product Requirements Document with detailed specifications for features, scope, and success criteria.

## Expected File Structure

When implemented, the project will likely follow standard Next.js conventions:
- `/pages` or `/app` for Next.js routing
- `/components` for React components
- `/lib` or `/utils` for utility functions
- `/api` for backend API routes
- CSV parsing and financial calculation logic
- OpenAI integration for insight generation

## Development Commands

Since this is a new project, standard Next.js commands will apply once initialized:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests (if configured)

## Development Workflow

**IMPORTANT: Follow this workflow for all development tasks:**

1. **Planning Phase**: 
   - First think through the problem and read relevant codebase files
   - Write a detailed plan to `projectplan.md` with a list of todo items that can be checked off
   
2. **Approval Phase**:
   - Before beginning work, check in with the user to verify the plan
   - Wait for user approval before proceeding
   
3. **Implementation Phase**:
   - Work through todo items one by one, marking them as complete
   - Provide high-level explanations of changes at each step
   - Keep every task and code change as simple as possible
   - Avoid massive or complex changes - impact as little code as possible
   - Everything is about simplicity
   
4. **Review Phase**:
   - Add a review section to `projectplan.md` with a summary of changes made
   - Include any other relevant information about the implementation

## Key Features to Implement

1. **CSV Upload Interface**: Drag & drop or file selector for P&L data
2. **Financial Metrics Calculator**: Revenue, margins, growth rates, expense analysis
3. **Visualization Components**: Line charts, bar charts, KPI cards
4. **AI Insights Generator**: Integration with OpenAI for trend analysis and alerts
5. **Responsive Dashboard**: Clean, demo-worthy interface design