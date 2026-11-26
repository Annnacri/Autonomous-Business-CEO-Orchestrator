import React from "react";
import { CriterionScore } from "../data/benchmarkDossiers.ts";
import { Scale, CheckCircle2, AlertTriangle, HelpCircle, TrendingUp, Info } from "lucide-react";

interface CommercialMatrixProps {
  criteriaScores: CriterionScore[];
  compositeScore: number;
  confidenceRating: "HIGH" | "MEDIUM" | "LOW";
}

export const CommercialMatrix: React.FC<CommercialMatrixProps> = ({
  criteriaScores,
  compositeScore,
  confidenceRating,
}) => {
  const verifiedCount = criteriaScores.filter((c) => c.status === "VERIFIED").length;
  const missingCount = criteriaScores.filter((c) => c.score === null || c.status === "NOT_ENOUGH_EVIDENCE").length;

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-purple-400 bg-purple-950/60 border-purple-800/80";
    if (score >= 8) return "text-emerald-400 bg-emerald-950/60 border-emerald-800/80";
    if (score >= 6) return "text-cyan-400 bg-cyan-950/60 border-cyan-800/80";
    if (score >= 4) return "text-amber-400 bg-amber-950/60 border-amber-800/80";
    return "text-rose-400 bg-rose-950/60 border-rose-800/80";
  };

  const getBarColor = (score: number | null) => {
    if (score === null) return "bg-purple-500";
    if (score >= 8) return "bg-emerald-500";
    if (score >= 6) return "bg-cyan-500";
    if (score >= 4) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="space-y-6">
      {/* Top Level Score Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-1">
            <Scale className="w-4 h-4" />
            Commercial Evaluation Framework // Section 4
          </span>
          <h3 className="text-lg font-bold text-slate-100 font-sans">
            11-Dimension Viability & Investment Scorecard
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Scored strictly on verified evidence. Criteria lacking conclusive market validation are explicitly marked "Not enough evidence" without manufactured scores.
          </p>
        </div>

        <div className="flex items-center space-x-6 bg-slate-950/80 border border-slate-800/80 rounded-xl px-5 py-3">
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Composite Viability
            </span>
            <div className="flex items-baseline justify-center space-x-1 mt-0.5">
              <span className="text-3xl font-extrabold font-mono text-cyan-300">{compositeScore}</span>
              <span className="text-xs font-mono text-slate-500">/ 10</span>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-slate-800" />

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Evidence Confidence
            </span>
            <div className="mt-1 flex items-center space-x-1.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold ${
                  confidenceRating === "HIGH"
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-800/80"
                    : confidenceRating === "MEDIUM"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-800/80"
                    : "bg-amber-950 text-amber-300 border border-amber-800/80"
                }`}
              >
                {confidenceRating} CONFIDENCE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Epistemic Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Verified Criteria:
          </span>
          <span className="font-bold text-slate-200">{verifiedCount} of 11</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            Estimated/Modeled:
          </span>
          <span className="font-bold text-slate-200">
            {criteriaScores.length - verifiedCount - missingCount} of 11
          </span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            Unknown / Insufficient:
          </span>
          <span className="font-bold text-slate-200">{missingCount} of 11</span>
        </div>
      </div>

      {/* 11 Criteria Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteriaScores.map((c, idx) => {
          const isMissing = c.score === null || c.status === "NOT_ENOUGH_EVIDENCE";
          return (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                      Criterion #{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 font-sans">{c.criterion}</h4>
                    <p className="text-xs text-slate-400 font-sans italic mt-0.5">"{c.question}"</p>
                  </div>

                  <div className={`px-2.5 py-1 rounded-lg border font-mono font-bold text-xs shrink-0 ${getScoreColor(c.score)}`}>
                    {isMissing ? "Not enough evidence" : `${c.score} / 10`}
                  </div>
                </div>

                {/* Score Bar */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden my-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getBarColor(c.score)}`}
                    style={{ width: `${c.score !== null ? (c.score / 10) * 100 : 0}%` }}
                  />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                  {c.rationale}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Status:</span>
                <span
                  className={
                    c.status === "VERIFIED"
                      ? "text-emerald-400 font-medium"
                      : c.status === "ESTIMATE"
                      ? "text-cyan-400 font-medium"
                      : "text-purple-400 font-medium"
                  }
                >
                  {c.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
