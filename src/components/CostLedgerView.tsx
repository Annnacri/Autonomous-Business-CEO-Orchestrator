import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { INITIAL_BUDGET_LEDGER } from '../data/executiveDeliverables';
import { BudgetItem } from '../types/business';

export const CostLedgerView: React.FC = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(INITIAL_BUDGET_LEDGER);

  const toggleAuthorization = (id: string) => {
    setBudgetItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, authorized: !item.authorized } : item
      )
    );
  };

  const totalEstimatedCost = budgetItems.reduce((acc, curr) => acc + curr.estimatedCost, 0);
  const authorizedSpend = budgetItems
    .filter((i) => i.authorized)
    .reduce((acc, curr) => acc + curr.estimatedCost, 0);
  const pendingSpend = totalEstimatedCost - authorizedSpend;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Deliverable 04 · Financial Guardrails & Capital Allocation
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Treasury Ledger & Human Authorization Controls
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Operating Rule Enforcement: All operational spending is capped at $0.00 until explicitly authorized by a human. Zero autonomous financial transactions are permitted.
        </p>
      </div>

      {/* 3-Stat KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Current Actual Cash Outlay
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            $0.00
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Running 100% on free tiers & existing code
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Pending Requested Authorization
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
            ${pendingSpend.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Optional enhancements (domain, acrylic stands)
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Breakeven Requirement
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            1 Customer ($79/mo)
          </div>
          <div className="text-xs text-slate-400 mt-1">
            First month covers all optional tools for 1.5 years
          </div>
        </div>
      </div>

      {/* Human Authorization Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              Human Spending Authorization Table
            </h3>
            <span className="text-xs text-slate-400">
              Toggle authorization switches below to permit or block expenditure
            </span>
          </div>
          <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
            Rule Status: Non-autonomous Active
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Line Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Required Day</th>
                <th className="py-3 px-4 text-right">Estimated Cost</th>
                <th className="py-3 px-4">Fallback Strategy ($0)</th>
                <th className="py-3 px-4 text-center">Human Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {budgetItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{item.item}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.notes}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    Day {item.requiredForDay}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    ${item.estimatedCost.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px] max-w-xs">
                    {item.mandatoryRuleStatus}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => toggleAuthorization(item.id)}
                      className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 mx-auto ${
                        item.authorized
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {item.authorized ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Authorized</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Authorize</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Free Tier Stack Specification */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">
          Zero-Cost Infrastructure Stack Specification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-semibold text-white">Hosting & CDN</div>
            <div className="text-emerald-400 font-mono mt-1">Vercel / Cloudflare ($0)</div>
            <p className="text-slate-400 text-[11px] mt-1">
              Supports 100k requests/month on free tier with 99.99% uptime.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-semibold text-white">AI Reasoning API</div>
            <div className="text-emerald-400 font-mono mt-1">Gemini 3.8 Flash</div>
            <p className="text-slate-400 text-[11px] mt-1">
              Free tier allocation easily handles thousands of concierge test turns.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-semibold text-white">QR Code Generation</div>
            <div className="text-emerald-400 font-mono mt-1">Open Source Canvas ($0)</div>
            <p className="text-slate-400 text-[11px] mt-1">
              Client-side SVG/PNG render; zero external subscription required.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-semibold text-white">Payment Gateway</div>
            <div className="text-emerald-400 font-mono mt-1">Stripe Billing ($0 Upfront)</div>
            <p className="text-slate-400 text-[11px] mt-1">
              Only pays 2.9% + 30¢ when actual revenue is collected from customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
