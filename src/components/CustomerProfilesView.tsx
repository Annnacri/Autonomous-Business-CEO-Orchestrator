import React from 'react';
import { UserCheck, Sparkles, AlertCircle, Clock, DollarSign, MapPin, PhoneCall } from 'lucide-react';
import { CUSTOMER_PROFILES } from '../data/executiveDeliverables';

interface CustomerProfilesViewProps {
  onSelectForOutreach: (productName: string, roleTitle: string) => void;
}

export const CustomerProfilesView: React.FC<CustomerProfilesViewProps> = ({
  onSelectForOutreach,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Deliverable 05 · Target Customer Intelligence
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Ideal Customer Profiles (ICPs) & Behavioral Dossiers
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Deep psychological and operational breakdown of buyers across Path A and Path B, their actual daily friction, willingness to pay, and the fastest zero-cost access channel.
        </p>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CUSTOMER_PROFILES.map((profile) => (
          <div
            key={profile.id}
            className={`rounded-xl p-5 border flex flex-col justify-between ${
              profile.path === 'Path A' && profile.id === 'icp-hotel-gm'
                ? 'bg-slate-900 border-2 border-emerald-500/50 shadow-md'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono font-bold text-slate-400">
                  {profile.path}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    profile.path === 'Path A'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {profile.targetProduct}
                </span>
              </div>

              {/* Title & Segment */}
              <h3 className="text-base font-bold text-white">
                {profile.roleTitle}
              </h3>
              <div className="text-xs font-medium text-slate-400 mt-0.5">
                {profile.segmentName}
              </div>

              {/* Quote */}
              <div className="mt-4 p-3 bg-slate-950/70 border-l-2 border-indigo-400 rounded-r-lg text-xs italic text-slate-300">
                {profile.quote}
              </div>

              {/* Demographics */}
              <div className="mt-4 text-xs text-slate-400">
                <strong className="text-slate-300">Demographics:</strong> {profile.demographics}
              </div>

              {/* Daily Friction */}
              <div className="mt-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Acute Daily Operational Headaches:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {profile.dailyFriction.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">✕</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buying Triggers */}
              <div className="mt-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Buying Triggers:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {profile.buyingTriggers.map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Financials & CTA */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px]">Willingness to Pay:</div>
                  <div className="font-bold text-emerald-400 font-mono text-[11px]">
                    {profile.willingnessToPay.split(';')[0]}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Decision Window:</div>
                  <div className="font-bold text-white font-mono text-[11px]">
                    {profile.decisionTimeframe.split(';')[0]}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                <strong className="text-slate-300">Fastest Access Channel:</strong>{' '}
                {profile.fastestAccessChannel}
              </div>

              <button
                onClick={() => onSelectForOutreach(profile.targetProduct, profile.roleTitle)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Pitch for this ICP</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
