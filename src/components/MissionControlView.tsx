import React, { useState } from 'react';
import { Play, RefreshCw, Bot, CheckCircle, XCircle, Clock } from 'lucide-react';

const AGENTS = [
  { id: 'autonomous_market_intelligence', name: 'Autonomous Market Intelligence' },
  { id: 'business_strategy', name: 'Business Strategy & Growth' },
  { id: 'financial_intelligence', name: 'Financial Intelligence' },
  { id: 'global_opportunity_hunter', name: 'Global Opportunity Hunter' },
  { id: 'market_research', name: 'Market Research' }
];

const BUSINESS_OBJECTIVE = `
Business: Breakfast in Bed LX.
Location: Lisbon, Portugal.

Main objective:
Generate revenue and acquire customers.

Target customers:
1. International tourists booking directly.
2. Airbnb and local accommodation hosts.
3. Property managers.
4. Boutique hotels and guesthouses.

Priority Lisbon areas:
Penha de França, Graça, São Vicente, Santa Clara,
Santa Apolónia, Arroios and Alfama.

Commercial rules:
- Preserve premium positioning.
- No discounts or promotional coupons.
- Hosts receive 10% commission.
- Direct tourist bookings remain equally important.
- No unauthorized spending.
- Do not send external communications without the required approval.
- Produce actionable, evidence-based commercial opportunities.
`;

export const MissionControlView: React.FC = () => {
  const [objective, setObjective] = useState(
    'Identify qualified prospects, commercial opportunities and the highest-priority actions to generate revenue for Breakfast in Bed LX.'
  );

  const [mission, setMission] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runMission = async () => {
    if (loading || !objective.trim()) return;

    setLoading(true);
    setError('');
    setMission(null);

    try {
      const response = await fetch('/api/missions/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective: `${BUSINESS_OBJECTIVE}\n\nMISSION:\n${objective}`,
          executionMode: 'parallel',
          tasks: AGENTS.map(agent => ({
            agentId: agent.id,
            payload: {
              objective,
              prompt: objective,
              businessContext: BUSINESS_OBJECTIVE,
              targetMarket: 'Lisbon, Portugal',
              instructions: 'Return actionable findings, evidence, priorities and recommended next steps. Do not send external communications or spend money.'
            }
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Mission execution failed.');
      }

      setMission(data.mission || data);
    } catch (err: any) {
      setError(err.message || 'Mission execution failed.');
    } finally {
      setLoading(false);
    }
  };

  const results = mission?.results || [];

  return (
    <div className="space-y-5">
      <div className="bg-slate-900 border border-indigo-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="text-indigo-400 w-5 h-5" />
          <h3 className="text-white font-bold text-lg">CEO Mission Control</h3>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Centralized multi-agent mission execution.
          Dispatch objectives to all five specialized agents.
        </p>

        <label className="block text-xs text-slate-300 mb-2">
          Mission objective
        </label>

        <textarea
          value={objective}
          onChange={e => setObjective(e.target.value)}
          rows={3}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <span className="text-xs text-slate-400">
            5 agents · Parallel execution · No unauthorized spending
          </span>

          <button
            onClick={runMission}
            disabled={loading || !objective.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-bold"
          >
            {loading
              ? <RefreshCw className="w-4 h-4 animate-spin" />
              : <Play className="w-4 h-4" />}
            {loading ? 'Executing Mission...' : 'Dispatch Mission to CEO'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {AGENTS.map(agent => {
          const result = results.find((r: any) => r.agentId === agent.id);

          return (
            <div key={agent.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                {result?.status === 'completed'
                  ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                  : result?.status === 'failed'
                  ? <XCircle className="w-4 h-4 text-red-400" />
                  : <Clock className="w-4 h-4 text-slate-500" />}
              </div>
              <div className="text-xs font-bold text-white">{agent.name}</div>
              <div className="text-[10px] text-slate-400 mt-2">
                {result
                  ? `${result.status.toUpperCase()} · ${result.durationMs} ms`
                  : loading ? 'Mission dispatched' : 'Awaiting mission'}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 rounded-lg p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {mission && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <h3 className="font-bold text-white">Mission Execution Report</h3>
              <p className="text-xs text-slate-400 mt-1">
                ID: {mission.id}
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-300">
              {mission.status?.toUpperCase()}
            </span>
          </div>

          {results.map((result: any, index: number) => {
            const agent = AGENTS.find(a => a.id === result.agentId);

            return (
              <div key={`${result.agentId}-${index}`}
                className="border border-slate-800 rounded-lg p-4">
                <div className="flex justify-between gap-3 mb-3">
                  <h4 className="text-sm font-bold text-white">
                    {agent?.name || result.agentId}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {result.durationMs} ms
                  </span>
                </div>

                {result.error && (
                  <p className="text-xs text-red-400">{result.error}</p>
                )}

                {result.data !== undefined && (
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap break-words overflow-x-auto max-h-96 overflow-y-auto">
                    {typeof result.data === 'string'
                      ? result.data
                      : JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
