import React, { useState } from 'react';
import { DollarSign, Check, TrendingUp, Layers, HelpCircle } from 'lucide-react';
import { MONETIZATION_MODELS } from '../data/executiveDeliverables';

export const MonetizationModelsView: React.FC = () => {
  const [activeModelId, setActiveModelId] = useState<string>('mon-hotel-concierge');
  const [hotelCount, setHotelCount] = useState<number>(10);
  const [blendedPrice, setBlendedPrice] = useState<number>(79);

  const currentModel =
    MONETIZATION_MODELS.find((m) => m.id === activeModelId) || MONETIZATION_MODELS[0];

  // Simulator calculations
  const monthlyRevenue = hotelCount * blendedPrice;
  const monthlyCogs = hotelCount * 7.10; // $7.10 avg COGS per hotel
  const netMonthlyProfit = monthlyRevenue - monthlyCogs;
  const annualRunRate = monthlyRevenue * 12;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Deliverable 06 · Commercial Architecture
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Proposed Monetization Models & Unit Economics
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Packaging, pricing tiers, and mathematical unit economics for the evaluated business opportunities. Rigorous gross margin and payback analysis.
        </p>
      </div>

      {/* Model Selector Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto text-xs">
        {MONETIZATION_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => setActiveModelId(model.id)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeModelId === model.id
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {model.name} ({model.structure})
          </button>
        ))}
      </div>

      {/* Pricing Tiers Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {currentModel.product} Pricing Architecture
          </h3>
          <span className="text-xs font-mono text-emerald-400">
            Structure: {currentModel.structure}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentModel.pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-5 border flex flex-col justify-between ${
                tier.recommended
                  ? 'bg-slate-900 border-2 border-emerald-500/60 shadow-lg'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{tier.name}</span>
                  {tier.recommended && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-bold">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    {tier.price}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    / {tier.cadence}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {tier.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                    What is Included:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-400">
                  Zero setup fee on 14-day founding pilot
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Economics Breakdown Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Unit Economics & Payback Metrics ({currentModel.product})
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-slate-400">Target LTV</div>
            <div className="text-base font-bold text-white font-mono mt-1">
              {currentModel.unitEconomics.targetLtv}
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-slate-400">Estimated CAC</div>
            <div className="text-base font-bold text-white font-mono mt-1">
              {currentModel.unitEconomics.targetCac}
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-slate-400">Payback Window</div>
            <div className="text-base font-bold text-emerald-400 font-mono mt-1">
              {currentModel.unitEconomics.paybackMonths}
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-slate-400">Gross Margin</div>
            <div className="text-base font-bold text-emerald-400 font-mono mt-1">
              {currentModel.unitEconomics.grossMargin}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 text-xs text-slate-300">
          <strong className="text-white">COGS Anatomy:</strong> {currentModel.unitEconomics.cogsBreakdown}
        </div>
      </div>

      {/* Interactive Scaling Simulator for AI Hotel Concierge */}
      {activeModelId === 'mon-hotel-concierge' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Hotel Concierge Cashflow Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate monthly recurring revenue, LLM token COGS, and profit as customer count scales.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800 self-start md:self-auto">
              Net Margin: {((netMonthlyProfit / monthlyRevenue) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Paying Hotel Clients:</span>
                <span className="text-white font-mono font-bold">{hotelCount} Properties</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={hotelCount}
                onChange={(e) => setHotelCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 Hotel</span>
                <span>25 Hotels</span>
                <span>50 Hotels</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Average Plan Price:</span>
                <span className="text-white font-mono font-bold">${blendedPrice}/month</span>
              </div>
              <input
                type="range"
                min="69"
                max="149"
                step="10"
                value={blendedPrice}
                onChange={(e) => setBlendedPrice(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$69 (Starter)</span>
                <span>$99 (Blended)</span>
                <span>$149 (Growth)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Monthly Gross Revenue</div>
              <div className="text-lg font-bold text-white font-mono mt-1">
                ${monthlyRevenue.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-slate-400">Estimated LLM & Host COGS</div>
              <div className="text-lg font-bold text-slate-300 font-mono mt-1">
                ${monthlyCogs.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-slate-400">Monthly Net Cashflow</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                ${netMonthlyProfit.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-slate-400">Annual Run-Rate (ARR)</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                ${annualRunRate.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
