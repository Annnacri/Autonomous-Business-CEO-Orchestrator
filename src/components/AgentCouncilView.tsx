import React, { useState } from 'react';
import { MissionControlView } from './MissionControlView';
import { Bot, Send, Sparkles, MessageSquare, ShieldCheck, ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react';
import { AGENT_REPORTS, COUNCIL_DEBATE } from '../data/agentCouncilData';
import { AgentReport } from '../types/business';

export const AgentCouncilView: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('ceo');
  const [activeTab, setActiveTab] = useState<'reports' | 'debate' | 'consult'>('reports');
  const [consultPrompt, setConsultPrompt] = useState<string>('');
  const [consultResponse, setConsultResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentAgent =
    AGENT_REPORTS.find((a) => a.id === selectedAgentId) || AGENT_REPORTS[0];

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultPrompt.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);
    setConsultResponse(null);

    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: `[Agente Foco: ${currentAgent.name} - ${currentAgent.role}] ${consultPrompt}`,
          context: 'breakfastinbedlx.com (pequenos-almocos artesanais e parcerias B2B com Alojamento Local em Lisboa) e portfolio de agentes/apps AI de turismo (AI Hotel Concierge, AI Tourguide Creator). Regra: $0 gasto nao autorizado, foco em receita imediata.',
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      const r = data.result;
      const formatted = [
        `👑 DECISÃO CEO:\n${r.ceoDecision}`,
        `📈 AGENTE COMERCIAL:\n${r.commercialAgent}`,
        `⚙️ AGENTE DE OPERAÇÕES:\n${r.operationsAgent}`,
        `✅ PRÓXIMAS AÇÕES:\n${(r.nextActions || []).map((a: string, i: number) => `${i + 1}. ${a}`).join('\n')}`
      ].join('\n\n');
      setConsultResponse(formatted);
    } catch (err: any) {
      console.error('Consultation failed:', err);
      setErrorMsg(err.message || 'Failed to communicate with agent.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setConsultPrompt(question);
    setActiveTab('consult');
  };

  return (
    <div className="space-y-6">`r`n      <MissionControlView />
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Orchestration Hub Â· Multi-Agent Governance
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Autonomous AI Agent Council & Interrogation Room
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          The CEO coordinates 5 specialized agents to debate, scrutinize, and synthesize opportunities. Inspect their individual findings or query any agent live using server-side Gemini 3.8 Flash.
        </p>
      </div>

      {/* Agent Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {AGENT_REPORTS.map((agent) => {
          const isSelected = agent.id === selectedAgentId;
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-indigo-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-indigo-400 font-bold uppercase">
                    {agent.id === 'ceo' ? 'Lead' : 'Specialist'}
                  </span>
                  <Bot className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                </div>
                <div className="font-bold text-xs text-white truncate">
                  {agent.name}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-1">
                {agent.role.split(' ')[0]} {agent.role.split(' ')[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sub-Tabs: Dossier vs Council Debate vs Live Consultation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {currentAgent.name} Structured Report
        </button>

        <button
          onClick={() => setActiveTab('debate')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'debate'
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Council Deliberation Transcript
        </button>

        <button
          onClick={() => setActiveTab('consult')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'consult'
              ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
              : 'text-indigo-400 hover:text-indigo-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interrogate {currentAgent.name} (Live AI)</span>
        </button>
      </div>

      {/* Tab 1: Agent Dossier */}
      {activeTab === 'reports' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">
                {currentAgent.name} Â· {currentAgent.role}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                <strong>Core Thesis:</strong> {currentAgent.coreThesis}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('consult')}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask {currentAgent.name}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
              <div className="font-semibold text-emerald-400 mb-1">Key Verdict</div>
              <p className="text-slate-300 leading-relaxed">{currentAgent.keyVerdict}</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
              <div className="font-semibold text-indigo-400 mb-1">Top Recommendation</div>
              <p className="text-slate-300 leading-relaxed">{currentAgent.topRecommendation}</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
              <div className="font-semibold text-amber-400 mb-1">Strongest Warning</div>
              <p className="text-slate-300 leading-relaxed">{currentAgent.strongestWarning}</p>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            {currentAgent.detailedReportSections.map((sec, idx) => (
              <div key={idx} className="space-y-2 text-xs">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                  {sec.heading}
                </h4>
                <div className="space-y-1.5 text-slate-300 leading-relaxed pl-2 border-l border-slate-800">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Council Debate Log */}
      {activeTab === 'debate' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              Executive Council Strategic Deliberation Transcript
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Recorded Session Â· AI Executive Council
            </span>
          </div>

          <div className="space-y-3">
            {COUNCIL_DEBATE.map((turn) => (
              <div
                key={turn.id}
                className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{turn.speakerName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ({turn.timestamp})
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      turn.stance === 'Support Path A'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : turn.stance === 'Support Path B'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : turn.stance === 'Financial Check'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    }`}
                  >
                    {turn.stance}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-indigo-400">
                  Topic: {turn.topic}
                </div>

                <p className="text-slate-300 leading-relaxed pt-1">
                  {turn.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Live Consultation Terminal */}
      {activeTab === 'consult' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Interrogating: {currentAgent.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Role: {currentAgent.role} Â· Grounded in verified facts, estimates, and $0 capital policy.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Gemini 3.8 Flash Online
            </span>
          </div>

          {/* Quick Prompts */}
          <div className="space-y-1.5">
            <div className="text-[11px] text-slate-400 uppercase font-mono">
              Quick Inquiries for {currentAgent.name}:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleQuickQuestion(
                    'What if our hotel cold outreach conversion rate is only 2% instead of 8%? What is our tactical fallback?'
                  )
                }
                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors cursor-pointer text-left"
              >
                Conversion Sensitivity (2% vs 8%)
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickQuestion(
                    'Why should we strictly avoid spending $12 on a custom domain before Day 3?'
                  )
                }
                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors cursor-pointer text-left"
              >
                Challenge the $12 Domain Spend
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickQuestion(
                    'How do we pitch a boutique inn GM whose front desk staff is resistant to AI tools?'
                  )
                }
                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors cursor-pointer text-left"
              >
                Front-Desk Staff Resistance Playbook
              </button>
            </div>
          </div>

          {/* Prompt Form */}
          <form onSubmit={handleConsultSubmit} className="space-y-3">
            <textarea
              rows={3}
              value={consultPrompt}
              onChange={(e) => setConsultPrompt(e.target.value)}
              placeholder={`Enter directive or question for ${currentAgent.name}...`}
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-3 text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Model: gemini-3.8-flash Â· Zero client-side API exposure
              </span>

              <button
                type="submit"
                disabled={isLoading || !consultPrompt.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deliberating...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch to {currentAgent.name.split(' ')[0]}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Notice */}
          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-800 rounded-lg text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          {/* Response Box */}
          {consultResponse && (
            <div className="p-5 bg-slate-950 rounded-xl border border-indigo-900/50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-xs text-indigo-400">
                  {currentAgent.name} Formal Response
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Just now
                </span>
              </div>
              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {consultResponse}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


