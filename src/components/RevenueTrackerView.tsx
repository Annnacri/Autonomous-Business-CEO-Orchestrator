import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
  Edit3,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';
import {
  DEFAULT_7DAY_REVENUE_METRICS,
  EXTENDED_PROJECTIONS_DATA,
  REVENUE_SCENARIO_PRESETS,
} from '../data/revenueTrackerData';
import { DailyRevenueMetric } from '../types/business';

interface RevenueTrackerViewProps {
  onNavigateToActionPlan: () => void;
  onOpenPitchGenerator: () => void;
}

export const RevenueTrackerView: React.FC<RevenueTrackerViewProps> = ({
  onNavigateToActionPlan,
  onOpenPitchGenerator,
}) => {
  const [metrics, setMetrics] = useState<DailyRevenueMetric[]>(DEFAULT_7DAY_REVENUE_METRICS);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('baseline');
  const [viewScope, setViewScope] = useState<'7day' | '30day'>('7day');
  const [activeMetricType, setActiveMetricType] = useState<'revenue' | 'funnel'>('revenue');
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);
  const [isEditingDay, setIsEditingDay] = useState<number | null>(null);
  const [editActualMrr, setEditActualMrr] = useState<number>(79);
  const [editOutreachTouches, setEditOutreachTouches] = useState<number>(42);
  const [editGuestScans, setEditGuestScans] = useState<number>(58);

  const displayData = viewScope === '7day' ? metrics : EXTENDED_PROJECTIONS_DATA;

  // Key KPI Computations
  const day7Target = metrics.find((m) => m.day === 7)?.cumulativeTargetMrr || 79;
  const day7Actual = metrics.find((m) => m.day === 7)?.cumulativeActualMrr || 79;
  const varianceAmount = day7Actual - day7Target;
  const pacingPercentage = Math.round((day7Actual / day7Target) * 100);
  const arrRunRate = day7Actual * 12;
  const netMarginMonthly = day7Actual > 0 ? day7Actual - 7.10 : 0;
  const grossMarginPct = day7Actual > 0 ? Math.round((netMarginMonthly / day7Actual) * 100) : 0;

  // Scenario Switcher
  const handleSelectScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    const scenario = REVENUE_SCENARIO_PRESETS.find((s) => s.id === scenarioId);
    if (scenario) {
      setMetrics(scenario.metrics);
      if (scenario.day7ActualMrr !== undefined) {
        setEditActualMrr(scenario.day7ActualMrr);
      }
    }
  };

  // Day editor handler
  const handleOpenEdit = (metric: DailyRevenueMetric) => {
    setIsEditingDay(metric.day);
    setEditActualMrr(metric.actualMrr);
    setEditOutreachTouches(metric.outreachTouches);
    setEditGuestScans(metric.guestScans);
  };

  const handleSaveEdit = (dayNumber: number) => {
    setMetrics((prev) =>
      prev.map((m) => {
        if (m.day !== dayNumber) return m;
        const newCumulative = m.day < 7 ? 0 : editActualMrr;
        return {
          ...m,
          actualMrr: editActualMrr,
          cumulativeActualMrr: newCumulative,
          outreachTouches: editOutreachTouches,
          guestScans: editGuestScans,
          status:
            editActualMrr > m.targetMrr
              ? 'Ahead'
              : editActualMrr === m.targetMrr
              ? 'On Track'
              : 'Behind',
        };
      })
    );
    setIsEditingDay(null);
  };

  // SVG Chart Geometry calculations
  const chartHeight = 240;
  const chartWidth = 720;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 35;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const maxVal = Math.max(
    ...displayData.map((d) =>
      activeMetricType === 'revenue'
        ? Math.max(d.cumulativeTargetMrr, d.cumulativeActualMrr, 100)
        : Math.max(d.outreachTouches, d.guestScans, 60)
    ),
    100
  );

  const getX = (index: number) => {
    if (displayData.length <= 1) return paddingLeft;
    return paddingLeft + (index / (displayData.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    return paddingTop + innerHeight - (val / maxVal) * innerHeight;
  };

  // Build SVG Path strings
  const targetPoints = displayData.map((d, i) => {
    const val = activeMetricType === 'revenue' ? d.cumulativeTargetMrr : d.outreachTouches;
    return `${getX(i)},${getY(val)}`;
  });
  const targetPathString = `M ${targetPoints.join(' L ')}`;

  const actualPoints = displayData.map((d, i) => {
    const val = activeMetricType === 'revenue' ? d.cumulativeActualMrr : d.guestScans;
    return `${getX(i)},${getY(val)}`;
  });
  const actualPathString = `M ${actualPoints.join(' L ')}`;

  // Area under actual path
  const actualAreaString = `${actualPathString} L ${getX(displayData.length - 1)},${
    paddingTop + innerHeight
  } L ${getX(0)},${paddingTop + innerHeight} Z`;

  const hoveredItem =
    hoveredDayIndex !== null && hoveredDayIndex < displayData.length
      ? displayData[hoveredDayIndex]
      : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Deliverable 11 · Revenue Tracker & Growth Trends
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
              7-Day Revenue Targets vs. Actual Performance
            </h2>
            <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Real-time visualization of commercial sprint targets versus logged metrics for Path A1 (AI Hotel Concierge). Includes growth trajectory line chart, pacing variance, and multi-scenario forecasting.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToActionPlan}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Sprint Action Plan</span>
            </button>

            <button
              onClick={onOpenPitchGenerator}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Pitch</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Metric Executive KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Sprint Target MRR (Day 7)
          </div>
          <div className="text-xl font-bold text-white font-mono mt-1">
            ${day7Target.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">1 Hotel @ $79/mo</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Actual Closed MRR
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            ${day7Actual.toFixed(2)}
          </div>
          <div className="text-[11px] font-mono mt-0.5 flex items-center gap-1">
            <span
              className={
                varianceAmount >= 0 ? 'text-emerald-400' : 'text-amber-400'
              }
            >
              {varianceAmount >= 0 ? `+${varianceAmount}` : varianceAmount} Variance ({pacingPercentage}%)
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Annual Run-Rate (ARR)
          </div>
          <div className="text-xl font-bold text-white font-mono mt-1">
            ${arrRunRate.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Annualized Run-Rate</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Unit Gross Margin
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            {grossMarginPct}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            ${netMarginMonthly.toFixed(2)} net / ${day7Actual}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 col-span-2 md:col-span-1">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Capital Efficiency
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            Infinite (∞)
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">$0.00 Unauthorized Spend</div>
        </div>
      </div>

      {/* Scenario Presets Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            Simulate Revenue Scenarios:
          </span>
          <span className="text-[11px] text-slate-400">
            Click a scenario to stress-test financial projections & variance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {REVENUE_SCENARIO_PRESETS.map((scenario) => {
            const isSelected = activeScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario.id)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 shadow-sm'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">
                      {scenario.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        isSelected
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {scenario.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {scenario.description}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-2 font-semibold">
                  Day 7 MRR: ${scenario.day7ActualMrr} · {scenario.conversionRate}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Line Chart Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        {/* Chart Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Revenue Growth Trajectory (Target vs. Actual)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily cumulative target progression compared to logged performance.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Metric Switcher */}
            <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveMetricType('revenue')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeMetricType === 'revenue'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue ($ MRR)
              </button>
              <button
                onClick={() => setActiveMetricType('funnel')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeMetricType === 'funnel'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Funnel Activity
              </button>
            </div>

            {/* Scope Switcher */}
            <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setViewScope('7day')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  viewScope === '7day'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                7-Day Sprint
              </button>
              <button
                onClick={() => setViewScope('30day')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  viewScope === '30day'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                30-Day Forecast
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs text-slate-400 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-0.5 bg-indigo-400 inline-block border-b-2 border-dashed border-indigo-400" />
            <span>Target Benchmark ({activeMetricType === 'revenue' ? 'Target MRR' : 'Outreach Touches'})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 bg-emerald-400 rounded-full inline-block" />
            <span className="text-white font-semibold">
              Actual Performance ({activeMetricType === 'revenue' ? 'Logged MRR' : 'Guest Scans'})
            </span>
          </div>
        </div>

        {/* SVG Responsive Line Chart */}
        <div className="relative mt-4 overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-64 select-none"
          >
            <defs>
              {/* Gradient for actual performance area */}
              <linearGradient id="actualAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>

              {/* Gradient for target line */}
              <linearGradient id="targetLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = paddingTop + innerHeight - pct * innerHeight;
              const val = Math.round(pct * maxVal);
              return (
                <g key={idx}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={chartWidth - paddingRight}
                    y2={y}
                    stroke="#1E293B"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 3}
                    fill="#64748B"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    textAnchor="end"
                  >
                    {activeMetricType === 'revenue' ? `$${val}` : val}
                  </text>
                </g>
              );
            })}

            {/* Area Fill for Actual Performance */}
            <path d={actualAreaString} fill="url(#actualAreaGradient)" />

            {/* Target Line (Dashed Indigo) */}
            <path
              d={targetPathString}
              fill="none"
              stroke="url(#targetLineGradient)"
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />

            {/* Actual Line (Solid Emerald) */}
            <path
              d={actualPathString}
              fill="none"
              stroke="#10B981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Target Data Nodes */}
            {displayData.map((d, i) => {
              const val =
                activeMetricType === 'revenue' ? d.cumulativeTargetMrr : d.outreachTouches;
              const cx = getX(i);
              const cy = getY(val);
              return (
                <circle
                  key={`target-${i}`}
                  cx={cx}
                  cy={cy}
                  r="3.5"
                  fill="#1E1B4B"
                  stroke="#818CF8"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Actual Data Nodes */}
            {displayData.map((d, i) => {
              const val =
                activeMetricType === 'revenue' ? d.cumulativeActualMrr : d.guestScans;
              const cx = getX(i);
              const cy = getY(val);
              const isHovered = hoveredDayIndex === i;

              return (
                <g
                  key={`actual-${i}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredDayIndex(i)}
                  onMouseLeave={() => setHoveredDayIndex(null)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? '7' : '4.5'}
                    fill="#064E3B"
                    stroke="#10B981"
                    strokeWidth={isHovered ? '3' : '2'}
                    className="transition-all duration-150"
                  />
                  {/* Invisible hit target for easy mouse hover */}
                  <circle cx={cx} cy={cy} r="18" fill="transparent" />
                </g>
              );
            })}

            {/* X-Axis Labels */}
            {displayData.map((d, i) => {
              const x = getX(i);
              const isHovered = hoveredDayIndex === i;
              return (
                <text
                  key={`label-${i}`}
                  x={x}
                  y={chartHeight - 10}
                  fill={isHovered ? '#10B981' : '#94A3B8'}
                  fontSize="10"
                  fontWeight={isHovered ? '700' : '500'}
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredDayIndex(i)}
                  onMouseLeave={() => setHoveredDayIndex(null)}
                >
                  {d.label}
                </text>
              );
            })}
          </svg>

          {/* Hover Tooltip Overlay */}
          {hoveredItem && (
            <div className="mt-3 p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 animate-in fade-in duration-150">
              <div className="space-y-0.5">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="font-mono text-emerald-400">{hoveredItem.label}</span>
                  <span>·</span>
                  <span>{hoveredItem.phase}</span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.2 rounded border font-semibold ${
                      hoveredItem.status === 'Ahead'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : hoveredItem.status === 'Behind'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {hoveredItem.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {hoveredItem.keyMilestone}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                <div>
                  <span className="text-slate-500">Target MRR: </span>
                  <span className="text-slate-300 font-bold">
                    ${hoveredItem.cumulativeTargetMrr}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Actual MRR: </span>
                  <span className="text-emerald-400 font-bold">
                    ${hoveredItem.cumulativeActualMrr}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Scans: </span>
                  <span className="text-white font-bold">{hoveredItem.guestScans}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Day Performance Log Table with Inline Edit capability */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Day-by-Day Performance Ledger & Variance Audit
            </h3>
            <span className="text-xs text-slate-400">
              Click &quot;Edit Day&quot; to log actual field numbers or adjust conversion values
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Sprint Duration: 7 Calendar Days
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Sprint Day</th>
                <th className="py-3 px-4">Phase & Key Activity</th>
                <th className="py-3 px-4 text-center">Outreach</th>
                <th className="py-3 px-4 text-center">Pilots</th>
                <th className="py-3 px-4 text-center">Guest Scans</th>
                <th className="py-3 px-4 text-right">Target MRR</th>
                <th className="py-3 px-4 text-right">Actual MRR</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {metrics.map((row) => {
                const isEditing = isEditingDay === row.day;
                return (
                  <tr
                    key={row.day}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {row.label}
                      <div className="text-[10px] text-slate-500 font-normal">
                        {row.dateLabel}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200">{row.phase}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {row.keyMilestone}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-slate-300">
                      {row.outreachTouches > 0 ? row.outreachTouches : '—'}
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-slate-300">
                      {row.activePilots > 0 ? (
                        <span className="text-emerald-400 font-bold">{row.activePilots}</span>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-slate-300">
                      {row.guestScans > 0 ? (
                        <span className="text-white font-bold">{row.guestScans}</span>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-slate-400">
                      ${row.targetMrr.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-white">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editActualMrr}
                          onChange={(e) => setEditActualMrr(Number(e.target.value))}
                          className="w-20 px-1.5 py-0.5 bg-slate-950 border border-emerald-500 rounded text-right text-xs text-emerald-400 font-mono"
                        />
                      ) : (
                        <span
                          className={
                            row.actualMrr > 0 ? 'text-emerald-400' : 'text-slate-400'
                          }
                        >
                          ${row.actualMrr.toFixed(2)}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          row.status === 'Ahead'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : row.status === 'Behind'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(row.day)}
                            className="px-2 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded text-[10px] font-bold cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditingDay(null)}
                            className="px-2 py-1 bg-slate-800 text-slate-400 hover:text-white rounded text-[10px] cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenEdit(row)}
                          className="text-[11px] text-slate-400 hover:text-white font-medium flex items-center justify-center gap-1 mx-auto cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Log</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operational Pacing & Scale-up Playbook (Days 8-30) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-3">
          Post-Sprint Expansion Roadmap (Days 8–30 Pacing Targets)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-indigo-400 font-bold font-mono">
              <span>Day 14 Target</span>
              <span>$237.00 MRR</span>
            </div>
            <div className="text-slate-200 font-medium">3 Paid Properties · Tourguide Add-on</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Convert the second pilot (Lakeside Suites) and onboard a 3rd boutique property. Introduce AI Tourguide audio walks for local guests as an optional $29/mo upsell.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-indigo-400 font-bold font-mono">
              <span>Day 21 Target</span>
              <span>$465.00 MRR</span>
            </div>
            <div className="text-slate-200 font-medium">Growth Tier Conversion (50 Rooms)</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Close first 50-room historic hotel on Growth Tier ($149/mo) with white-labeled interface and front-desk SMS alerts.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-emerald-900/60 bg-emerald-950/20 space-y-1.5">
            <div className="flex items-center justify-between text-emerald-400 font-bold font-mono">
              <span>Day 30 Target</span>
              <span>$790.00 MRR ($9.4k ARR)</span>
            </div>
            <div className="text-emerald-300 font-medium">10 Active Hotel Properties</div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Milestone achieved: Sustainable cashflow established. Net operating profit exceeds $710/mo after token COGS. Path B research incubator unlocked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
