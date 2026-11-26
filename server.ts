import { runMission, getMissionHistory, getMissionById, getRegisteredAgents } from "./mission-engine.js";

import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});


 // =====================================================
// GEMINI RETRY / RESILIENCE
// =====================================================

async function generateWithRetry(
  contents: string,
  systemInstruction: string
) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
        },
      });
    } catch (error: any) {
      const errorMessage = String(error?.message || error);

      const retryable =
        /503|429|500|502|504|UNAVAILABLE|RESOURCE_EXHAUSTED|overloaded|high demand/i
          .test(errorMessage);

      if (!retryable || attempt === maxAttempts) {
        throw error;
      }

      const delay = attempt * 2000;

      console.warn(
        `Gemini temporarily unavailable. Retry ${attempt}/${maxAttempts} in ${delay}ms`
      );

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Gemini request failed after retries.');
}

// =====================================================


// =====================================================
// BUSINESS CONTEXT
// =====================================================

const BUSINESS_CONTEXT = `
Business: Breakfast in Bed LX.
Location: Lisbon, Portugal.

Business model:
Premium daily breakfast and brunch delivery.
Fresh, locally sourced Portuguese products.
Target customers:
- Hotels and boutique hotels.
- Airbnb hosts.
- Short-term rental property managers.
- International tourists.
- Couples and special occasions.

Commercial objectives:
- Target: 20 prepaid orders per day.
- Reservations must be completed by 23:00.
- Delivery window: 08:30 to 13:30.
- Customers pay online before delivery.
- The website checkout is already prepared.

Sales priorities:
1. Acquire paying customers.
2. Establish recurring hotel partnerships.
3. Recruit Airbnb hosts and property managers.
4. Generate qualified commercial leads.
5. Increase prepaid reservations.

Rules:
- No spending without human authorization.
- Never invent prospects or contact details.
- Never claim an action has been executed when it has not.
- Prioritize measurable revenue.
- All commercial activities must concern Breakfast in Bed LX.
`;

// =====================================================
// AGENT SYSTEM PROMPTS
// =====================================================

const AGENT_SYSTEM_PROMPTS: Record<string, string> = {

  ceo: `
You are the Autonomous Business CEO and Lead Orchestrator.

You manage a commercial AI team responsible exclusively for Breakfast in Bed LX.

Your priorities:
- Revenue generation.
- Commercial growth.
- Customer acquisition.
- Operational efficiency.
- Strategic decision-making.

Challenge weak assumptions.
Distinguish [VERIFIED FACT], [ESTIMATE] and [ASSUMPTION].
Never authorize spending or financial transactions.
Coordinate agents and convert their findings into measurable actions.

Think like an experienced startup CEO.
Be direct, analytical and commercially ambitious.
`,

  research_a: `
You are Research Agent A: HOTEL & HOSPITALITY BUSINESS DEVELOPMENT SPECIALIST.

Business: Breakfast in Bed LX, Lisbon, Portugal.

Your mission:
Find and qualify hotel business prospects.

Target:
- Boutique hotels.
- Independent hotels.
- Guesthouses.
- Aparthotels.
- Luxury accommodation.
- Hotel managers.
- Guest experience managers.
- Front office managers.

For each prospect identify:
1. Business name.
2. Location.
3. Official website.
4. Public business email or telephone, if verifiable.
5. Relevant decision-maker, if publicly identifiable.
6. Why Breakfast in Bed LX is relevant.
7. Partnership opportunity.
8. Recommended first contact.
9. Lead qualification score from 1 to 10.

Prioritize businesses with recurring guest breakfast demand.

Never invent businesses, contacts, email addresses or research findings.

If live research is unavailable, explicitly identify information requiring verification.

Deliver practical prospecting lists, not generic market reports.
`,

  research_b: `
You are Research Agent B: AIRBNB & TOURISM CUSTOMER ACQUISITION SPECIALIST.

Business: Breakfast in Bed LX, Lisbon, Portugal.

Your mission:
Identify opportunities to acquire individual customers and accommodation partners.

Target:
- Airbnb hosts.
- Short-term rental property managers.
- Local accommodation operators.
- Tourism companies.
- Travel agencies.
- Concierge services.
- Romantic experience providers.
- International visitors to Lisbon.

Your responsibilities:
1. Identify potential customer segments.
2. Find partnership opportunities.
3. Develop customer acquisition strategies.
4. Identify publicly available business contacts.
5. Recommend practical sales channels.
6. Propose daily prospecting activities.
7. Develop strategies to reach 20 prepaid orders per day.

For each lead provide:
- Business name.
- Website or public profile.
- Location.
- Public contact information, if verified.
- Commercial opportunity.
- Recommended next action.
- Lead qualification score from 1 to 10.

Never invent leads or claim to have contacted anyone.

If live research is unavailable, distinguish research suggestions from verified leads.
`,

  business_analyst: `
You are the Business Analyst Agent for Breakfast in Bed LX.

Your responsibilities:
- Analyze commercial opportunities.
- Evaluate pricing and profitability.
- Calculate customer acquisition costs.
- Analyze conversion rates.
- Evaluate recurring revenue opportunities.
- Identify operational bottlenecks.
- Analyze competitors.
- Calculate break-even points.
- Evaluate the feasibility of reaching 20 daily orders.

Use numerical reasoning wherever possible.

Clearly distinguish verified figures from estimates and assumptions.
Prioritize commercially viable recommendations.
`,

  marketing: `
You are the Commercial Marketing Director for Breakfast in Bed LX.

Business:
Premium breakfast and brunch delivery in Lisbon, Portugal.

Your mission:
Generate paying customers and commercial partnerships.

Target audiences:
- International tourists.
- Hotel guests.
- Airbnb guests.
- Couples.
- Special occasion customers.
- Hotels and accommodation partners.

Responsibilities:

1. Create customer acquisition campaigns.
2. Write English-language promotional content.
3. Create Instagram and social media campaigns.
4. Develop hotel partnership proposals.
5. Write Airbnb host partnership messages.
6. Create direct sales messages.
7. Improve website conversion.
8. Promote prepaid online reservations.
9. Develop campaigns for romantic occasions and special dates.
10. Create weekly measurable marketing plans.

Brand positioning:
Premium experience.
Fresh local products.
Convenience.
Portuguese breakfast culture.
Delivered directly to the accommodation.

Commercial objective:
Generate at least 20 prepaid orders per day.

Every campaign must include:
- Target audience.
- Campaign objective.
- Marketing message.
- Distribution channel.
- Call to action.
- Expected measurable result.
- Recommended next action.

All promotional content must be written in English.

Never spend money without human authorization.
Never claim a campaign has been published unless it has actually been published.
`,

  finance: `
You are the Financial Intelligence Agent for Breakfast in Bed LX.

Your mission:
Protect cash flow and maximize profitability.

Responsibilities:
- Analyze revenue.
- Calculate gross margins.
- Evaluate product costs.
- Calculate break-even points.
- Forecast daily and monthly revenue.
- Analyze customer acquisition costs.
- Evaluate profitability of hotel partnerships.
- Monitor financial risks.

Rules:
- Zero unauthorized expenditure.
- No speculative financial transactions.
- Clearly distinguish verified numbers from estimates.
- Recommend practical cash-flow improvements.

Focus on sustainable business growth.
`
};

// =====================================================
// GEMINI AGENT CONSULTATION
// =====================================================

app.post('/api/gemini/agent-consult', async (req: Request, res: Response) => {
  try {
    const {
      agentId = 'ceo',
      prompt,
      context
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: 'Prompt is required'
      });
    }

    const systemInstruction =
      AGENT_SYSTEM_PROMPTS[agentId] || AGENT_SYSTEM_PROMPTS.ceo;

    const fullPrompt = `
BUSINESS CONTEXT:

${context || BUSINESS_CONTEXT}

USER QUERY / DIRECTIVE:

${prompt}

INSTRUCTIONS:

Provide a structured, rigorous and commercially focused response.

Include:

1. Assessment and Findings.
2. Verified Facts.
3. Estimates and Assumptions.
4. Commercial Opportunities.
5. Risks and Constraints.
6. Concrete Recommended Actions.
7. Measurable Expected Outcomes.

Be specific, practical and action-oriented.

Do not fabricate research, prospects, contacts or executed actions.
`;

    const response = await generateWithRetry(
      fullPrompt,
      systemInstruction
    );

    return res.json({
      agentId,
      text: response.text,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Gemini consult error:', error);

    return res.status(500).json({
      error: error.message || 'Failed to generate agent consultation',
    });
  }
});

// =====================================================
// CEO STRESS TEST
// =====================================================

app.post('/api/gemini/stress-test', async (req: Request, res: Response) => {
  try {
    const { assumption, targetPath } = req.body;

    if (!assumption) {
      return res.status(400).json({
        error: 'Assumption text is required'
      });
    }

    const prompt = `
BUSINESS CONTEXT:
${BUSINESS_CONTEXT}

CEO RED-TEAM STRESS TEST

Target: ${targetPath || 'Business Opportunity'}

Assumption:
"${assumption}"

Analyze:

1. Why this assumption might fail.
2. Worst-case financial and operational impact.
3. Evidence needed to validate it.
4. A 48-hour validation experiment.
5. Estimated cost (prioritize zero-cost validation).
6. CEO verdict: High, Moderate or Speculative confidence.

Be rigorous and realistic.
`;

    const response = await generateWithRetry(
      prompt,
      AGENT_SYSTEM_PROMPTS.ceo
    );

    return res.json({
      text: response.text,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Stress test error:', error);

    return res.status(500).json({
      error: error.message || 'Failed to stress-test assumption',
    });
  }
});

// =====================================================
// COMMERCIAL OUTREACH GENERATOR
// =====================================================

app.post('/api/gemini/generate-outreach', async (req: Request, res: Response) => {
  try {
    const {
      product = 'Breakfast in Bed LX',
      targetPersona = 'Hotels, Airbnb hosts and international tourists in Lisbon',
      channel = 'Cold Email'
    } = req.body;

    const prompt = `
BUSINESS:
${BUSINESS_CONTEXT}

Generate a high-converting commercial message.

Product: ${product}
Target audience: ${targetPersona}
Communication channel: ${channel}

Requirements:

- Professional and natural English.
- No generic marketing buzzwords.
- Clear commercial value proposition.
- Short and persuasive.
- Specific call to action.
- Promote premium breakfast and brunch delivery.
- Emphasize fresh local products and convenience.
- Encourage prepaid online reservations.

For hotels and Airbnb hosts:
Focus on guest satisfaction, additional services and partnership opportunities.

For tourists:
Focus on convenience, quality and the experience of enjoying breakfast at their accommodation.

Do not mention AI Hotel Concierge, QR pilots or unrelated services.

If email, provide three subject line options.

Return the complete message ready for human review and sending.
`;

    const response = await generateWithRetry(
      prompt,
      AGENT_SYSTEM_PROMPTS.marketing
    );

    return res.json({
      text: response.text,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Outreach generation error:', error);

    return res.status(500).json({
      error: error.message || 'Failed to generate outreach pitch',
    });
  }
});

// =====================================================

// =====================================================
// MISSION ENGINE - CENTRAL AGENT ORCHESTRATION
// =====================================================


// =====================================================
// AUTONOMOUS CEO â€” AI PLANNING AND MISSION EXECUTION
// =====================================================

app.post('/api/missions/autonomous', async (req, res) => {
  try {
    const { objective, context = {} } = req.body;

    if (!objective || typeof objective !== 'string' || !objective.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Mission objective is required'
      });
    }

    const agents = getRegisteredAgents();

    const systemInstruction = `
You are the autonomous CEO orchestrator of Breakfast in Bed LX.

Your responsibility is to plan business missions and coordinate specialist AI agents.

Available agents:
${JSON.stringify(agents, null, 2)}

Create a practical execution plan using the most relevant agents.
For each task, provide:
- agentId: exact registered agent ID
- payload: JSON object with the fields required by that agent

Focus on research, market intelligence, business strategy,
financial analysis and prospect discovery.

Never authorize external messages, purchases or paid actions.
Only research, analysis and preparation are autonomous.

Return ONLY valid JSON:
{
  "reasoning": "Brief explanation of agent selection",
  "tasks": [
    {
      "agentId": "exact_agent_id",
      "payload": {}
    }
  ]
}
`;

        let plan: any;
    try {
      const planResponse = await generateWithRetry(
        JSON.stringify({
          objective: objective.trim(),
          businessContext: context
        }),
        systemInstruction
      );
      const rawPlan = String(planResponse.text || '');
      const jsonMatch = rawPlan.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('CEO failed to generate a valid execution plan');
      plan = JSON.parse(jsonMatch[0]);
    } catch (planningError: any) {
      console.error('CEO planning fallback:', planningError);
      plan = {
        reasoning: 'Predefined execution plan used because Gemini CEO planning was unavailable.',
        tasks: [
          { agentId: 'autonomous_market_intelligence', payload: { topic: objective.trim(), targetMarket: 'Lisbon, Portugal', researchMode: 'FULL_DISCOVERY', additionalContext: JSON.stringify(context) } },
          { agentId: 'market_research', payload: { query: objective.trim(), sector: 'Lisbon tourism and hospitality', depth: 'deep' } },
          { agentId: 'global_opportunity_hunter', payload: { market: 'Lisbon, Portugal', industry: 'Hotels, Airbnb and accommodation managers', targetQuery: objective.trim() } },
          { agentId: 'business_strategy', payload: { productOrIdea: 'Breakfast in Bed LX', focusMarket: 'Lisbon, Portugal', businessModel: 'Direct tourist bookings and accommodation referrals with 10% host commission', targetPricing: 'Maintain existing prices; no discounts', language: 'en' } },
          { agentId: 'financial_intelligence', payload: { action: 'financial_analysis', payload: { objective: objective.trim(), context: context }, language: 'en' } }
        ]
      };
    }

    if (!Array.isArray(plan.tasks) || plan.tasks.length === 0) {
      throw new Error('CEO generated no executable tasks');
    }

    if (!agents.length) {
      throw new Error("No registered agents available");
    }

    const plannedTasks = Array.isArray(plan.tasks) ? plan.tasks : [];

    const defaultPayloads: Record<string, any> = {
      autonomous_market_intelligence: {
        topic: objective.trim(),
        targetMarket: "Lisbon, Portugal",
        researchMode: "FULL_DISCOVERY",
        additionalContext: JSON.stringify(context)
      },
      market_research: {
        query: objective.trim(),
        sector: "Lisbon tourism and hospitality",
        depth: "deep"
      },
      global_opportunity_hunter: {
        market: "Lisbon, Portugal",
        industry: "Hotels, Airbnb and accommodation managers",
        targetQuery: objective.trim()
      },
      business_strategy: {
        productOrIdea: "Breakfast in Bed LX",
        focusMarket: "Lisbon, Portugal",
        businessModel: "Direct tourist bookings and accommodation referrals with 10% host commission",
        targetPricing: "Maintain existing prices. No discounts.",
        language: "en"
      },
      financial_intelligence: {
        action: "financial_analysis",
        payload: {
          objective: objective.trim(),
          context
        },
        language: "en"
      }
    };

    const orderedTasks = agents.map((agent: any) => {
      const existingTask = plannedTasks.find(
        (task: any) => task.agentId === agent.id
      );

      return {
        agentId: agent.id,
        payload:
          existingTask?.payload &&
          typeof existingTask.payload === "object" &&
          !Array.isArray(existingTask.payload)
            ? existingTask.payload
            : defaultPayloads[agent.id] || {
                objective: objective.trim(),
                prompt: objective.trim(),
                topic: objective.trim(),
                query: objective.trim(),
                context,
                language: "en"
              }
      };
    });

    console.log(
      "CEO dispatching mission to ALL registered agents:",
      orderedTasks.map(task => task.agentId)
    );

    const mission = await runMission({
      objective: objective.trim(),
      tasks: orderedTasks,
      executionMode: 'sequential'
    });

    res.status(200).json({
      success: true,
      autonomous: true,
      plan: {
        reasoning: plan.reasoning,
        tasks: plan.tasks
      },
      mission
    });

  } catch (error: any) {
    console.error('Autonomous mission error:', error);

    res.status(500).json({
      success: false,
      autonomous: false,
      error: error.message || 'Autonomous mission failed'
    });
  }
});

app.get('/api/missions/agents', (_req, res) => {
  res.json({
    success: true,
    agents: getRegisteredAgents()
  });
});

app.post('/api/missions/run', async (req, res) => {
  try {
    const mission = await runMission(req.body);

    res.status(200).json({
      success: true,
      mission
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/missions', async (_req, res) => {
  res.json({
    success: true,
    missions: await getMissionHistory()
  });
});

app.get('/api/missions/:id', async (req, res) => {
  const mission = await getMissionById(req.params.id);

  if (!mission) {
    return res.status(404).json({
      success: false,
      error: 'Mission not found'
    });
  }

  res.json({ success: true, mission });
});

// HEALTH CHECK
// =====================================================

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    serverTime: new Date().toISOString(),
    ceoAgentStatus: 'operational',
    business: 'Breakfast in Bed LX',
    agents: Object.keys(AGENT_SYSTEM_PROMPTS),
  });
});

// =====================================================
// VITE / PRODUCTION SERVER
// =====================================================

async function setupServer() {

  if (process.env.NODE_ENV !== 'production') {

    const { createServer: createViteServer } =
      await import('vite');

    const vite = await createViteServer({
      server: {
        middlewareMode: true
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);

  } else {

    app.use(express.static(path.resolve(__dirname, 'dist')));

    app.get('*', (_req, res) => {
      res.sendFile(
        path.resolve(__dirname, 'dist', 'index.html')
      );
    });
  }

  app.listen(PORT, () => {
    console.log(
      `Autonomous Business CEO Orchestrator running on port ${PORT}`
    );
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
});


