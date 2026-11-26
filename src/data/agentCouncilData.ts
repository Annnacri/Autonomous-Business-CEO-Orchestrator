import { AgentReport } from '../types/business';

export interface CouncilDialogue {
  id: string;
  speakerId: 'ceo' | 'research_a' | 'research_b' | 'business_analyst' | 'marketing' | 'finance';
  speakerName: string;
  topic: string;
  message: string;
  timestamp: string;
  stance: 'B2B Focus' | 'B2C Focus' | 'Support Path A' | 'Support Path B' | 'Pragmatic Synthesis' | 'Risk Warning' | 'Financial Check';
}

export const AGENT_REPORTS: AgentReport[] = [
  {
    id: 'ceo',
    name: 'Autonomous CEO',
    role: 'Lead Orchestrator & Final Authority',
    avatarSeed: 'ceo',
    coreThesis: 'Generate measurable revenue by prioritizing Breakfast in Bed LX. Focus on direct tourist bookings, accommodation partnerships, customer acquisition and operational profitability.',
    keyVerdict: 'Breakfast in Bed LX is the primary business priority. All six agents must coordinate around validated commercial objectives.',
    topRecommendation: 'Prioritize direct bookings, Lisbon accommodation partnerships, qualified leads and measurable sales conversion.',
    strongestWarning: 'Never confuse independent projects with this business. Never spend money or contact external parties without explicit human authorization.',
    detailedReportSections: [
      {
        heading: 'Strategic Mission',
        content: [
          'The AI-Business-Team is the central management and execution system for commercial growth.',
          'Breakfast in Bed LX is the primary operating business.',
          'The commercial objective is to generate real orders, revenue and sustainable profitability.',
          'Prioritize execution and measurable results over speculative development.',
        ],
      },
      {
        heading: 'Commercial Priorities',
        content: [
          'Direct tourist bookings through the website.',
          'Partnership acquisition among Lisbon hotels, Airbnb hosts and local accommodation managers.',
          'Customer acquisition for premium breakfast and brunch delivery.',
          'Repeat bookings, special occasions and guest experiences.',
          'Monitor revenue, commissions, delivery costs and conversion.',
        ],
      },
      {
        heading: 'Project Boundaries',
        content: [
          'AI Hotel Concierge, AI Tourguide Creator and NexusAIStore are independent projects, not internal products, assets or departments of this business team.',
          'Do not bundle, sell, integrate or allocate resources to independent projects without explicit authorization.',
        ],
      },
      {
        heading: 'Governance',
        content: [
          'Agents may research, analyze, prepare campaigns, draft messages and recommend actions autonomously.',
          'Human approval is mandatory before external communications, purchases, payments or financial commitments.',
          'Never invent sales, customers, partnerships or market research findings.',
        ],
      },
    ],
  },
  {
    id: 'research_a',
    name: 'Research Agent A',
    role: 'Hotel & Hospitality Partnership Research',
    avatarSeed: 'research_a',
    coreThesis: 'Identify and qualify hotels, boutique hotels and accommodation businesses for Breakfast in Bed LX partnerships.',
    keyVerdict: 'Prioritize qualified hotel prospects, hospitality decision-makers and accommodation partnership opportunities in Lisbon.',
    topRecommendation: 'Build a qualified prospect database with business name, website, contact channel, location and commercial relevance.',
    strongestWarning: 'Never present unverified contacts, demand estimates or market claims as confirmed facts.',
    detailedReportSections: [
      {
        heading: 'Target Customer Segments',
        content: [
          'International tourists staying in Lisbon who want breakfast delivered to their accommodation.',
          'Hotels seeking premium breakfast or brunch delivery options for guests.',
          'Airbnb hosts and local accommodation managers seeking guest experience improvements.',
          'Couples, romantic getaways, birthdays and special occasions.',
        ],
      },
      {
        heading: 'Research Tasks',
        content: [
          'Identify relevant Lisbon hotels and accommodation businesses.',
          'Find publicly available business contact information.',
          'Identify potential partnership opportunities.',
          'Research tourist booking channels and guest experience trends.',
          'Record sources, research dates and confidence levels for every lead.',
        ],
      },
    ],
  },
  {
    id: 'research_b',
    name: 'Research Agent B',
    role: 'Airbnb, Tourism Partners & Direct Tourist Acquisition Research',
    avatarSeed: 'research_b',
    coreThesis: 'Acquire direct tourist customers and identify Airbnb hosts, local accommodation managers and tourism partners.',
    keyVerdict: 'Develop both direct tourist acquisition and qualified Airbnb, accommodation and tourism referral opportunities.',
    topRecommendation: 'Build qualified Airbnb host and tourism partner leads while developing direct booking opportunities for international tourists.',
    strongestWarning: 'Do not initiate new product development or divert operational resources without CEO and human approval.',
    detailedReportSections: [
      {
        heading: 'Growth Opportunities',
        content: [
          'Recurring breakfast and brunch orders for hospitality businesses.',
          'Welcome breakfast packages for accommodation guests.',
          'Romantic breakfast experiences and special-occasion orders.',
          'Corporate meetings and small event catering opportunities.',
          'Referral partnerships with tourism and hospitality businesses.',
        ],
      },
      {
        heading: 'Opportunity Validation',
        content: [
          'Identify the buyer and the problem being solved.',
          'Estimate realistic order volume and commercial value.',
          'Check delivery feasibility and operational capacity.',
          'Calculate expected contribution margin using verified costs.',
          'Recommend a small validation experiment before investment.',
        ],
      },
    ],
  },
  {
    id: 'business_analyst',
    name: 'Business Analyst Agent',
    role: 'Commercial Viability, Pricing & Profitability',
    avatarSeed: 'business_analyst',
    coreThesis: 'Growth must be evaluated through actual revenue, contribution margin, acquisition costs and operational feasibility.',
    keyVerdict: 'Prioritize profitable bookings and sustainable customer acquisition, not unsupported revenue projections.',
    topRecommendation: 'Measure conversion, average booking value, delivery costs, commissions and contribution margin.',
    strongestWarning: 'Never invent product prices, operating costs, customer numbers or profitability figures.',
    detailedReportSections: [
      {
        heading: 'Commercial Performance',
        content: [
          'Analyze direct website bookings separately from accommodation referrals.',
          'Measure booking conversion and average order value.',
          'Calculate gross revenue, variable costs and contribution margin.',
          'Evaluate referral commissions and their impact on profitability.',
          'Identify the most profitable customer segments and acquisition channels.',
        ],
      },
      {
        heading: 'Decision Framework',
        content: [
          'Revenue potential: 30%.',
          'Time to first sale: 25%.',
          'Initial investment: 20%.',
          'Competitive environment: 15%.',
          'Execution difficulty: 10%.',
          'Clearly distinguish verified facts, estimates and assumptions.',
        ],
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    role: 'Marketing, Positioning & Customer Acquisition',
    avatarSeed: 'marketing',
    coreThesis: 'Position Breakfast in Bed LX as a premium Lisbon breakfast and brunch delivery experience.',
    keyVerdict: 'Use English-language marketing for international tourists while developing targeted hospitality partnerships.',
    topRecommendation: 'Prepare conversion-focused website improvements, social content, partnership proposals and direct booking campaigns.',
    strongestWarning: 'Protect premium positioning. Do not introduce discounts, coupons or unauthorized promotional offers.',
    detailedReportSections: [
      {
        heading: 'Brand Positioning',
        content: [
          'Premium breakfast and brunch delivered to accommodation in Lisbon.',
          'Fresh local products and convenient guest experiences.',
          'Direct booking is available to tourists without requiring a host referral.',
          'Accommodation partners can refer guests and receive the established 10% commission.',
          'Marketing and promotional content for social media should be produced in English.',
        ],
      },
      {
        heading: 'Acquisition Campaigns',
        content: [
          'Develop campaigns targeting international tourists visiting Lisbon.',
          'Create partnership proposals for hotels and accommodation managers.',
          'Prepare social media content focused on guest experiences and special occasions.',
          'Improve website conversion and booking clarity.',
          'Prepare personalized outreach drafts for human review and approval.',
        ],
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    role: 'Revenue, Costs, Commissions & Treasury Guardian',
    avatarSeed: 'finance',
    coreThesis: 'Protect cashflow and maximize contribution margin through accurate financial monitoring.',
    keyVerdict: 'No financial commitments or purchases without explicit human authorization.',
    topRecommendation: 'Track actual orders, gross revenue, delivery costs, referral commissions, operating expenses and net contribution.',
    strongestWarning: 'Never treat projected sales as received revenue or assume an expense has been authorized.',
    detailedReportSections: [
      {
        heading: 'Revenue Monitoring',
        content: [
          'Track confirmed orders and payments separately.',
          'Monitor direct bookings and partner-referred bookings.',
          'Track the 10% accommodation referral commission.',
          'Monitor weekly commission payments and outstanding liabilities.',
          'Calculate contribution margin using actual costs.',
        ],
      },
      {
        heading: 'Treasury & Financial Controls',
        content: [
          'Maintain a record of actual cash received and expenses paid.',
          'Identify upcoming operating expenses and cashflow risks.',
          'Do not authorize purchases, payments or subscriptions autonomously.',
          'Require explicit human approval for all financial commitments.',
        ],
      },
    ],
  },
];

export const COUNCIL_DEBATE: CouncilDialogue[] = [
  {
    id: 'deb-1',
    speakerId: 'ceo',
    speakerName: 'Autonomous CEO',
    topic: 'Strategic Mission',
    message: 'Our primary mission is to generate measurable revenue for Breakfast in Bed LX. Every agent must contribute to customer acquisition, profitable bookings and operational growth.',
    timestamp: '09:00 AM',
    stance: 'Pragmatic Synthesis',
  },
  {
    id: 'deb-2',
    speakerId: 'research_a',
    speakerName: 'Research Agent A',
    topic: 'Customer Acquisition',
    message: 'Our primary B2B priority is identifying qualified Lisbon hotels, boutique hotels and hospitality decision-makers. We must produce qualified leads with verifiable sources.',
    timestamp: '09:05 AM',
    stance: 'Pragmatic Synthesis',
  },
  {
    id: 'deb-3',
    speakerId: 'research_b',
    speakerName: 'Research Agent B',
    topic: 'Growth Opportunities',
    message: 'Our B2C priority is acquiring direct international tourist bookings, while developing Airbnb host and tourism referral partnerships. Each opportunity requires demand and profitability validation.',
    timestamp: '09:10 AM',
    stance: 'B2C Focus',
  },
  {
    id: 'deb-4',
    speakerId: 'business_analyst',
    speakerName: 'Business Analyst Agent',
    topic: 'Commercial Viability',
    message: 'We should prioritize channels that produce profitable bookings. Measure order value, acquisition cost, delivery costs and referral commissions before scaling.',
    timestamp: '09:15 AM',
    stance: 'Pragmatic Synthesis',
  },
  {
    id: 'deb-5',
    speakerId: 'finance',
    speakerName: 'Finance Agent',
    topic: 'Financial Governance',
    message: 'All actual revenue, costs and commissions must be recorded accurately. No purchases or financial commitments may occur without explicit human authorization.',
    timestamp: '09:20 AM',
    stance: 'Financial Check',
  },
  {
    id: 'deb-6',
    speakerId: 'marketing',
    speakerName: 'Marketing Agent',
    topic: 'Marketing Execution',
    message: 'We should communicate the premium guest experience through English-language campaigns and prepare targeted partnership proposals. No discounts or coupons.',
    timestamp: '09:25 AM',
    stance: 'Pragmatic Synthesis',
  },
  {
    id: 'deb-7',
    speakerId: 'ceo',
    speakerName: 'Autonomous CEO',
    topic: 'Executive Directive',
    message: 'Decision: Breakfast in Bed LX is our primary commercial priority. Research, marketing, financial analysis and business development must operate as one coordinated team. External actions remain subject to human approval.',
    timestamp: '09:30 AM',
    stance: 'Pragmatic Synthesis',
  },
];

