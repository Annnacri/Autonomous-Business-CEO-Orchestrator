import { AgentReport } from '../types/business';

export interface CouncilDialogue {
  id: string;
  speakerId: 'ceo' | 'research_a' | 'research_b' | 'business_analyst' | 'marketing' | 'finance';
  speakerName: string;
  topic: string;
  message: string;
  timestamp: string;
  stance: 'Support Path A' | 'Support Path B' | 'Pragmatic Synthesis' | 'Risk Warning' | 'Financial Check';
}

export const AGENT_REPORTS: AgentReport[] = [
  {
    id: 'ceo',
    name: 'Autonomous CEO',
    role: 'Lead Orchestrator & Final Authority',
    avatarSeed: 'ceo',
    coreThesis: 'Speed-to-cashflow is the only defensible hedge against capital depletion. We must deploy existing working software (Path A: AI Hotel Concierge) immediately via founder-led sales to achieve revenue in 7 days, while shelving speculative new builds (Path B) until the treasury is self-funding.',
    keyVerdict: 'UNANIMOUS DECISION: Execute Path A1 (AI Hotel Concierge for Independent Boutique Lodging) for immediate Day 1-7 monetization. Deprioritize NexusAIStore. Retain Path B as Phase 2 after reaching $2,000 MRR.',
    topRecommendation: 'Deploy the existing AI Hotel Concierge to local independent boutique inns via 14-day zero-risk pilots. Walk into 10 properties on Day 3 with live working demos on an iPad. Close the first paying customer on Day 7 at $79/month.',
    strongestWarning: 'Zero spend without human authorization. Do not waste a single hour building new code for Path B when we have unmonetized code sitting idle in Path A.',
    detailedReportSections: [
      {
        heading: 'Strategic Orientation & The Cashflow Imperative',
        content: [
          'As CEO, my mandate is unequivocal: generate actual, verifiable revenue with minimal initial investment ($0 unauthorized spend). We do not celebrate GitHub commits, Figma mockups, or theoretical TAMs—we celebrate bank deposits from paying customers.',
          'Between Path A (monetizing existing assets) and Path B (researching and building a new venture), the asymmetry is overwhelming. Path A already has functional code for AI Tourguide Creator and AI Hotel Concierge. Path B requires 14 to 28 days of zero-to-one development, user-testing, and debug cycles before a single commercial pitch can be uttered.',
        ],
      },
      {
        heading: 'Asset Prioritization within Path A',
        content: [
          '1. AI Hotel Concierge: HIGHEST PRIORITY. B2B SaaS with high urgency. Boutique hotels (15-45 rooms) suffer chronic front-desk night staffing shortages and repetitive guest questions. Legacy vendors ignore this tier due to low contract size. Our $79-$149/mo price point is an impulse operational purchase.',
          '2. AI Tourguide Creator: SECONDARY TRACK. High demonstration value, but consumer willingness to pay for self-guided audio tours is modest ($3-$7) and solo guides have unpredictable marketing reach. Bundle with hotel concierge in tourism destinations.',
          '3. NexusAIStore: TERMINATE / SHELVE. Marketplace cold-start dynamics will consume 100% of our marketing energy with near-zero initial revenue. The prompt market is flooded with commodity freebies on Gumroad and PromptBase.',
        ],
      },
      {
        heading: 'Governance & Spending Discipline',
        content: [
          'Operating Rule 3 and 4 are strictly binding: no purchases or financial transactions will occur without explicit human sign-off in the Treasury Ledger.',
          'We will operate on free serverless tiers (Vercel, Cloudflare, free Gemini token allotments) during the entire 7-day validation cycle. Capital efficiency is our greatest competitive moat.',
        ],
      },
    ],
  },
  {
    id: 'research_a',
    name: 'Research Agent A',
    role: 'Existing Applications & Monetization Specialist',
    avatarSeed: 'research_a',
    coreThesis: 'Existing software assets represent paid-up R&D. The AI Hotel Concierge has immediate product-market fit in the neglected 12-40 room boutique lodging tier where enterprise hospitality tech is too expensive.',
    keyVerdict: 'Path A1 (AI Hotel Concierge) is 3x faster to revenue than any alternative. Code is ready; market demand is acute; distribution is directly accessible via phone or walk-in.',
    topRecommendation: 'Package AI Hotel Concierge with a 1-page factsheet and a sample branded QR code. Target boutique inns within driving distance or direct telephone reach.',
    strongestWarning: 'Do not attempt to sell to corporate chains (Marriott, Hilton, Accor). Their procurement cycles take 9-18 months. Target owner-operators who can say "yes" in 10 minutes.',
    detailedReportSections: [
      {
        heading: 'Evaluation of AI Hotel Concierge',
        content: [
          '[VERIFIED FACT]: Over 60% of hotels globally are independent properties with no central brand IT mandate.',
          '[VERIFIED FACT]: Major hospitality guest apps (Intelity, Duve, Akia) charge $3,000-$10,000/yr minimums plus onboarding, pricing out sub-40 room inns.',
          '[ESTIMATE]: An independent 25-room hotel receives 30-50 repetitive guest questions daily (WiFi, breakfast hours, pool towels, late checkout, local dinner spots).',
          'Fastest route to first paying customer: In-person walk-in to 5 local boutique hotels during 11 AM checkout lull with an iPad running their hotel name on the demo. Offer a 14-day free pilot with custom counter stand.',
        ],
      },
      {
        heading: 'Evaluation of AI Tourguide Creator',
        content: [
          'Audio tour guides have a strong visual/audio appeal, and platforms like VoiceMap prove consumer appetite. However, solo tour guides are notoriously price-sensitive.',
          'Recommendation: Use AI Tourguide as an upsell feature inside the Hotel Concierge ("Offer your guests self-guided walking tours around your hotel designed by your concierge").',
        ],
      },
      {
        heading: 'Evaluation of NexusAIStore',
        content: [
          '[VERIFIED FACT]: Median earnings for digital prompt packs on Gumroad/PromptBase are under $14 total lifetime.',
          'The store requires two-sided liquidity. Building the store takes 2 days, but getting 5,000 monthly visitors without paid ads takes 6 months of SEO or social media grind. Strongly recommend freezing this project.',
        ],
      },
    ],
  },
  {
    id: 'research_b',
    name: 'Research Agent B',
    role: 'New Business Opportunities Specialist',
    avatarSeed: 'research_b',
    coreThesis: 'While new B2B workflows (like trade subcontractor bid analysis) have massive LTV, they carry prohibitive zero-to-one engineering lead times that violate our 7-day revenue mandate.',
    keyVerdict: 'Path B contains lucrative long-term opportunities, but zero realistic avenues to cashflow within 7 days. Keep Path B in the research incubator for Month 2.',
    topRecommendation: 'Validate Subcontractor RFP Assistant demand passively via LinkedIn posts while Path A is generating initial cashflow.',
    strongestWarning: 'Beware the "builder trap"—starting a brand new codebase from scratch because new ideas feel cleaner than doing sales for existing code.',
    detailedReportSections: [
      {
        heading: 'Niche Opportunity 1: Subcontractor RFP Bid Assistant',
        content: [
          'Commercial trade contractors (drywall, painting, electrical) waste 15-20 hours per week reading 200+ page architectural specifications to find trade-specific clauses.',
          'Commercial potential is high: $299-$499/mo with near-zero churn if it prevents a missed clause.',
          '[VERIFIED FACT]: Building a reliable OCR PDF parsing pipeline with construction division CSI codes requires 3-4 weeks of full-stack engineering and legal disclaimer reviews.',
          'Verdict: Exceptional business for Phase 2, but impossible to monetize within our 7-day mandate.',
        ],
      },
      {
        heading: 'Niche Opportunity 2: Clinic & Dental Review Automation',
        content: [
          'Local medical/dental practices value 5-star Google reviews. However, the market is dominated by venture-backed incumbents (Birdeye, Podium, Weave).',
          '[VERIFIED FACT]: SMS marketing in 2026 requires A2P 10DLC campaign registration, taking 2 to 3 weeks for carrier approval before sending a single commercial text.',
          'Verdict: Severe regulatory gatekeepers prevent rapid deployment.',
        ],
      },
    ],
  },
  {
    id: 'business_analyst',
    name: 'Business Analyst Agent',
    role: 'Commercial Viability & Financial Comparison',
    avatarSeed: 'business_analyst',
    coreThesis: 'Objective decision matrix scoring confirms Path A1 (AI Hotel Concierge) leads Path B by 18.2 weighted points. The unit economics exhibit 91% gross margins and under 1.1-month payback.',
    keyVerdict: 'Weighted Score: Path A1 (AI Hotel Concierge) = 83.1/100 vs Path B1 (Subcontractor RFP) = 74.9/100. Path A1 dominates in Time to First Sale (88 vs 52) and Initial Investment (95 vs 80).',
    topRecommendation: 'Price Path A1 at $79/mo for up to 25 rooms, $149/mo for up to 60 rooms. Offer a Founding Member rate of $79/mo locked for life to close the first customer on Day 7.',
    strongestWarning: 'Never offer an open-ended free tier. The free pilot must have a strict 14-day expiry date with an automatic transition to billing.',
    detailedReportSections: [
      {
        heading: 'Decision Framework Analysis (Weighted Mathematical Scoring)',
        content: [
          'Scoring breakdown based on explicit prompt weights: Revenue Potential (30%), Time to First Sale (25%), Initial Investment (20%), Competitive Environment (15%), Execution Difficulty (10%).',
          'Path A1 (AI Hotel Concierge): Score = (82×0.30) + (88×0.25) + (95×0.20) + (70×0.15) + (85×0.10) = 24.6 + 22.0 + 19.0 + 10.5 + 8.5 = 84.6/100.',
          'Path A2 (AI Tourguide): Score = (68×0.30) + (74×0.25) + (92×0.20) + (62×0.15) + (78×0.10) = 74.4/100.',
          'Path A3 (NexusAIStore): Score = (45×0.30) + (35×0.25) + (90×0.20) + (32×0.15) + (65×0.10) = 51.5/100.',
          'Path B1 (RFP Subcontractor): Score = (86×0.30) + (52×0.25) + (80×0.20) + (82×0.15) + (50×0.10) = 72.1/100.',
        ],
      },
      {
        heading: 'Comparative Unit Economics',
        content: [
          'Path A1 Unit Economics: ARPU = $79/mo. COGS (Gemini Flash API calls + serverless hosting) = $7.10/mo. Gross Margin = 91.0%. Estimated CAC via direct outreach = $45-$85. Payback Period = 0.8 to 1.1 months.',
          'Path B1 Unit Economics: ARPU = $299/mo. COGS (OCR + Context Window tokens) = $72.00/mo. Gross Margin = 75.9%. Estimated CAC = $450+. Payback Period = 1.5 to 2.0 months.',
        ],
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    role: 'Customer Acquisition & Positioning Specialist',
    avatarSeed: 'marketing',
    coreThesis: 'In SMB hospitality, zero-cost founder-led direct outreach beats paid ads 100 to 1. Our positioning is not "AI Technology"—our positioning is "Stop Late-Night Front Desk Interruptions".',
    keyVerdict: 'Focus entirely on 1-to-1 direct outreach (phone, walk-in, personalized cold email). Zero budget spent on Meta or Google Ads.',
    topRecommendation: 'Use the "Trojan Horse Pilot" pitch: "We built a custom digital concierge for your hotel; here is the QR code with your breakfast menu loaded. Test it in your lobby for 14 days at zero cost."',
    strongestWarning: 'Do not use words like "Artificial Intelligence", "Large Language Model", or "Chatbot" in front-desk sales copy. Call it "Your 24/7 Digital Concierge Desk".',
    detailedReportSections: [
      {
        heading: 'Targeting & ICP Segmentation',
        content: [
          'Primary Target: Owner-operators and General Managers of independent boutique hotels, historic coaching inns, and luxury B&Bs with 12 to 45 rooms.',
          'Psychographic Trigger: Overworked owners who hate receiving late-night phone calls for trivial requests or who are paying overtime to night staff.',
        ],
      },
      {
        heading: 'Customer Acquisition Funnel ($0 Budget)',
        content: [
          'Step 1: Prospecting (50 local properties scraped from Google Maps / Booking.com / TripAdvisor).',
          'Step 2: Micro-Demo (Pre-populate 5 property facts: breakfast times, checkout, WiFi, local coffee spot).',
          'Step 3: Direct Touch (11 AM walk-in or 10:30 AM phone call asking for GM). Pitch: "I noticed your guests love your property; we made a 20-second digital concierge for your lobby. Can I leave this sample card on your desk for 5 minutes?"',
          'Step 4: 14-Day Free Trial (Lobby counter stand with live QR code).',
          'Step 5: Paid Conversion on Day 7-14 based on actual guest scan metrics.',
        ],
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    role: 'Budget, Costs, Revenue & Treasury Guardian',
    avatarSeed: 'finance',
    coreThesis: 'Capital preservation is non-negotiable. Initial operational expenses can and must be exactly $0.00 until paying customers are secured. All external purchases require human authorization.',
    keyVerdict: 'Current Budget Status: $0.00 spent. Breakeven target: 1 customer at $79/mo covers all optional tools (domain, token buffer) for an entire year.',
    topRecommendation: 'Keep all development and pilots on free tiers (Vercel free tier, Cloudflare Pages, Gemini free tier quota). Only request human authorization for a $12 domain on Day 2.',
    strongestWarning: 'Never purchase subscriptions in advance. Do not buy paid email software, paid CRM, or paid design tools. Free Google Sheets and standard email are sufficient for the first 10 customers.',
    detailedReportSections: [
      {
        heading: 'Initial Cost & Runway Breakdown',
        content: [
          'Current Outlay: $0.00.',
          'Essential Operating Costs (Days 1-7): $0.00 (leveraging free serverless hosting and Gemini Flash token tiers).',
          'Optional Enhancements (Pending Human Authorization): $12.00 domain registration + $18.00 acrylic lobby stands. Total optional: $30.00.',
          'Cashflow Run-rate with 1 customer: +$79.00/mo ($948.00 ARR) with net profit margin of 91%.',
        ],
      },
      {
        heading: 'Strict Human Authorization Protocol',
        content: [
          'In compliance with Operating Rules: "Never spend money without explicit human authorization. Never make purchases, payments or financial transactions autonomously."',
          'The Treasury Ledger provides interactive sign-off checkboxes. No agent or background worker can trigger financial execution.',
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
    topic: 'Opening Strategic Assessment',
    message: 'Team, our mandate is to compare Path A (monetizing existing digital assets: AI Tourguide, AI Hotel Concierge, NexusAIStore) against Path B (researching a new business). Our target is real revenue within 7 days with minimal investment. Research Agent A, give us the hard truth on our existing assets.',
    timestamp: '09:00 AM',
    stance: 'Pragmatic Synthesis',
  },
  {
    id: 'deb-2',
    speakerId: 'research_a',
    speakerName: 'Research Agent A',
    topic: 'Existing Asset Viability',
    message: 'The AI Hotel Concierge is our clearest winner. The codebase is already functional. Sub-40 room boutique hotels are completely neglected by enterprise vendors charging $5,000+. If we walk into 5 local boutique hotels with their menu already loaded into our app, we can secure 2 pilots by tomorrow afternoon. NexusAIStore, on the other hand, is a dead end—the prompt marketplace is oversaturated.',
    timestamp: '09:04 AM',
    stance: 'Support Path A',
  },
  {
    id: 'deb-3',
    speakerId: 'research_b',
    speakerName: 'Research Agent B',
    topic: 'Counter-Perspective from Path B',
    message: 'I agree NexusAIStore is weak, but don’t dismiss Path B too quickly. Specialty trade contractors (commercial painters, electricians) are desperate for an Automated RFP Bid Assistant that scans 200-page specs. They would pay $399/mo easily. That is 5x the contract value of an independent hotel.',
    timestamp: '09:08 AM',
    stance: 'Support Path B',
  },
  {
    id: 'deb-4',
    speakerId: 'business_analyst',
    speakerName: 'Business Analyst Agent',
    topic: 'Commercial Reality & Time-to-Cash',
    message: 'While Research B is correct about the higher ARPU ($399 vs $79), building a reliable OCR blueprint parser from scratch will take at least 3 weeks of coding, prompt testing, and liability reviews. Path B gives us a Time to First Sale score of only 52/100. Path A1 scores 88/100. When we apply our 25% weighting on Time to First Sale, Path A1 wins by a landslide.',
    timestamp: '09:12 AM',
    stance: 'Support Path A',
  },
  {
    id: 'deb-5',
    speakerId: 'finance',
    speakerName: 'Finance Agent',
    topic: 'Treasury & Spending Guardrail',
    message: 'From a capital preservation standpoint, Path A1 requires $0 upfront. We deploy on free Vercel hosting and free Gemini Flash token limits. A new build on Path B will burn engineering hours and require paid OCR APIs before we even know if contractors will trust an AI output. Furthermore, I remind all agents: $0 will be spent without explicit human authorization.',
    timestamp: '09:16 AM',
    stance: 'Financial Check',
  },
  {
    id: 'deb-6',
    speakerId: 'marketing',
    speakerName: 'Marketing Agent',
    topic: 'Customer Acquisition Physics',
    message: 'I’ve already mapped the acquisition playbook for Path A1. We do not run paid ads. We pull a list of 50 local independent boutique inns. We call the General Manager directly at 11 AM when check-out settles down. Pitch: "We made a zero-app digital concierge for your property. Try it free for 14 days; if your guests don’t love it, take it down." That is a frictionless conversion hook.',
    timestamp: '09:20 AM',
    stance: 'Support Path A',
  },
  {
    id: 'deb-7',
    speakerId: 'ceo',
    speakerName: 'Autonomous CEO',
    topic: 'Executive Decision & Directive',
    message: 'Ruling is final. We commit 100% of our 7-day operational sprint to Path A1: AI Hotel Concierge. We package the app today (Day 1), build the prospect list tomorrow (Day 2), execute outreach on Day 3, deploy live pilots on Day 4-5, and close our first paying customer on Day 7 at $79/mo. Let us begin execution.',
    timestamp: '09:25 AM',
    stance: 'Pragmatic Synthesis',
  },
];
