import React, { useState } from "react";
import { Search, Globe, Filter, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Compass, Zap } from "lucide-react";

interface ResearchFormProps {
  onExecute: (params: {
    topic: string;
    targetMarket: string;
    researchMode: "FULL_DISCOVERY" | "COMPETITIVE_DEEP_DIVE" | "CUSTOMER_DEMAND_AUDIT" | "COMMERCIAL_EVALUATION" | "GAP_DETECTION";
    additionalContext?: string;
  }) => void;
  onSelectBenchmark: (key: string) => void;
  activeBenchmarkKey: string | null;
  isLoading: boolean;
}

const TARGET_MARKETS = [
  { id: "Portugal & EU", label: "🇵🇹 Portugal & EU", desc: "SAF-T, ViDA, Iberian SMEs" },
  { id: "United Kingdom", label: "🇬🇧 United Kingdom", desc: "Common law, London tech, SRA AI rules" },
  { id: "Middle East (UAE & Saudi Arabia)", label: "🇦🇪 Middle East (GCC)", desc: "Vision 2030, ZATCA, Dubai Trade" },
  { id: "European Union", label: "🇪🇺 European Union", desc: "GDPR, EU AI Act, Cross-border B2B" },
  { id: "United States", label: "🇺🇸 United States", desc: "Enterprise B2B, Delaware C-corps" },
  { id: "Canada", label: "🇨🇦 Canada", desc: "B2B SaaS, federal/provincial compliance" },
  { id: "Global / Multi-Market", label: "🌐 Global / Multi-Market", desc: "Cross-jurisdiction opportunity discovery" },
];

const RESEARCH_MODES = [
  {
    id: "FULL_DISCOVERY",
    name: "Full Autonomous Market Discovery",
    desc: "Comprehensive 5-pillar intelligence dossier with 11-factor commercial scoring matrix.",
  },
  {
    id: "COMPETITIVE_DEEP_DIVE",
    name: "Competitive Intelligence & Vulnerabilities",
    desc: "Direct/indirect rivals, verified pricing models, positioning, and market gaps.",
  },
  {
    id: "CUSTOMER_DEMAND_AUDIT",
    name: "Customer Needs & Willingness-to-Pay",
    desc: "High-friction operational problems, financial cost impact, and spending proof.",
  },
  {
    id: "COMMERCIAL_EVALUATION",
    name: "11-Factor Commercial Scoring Matrix",
    desc: "Rigorous 1-10 assessment with verified evidence rules and epistemic audit.",
  },
  {
    id: "GAP_DETECTION",
    name: "Market Gap & Underserved Niches",
    desc: "Uncontested white spaces, regulatory shifts, and capital-efficient wedges.",
  },
];

const PRESETS = [
  {
    topic: "AI automated bookkeeping & tax audit SaaS for SMEs in Portugal under new ViDA rules",
    market: "Portugal & EU",
    benchmarkKey: "portugal-eu-tax",
    tag: "🇵🇹 Portugal / EU Mandate",
  },
  {
    topic: "B2B contract risk triaging and MSAs/NDAs automated redline tool for UK mid-market",
    market: "United Kingdom",
    benchmarkKey: "uk-legal-ai",
    tag: "🇬🇧 UK LegalTech",
  },
  {
    topic: "Automated customs clearing and bilingual Arabic/English HS coding for freight forwarders in UAE and Saudi Arabia",
    market: "Middle East (UAE & Saudi Arabia)",
    benchmarkKey: "middle-east-logistics",
    tag: "🇦🇪 GCC Re-Export / ZATCA",
  },
  {
    topic: "B2B open-source AI agent orchestrator for invoice discrepancy resolution in enterprise ERPs",
    market: "Global / Multi-Market",
    benchmarkKey: null,
    tag: "🌐 Global Enterprise AI",
  },
];

export const ResearchForm: React.FC<ResearchFormProps> = ({
  onExecute,
  onSelectBenchmark,
  activeBenchmarkKey,
  isLoading,
}) => {
  const [topic, setTopic] = useState("");
  const [targetMarket, setTargetMarket] = useState("Portugal & EU");
  const [researchMode, setResearchMode] = useState<
    "FULL_DISCOVERY" | "COMPETITIVE_DEEP_DIVE" | "CUSTOMER_DEMAND_AUDIT" | "COMMERCIAL_EVALUATION" | "GAP_DETECTION"
  >("FULL_DISCOVERY");
  const [additionalContext, setAdditionalContext] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onExecute({
      topic: topic.trim(),
      targetMarket,
      researchMode,
      additionalContext: additionalContext.trim(),
    });
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setTopic(preset.topic);
    setTargetMarket(preset.market);
    if (preset.benchmarkKey) {
      onSelectBenchmark(preset.benchmarkKey);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
      {/* Directive Bar */}
      <div className="border-b border-slate-800 bg-slate-950/50 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
            Autonomous Investigation Dispatcher
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-cyan-400/90">Agent 02 Terminal</span>
        </div>

        {/* Live Grounding Indicator */}
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Google Search Grounding: Active</span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Curated Benchmark Directives */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Verified Benchmark Intelligence Reports (Instant Load):
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PRESETS.map((p, idx) => {
              const isSelected = activeBenchmarkKey === p.benchmarkKey;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-cyan-950/60 border-cyan-500 text-cyan-100 shadow-md shadow-cyan-950"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                  }`}
                >
                  <span className="font-mono text-[11px] font-semibold text-cyan-400 mb-1">{p.tag}</span>
                  <span className="line-clamp-2 text-slate-200">{p.topic}</span>
                  {p.benchmarkKey && (
                    <span className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Pre-verified Dossier
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
              Research Question or Commercial Hypothesis:
            </label>
            <div className="relative">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Investigate B2B SaaS demand for automated ESG and CSRD supply chain reporting for mid-sized manufacturers in Portugal and the EU..."
                rows={2}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans transition-all resize-y"
              />
              <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                <span className="text-[11px] font-mono text-slate-500">
                  {topic.length > 0 ? `${topic.length} chars` : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Target Region and Research Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Target Geography / Jurisdiction:
              </label>
              <select
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                {TARGET_MARKETS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} ({m.desc})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                Research Directive Scope:
              </label>
              <select
                value={researchMode}
                onChange={(e) => setResearchMode(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                {RESEARCH_MODES.map((rm) => (
                  <option key={rm.id} value={rm.id}>
                    {rm.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Context Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
            >
              <span>{isExpanded ? "▾ Hide" : "▸ Add"} Business Constraints / Capital / Competitor Target (Optional)</span>
            </button>
            {isExpanded && (
              <div className="mt-2">
                <input
                  type="text"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="e.g., Bootstrapped budget under €10k, must produce MRR within 60 days, focus on low-code or open-source stack"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            )}
          </div>

          {/* Submission and Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Strict Rule: Unsupported claims will be flagged as "INSUFFICIENT VERIFIED EVIDENCE"</span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl text-xs font-mono tracking-wide shadow-lg shadow-cyan-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Agent 02 Investigating...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Dispatch Agent 02 Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
