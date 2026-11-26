import React from "react";
import { CustomerProblem, CustomerSegment } from "../data/benchmarkDossiers.ts";
import { Users, AlertTriangle, DollarSign, Flame, ThumbsDown, SearchCheck } from "lucide-react";

interface CustomerDemandViewProps {
  segments: CustomerSegment[];
  problems: CustomerProblem[];
  unmetNeeds: string[];
  recurringComplaints: string[];
}

export const CustomerDemandView: React.FC<CustomerDemandViewProps> = ({
  segments,
  problems,
  unmetNeeds,
  recurringComplaints,
}) => {
  return (
    <div className="space-y-6">
      {/* Target Customer Segments with Purchasing Power */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
          <Users className="w-4 h-4" />
          <span>Section 2.B // Customer & Demand Intelligence</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 font-sans mb-4">
          Target Customer Segments & Purchasing Power
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-slate-100 font-sans">{seg.segment}</h4>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        seg.purchasingPower === "HIGH"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : seg.purchasingPower === "MEDIUM"
                          ? "bg-cyan-950 text-cyan-300 border border-cyan-800"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {seg.purchasingPower} BUDGET
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        seg.urgency === "CRITICAL"
                          ? "bg-rose-950 text-rose-300 border border-rose-800"
                          : seg.urgency === "HIGH"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {seg.urgency} URGENCY
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{seg.profile}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expensive Operational Problems & Willingness-to-Pay Proof */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
          <Flame className="w-4 h-4" />
          <span>Acutely Expensive Customer Problems</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 font-sans mb-1">
          Operational Inefficiencies & Willingness to Pay Evidence
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Evaluating whether the customer pain is financially severe enough to ensure immediate software budget allocation.
        </p>

        <div className="space-y-4">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-xs text-slate-400 shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 font-sans leading-snug">
                    {prob.problem}
                  </h4>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    prob.severity === "CRITICAL"
                      ? "bg-rose-950 text-rose-300 border border-rose-800/80"
                      : prob.severity === "HIGH"
                      ? "bg-amber-950 text-amber-300 border border-amber-800/80"
                      : "bg-cyan-950 text-cyan-300 border border-cyan-800/80"
                  }`}
                >
                  {prob.severity} SEVERITY
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] uppercase tracking-wider text-rose-400 flex items-center gap-1 mb-1 font-bold">
                    <DollarSign className="w-3.5 h-3.5" />
                    Direct Financial Burn / Cost:
                  </span>
                  <p className="text-slate-200 font-sans">{prob.financialCost}</p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1 font-bold">
                    <SearchCheck className="w-3.5 h-3.5" />
                    Willingness-to-Pay Proof:
                  </span>
                  <p className="text-slate-200 font-sans">{prob.willingnessToPayEvidence}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unmet Needs & Recurring Customer Gripes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unmet Needs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <SearchCheck className="w-4 h-4" />
            <span>Unmet Customer Needs</span>
          </div>
          <h4 className="text-sm font-bold text-slate-100 mb-3">
            What Customers Actively Search For But Cannot Find
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {unmetNeeds.map((need, i) => (
              <li key={i} className="flex items-start space-x-2 bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg">
                <span className="text-cyan-400 font-mono font-bold mt-0.5">•</span>
                <span>{need}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recurring Complaints */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
            <ThumbsDown className="w-4 h-4" />
            <span>Recurring Complaints on Incumbents</span>
          </div>
          <h4 className="text-sm font-bold text-slate-100 mb-3">
            Documented Friction Points with Current Vendors
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {recurringComplaints.map((comp, i) => (
              <li key={i} className="flex items-start space-x-2 bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg">
                <span className="text-rose-400 font-mono font-bold mt-0.5">✕</span>
                <span>{comp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
