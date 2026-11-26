import React from "react";
import { ShieldCheck, Cpu, Terminal, Globe, Award } from "lucide-react";

interface HeaderProps {
  activeDossierCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeDossierCount }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <span className="font-mono text-cyan-400 font-extrabold text-sm tracking-tight">02</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight font-sans">
                AGENT 02 <span className="text-cyan-400 font-normal">|</span> Autonomous Market Intelligence
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                ACTIVE ANALYST
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <span>Direct Report: <strong className="text-slate-300 font-semibold">CEO Agent</strong></span>
              <span className="text-slate-600">•</span>
              <span>Collaborator: <strong className="text-slate-300 font-semibold">AI Business Team</strong></span>
            </p>
          </div>
        </div>

        {/* Global Market Coverage Badges & Epistemic Standards */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Coverage: PT • EU • UK • US • CA • GCC</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Standards:</span>
            <span className="font-semibold text-cyan-200">Evidence-Based</span>
          </div>
        </div>
      </div>
    </header>
  );
};
