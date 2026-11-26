import React from "react";
import { Competitor } from "../data/benchmarkDossiers.ts";
import { Target, CheckCircle2, AlertOctagon, DollarSign, ShieldAlert, Zap } from "lucide-react";

interface CompetitorBenchmarkingProps {
  marketConcentration: "FRAGMENTED" | "MODERATE" | "CONCENTRATED";
  competitors: Competitor[];
  uncontestedMarketGaps: string[];
}

export const CompetitorBenchmarking: React.FC<CompetitorBenchmarkingProps> = ({
  marketConcentration,
  competitors,
  uncontestedMarketGaps,
}) => {
  return (
    <div className="space-y-6">
      {/* Overview & Market Concentration */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
            <Target className="w-4 h-4" />
            <span>Section 2.C // Competitive Intelligence & Vulnerabilities</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 font-sans">
            Direct & Indirect Rival Landscape
          </h3>
          <p className="text-xs text-slate-400 max-w-xl mt-0.5">
            Objective audit of incumbent products, pricing models, verified distribution moats, and operational Achilles' heels.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono">
          <span className="text-slate-400">Market Concentration:</span>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[11px] ${
              marketConcentration === "FRAGMENTED"
                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                : marketConcentration === "MODERATE"
                ? "bg-cyan-950 text-cyan-300 border border-cyan-800"
                : "bg-amber-950 text-amber-300 border border-amber-800"
            }`}
          >
            {marketConcentration}
          </span>
        </div>
      </div>

      {/* Competitor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {competitors.map((comp, idx) => (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-100 font-sans">{comp.name}</h4>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                    {comp.type} RIVAL
                  </span>
                </div>

                <span className="text-[11px] font-mono font-medium bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-emerald-400 text-right">
                  {comp.pricingModel}
                </span>
              </div>

              {/* Positioning */}
              <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl mb-4 text-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-0.5">
                  Positioning & Pitch:
                </span>
                <p className="text-slate-200 italic font-sans">"{comp.positioning}"</p>
              </div>

              {/* Verified Strengths */}
              <div className="mb-4">
                <span className="text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Advantages:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {comp.strengths.map((str, sIdx) => (
                    <li key={sIdx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Known Vulnerabilities & Gaps */}
              <div>
                <span className="text-[11px] font-mono font-semibold text-rose-400 flex items-center gap-1.5 mb-2">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Exploitable Vulnerabilities:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {comp.weaknessesAndGaps.map((wk, wIdx) => (
                    <li key={wIdx} className="flex items-start space-x-2">
                      <span className="text-rose-400 font-mono mt-0.5">✕</span>
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldAlert className="w-3 h-3 text-cyan-400" /> Independent Verification
              </span>
              <span>Marketing Claims Filtered</span>
            </div>
          </div>
        ))}
      </div>

      {/* Uncontested Market White Spaces */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-800/50 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Discovered White Spaces & Market Gaps</span>
        </div>
        <h4 className="text-base font-bold text-slate-100 mb-3">
          Commercially Underserved Niches Identified by Agent 02
        </h4>
        <div className="space-y-2.5">
          {uncontestedMarketGaps.map((gap, gIdx) => (
            <div
              key={gIdx}
              className="bg-slate-950/80 border border-cyan-900/60 p-3.5 rounded-xl text-xs text-slate-200 flex items-start space-x-3"
            >
              <span className="w-5 h-5 rounded-full bg-cyan-900/50 border border-cyan-700 text-cyan-300 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                {gIdx + 1}
              </span>
              <p className="font-sans leading-relaxed">{gap}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
