import React, { useEffect, useState } from "react";
import { Terminal, CheckCircle2, Loader2, Search, Scale, FileText, Cpu } from "lucide-react";

interface ExecutionTelemetryProps {
  isLoading: boolean;
  topic: string;
}

const STAGES = [
  { id: 1, title: "Deconstructing Commercial Hypothesis", desc: "Setting epistemic boundaries, isolating market definitions & regulatory jurisdiction." },
  { id: 2, title: "Live Search Grounding & Primary Discovery", desc: "Querying official registers, statutory filing portals, and competitor pricing pages." },
  { id: 3, title: "Cross-Checking Evidence & Triangulation", desc: "Filtering vendor marketing claims from audited figures; verifying customer complaints." },
  { id: 4, title: "11-Factor Commercial Evaluation Scoring", desc: "Computing scores for Demand, Willingness-to-pay, Gap, Feasibility, Capex & Risk." },
  { id: 5, title: "Epistemic Audit & CEO Memorandum", desc: "Segregating verified facts from hypotheses; flagging missing evidence as INSUFFICIENT EVIDENCE." },
];

export const ExecutionTelemetry: React.FC<ExecutionTelemetryProps> = ({ isLoading, topic }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStage(1);
      setElapsedSeconds(0);
      return;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    const stageTimer = setInterval(() => {
      setCurrentStage((prev) => (prev < 5 ? prev + 1 : 5));
    }, 3800);

    return () => {
      clearInterval(timer);
      clearInterval(stageTimer);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="bg-slate-900 border border-cyan-800/60 rounded-2xl p-6 mb-8 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
      {/* Background scanline glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
            Autonomous Pipeline In Progress // Agent 02 Execution
          </h3>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <span>Active Investigation Time: <strong className="text-cyan-300">{elapsedSeconds}s</strong></span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            LIVE
          </span>
        </div>
      </div>

      <div className="mb-4">
        <span className="text-xs font-mono text-slate-400 block mb-1">Target Subject:</span>
        <p className="text-sm font-semibold text-slate-100 bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5 font-mono">
          "{topic}"
        </p>
      </div>

      {/* Progress steps */}
      <div className="space-y-3">
        {STAGES.map((stage) => {
          const isDone = stage.id < currentStage;
          const isCurrent = stage.id === currentStage;
          return (
            <div
              key={stage.id}
              className={`flex items-start space-x-3 p-3 rounded-xl border text-xs transition-all ${
                isCurrent
                  ? "bg-cyan-950/40 border-cyan-500/60 text-slate-200"
                  : isDone
                  ? "bg-slate-950/50 border-slate-800 text-slate-400"
                  : "opacity-40 border-slate-900 text-slate-600"
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-600">
                    {stage.id}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`font-mono font-medium ${isCurrent ? "text-cyan-300" : isDone ? "text-slate-200" : "text-slate-500"}`}>
                    Stage 0{stage.id}: {stage.title}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider animate-pulse">
                      Processing...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
