import React, { useState } from "react";
import { ResearchDossier } from "../data/benchmarkDossiers.ts";
import { CommercialMatrix } from "./CommercialMatrix.tsx";
import { CustomerDemandView } from "./CustomerDemandView.tsx";
import { CompetitorBenchmarking } from "./CompetitorBenchmarking.tsx";
import { TechAndBusinessView } from "./TechAndBusinessView.tsx";
import { SourcesAndEpistemicView } from "./SourcesAndEpistemicView.tsx";
import { CeoQueryTerminal } from "./CeoQueryTerminal.tsx";
import { ExportModal } from "./ExportModal.tsx";
import {
  FileText,
  Scale,
  Users,
  Target,
  Cpu,
  ShieldCheck,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Globe,
  Clock,
  Briefcase,
  HelpCircle,
} from "lucide-react";

interface DossierViewProps {
  dossier: ResearchDossier;
}

export const DossierView: React.FC<DossierViewProps> = ({ dossier }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "commercial" | "customer" | "competitive" | "tech" | "sources"
  >("overview");
  const [showExportModal, setShowExportModal] = useState(false);

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case "PROCEED":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-600/80 shadow-emerald-950";
      case "PROCEED WITH CAUTION":
        return "bg-cyan-950/80 text-cyan-300 border-cyan-600/80 shadow-cyan-950";
      case "PIVOT / REFINE":
        return "bg-amber-950/80 text-amber-300 border-amber-600/80 shadow-amber-950";
      default:
        return "bg-rose-950/80 text-rose-300 border-rose-600/80 shadow-rose-950";
    }
  };

  const getEvidenceStatusBadge = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "bg-emerald-950 text-emerald-300 border-emerald-800";
      case "PARTIAL":
        return "bg-cyan-950 text-cyan-300 border-cyan-800";
      default:
        return "bg-rose-950 text-rose-300 border-rose-800 font-bold";
    }
  };

  return (
    <div className="space-y-6">
      {/* Dossier Meta Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-bold">{dossier.meta.reportId}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" />
              {dossier.meta.classification}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {new Date(dossier.meta.timestamp).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border ${getEvidenceStatusBadge(
                dossier.meta.evidenceStatus
              )}`}
            >
              {dossier.meta.evidenceStatus === "INSUFFICIENT VERIFIED EVIDENCE" ? (
                <span className="flex items-center gap-1 text-rose-300">
                  <AlertTriangle className="w-3 h-3" />
                  INSUFFICIENT VERIFIED EVIDENCE
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  EVIDENCE: {dossier.meta.evidenceStatus}
                </span>
              )}
            </span>

            <button
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>

        {/* Subject and Strategic Verdict */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Jurisdiction: {dossier.meta.targetMarket}</span>
              <span>•</span>
              <span>Mode: {dossier.meta.researchMode.replace(/_/g, " ")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-sans tracking-tight">
              {dossier.meta.subject}
            </h2>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Strategic Verdict for CEO
            </span>
            <div
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-xs shadow-lg ${getVerdictStyle(
                dossier.executiveSummary.strategicVerdict
              )}`}
            >
              {dossier.executiveSummary.strategicVerdict === "PROCEED" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              )}
              <span>{dossier.executiveSummary.strategicVerdict}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "overview"
              ? "bg-cyan-950 text-cyan-200 border border-cyan-800/80 shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Executive Brief & Findings</span>
        </button>

        <button
          onClick={() => setActiveTab("commercial")}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "commercial"
              ? "bg-cyan-950 text-cyan-200 border border-cyan-800/80 shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>11-Factor Commercial Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab("customer")}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "customer"
              ? "bg-cyan-950 text-cyan-200 border border-cyan-800/80 shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Customer & Demand</span>
        </button>

        <button
          onClick={() => setActiveTab("competitive")}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "competitive"
              ? "bg-cyan-950 text-cyan-200 border border-cyan-800/80 shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Competitive Landscape</span>
        </button>

        <button
          onClick={() => setActiveTab("tech")}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "tech"
              ? "bg-cyan-950 text-cyan-200 border border-cyan-800/80 shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Tech & Capex</span>
        </button>

        <button
          onClick={() => setActiveTab("sources")}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "sources"
              ? "bg-cyan-950 text-cyan-200 border border-cyan-800/80 shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Sources & Epistemic Audit</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Executive Summary Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
              <Briefcase className="w-4 h-4" />
              Executive Summary // Core Takeaway
            </span>
            <p className="text-base sm:text-lg font-medium text-slate-100 font-sans leading-relaxed mb-4">
              {dossier.executiveSummary.headline}
            </p>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl mb-5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                Commercial Relevance to Revenue & Capital:
              </span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {dossier.executiveSummary.commercialRelevance}
              </p>
            </div>

            {/* Key Findings */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2.5">
                Critical Market Findings & Validated Proof:
              </span>
              <div className="space-y-2">
                {dossier.executiveSummary.keyFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-200"
                  >
                    <span className="font-mono text-cyan-400 font-bold mt-0.5">0{idx + 1}.</span>
                    <span className="font-sans leading-relaxed">{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Research Question & Market Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 block">
                Research Question & Methodology
              </span>
              <h4 className="text-sm font-bold text-slate-100 mb-2 font-sans">
                {dossier.researchQuestion.primaryQuestion}
              </h4>
              <p className="text-xs text-slate-300 mb-3 font-sans">
                {dossier.researchQuestion.scopeAndRationale}
              </p>
              <div className="bg-slate-950/80 border border-slate-800/80 p-2.5 rounded-lg text-[11px] font-mono text-slate-400">
                <strong className="text-slate-300">Methodology:</strong> {dossier.researchQuestion.methodology}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 block">
                Market Dynamics & Regulatory Shifts
              </span>
              <h4 className="text-sm font-bold text-slate-100 mb-2 font-sans">
                {dossier.marketOverview.marketSizeAndGrowth}
              </h4>
              <p className="text-xs text-slate-300 mb-3 font-sans">
                {dossier.marketOverview.regulatoryAndMacroFactors}
              </p>
              <div className="bg-slate-950/80 border border-slate-800/80 p-2.5 rounded-lg text-[11px] font-mono text-slate-400">
                <strong className="text-slate-300">Geographic Specifics:</strong>{" "}
                {dossier.marketOverview.geographicSpecifics}
              </div>
            </div>
          </div>

          {/* Primary Opportunity Discovery & Launch Blueprint */}
          <div className="bg-gradient-to-r from-slate-900 via-cyan-950/30 to-indigo-950/30 border border-cyan-800/60 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Recommended Opportunity Blueprint // Ready for CEO Approval
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                Speed to Revenue: {dossier.opportunityDiscovery.primaryOpportunity.speedToRevenue}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 font-sans mb-2">
              {dossier.opportunityDiscovery.primaryOpportunity.title}
            </h3>
            <p className="text-xs text-slate-200 font-sans mb-4 leading-relaxed">
              {dossier.opportunityDiscovery.primaryOpportunity.valueProposition}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block mb-1">
                  Day 1-30 MVP Build Scope:
                </span>
                <p className="text-slate-300 font-sans">
                  {dossier.opportunityDiscovery.primaryOpportunity.mvpScope}
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block mb-1">
                  Launch Jurisdiction:
                </span>
                <p className="text-slate-300 font-sans">
                  {dossier.opportunityDiscovery.primaryOpportunity.targetLaunchMarket}
                </p>
              </div>
            </div>

            {/* Actionable Recommendations for CEO Agent */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 block mb-2.5">
                Actionable Directives for CEO Agent:
              </span>
              <div className="space-y-2 text-xs">
                {dossier.opportunityDiscovery.actionableRecommendationsForCEO.map((rec, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex items-start space-x-2.5 bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg text-slate-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "commercial" && (
        <CommercialMatrix
          criteriaScores={dossier.commercialEvaluation.criteriaScores}
          compositeScore={dossier.commercialEvaluation.compositeScore}
          confidenceRating={dossier.commercialEvaluation.confidenceRating}
        />
      )}

      {activeTab === "customer" && (
        <CustomerDemandView
          segments={dossier.marketOverview.targetCustomerSegments}
          problems={dossier.customerAndDemandIntelligence.coreProblems}
          unmetNeeds={dossier.customerAndDemandIntelligence.unmetNeeds}
          recurringComplaints={dossier.customerAndDemandIntelligence.recurringComplaints}
        />
      )}

      {activeTab === "competitive" && (
        <CompetitorBenchmarking
          marketConcentration={dossier.competitiveIntelligence.marketConcentration}
          competitors={dossier.competitiveIntelligence.competitors}
          uncontestedMarketGaps={dossier.competitiveIntelligence.uncontestedMarketGaps}
        />
      )}

      {activeTab === "tech" && (
        <TechAndBusinessView
          viableTechnologies={dossier.technologyAndBusinessModel.viableTechnologies}
          openSourceAndFreeTools={dossier.technologyAndBusinessModel.openSourceAndFreeTools}
          capitalEfficiencyAssessment={dossier.technologyAndBusinessModel.capitalEfficiencyAssessment}
          monetizationModels={dossier.technologyAndBusinessModel.monetizationModels}
        />
      )}

      {activeTab === "sources" && (
        <SourcesAndEpistemicView
          sources={dossier.sourcesAndEvidence}
          epistemicAudit={dossier.epistemicAudit}
        />
      )}

      {/* CEO Agent Follow-Up Terminal (Always accessible) */}
      <CeoQueryTerminal dossier={dossier} />

      {/* Export & PDF Modal */}
      <ExportModal
        dossier={dossier}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
};
