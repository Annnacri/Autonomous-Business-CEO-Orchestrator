import React from "react";
import { SourceItem } from "../data/benchmarkDossiers.ts";
import { ExternalLink, ShieldCheck, AlertTriangle, FileCheck, Layers, HelpCircle, CheckCircle2 } from "lucide-react";

interface SourcesAndEpistemicViewProps {
  sources: SourceItem[];
  epistemicAudit: {
    verifiedFacts: string[];
    estimatesAndProjections: string[];
    unverifiedAssumptions: string[];
    insufficientEvidenceFlags: string[];
  };
}

export const SourcesAndEpistemicView: React.FC<SourcesAndEpistemicViewProps> = ({
  sources,
  epistemicAudit,
}) => {
  return (
    <div className="space-y-6">
      {/* Epistemic Segregation Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Section 3 // Epistemic Audit & Evidentiary Discipline</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 font-sans mb-1">
          Epistemic Segregation: Facts vs Estimates vs Hypotheses
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Strict analyst compliance with Agent 02 mandate: distinguishing established evidence from speculative models and missing data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Verified Facts */}
          <div className="bg-slate-950/80 border border-emerald-900/60 rounded-xl p-4">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 mb-2.5">
              <CheckCircle2 className="w-4 h-4" />
              Verified Facts (Primary Grounding)
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {epistemicAudit.verifiedFacts.map((fact, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Estimates & Modeled Projections */}
          <div className="bg-slate-950/80 border border-cyan-900/60 rounded-xl p-4">
            <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 mb-2.5">
              <Layers className="w-4 h-4" />
              Estimates & Economic Projections
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {epistemicAudit.estimatesAndProjections.map((est, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-cyan-400 font-mono mt-0.5">≈</span>
                  <span>{est}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unverified Assumptions */}
          <div className="bg-slate-950/80 border border-amber-900/60 rounded-xl p-4">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 mb-2.5">
              <AlertTriangle className="w-4 h-4" />
              Unverified Assumptions (Requires Pilot Testing)
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {epistemicAudit.unverifiedAssumptions.map((assump, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-mono mt-0.5">?</span>
                  <span>{assump}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Insufficient Verified Evidence */}
          <div className="bg-slate-950/80 border border-rose-900/60 rounded-xl p-4">
            <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 mb-2.5">
              <HelpCircle className="w-4 h-4" />
              "INSUFFICIENT VERIFIED EVIDENCE" Notices
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {epistemicAudit.insufficientEvidenceFlags.map((flag, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-rose-400 font-mono mt-0.5">!</span>
                  <span className="font-mono text-rose-200/90">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Verified Primary & Secondary Sources Deck */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              <FileCheck className="w-4 h-4" />
              <span>Verified Evidence & Direct Citations</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 font-sans">
              Primary Sources, Official Registers & Technical Filings
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            {sources.length} Validated Sources
          </span>
        </div>

        <div className="space-y-3">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 p-4 rounded-xl flex flex-wrap items-start justify-between gap-3 transition-colors"
            >
              <div className="flex-1 min-w-[280px]">
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      src.sourceType.includes("GOVERNMENT") || src.sourceType.includes("PRIMARY")
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                    }`}
                  >
                    {src.sourceType.replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Date: {src.date}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-200 font-sans">{src.title}</h4>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  <strong className="text-slate-300 font-mono">Claim Verified:</strong> {src.keyClaimVerified}
                </p>
              </div>

              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-800/60 px-3 py-2 rounded-lg transition-colors shrink-0"
                >
                  <span>Open Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
