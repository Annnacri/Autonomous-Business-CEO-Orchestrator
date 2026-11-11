import React, { useState } from 'react';
import { ShieldCheck, Calculator, HelpCircle, AlertCircle, Sparkles, Filter } from 'lucide-react';
import { EVIDENCE_REGISTRY } from '../data/executiveDeliverables';
import { FactType } from '../types/business';

interface EvidenceRegistryViewProps {
  onChallengeAssumption: (assumptionText: string, path: string) => void;
}

export const EvidenceRegistryView: React.FC<EvidenceRegistryViewProps> = ({
  onChallengeAssumption,
}) => {
  const [filterType, setFilterType] = useState<FactType | 'ALL'>('ALL');
  const [filterPath, setFilterPath] = useState<string>('ALL');

  const filteredEvidence = EVIDENCE_REGISTRY.filter((item) => {
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (filterPath !== 'ALL' && item.path !== filterPath && item.path !== 'Both') return false;
    return true;
  });

  const factCount = EVIDENCE_REGISTRY.filter((i) => i.type === 'VERIFIED_FACT').length;
  const estimateCount = EVIDENCE_REGISTRY.filter((i) => i.type === 'ESTIMATE').length;
  const assumptionCount = EVIDENCE_REGISTRY.filter((i) => i.type === 'ASSUMPTION').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Deliverable 03 · Epistemological Foundation
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Evidence Registry & Empirical Validation Ledger
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Operating Rule Enforcement: All market claims, conversion rates, and revenue projections are explicitly categorized into Verified Facts, Mathematical Estimates, or Testable Assumptions.
        </p>
      </div>

      {/* Filter and Count Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800 w-full md:w-auto overflow-x-auto text-xs">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
              filterType === 'ALL'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Items ({EVIDENCE_REGISTRY.length})
          </button>

          <button
            onClick={() => setFilterType('VERIFIED_FACT')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              filterType === 'VERIFIED_FACT'
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800/80'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Facts ({factCount})
          </button>

          <button
            onClick={() => setFilterType('ESTIMATE')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              filterType === 'ESTIMATE'
                ? 'bg-indigo-950/90 text-indigo-300 border border-indigo-800/80'
                : 'text-slate-400 hover:text-indigo-300'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-400" />
            Estimates ({estimateCount})
          </button>

          <button
            onClick={() => setFilterType('ASSUMPTION')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              filterType === 'ASSUMPTION'
                ? 'bg-amber-950/90 text-amber-300 border border-amber-800/80'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            Assumptions ({assumptionCount})
          </button>
        </div>

        {/* Path Filter */}
        <div className="flex items-center gap-2 text-xs w-full md:w-auto justify-end">
          <span className="text-slate-400">Filter Path:</span>
          <select
            value={filterPath}
            onChange={(e) => setFilterPath(e.target.value)}
            className="bg-slate-950 text-slate-200 border border-slate-700 rounded-md px-2.5 py-1 text-xs cursor-pointer focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">Both Paths</option>
            <option value="Path A">Path A (Existing Assets)</option>
            <option value="Path B">Path B (New Venture)</option>
          </select>
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvidence.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    item.type === 'VERIFIED_FACT'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : item.type === 'ESTIMATE'
                      ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}
                >
                  {item.type.replace('_', ' ')}
                </span>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-[11px]">{item.path}</span>
                  <span>·</span>
                  <span className="font-mono text-white text-[11px] font-semibold">
                    {item.confidenceScore}% Confidence
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mt-2 leading-snug">
                {item.title}
              </h4>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="text-[11px] text-slate-400 truncate max-w-[240px]">
                <strong className="text-slate-300">Source:</strong> {item.sourceOrBasis}
              </div>

              {item.type === 'ASSUMPTION' && (
                <button
                  onClick={() => onChallengeAssumption(item.description, item.path)}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Stress Test</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Epistemological Framework Notice */}
      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
        <div className="font-semibold text-slate-300">
          CEO Epistemological Policy:
        </div>
        <p>
          - <strong>VERIFIED FACT:</strong> Documented data point from primary industry registries, vendor rate sheets, or confirmed existing codebases.
        </p>
        <p>
          - <strong>ESTIMATE:</strong> Mathematical projection derived from standard B2B conversion funnels and SaaS unit economics.
        </p>
        <p>
          - <strong>ASSUMPTION:</strong> Hypothesis requiring empirical proof during the 7-day sprint before committing capital.
        </p>
      </div>
    </div>
  );
};
