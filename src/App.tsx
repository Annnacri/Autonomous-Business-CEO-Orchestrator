import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { ComparisonMatrixView } from './components/ComparisonMatrixView';
import { EvidenceRegistryView } from './components/EvidenceRegistryView';
import { CostLedgerView } from './components/CostLedgerView';
import { CustomerProfilesView } from './components/CustomerProfilesView';
import { MonetizationModelsView } from './components/MonetizationModelsView';
import { RiskLedgerView } from './components/RiskLedgerView';
import { DecisionMatrixView } from './components/DecisionMatrixView';
import { FinalRecommendationView } from './components/FinalRecommendationView';
import { ActionPlanView } from './components/ActionPlanView';
import { AgentCouncilView } from './components/AgentCouncilView';
import { RevenueTrackerView } from './components/RevenueTrackerView';
import { CampaignRunnerView } from './components/CampaignRunnerView';
import { ExportMemoModal } from './components/ExportMemoModal';
import { StressTestModal } from './components/StressTestModal';
import { OutreachGeneratorModal } from './components/OutreachGeneratorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('executive_summary');

  // Modal states
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isStressTestOpen, setIsStressTestOpen] = useState<boolean>(false);
  const [stressTestAssumption, setStressTestAssumption] = useState<string>('');
  const [stressTestPath, setStressTestPath] = useState<string>('Path A');

  const [isOutreachModalOpen, setIsOutreachModalOpen] = useState<boolean>(false);
  const [outreachProduct, setOutreachProduct] = useState<string>('Breakfast in Bed LX');
  const [outreachPersona, setOutreachPersona] = useState<string>('Boutique Hotel General Manager (15-40 rooms)');

  // Handlers
  const handleOpenStressTest = (assumptionText: string = '', path: string = 'Path A') => {
    setStressTestAssumption(assumptionText);
    setStressTestPath(path);
    setIsStressTestOpen(true);
  };

  const handleOpenOutreach = (productName: string = 'Breakfast in Bed LX', roleTitle: string = 'International tourists and accommodation hosts in Lisbon') => {
    setOutreachProduct(productName);
    setOutreachPersona(roleTitle);
    setIsOutreachModalOpen(true);
  };

  const DELIVERABLE_TABS = [
    { id: 'executive_summary', label: '1. Executive Summary' },
    { id: 'revenue_tracker', label: '★ Revenue Tracker' },
    { id: 'comparison', label: '2. Path A vs B' },
    { id: 'evidence', label: '3. Evidence Registry' },
    { id: 'costs', label: '4. Costs & Treasury' },
    { id: 'customers', label: '5. Customer ICPs' },
    { id: 'monetization', label: '6. Monetization' },
    { id: 'risks', label: '7. Risks & Mitigations' },
    { id: 'decision_matrix', label: '8. Weighted Scores' },
    { id: 'final_recommendation', label: '9. Final Ruling' },
    { id: 'action_plan', label: '10. 7-Day Plan' },
    { id: 'agent_council', label: 'Agent Council' },
    { id: 'al_campaigns', label: 'AL Campaigns (7 Zones)' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar following contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Secondary Sub-navigation Bar for Fast Deliverable Browsing */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-6 py-2 sticky top-[53px] z-30 backdrop-blur-md overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1 min-w-max text-xs">
          {DELIVERABLE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'executive_summary' && (
          <ExecutiveSummaryView
            onNavigateTab={setActiveTab}
            onOpenStressTest={() => handleOpenStressTest('At least 25% of guests will scan bedside QR code instead of calling front desk', 'Path A')}
            onOpenOutreachModal={() => handleOpenOutreach()}
          />
        )}

        {activeTab === 'revenue_tracker' && (
          <RevenueTrackerView
            onNavigateToActionPlan={() => setActiveTab('action_plan')}
            onOpenPitchGenerator={() => handleOpenOutreach()}
          />
        )}

        {activeTab === 'comparison' && <ComparisonMatrixView />}

        {activeTab === 'evidence' && (
          <EvidenceRegistryView
            onChallengeAssumption={(text, path) => handleOpenStressTest(text, path)}
          />
        )}

        {activeTab === 'costs' && <CostLedgerView />}

        {activeTab === 'customers' && (
          <CustomerProfilesView
            onSelectForOutreach={(prod, role) => handleOpenOutreach(prod, role)}
          />
        )}

        {activeTab === 'monetization' && <MonetizationModelsView />}

        {activeTab === 'risks' && (
          <RiskLedgerView
            onChallengeRisk={(title, path) => handleOpenStressTest(`Risk failure condition: ${title}`, path)}
          />
        )}

        {activeTab === 'decision_matrix' && (
          <DecisionMatrixView
            onSelectWinningPath={() => setActiveTab('action_plan')}
          />
        )}

        {activeTab === 'final_recommendation' && (
          <FinalRecommendationView
            onNavigateToActionPlan={() => setActiveTab('action_plan')}
            onOpenPitchGenerator={() => handleOpenOutreach()}
          />
        )}

        {activeTab === 'action_plan' && (
          <ActionPlanView
            onOpenPitchGenerator={() => handleOpenOutreach()}
          />
        )}

        {activeTab === 'agent_council' && <AgentCouncilView />}
      {activeTab === 'al_campaigns' && <CampaignRunnerView />}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Autonomous Business CEO & Multi-Agent Executive Decision Suite
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Capital Rule: $0 Unauthorized Spend</span>
            <span>·</span>
            <span>Target: 7-Day Revenue Sprint</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ExportMemoModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <StressTestModal
        isOpen={isStressTestOpen}
        onClose={() => setIsStressTestOpen(false)}
        initialAssumption={stressTestAssumption}
        initialPath={stressTestPath}
      />

      <OutreachGeneratorModal
        isOpen={isOutreachModalOpen}
        onClose={() => setIsOutreachModalOpen(false)}
        initialProduct={outreachProduct}
        initialPersona={outreachPersona}
      />
    </div>
  );
}
