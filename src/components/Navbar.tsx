import React from 'react';
import { Download, Sliders, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenExportModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('executive_summary')}
          className="text-base font-bold tracking-tight text-white hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Autonomous Business CEO
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('executive_summary')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'executive_summary'
                ? 'text-white border-b-2 border-indigo-500 pb-1 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Executive Summary
          </button>

          <button
            onClick={() => setActiveTab('revenue_tracker')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'revenue_tracker'
                ? 'text-white border-b-2 border-emerald-500 pb-1 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Revenue Tracker
          </button>

          <button
            onClick={() => setActiveTab('decision_matrix')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'decision_matrix'
                ? 'text-white border-b-2 border-indigo-500 pb-1 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Decision Matrix
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'comparison'
                ? 'text-white border-b-2 border-indigo-500 pb-1 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Path A vs Path B
          </button>

          <button
            onClick={() => setActiveTab('agent_council')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'agent_council'
                ? 'text-white border-b-2 border-indigo-500 pb-1 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Agent Council
          </button>

          <button
            onClick={() => setActiveTab('action_plan')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'action_plan'
                ? 'text-white border-b-2 border-indigo-500 pb-1 font-semibold'
                : 'hover:text-white'
            }`}
          >
            7-Day Action Plan
          </button>

          <button
            onClick={() => setActiveTab('costs')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'costs'
                ? 'text-white border-b-2 border-indigo-500 pb-1 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Treasury ($0 Spend)
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export CEO Briefing
          </button>
        </div>
      </div>
    </header>
  );
};
