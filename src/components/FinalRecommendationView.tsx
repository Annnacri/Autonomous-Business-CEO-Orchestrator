import React from 'react';
import { Award, ArrowRight, ShieldCheck, CheckCircle2, AlertOctagon, TrendingUp, Sparkles } from 'lucide-react';

interface FinalRecommendationViewProps {
  onNavigateToActionPlan: () => void;
  onOpenPitchGenerator: () => void;
}

export const FinalRecommendationView: React.FC<FinalRecommendationViewProps> = ({
  onNavigateToActionPlan,
  onOpenPitchGenerator,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Deliverable 09 · Executive Ruling & Roadmap
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Final Recommendation: Strategic Sequence & Resource Allocation
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          The definitive ruling of the Autonomous Business CEO following multi-agent investigation, commercial scoring, and risk red-teaming.
        </p>
      </div>

      {/* Primary Recommendation Banner */}
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-xl p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Definitive CEO Ruling
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Commit 100% of Sprint Capacity to Path A1: AI Hotel Concierge
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              We allocate zero engineering hours to building new software (Path B) or creating marketplace listings (NexusAIStore). We direct all operational horsepower into founder-led B2B direct sales for the pre-built AI Hotel Concierge, securing our first paying customer on Day 7 at $79/month.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2.5">
            <button
              onClick={onNavigateToActionPlan}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Execute 7-Day Action Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPitchGenerator}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg transition-colors border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Generate Cold Pitch</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars of the Decision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800 text-xs">
          <div>
            <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              1. Speed to First Cashflow
            </div>
            <p className="text-slate-300 mt-1">
              Existing code permits Day 4 live pilots and Day 7 commercial close ($79/mo). Path B requires 21+ days of coding.
            </p>
          </div>

          <div>
            <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              2. Zero Technical Debt
            </div>
            <p className="text-slate-300 mt-1">
              Software is already functional. Only localized factsheet ingestion is needed, eliminating development risk.
            </p>
          </div>

          <div>
            <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              3. Unattended SMB Market
            </div>
            <p className="text-slate-300 mt-1">
              Sub-40 room boutique hotels cannot afford $5k enterprise systems. Our $79/mo price is an instant operational yes.
            </p>
          </div>

          <div>
            <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              4. $0 Initial Outlay
            </div>
            <p className="text-slate-300 mt-1">
              Runs on free tier serverless hosting and free Gemini token quotas. Zero capital at risk before revenue.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Phased Master Roadmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
          The 3-Stage Master Execution Roadmap
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Phase 1 */}
          <div className="p-4 bg-slate-950/80 rounded-xl border-2 border-emerald-500/60 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold mb-1">
                Phase 1 · Immediate Sprint (Days 1–7)
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                First Customer Validation
              </h4>
              <p className="text-slate-300 leading-relaxed mb-4">
                Package AI Hotel Concierge. Walk in or call 30 local boutique hotels. Deploy 2 live 14-day pilots with custom lobby QR counter tents. Convert 1 pilot into our first paid customer at $79/mo.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
              Milestone: First $79 Invoice Paid
            </div>
          </div>

          {/* Phase 2 */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-indigo-400 font-bold mb-1">
                Phase 2 · Replicability (Days 8–30)
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Boutique Lodging Expansion
              </h4>
              <p className="text-slate-300 leading-relaxed mb-4">
                Scale to 10 paying hotel properties ($790 MRR) using the validated cold walk-in and referral playbook. Bundle AI Tourguide Creator as an amenity upsell (&quot;Local Walking Tour curations&quot;).
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-indigo-400">
              Milestone: $790 MRR · 10 Active Hotels
            </div>
          </div>

          {/* Phase 3 */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold mb-1">
                Phase 3 · Niche Incubator (Month 2+)
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Funded Path B Exploration
              </h4>
              <p className="text-slate-300 leading-relaxed mb-4">
                With operating cashflow established from Path A, begin disciplined customer discovery and prototype development for the Subcontractor RFP Bid Assistant ($299-$499/mo ARPU).
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400">
              Milestone: Subcontractor Beta Pilot
            </div>
          </div>
        </div>
      </div>

      {/* Tactical Contingency Plan */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-xs">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
          <AlertOctagon className="w-4 h-4 text-amber-400" />
          Tactical Pivot Trigger (48-Hour Kill Switch)
        </h4>
        <p className="text-slate-300 leading-relaxed">
          If 30 targeted hotel outreaches on Day 3 produce zero pilot commitments: <strong>Do not despair or build new features.</strong> Pivot immediately to independent tour guides and heritage societies (Path A2) using their existing walking tour audio files. If both fail after 50 direct touches, conduct 10 customer problem discovery interviews before writing another line of code.
        </p>
      </div>
    </div>
  );
};
