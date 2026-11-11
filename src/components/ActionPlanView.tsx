import React, { useState } from 'react';
import { CheckSquare, Square, Calendar, Clock, DollarSign, ShieldAlert, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import { ACTION_PLAN_7_DAYS } from '../data/executiveDeliverables';
import { ActionPlanDay } from '../types/business';

interface ActionPlanViewProps {
  onOpenPitchGenerator: () => void;
}

export const ActionPlanView: React.FC<ActionPlanViewProps> = ({ onOpenPitchGenerator }) => {
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [planDays, setPlanDays] = useState<ActionPlanDay[]>(ACTION_PLAN_7_DAYS);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleTask = (dayIndex: number, taskId: string) => {
    setPlanDays((prev) =>
      prev.map((day, dIdx) => {
        if (dIdx !== dayIndex) return day;
        return {
          ...day,
          tasks: day.tasks.map((t) =>
            t.id === taskId ? { ...t, done: !t.done } : t
          ),
        };
      })
    );
  };

  const totalTasks = planDays.reduce((acc, curr) => acc + curr.tasks.length, 0);
  const completedTasks = planDays.reduce(
    (acc, curr) => acc + curr.tasks.filter((t) => t.done).length,
    0
  );
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const currentDay = planDays.find((d) => d.day === activeDayNumber) || planDays[0];
  const currentDayIndex = planDays.findIndex((d) => d.day === activeDayNumber);

  const copyActionPlan = () => {
    const text = planDays
      .map(
        (d) =>
          `### DAY ${d.day}: ${d.focusTitle}\nObjective: ${d.objective}\nTasks:\n` +
          d.tasks.map((t) => `- [${t.done ? 'x' : ' '}] ${t.title}: ${t.description}`).join('\n') +
          `\nEnd of Day Milestone: ${d.endOfDayMilestone}\n`
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Deliverable 10 · Operational Execution Engine
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
            Practical 7-Day Revenue Action Plan
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Day-by-day, step-by-step founder playbook to package the pre-existing AI Hotel Concierge, execute zero-cost B2B outreach, deploy pilots, and close the first paying customer on Day 7.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={copyActionPlan}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Plan' : 'Copy 7-Day Plan'}</span>
          </button>

          <button
            onClick={onOpenPitchGenerator}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded text-xs font-bold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Pitch Copy</span>
          </button>
        </div>
      </div>

      {/* Progress Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-300">
            Sprint Progress: <strong className="text-white font-mono">{completedTasks}/{totalTasks} Tasks Completed</strong> ({progressPercent}%)
          </div>
        </div>

        <div className="w-full sm:w-64 bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-2.5 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Day Selector Tabs (Days 1 to 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {planDays.map((d) => {
          const isSelected = d.day === activeDayNumber;
          const dayDoneCount = d.tasks.filter((t) => t.done).length;
          const isAllDone = dayDoneCount === d.tasks.length;

          return (
            <button
              key={d.day}
              onClick={() => setActiveDayNumber(d.day)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-emerald-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">Day 0{d.day}</span>
                  {isAllDone && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </div>
                <div className="text-[11px] font-semibold text-slate-200 mt-1 line-clamp-1">
                  {d.focusTitle.split(' ')[0]} {d.focusTitle.split(' ')[1]}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono mt-2">
                {dayDoneCount}/{d.tasks.length} done
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        {/* Day Focus & Objective */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Day {currentDay.day} Phase · {currentDay.phase}
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {currentDay.focusTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              <strong>Objective:</strong> {currentDay.objective}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono shrink-0">
            <div className="px-3 py-1.5 bg-slate-950 rounded border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{currentDay.timeEstimateHours}h allocated</span>
            </div>
            <div className="px-3 py-1.5 bg-slate-950 rounded border border-slate-800 text-emerald-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>${currentDay.budgetRequired}.00 budget</span>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Action Items & Verification Milestones
          </h4>

          <div className="space-y-3">
            {currentDay.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(currentDayIndex, task.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  task.done
                    ? 'bg-emerald-950/20 border-emerald-900/60'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 hover:text-white shrink-0 cursor-pointer"
                >
                  {task.done ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600" />
                  )}
                </button>

                <div className="space-y-1.5 flex-1 text-xs">
                  <div
                    className={`font-bold ${
                      task.done ? 'text-emerald-300 line-through' : 'text-white'
                    }`}
                  >
                    {task.title}
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    {task.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div className="text-slate-400">
                      <strong className="text-indigo-400">Evidence Produced:</strong>{' '}
                      {task.evidenceGenerated}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-amber-400">Risk Gate:</strong>{' '}
                      {task.riskGate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* End-of-Day Milestone Banner */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">
              End-of-Day Critical Gate Milestone
            </div>
            <div className="font-bold text-white mt-0.5">
              {currentDay.endOfDayMilestone}
            </div>
          </div>

          {currentDay.day < 7 && (
            <button
              onClick={() => setActiveDayNumber(currentDay.day + 1)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Next Day</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
