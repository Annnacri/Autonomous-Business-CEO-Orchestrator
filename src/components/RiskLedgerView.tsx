import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { RISK_REGISTRY } from '../data/executiveDeliverables';

interface RiskLedgerViewProps {
  onChallengeRisk: (riskTitle: string, path: string) => void;
}

export const RiskLedgerView: React.FC<RiskLedgerViewProps> = ({ onChallengeRisk }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredRisks = RISK_REGISTRY.filter((r) => {
    if (selectedCategory === 'ALL') return true;
    return r.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
          Deliverable 07 · Risk & Vulnerability Governance
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Risks, Uncertainties & Mitigation Playbooks
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Ruthless red-teaming of operational, technical, and distribution vulnerabilities. Every risk is scored by probability and impact, with early warning signals and concrete counter-measures.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto text-xs">
        {['ALL', 'Distribution', 'Technical', 'Market', 'Financial'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-800 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'ALL' ? 'All Risks' : `${cat} Risks`}
          </button>
        ))}
      </div>

      {/* Risk Cards */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <div
            key={risk.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded uppercase border ${
                      risk.riskScore >= 15
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : risk.riskScore >= 10
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Score: {risk.riskScore} · {risk.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{risk.path}</span>
                </div>

                <h3 className="text-base font-bold text-white mt-1">
                  {risk.title}
                </h3>
              </div>

              {/* Score Badges */}
              <div className="flex items-center gap-3 shrink-0 text-xs">
                <div className="text-center px-3 py-1.5 bg-slate-950 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono">PROBABILITY</div>
                  <div className="font-bold text-white font-mono">{risk.probability} / 5</div>
                </div>
                <div className="text-center px-3 py-1.5 bg-slate-950 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono">IMPACT</div>
                  <div className="font-bold text-white font-mono">{risk.impact} / 5</div>
                </div>
                <button
                  onClick={() => onChallengeRisk(risk.title, risk.path)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 rounded font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-700 transition-colors whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Stress Test</span>
                </button>
              </div>
            </div>

            {/* Unmitigated & Early Warning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3 bg-rose-950/20 rounded-lg border border-rose-900/30">
                <div className="font-semibold text-rose-400 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Unmitigated Worst-Case Downside:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {risk.unmitigatedOutcome}
                </p>
              </div>

              <div className="p-3 bg-amber-950/20 rounded-lg border border-amber-900/30">
                <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  48-Hour Early Warning Signal:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {risk.earlyWarningSignal}
                </p>
              </div>
            </div>

            {/* Actionable Mitigation Playbook */}
            <div className="mt-4 p-3.5 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
              <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Actionable CEO Mitigation Playbook:
              </div>
              <p className="text-slate-200 leading-relaxed">
                {risk.mitigationPlaybook}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
