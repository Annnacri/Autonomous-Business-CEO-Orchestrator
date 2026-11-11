import React, { useState } from 'react';
import { Check, X, AlertCircle, ArrowUpRight, HelpCircle } from 'lucide-react';
import { PATH_SCORES_DATA } from '../data/executiveDeliverables';

export const ComparisonMatrixView: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  const COMPARISON_DIMENSIONS = [
    {
      dimension: '01. Current Code Readiness',
      pathA: 'Ready for immediate deployment. Core AI Hotel Concierge and Tourguide codebases already exist and require zero net-new foundational architecture.',
      pathB: 'Zero-to-one build required. Needs 14 to 28 days of software development, schema design, and OCR pipeline construction.',
      verdict: 'Path A wins decisively. Paid-up R&D accelerates deployment by weeks.',
      edge: 'Path A',
    },
    {
      dimension: '02. Time to First Paying Customer',
      pathA: '7 Days. Day 4 pilot deployment in 1-2 boutique hotels allows conversion to paid subscription ($79/mo) by Day 7.',
      pathB: '18 to 35 Days. Cannot legally or technically pilot unbuilt spec parsers with paying customers inside 7 days.',
      verdict: 'Path A is the only viable path to achieve the prompt\'s revenue mandate.',
      edge: 'Path A',
    },
    {
      dimension: '03. Upfront Capital & Token Burn',
      pathA: '$0.00 initial capital. Runs on free serverless tier (Vercel/Fly) and free Gemini Flash token limits (<$10/mo at scale).',
      pathB: 'Low initial hosting, but heavy OCR parsing & long-context document ingestion token burn ($40-$80/mo).',
      verdict: 'Path A preserves cashflow and requires zero initial budget authorization.',
      edge: 'Path A',
    },
    {
      dimension: '04. Customer Acquisition Channel',
      pathA: 'Founder-led local walk-in and direct phone outreach during 11 AM checkout lulls. Direct access to owner-operators.',
      pathB: 'High-friction trade contractor networks; requires attending industry associations or cold emailing skepticism-heavy trade estimators.',
      verdict: 'Path A provides immediate, direct, zero-cost access to decision makers.',
      edge: 'Path A',
    },
    {
      dimension: '05. Urgency of Customer Problem',
      pathA: 'Acute daily headache: front-desk staff turnover, night auditors overwhelmed by repetitive WiFi, breakfast, and luggage questions.',
      pathB: 'Severe economic pain: missing tender specification clauses, but estimators already have existing (slow) manual habits.',
      verdict: 'Path B has higher dollar pain, but Path A has higher daily emotional/operational friction.',
      edge: 'Tie',
    },
    {
      dimension: '06. Competitive Environment',
      pathA: 'Enterprise tech (Intelity, Akia, Duve) charges $3,000-$10,000/yr, leaving independent 12-40 room boutique inns completely unserved.',
      pathB: 'General AI tools cannot parse complex trade specs, creating a high niche moat once built, though incumbents like PlanHub exist.',
      verdict: 'Both occupy underserved niches; Path A faces zero agile competitors in the sub-$100/mo boutique space.',
      edge: 'Path A',
    },
    {
      dimension: '07. Pricing Power & ARPU',
      pathA: '$79 to $149/month per property. Modest ARPU, but fast impulse buying decision for hotel owners.',
      pathB: '$299 to $699/month per contractor. High ARPU with substantial enterprise ROI.',
      verdict: 'Path B has superior long-term ARPU, but requires longer sales cycles.',
      edge: 'Path B',
    },
    {
      dimension: '08. Operational & Legal Liability',
      pathA: 'Near-zero legal liability. Concierge answers breakfast hours, WiFi, and local dining. Hard fallback: "Please check with front desk".',
      pathB: 'High liability risk: if AI spec parser misses a liquidated damages clause or paint specification, contractor could sue for lost margin.',
      verdict: 'Path A is dramatically safer for early-stage zero-cost deployment.',
      edge: 'Path A',
    },
    {
      dimension: '09. Conversion Friction',
      pathA: 'Zero guest app download (pure mobile browser QR). 14-day zero-risk trial requires no credit card and no PMS integration.',
      pathB: 'High onboarding friction: requires contractor to upload confidential tender drawings and spec books.',
      verdict: 'Path A has almost zero adoption friction for both hotel staff and guests.',
      edge: 'Path A',
    },
    {
      dimension: '10. Scalability & Replicability',
      pathA: 'Highly replicable: 60%+ of hotels globally are independent. Once onboarding template is built, new hotel loads in 15 minutes.',
      pathB: 'High scalability across commercial trades, but requires trade-specific taxonomy for electrical, mechanical, finishes.',
      verdict: 'Both scale effectively once unit economics are validated.',
      edge: 'Tie',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Deliverable 02 · Comparative Analysis
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Head-to-Head Comparison: Path A vs Path B
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Comprehensive evaluation of existing software assets (AI Hotel Concierge, AI Tourguide Creator, NexusAIStore) versus researching and launching a new digital business across 10 operational dimensions.
        </p>
      </div>

      {/* High-Level Score Card Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Path A · Existing Digital Assets
            </span>
            <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
              Score: 84.6 / 100
            </span>
          </div>

          <h3 className="text-base font-bold text-white mt-3">
            AI Hotel Concierge + AI Tourguide Creator
          </h3>

          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Fast-track monetization using pre-built software assets. Targets neglected independent boutique lodging (12-40 rooms) via localized zero-risk pilots.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Launch Timeline:</span>
              <span className="text-emerald-400 font-mono font-semibold ml-1.5">Day 1 (Ready)</span>
            </div>
            <div>
              <span className="text-slate-400">First Paid Sale:</span>
              <span className="text-emerald-400 font-mono font-semibold ml-1.5">Day 7</span>
            </div>
            <div>
              <span className="text-slate-400">Target ARPU:</span>
              <span className="text-white font-mono ml-1.5">$79-$149/mo</span>
            </div>
            <div>
              <span className="text-slate-400">Initial Spend:</span>
              <span className="text-emerald-400 font-mono font-semibold ml-1.5">$0.00</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Path B · New Digital Business
            </span>
            <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              Score: 72.1 / 100
            </span>
          </div>

          <h3 className="text-base font-bold text-white mt-3">
            B2B Trade Subcontractor RFP Parser
          </h3>

          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Net-new software venture targeting commercial trade contractors. High financial ROI per customer, but requires 3+ weeks of foundational engineering.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Launch Timeline:</span>
              <span className="text-amber-400 font-mono font-semibold ml-1.5">Day 21+</span>
            </div>
            <div>
              <span className="text-slate-400">First Paid Sale:</span>
              <span className="text-amber-400 font-mono font-semibold ml-1.5">Day 28+</span>
            </div>
            <div>
              <span className="text-slate-400">Target ARPU:</span>
              <span className="text-white font-mono ml-1.5">$299-$499/mo</span>
            </div>
            <div>
              <span className="text-slate-400">Initial Spend:</span>
              <span className="text-amber-400 font-mono ml-1.5">$40-$80 token burn</span>
            </div>
          </div>
        </div>
      </div>

      {/* 10-Dimension Comparative Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Detailed 10-Point Comparison Table
          </h3>
          <span className="text-xs text-slate-400">
            Click any row to review strategic rationale
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 text-slate-400 border-b border-slate-800 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 w-1/4">Evaluation Dimension</th>
                <th className="py-3 px-4 w-1/3 text-emerald-400">Path A (Existing Assets)</th>
                <th className="py-3 px-4 w-1/3 text-amber-400">Path B (New Venture)</th>
                <th className="py-3 px-4 text-center">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {COMPARISON_DIMENSIONS.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedDimension(selectedDimension === row.dimension ? null : row.dimension)}
                  className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                    selectedDimension === row.dimension ? 'bg-slate-800/70' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {row.dimension}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                    {row.pathA}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                    {row.pathB}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`font-mono px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.edge === 'Path A'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : row.edge === 'Path B'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {row.edge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Dimension Detail Box if clicked */}
      {selectedDimension && (
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-xs text-slate-300">
          <div className="font-bold text-white mb-1">
            CEO Analysis: {selectedDimension}
          </div>
          <p className="text-slate-300">
            {COMPARISON_DIMENSIONS.find((d) => d.dimension === selectedDimension)?.verdict}
          </p>
        </div>
      )}

      {/* Sub-Opportunity Specific Verdicts */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">
          Sub-Opportunity Status Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950/60 rounded-lg border border-emerald-900/60">
            <div className="flex items-center justify-between text-emerald-400 font-semibold mb-1">
              <span>AI Hotel Concierge</span>
              <span className="font-mono text-[10px] uppercase">Active Sprint</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Assigned 100% of current operational capacity. Verified B2B hospitality pain point, direct access via walk-in/phone, and immediate 7-day conversion path.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-indigo-400 font-semibold mb-1">
              <span>AI Tourguide Creator</span>
              <span className="font-mono text-[10px] uppercase text-slate-400">Complementary</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Bundled as an upsell module for hotel guests (&quot;Explore local audio walks curated by the hotel&quot;). Shelved as a standalone consumer app for now.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-lg border border-red-900/40">
            <div className="flex items-center justify-between text-rose-400 font-semibold mb-1">
              <span>NexusAIStore</span>
              <span className="font-mono text-[10px] uppercase text-rose-400">Shelved / Closed</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Two-sided marketplace cold-start problem and extreme commodity competition on Gumroad/PromptBase make this an inefficient use of founder hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
