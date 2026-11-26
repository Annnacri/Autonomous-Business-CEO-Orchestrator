import React, { useState } from "react";
import { Header } from "./components/Header.tsx";
import { ResearchForm } from "./components/ResearchForm.tsx";
import { ExecutionTelemetry } from "./components/ExecutionTelemetry.tsx";
import { DossierView } from "./components/DossierView.tsx";
import { BENCHMARK_DOSSIERS, ResearchDossier } from "./data/benchmarkDossiers.ts";
import { AlertTriangle, ShieldCheck, RefreshCw, Terminal, Compass } from "lucide-react";

export default function App() {
  // Start with the verified Portugal & EU benchmark dossier loaded
  const [activeDossier, setActiveDossier] = useState<ResearchDossier>(
    BENCHMARK_DOSSIERS["portugal-eu-tax"]
  );
  const [activeBenchmarkKey, setActiveBenchmarkKey] = useState<string | null>("portugal-eu-tax");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQueryTopic, setCurrentQueryTopic] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectBenchmark = (key: string) => {
    if (BENCHMARK_DOSSIERS[key]) {
      setActiveDossier(BENCHMARK_DOSSIERS[key]);
      setActiveBenchmarkKey(key);
      setErrorMessage(null);
    }
  };

  const handleExecuteResearch = async (params: {
    topic: string;
    targetMarket: string;
    researchMode: "FULL_DISCOVERY" | "COMPETITIVE_DEEP_DIVE" | "CUSTOMER_DEMAND_AUDIT" | "COMMERCIAL_EVALUATION" | "GAP_DETECTION";
    additionalContext?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentQueryTopic(params.topic);
    setActiveBenchmarkKey(null);

    try {
      const response = await fetch("/api/research/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const reportData: ResearchDossier = await response.json();
      setActiveDossier(reportData);
    } catch (err: any) {
      console.error("Research execution failed:", err);
      setErrorMessage(
        err.message || "Failed to execute autonomous market research. Please verify network or API keys."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header */}
      <Header activeDossierCount={1} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-mono flex items-start justify-between gap-3 shadow-lg">
            <div className="flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-rose-300 block mb-0.5">Autonomous Investigation Alert:</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 text-sm font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Research Directive Dispatcher */}
        <ResearchForm
          onExecute={handleExecuteResearch}
          onSelectBenchmark={handleSelectBenchmark}
          activeBenchmarkKey={activeBenchmarkKey}
          isLoading={isLoading}
        />

        {/* Live Autonomous Execution Telemetry */}
        <ExecutionTelemetry isLoading={isLoading} topic={currentQueryTopic} />

        {/* Active Market Intelligence Dossier */}
        {!isLoading && activeDossier && <DossierView dossier={activeDossier} />}
      </main>

      {/* Analyst Mandate Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Agent 02 — Autonomous Market Intelligence Standard // Section 3 & 4</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-500">
            <span>Primary Sources Enforced</span>
            <span>•</span>
            <span>Epistemic Segregation</span>
            <span>•</span>
            <span>Zero Hallucinated Metrics</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
