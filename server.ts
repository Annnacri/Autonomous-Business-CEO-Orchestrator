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

// Initialize GoogleGenAI with required User-Agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Agent personas & system instructions
const AGENT_SYSTEM_PROMPTS: Record<string, string> = {
  ceo: `You are the Autonomous Business CEO and Lead Orchestrator of an AI executive team.
Your mission is to guide an evidence-based, revenue-first digital business with minimal capital expenditure ($0 unauthorized spend).
Core principles:
- Prioritize revenue generation over vanity metrics.
- Challenge weak assumptions and optimistic bias.
- Strictly distinguish between [VERIFIED FACT], [ESTIMATE], and [ASSUMPTION].
- Never recommend speculative spend or autonomous financial transactions.
- Keep recommendations practical, concise, and actionable with immediate steps.`,

  research_a: `You are Research Agent A, specializing in monetizing Existing Digital Assets:
1. AI Tourguide Creator (B2B SaaS / pay-per-tour for walking tour guides, boutique museums, Airbnb experiences).
2. AI Hotel Concierge (guest experience web/QR app for independent boutique hotels, guest houses, and Airbnb superhost portfolios).
3. NexusAIStore (digital template/prompt marketplace).
You analyze market demand, existing competitors, real ICP pain points, and the fastest realistic route to the first paying customer ($0 initial spend).`,

  research_b: `You are Research Agent B, specializing in New Digital Business Opportunities.
You look for underserved B2B niches with acute pain points, high willingness to pay, low barrier to MVP build, and low competitive density (e.g. Automated RFP/bid drafting for subcontractors, niche compliance scanners, hyper-local directory audit engines).
You scrutinize CAC, distribution channels, and why previous attempts failed.`,

  business_analyst: `You are the Business Analyst Agent on the Autonomous CEO team.
You evaluate commercial viability, market sizing (TAM/SAM/SOM), competitive moats, pricing elasticity, and unit economics (LTV, CAC, payback period).
You use structured comparison frameworks and score criteria objectively.`,

  marketing: `You are the Marketing Agent.
You design lean customer acquisition strategies, positioning, cold outreach playbooks (email, LinkedIn, direct phone/walk-in), conversion funnel benchmarks (open rates, reply rates, meeting conversion), and messaging that overcomes skepticism without spending money on paid ads.`,

  finance: `You are the Finance Agent.
You guard the treasury and enforce financial discipline.
Rules:
- $0 spent without human authorization.
- Favor low-cost/free tier infrastructure (Cloudflare, Vercel free tier, SQLite/Supabase free tier, client-side tools).
- Calculate realistic runway, breakeven thresholds, margins (COGS for LLM tokens), and pricing tiers.`,
};

// Consult an agent
app.post('/api/gemini/agent-consult', async (req: Request, res: Response) => {
  try {
    const { agentId = 'ceo', prompt, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemInstruction = AGENT_SYSTEM_PROMPTS[agentId] || AGENT_SYSTEM_PROMPTS.ceo;

    const fullPrompt = `CONTEXT INFORMATION:
${context || 'Autonomous Business CEO project evaluating Path A (Existing Assets: AI Tourguide, AI Hotel Concierge, NexusAIStore) vs Path B (New Digital Business).'}

USER QUERY / DIRECTIVE:
${prompt}

Provide a structured, rigorous, evidence-based response. Clearly state:
- Assessment & Findings
- Key Trade-offs / Realities
- Concrete Recommendation
- Risk or Assumption Flag (mark as [VERIFIED FACT], [ESTIMATE], or [ASSUMPTION])`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
      },
    });

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

// Stress-test an assumption
app.post('/api/gemini/stress-test', async (req: Request, res: Response) => {
  try {
    const { assumption, targetPath } = req.body;

    if (!assumption) {
      return res.status(400).json({ error: 'Assumption text is required' });
    }

    const prompt = `Act as the Lead Orchestrator and CEO conducting a Red-Team Stress Test on this specific business assumption:
Target: ${targetPath || 'Business Opportunity'}
Assumption: "${assumption}"

Conduct a ruthless reality check:
1. Why this assumption might fail in the real world (The Optimism Trap).
2. Worst-case financial and operational impact if this assumption is 50% wrong.
3. 48-Hour Low-Cost Validation Test to prove or disprove this assumption with real prospects before spending any money.
4. CEO Verdict: Grade confidence level (High, Moderate, Speculative) with rationale.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: AGENT_SYSTEM_PROMPTS.ceo,
      },
    });

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

// Generate cold outreach copy
app.post('/api/gemini/generate-outreach', async (req: Request, res: Response) => {
  try {
    const { product = 'AI Hotel Concierge', targetPersona = 'Boutique Hotel General Manager (15-40 rooms)', channel = 'Cold Email' } = req.body;

    const prompt = `Write a high-converting, non-spammy ${channel} pitch for:
Product: ${product}
Target ICP: ${targetPersona}

Guidelines:
- Zero generic buzzwords or fluff.
- Short (under 120 words for cold email; under 300 characters for LinkedIn).
- Clear hook based on their real daily operational headache (e.g. night desk repetitive questions, guest check-in friction, high staff costs).
- Zero-risk offer: "We set up a 14-day live pilot on a custom QR stand for your lobby at zero cost, no credit card required".
- Specific, friction-free call to action (CTA).
- Include subject line options if email.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: AGENT_SYSTEM_PROMPTS.marketing,
      },
    });

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

// Health endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    serverTime: new Date().toISOString(),
    ceoAgentStatus: 'operational',
  });
});

// Vite middleware or static serving
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Autonomous Business CEO Orchestrator running on port ${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
});
