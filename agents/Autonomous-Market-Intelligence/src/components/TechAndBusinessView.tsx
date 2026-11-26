import React from "react";
import { MonetizationModel } from "../data/benchmarkDossiers.ts";
import { Cpu, DollarSign, Terminal, Layers, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";

interface TechAndBusinessViewProps {
  viableTechnologies: string[];
  openSourceAndFreeTools: string[];
  capitalEfficiencyAssessment: string;
  monetizationModels: MonetizationModel[];
}

export const TechAndBusinessView: React.FC<TechAndBusinessViewProps> = ({
  viableTechnologies,
  openSourceAndFreeTools,
  capitalEfficiencyAssessment,
  monetizationModels,
}) => {
  return (
    <div className="space-y-6">
      {/* Capital Efficiency Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
          <DollarSign className="w-4 h-4" />
          <span>Section 2.D // Capital Efficiency & Lean Commercialization</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 font-sans mb-2">
          Operational Feasibility & Capex Assessment
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
          {capitalEfficiencyAssessment}
        </p>
      </div>

      {/* Tech Stack & Open Source Leverage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Viable Tech Stack */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <Cpu className="w-4 h-4" />
            <span>Production Tech Architecture</span>
          </div>
          <h4 className="text-sm font-bold text-slate-100 mb-3">
            Commercially Realistic Technology Stack
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {viableTechnologies.map((tech, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                <span className="font-mono text-cyan-400 font-bold mt-0.5">0{idx + 1}</span>
                <span className="font-sans leading-relaxed">{tech}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Open-Source & Free Tools Leverage */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>Capex Reduction via Open Source</span>
          </div>
          <h4 className="text-sm font-bold text-slate-100 mb-3">
            Open-Source Components & Free Tier Tools
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {openSourceAndFreeTools.map((tool, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                <span className="font-mono text-emerald-400 font-bold mt-0.5">⚡</span>
                <span className="font-sans leading-relaxed">{tool}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recurring Monetization Models & Projected ARPU */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
          <TrendingUp className="w-4 h-4" />
          <span>Section 2.E // Recurring Revenue Models & Unit Economics</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 font-sans mb-4">
          Monetization Strategy & Estimated ARPU
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {monetizationModels.map((model, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                    Revenue Stream #{idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      model.scalability === "HIGH"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                    }`}
                  >
                    {model.scalability} SCALABILITY
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 font-sans mb-3">{model.model}</h4>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Projected ARPU:</span>
                <span className="text-emerald-400 font-bold">{model.projectedArpu}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
