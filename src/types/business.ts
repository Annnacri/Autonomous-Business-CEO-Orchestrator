export type FactType = 'VERIFIED_FACT' | 'ESTIMATE' | 'ASSUMPTION';

export interface EvidenceItem {
  id: string;
  type: FactType;
  title: string;
  description: string;
  sourceOrBasis: string;
  path: 'Path A' | 'Path B' | 'Both';
  confidenceScore: number; // 0-100
}

export interface CustomerProfile {
  id: string;
  path: 'Path A' | 'Path B';
  targetProduct: string;
  roleTitle: string;
  segmentName: string;
  demographics: string;
  dailyFriction: string[];
  buyingTriggers: string[];
  willingnessToPay: string;
  decisionTimeframe: string;
  fastestAccessChannel: string;
  quote: string;
}

export interface MonetizationModel {
  id: string;
  name: string;
  path: 'Path A' | 'Path B';
  product: string;
  structure: 'Tiered B2B SaaS' | 'Hybrid Usage + Base' | 'Marketplace Take-Rate' | 'High-Touch Retainer';
  pricingTiers: {
    name: string;
    price: string;
    cadence: string;
    description: string;
    features: string[];
    recommended?: boolean;
  }[];
  unitEconomics: {
    targetLtv: string;
    targetCac: string;
    paybackMonths: string;
    grossMargin: string;
    cogsBreakdown: string;
  };
}

export interface RiskItem {
  id: string;
  title: string;
  path: 'Path A' | 'Path B' | 'Shared';
  category: 'Market' | 'Technical' | 'Distribution' | 'Financial';
  probability: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  riskScore: number; // prob * impact
  unmitigatedOutcome: string;
  mitigationPlaybook: string;
  earlyWarningSignal: string;
}

export interface ScoringWeights {
  revenuePotential: number; // 30% default
  timeToFirstSale: number; // 25% default
  initialInvestment: number; // 20% default
  competitiveEnvironment: number; // 15% default
  executionDifficulty: number; // 10% default
}

export interface PathScoreBreakdown {
  id: string;
  name: string;
  code: string;
  pathGroup: 'Path A' | 'Path B';
  categoryScores: {
    revenuePotential: number; // 0-100
    timeToFirstSale: number; // 0-100
    initialInvestment: number; // 0-100 (100 = $0 required)
    competitiveEnvironment: number; // 0-100 (100 = uncrowded/defensible)
    executionDifficulty: number; // 0-100 (100 = easiest to execute)
  };
  rationales: {
    revenuePotential: string;
    timeToFirstSale: string;
    initialInvestment: string;
    competitiveEnvironment: string;
    executionDifficulty: string;
  };
  keyAdvantage: string;
  primaryVulnerability: string;
}

export interface ActionPlanDay {
  day: number;
  phase: string;
  focusTitle: string;
  objective: string;
  timeEstimateHours: number;
  budgetRequired: number; // In USD, must be $0 or explicit request
  tasks: {
    id: string;
    title: string;
    description: string;
    done: boolean;
    evidenceGenerated: string;
    riskGate: string;
  }[];
  endOfDayMilestone: string;
}

export interface BudgetItem {
  id: string;
  item: string;
  category: 'Infrastructure' | 'Outreach & Domain' | 'Legal/Compliance' | 'Buffer';
  estimatedCost: number;
  requiredForDay: number;
  authorized: boolean;
  notes: string;
  mandatoryRuleStatus: string;
}

export interface AgentReport {
  id: 'ceo' | 'research_a' | 'research_b' | 'business_analyst' | 'marketing' | 'finance';
  name: string;
  role: string;
  avatarSeed: string;
  coreThesis: string;
  keyVerdict: string;
  topRecommendation: string;
  strongestWarning: string;
  detailedReportSections: {
    heading: string;
    content: string[];
  }[];
}

export interface DailyRevenueMetric {
  day: number;
  label: string;
  dateLabel: string;
  phase: string;
  targetMrr: number;
  cumulativeTargetMrr: number;
  actualMrr: number;
  cumulativeActualMrr: number;
  outreachTouches: number;
  activePilots: number;
  guestScans: number;
  status: 'Complete' | 'On Track' | 'Ahead' | 'Behind' | 'Projected';
  keyMilestone: string;
  notes: string;
}

export interface RevenueScenarioPreset {
  id: string;
  name: string;
  description: string;
  day7ActualMrr: number;
  conversionRate: string;
  badge: string;
  metrics: DailyRevenueMetric[];
}
