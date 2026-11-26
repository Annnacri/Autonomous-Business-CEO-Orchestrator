import React, { useState } from "react";
import { ResearchDossier } from "../data/benchmarkDossiers.ts";
import { X, Copy, Check, Download, Printer, FileText } from "lucide-react";

interface ExportModalProps {
  dossier: ResearchDossier;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ dossier, isOpen, onClose }) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const generateMarkdownMemo = () => {
    return `# MEMORANDUM // FOR CEO AGENT REVIEW
**CONFIDENTIAL & PROPRIETARY**
**REPORT ID:** ${dossier.meta.reportId}
**DATE:** ${new Date(dossier.meta.timestamp).toLocaleDateString()}
**ANALYST:** Agent 02 — Autonomous Market Intelligence
**TARGET MARKET:** ${dossier.meta.targetMarket}
**EVIDENCE STATUS:** ${dossier.meta.evidenceStatus}
**STRATEGIC VERDICT:** ${dossier.executiveSummary.strategicVerdict}

---

## 1. EXECUTIVE SUMMARY
${dossier.executiveSummary.headline}

**Commercial Relevance:**
${dossier.executiveSummary.commercialRelevance}

### Key Findings:
${dossier.executiveSummary.keyFindings.map((f) => `- ${f}`).join("\n")}

---

## 2. RESEARCH QUESTION & METHODOLOGY
- **Investigated:** ${dossier.researchQuestion.primaryQuestion}
- **Scope & Rationale:** ${dossier.researchQuestion.scopeAndRationale}
- **Methodology:** ${dossier.researchQuestion.methodology}

---

## 3. COMMERCIAL EVALUATION MATRIX (11 CRITERIA)
**Composite Viability Score: ${dossier.commercialEvaluation.compositeScore} / 10** (${dossier.commercialEvaluation.confidenceRating} CONFIDENCE)

| Criterion | Research Question | Score | Evidence Status | Rationale |
|---|---|---|---|---|
${dossier.commercialEvaluation.criteriaScores
  .map(
    (c) =>
      `| ${c.criterion} | ${c.question} | ${c.score !== null ? `${c.score}/10` : "Not enough evidence"} | ${c.status} | ${c.rationale.replace(/\|/g, "/")} |`
  )
  .join("\n")}

---

## 4. CUSTOMER DEMAND & WILLINGNESS TO PAY
### Core Operational Problems:
${dossier.customerAndDemandIntelligence.coreProblems
  .map(
    (p, i) =>
      `### Problem ${i + 1}: ${p.problem}
- **Severity:** ${p.severity}
- **Financial Cost/Burn:** ${p.financialCost}
- **Willingness to Pay Proof:** ${p.willingnessToPayEvidence}`
  )
  .join("\n\n")}

### Unmet Needs:
${dossier.customerAndDemandIntelligence.unmetNeeds.map((u) => `- ${u}`).join("\n")}

---

## 5. COMPETITIVE INTELLIGENCE & VULNERABILITIES
**Market Concentration:** ${dossier.competitiveIntelligence.marketConcentration}

${dossier.competitiveIntelligence.competitors
  .map(
    (c) =>
      `### ${c.name} (${c.type})
- **Pricing:** ${c.pricingModel}
- **Positioning:** "${c.positioning}"
- **Strengths:** ${c.strengths.join(", ")}
- **Exploitable Vulnerabilities:** ${c.weaknessesAndGaps.join(", ")}`
  )
  .join("\n\n")}

### Uncontested Market Gaps:
${dossier.competitiveIntelligence.uncontestedMarketGaps.map((g) => `- ${g}`).join("\n")}

---

## 6. PRIMARY OPPORTUNITY & RECOMMENDATIONS
### Proposed Commercial Concept:
**${dossier.opportunityDiscovery.primaryOpportunity.title}**
- **Value Proposition:** ${dossier.opportunityDiscovery.primaryOpportunity.valueProposition}
- **MVP Scope:** ${dossier.opportunityDiscovery.primaryOpportunity.mvpScope}
- **Speed to Revenue:** ${dossier.opportunityDiscovery.primaryOpportunity.speedToRevenue}
- **Target Launch:** ${dossier.opportunityDiscovery.primaryOpportunity.targetLaunchMarket}

### Actionable Directives for CEO Agent:
${dossier.opportunityDiscovery.actionableRecommendationsForCEO.map((r, i) => `${i + 1}. ${r}`).join("\n")}

---

## 7. VERIFIED SOURCES & PRIMARY EVIDENCE
${dossier.sourcesAndEvidence.map((s) => `- [${s.title}](${s.url}) — ${s.sourceType} (${s.date}): ${s.keyClaimVerified}`).join("\n")}

---
*Report certified by Agent 02. All unsupported speculation marked as 'INSUFFICIENT VERIFIED EVIDENCE'.*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownMemo());
    setCopiedFormat("markdown");
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownMemo();
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dossier.meta.reportId}-CEO-Briefing.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const text = JSON.stringify(dossier, null, 2);
    const blob = new Blob([text], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dossier.meta.reportId}-Raw-Dataset.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 font-sans">
              Export Dossier // CEO Agent Deliverable
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap gap-2.5">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center space-x-1.5 bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            {copiedFormat === "markdown" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedFormat === "markdown" ? "Copied Markdown!" : "Copy CEO Memo (Markdown)"}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Raw JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Text Preview */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950/80 leading-relaxed whitespace-pre-wrap select-all">
          {generateMarkdownMemo()}
        </div>
      </div>
    </div>
  );
};
