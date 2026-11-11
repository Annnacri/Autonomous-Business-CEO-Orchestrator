import React from 'react';
import {
  TrendingUp,
  Clock,
  DollarSign,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Layers,
  ChevronRight
} from 'lucide-react';
import { PATH_SCORES_DATA } from '../data/executiveDeliverables';

interface ExecutiveSummaryViewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenStressTest: () => void;
  onOpenOutreachModal: () => void;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({
  onNavigateTab,
  onOpenStressTest,
  onOpenOutreachModal,
}) => {
  const winner = PATH_SCORES_DATA[0]; // AI Hotel Concierge

  return (
    <div className="space-y-8">
      {/* Top Hero Banner & Executive Ruling */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Official Executive Directive · 7-Day Revenue Sprint
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight text-balance">
              Autonomous Business CEO: Strategic Evaluation & Operational Directive
            </h1>
            <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
              Following multi-agent deliberation and weighted decision modeling, the CEO decision is definitive:{' '}
              <strong className="text-white">
                Execute Path A1 (AI Hotel Concierge for Independent Lodging)
              </strong>{' '}
              as our immediate revenue vehicle. All new software builds (Path B) are paused until the treasury is self-funding.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateTab('revenue_tracker')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Revenue Tracker</span>
            </button>

            <button
              onClick={() => onNavigateTab('action_plan')}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs rounded-lg border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View 7-Day Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenOutreachModal}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Generate Pitch</span>
            </button>
          </div>
        </div>

        {/* 4-Stat Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div>
            <div className="text-xs text-slate-400">Winning Vehicle</div>
            <div className="text-lg font-bold text-white mt-1">AI Hotel Concierge</div>
            <div className="text-xs text-emerald-400 font-mono mt-0.5">Score: 84.6 / 100</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Time to First Paid Sale</div>
            <div className="text-lg font-bold text-white mt-1 font-mono">7 Days</div>
            <div className="text-xs text-slate-400 mt-0.5">Pilot on Day 4 · Close on Day 7</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Current Capital Outlay</div>
            <div className="text-lg font-bold text-emerald-400 mt-1 font-mono">$0.00</div>
            <div className="text-xs text-slate-400 mt-0.5">Strict authorization lock</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Target Unit Gross Margin</div>
            <div className="text-lg font-bold text-white mt-1 font-mono">91.0%</div>
            <div className="text-xs text-slate-400 mt-0.5">$79/mo ARPU vs $7.10 COGS</div>
          </div>
        </div>
      </div>

      {/* Core Comparative Takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Path A Summary Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Path A · Existing Digital Assets
              </span>
              <span className="text-xs font-mono px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded">
                Recommended
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mt-4">
              Monetizing AI Hotel Concierge & Tourguide
            </h3>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Leverages existing, functional codebase to bypass 3+ weeks of zero-to-one development. Independent boutique hotels (12-40 rooms) suffer chronic front-desk night staffing shortages and cannot afford $5,000 enterprise hospitality platforms.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant deployment:</strong> Mobile QR web app requires zero guest app store download.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero dev cost:</strong> Code already exists; only property-specific factsheet loading needed.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>High urgency ICP:</strong> General Managers eager to stop 11:30 PM WiFi & breakfast calls.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Weighted Score: 84.6 / 100</span>
            <button
              onClick={() => onNavigateTab('comparison')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              Inspect Path A Breakdown <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Path B Summary Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Path B · New Digital Business
              </span>
              <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded">
                Phase 2 Incubator
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mt-4">
              Specialized B2B Trade Subcontractor RFP Parser
            </h3>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Evaluating new niches revealed high willingness-to-pay ($299-$499/mo) among commercial specialty subcontractors (painters, electricians) for spec document parsers. However, technical build lead time (18-25 days) directly violates our 7-day revenue mandate.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Development lag:</strong> Minimum 3 weeks to build OCR parsing, spec taxonomy, and testing.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>High liability risk:</strong> Missed penalty clauses in tenders expose early tool to contractor distrust.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span><strong>High long-term value:</strong> Prime candidate for Phase 2 once initial cashflow is established.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Weighted Score: 72.1 / 100</span>
            <button
              onClick={() => onNavigateTab('comparison')}
              className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              Inspect Path B Breakdown <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Operating Rules & Governance Checklist */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <span>Operating Governance & Non-Negotiable Guardrails</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              $0 Unauthorized Spend
            </div>
            <p className="text-slate-400 leading-relaxed">
              No purchases, paid subscriptions, or card charges are authorized without manual human sign-off in the Treasury Ledger.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              Revenue Over Vanity Metrics
            </div>
            <p className="text-slate-400 leading-relaxed">
              We do not track pageviews, waitlist counts, or social impressions. Success is measured solely in signed pilots and paid Stripe invoices.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Fact / Estimate / Assumption Rigor
            </div>
            <p className="text-slate-400 leading-relaxed">
              Every data point in this suite is labeled with its factual basis to guard against founder optimism bias.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Quick Jump to 10 Deliverables */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-3">All 10 CEO Deliverables</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
          <button
            onClick={() => onNavigateTab('executive_summary')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">01. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Executive Summary</div>
          </button>

          <button
            onClick={() => onNavigateTab('comparison')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">02. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Path Comparison</div>
          </button>

          <button
            onClick={() => onNavigateTab('evidence')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">03. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Evidence Registry</div>
          </button>

          <button
            onClick={() => onNavigateTab('costs')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">04. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Initial Costs Ledger</div>
          </button>

          <button
            onClick={() => onNavigateTab('customers')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">05. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Customer Profiles</div>
          </button>

          <button
            onClick={() => onNavigateTab('monetization')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">06. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Monetization Models</div>
          </button>

          <button
            onClick={() => onNavigateTab('risks')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">07. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Risks & Mitigations</div>
          </button>

          <button
            onClick={() => onNavigateTab('decision_matrix')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">08. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Weighted Scores</div>
          </button>

          <button
            onClick={() => onNavigateTab('final_recommendation')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">09. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">Final Recommendation</div>
          </button>

          <button
            onClick={() => onNavigateTab('action_plan')}
            className="p-3 bg-slate-800/60 hover:bg-slate-800 text-left rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
          >
            <div className="text-[10px] text-slate-400 font-mono">10. Deliverable</div>
            <div className="font-medium mt-0.5 truncate">7-Day Action Plan</div>
          </button>

          <button
            onClick={() => onNavigateTab('revenue_tracker')}
            className="p-3 bg-emerald-950/40 hover:bg-emerald-900/50 text-left rounded-lg text-emerald-200 hover:text-white transition-colors cursor-pointer border border-emerald-800/60"
          >
            <div className="text-[10px] text-emerald-400 font-mono">11. Deliverable</div>
            <div className="font-semibold mt-0.5 truncate flex items-center gap-1">
              <span>Revenue Tracker</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
