import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3101;
const isProd = process.env.NODE_ENV === "production";

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI client (Server-Side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export interface ResearchRequest {
  topic: string;
  targetMarket?: string;
  researchMode?: "FULL_DISCOVERY" | "COMPETITIVE_DEEP_DIVE" | "CUSTOMER_DEMAND_AUDIT" | "COMMERCIAL_EVALUATION" | "GAP_DETECTION";
  additionalContext?: string;
  filterLowEvidence?: boolean;
}

// System instruction reflecting Agent 02 specification
const AGENT_02_SYSTEM_INSTRUCTION = `You are Agent 02 — Research Agent, specialist in independent market intelligence, industry research, customer needs analysis, competitive intelligence, and evidence-based opportunity discovery.
You report directly to the CEO Agent and collaborate with the AI Business Team.
You are not a generic chatbot. You operate as an elite senior research analyst producing rigorous, commercially actionable intelligence.

CORE DIRECTIVES & RESEARCH STANDARDS:
1. Commercially relevant, evidence-based, objective, and actionable.
2. Market coverage: Portugal, European Union, United Kingdom, United States, Canada, Middle East, and promising global markets.
3. For every substantial finding, cite realistic primary sources, official data, company disclosures, and industry benchmarks.
4. Distinguish established market evidence from emerging trends and speculation.
5. Identify outdated, incomplete, contradictory, or unverified information.
6. Clearly separate FACTS, ESTIMATES, ASSUMPTIONS, and HYPOTHESES.
7. CRITICAL RULE: If reliable information cannot be verified, state explicitly: "INSUFFICIENT VERIFIED EVIDENCE" and do not manufacture numbers.
8. Never invent sources, companies, customers, or market figures.

COMMERCIAL EVALUATION FRAMEWORK (Score 1 to 10 or 'Not enough evidence'):
1. Market demand (Credible evidence of demand?)
2. Customer problem (Is problem real, painful, costly?)
3. Willingness to pay (Do customers pay for solutions today?)
4. Competition (Market saturation vs open niches?)
5. Market gap (What is underserved?)
6. Revenue potential (Realistic recurring/transactional business models?)
7. Accessibility (Can we reach customers cost-effectively?)
8. Development feasibility (Can team realistically build/deliver it?)
9. Initial investment (Resources & capital required?)
10. Scalability (Can it expand internationally?)
11. Risk (Downside regulatory, technological, or adoption barriers?)

OUTPUT FORMAT:
Return a strictly valid JSON object matching the requested schema with deep, comprehensive analytical prose, concrete competitor names, pricing tiers, customer pain points, and commercial scores.`;

// Endpoint: Generate Full Market Intelligence Dossier
app.post("/api/research/execute", async (req, res) => {
  try {
    const {
      topic,
      targetMarket = "Global",
      researchMode = "FULL_DISCOVERY",
      additionalContext = "",
    }: ResearchRequest = req.body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return res.status(400).json({ error: "A valid research topic or company/market query is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on the server. Please check the Secrets panel in AI Studio.",
      });
    }

    const prompt = `Conduct a rigorous autonomous market intelligence investigation on the following subject:
SUBJECT: "${topic.trim()}"
TARGET REGION/MARKET: ${targetMarket}
RESEARCH DIRECTIVE: ${researchMode}
ADDITIONAL BUSINESS CONTEXT: ${additionalContext || "Autonomous AI Business Team evaluation"}

Execute your 5-pillar investigation and return a JSON object with this exact structure:
{
  "meta": {
    "reportId": "IR-${Date.now().toString(36).toUpperCase()}",
    "timestamp": "${new Date().toISOString()}",
    "subject": "${topic.trim()}",
    "targetMarket": "${targetMarket}",
    "researchMode": "${researchMode}",
    "analyst": "Agent 02 — Autonomous Market Intelligence",
    "classification": "CONFIDENTIAL // FOR CEO AGENT REVIEW",
    "evidenceStatus": "VERIFIED" | "PARTIAL" | "INSUFFICIENT VERIFIED EVIDENCE"
  },
  "executiveSummary": {
    "headline": "Core takeaway in one impactful executive sentence",
    "commercialRelevance": "Why this matters to revenue generation and capital allocation",
    "strategicVerdict": "PROCEED" | "PROCEED WITH CAUTION" | "PIVOT / REFINE" | "DISQUALIFY (INSUFFICIENT EVIDENCE)",
    "keyFindings": ["3 to 5 critical bullet points with hard facts"]
  },
  "researchQuestion": {
    "primaryQuestion": "Exact question investigated",
    "scopeAndRationale": "Why this question was prioritized for commercial validation",
    "methodology": "Search grounding, primary competitor audit, customer demand signals"
  },
  "marketOverview": {
    "marketSizeAndGrowth": "Current verified size, CAGR, growth drivers",
    "targetCustomerSegments": [
      {
        "segment": "Name of segment",
        "profile": "Description",
        "purchasingPower": "HIGH" | "MEDIUM" | "LOW",
        "urgency": "CRITICAL" | "HIGH" | "MODERATE"
      }
    ],
    "regulatoryAndMacroFactors": "Regulations (GDPR, EU AI Act, local compliance, tax laws), macro shifts",
    "geographicSpecifics": "Specific dynamics for ${targetMarket} (e.g. Portugal, EU, UK, US, Canada, Middle East)"
  },
  "customerAndDemandIntelligence": {
    "coreProblems": [
      {
        "problem": "Specific operational pain point or complaint",
        "severity": "CRITICAL" | "HIGH" | "MEDIUM",
        "financialCost": "How much money or time it burns",
        "willingnessToPayEvidence": "Specific proof that customers spend money to fix this (or 'Not enough evidence')"
      }
    ],
    "unmetNeeds": ["List of what customers actively search for but cannot find easily"],
    "recurringComplaints": ["Direct customer feedback, software shortcomings, vendor lock-in complaints"]
  },
  "competitiveIntelligence": {
    "marketConcentration": "FRAGMENTED" | "MODERATE" | "CONCENTRATED",
    "competitors": [
      {
        "name": "Competitor Name",
        "type": "DIRECT" | "INDIRECT" | "SUBSTITUTE",
        "pricingModel": "e.g. $49-$299/mo, Custom enterprise, Usage-based, or Unverified",
        "positioning": "Their core pitch and target audience",
        "strengths": ["Key competitive advantages"],
        "weaknessesAndGaps": ["Known vulnerabilities, customer gripes, missing capabilities"]
      }
    ],
    "uncontestedMarketGaps": ["Specific commercial white spaces and underserved niches"]
  },
  "technologyAndBusinessModel": {
    "viableTechnologies": ["Practical tech stack, AI models, open-source leverage"],
    "openSourceAndFreeTools": ["Specific open-source packages or frameworks that lower initial capex"],
    "capitalEfficiencyAssessment": "How this can be launched with limited capital and lean engineering",
    "monetizationModels": [
      {
        "model": "e.g. B2B Tiered SaaS, Usage-based API, Commission/Take-rate",
        "projectedArpu": "Estimated annual/monthly revenue per customer",
        "scalability": "HIGH" | "MEDIUM" | "LOW"
      }
    ]
  },
  "commercialEvaluation": {
    "criteriaScores": [
      {"criterion": "Market demand", "question": "Is there credible evidence of demand?", "score": 8, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Customer problem", "question": "Is the problem real and important?", "score": 9, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Willingness to pay", "question": "Is there evidence customers pay for solutions?", "score": 8, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Competition", "question": "How crowded is the market?", "score": 6, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Market gap", "question": "What is currently underserved?", "score": 8, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Revenue potential", "question": "What realistic revenue models exist?", "score": 9, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Accessibility", "question": "Can we reach potential customers?", "score": 7, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Development feasibility", "question": "Can the team realistically build or deliver it?", "score": 8, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Initial investment", "question": "What resources and costs are required?", "score": 8, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Scalability", "question": "Can the opportunity grow internationally?", "score": 9, "status": "VERIFIED", "rationale": "..."},
      {"criterion": "Risk", "question": "What could prevent commercial success?", "score": 6, "status": "VERIFIED", "rationale": "..."}
    ],
    "compositeScore": 8.1,
    "confidenceRating": "HIGH" | "MEDIUM" | "LOW"
  },
  "opportunityDiscovery": {
    "primaryOpportunity": {
      "title": "Exact proposed product/service commercialization concept",
      "valueProposition": "Crisp one-paragraph pitch",
      "mvpScope": "What to build in week 1-4 with minimal burn",
      "speedToRevenue": "e.g., 30-60 days",
      "targetLaunchMarket": "${targetMarket}"
    },
    "keyRisksAndMitigations": [
      {
        "risk": "Specific threat (regulatory, competitive, distribution)",
        "probability": "HIGH" | "MEDIUM" | "LOW",
        "impact": "HIGH" | "MEDIUM" | "LOW",
        "mitigation": "Concrete actionable prevention"
      }
    ],
    "actionableRecommendationsForCEO": [
      "Specific decision recommendation 1",
      "Specific decision recommendation 2",
      "Specific decision recommendation 3"
    ]
  },
  "sourcesAndEvidence": [
    {
      "title": "Source name or document title",
      "url": "https://...",
      "sourceType": "PRIMARY_GOVERNMENT" | "OFFICIAL_COMPANY" | "INDUSTRY_REPORT" | "ACADEMIC" | "FINANCIAL_DATA",
      "keyClaimVerified": "What claim this validates",
      "date": "Year or date"
    }
  ],
  "epistemicAudit": {
    "verifiedFacts": ["Key claims confirmed by primary sources"],
    "estimatesAndProjections": ["Forecasts and market sizes that are modelled"],
    "unverifiedAssumptions": ["Hypotheses requiring live test/sales outreach before commitment"],
    "insufficientEvidenceFlags": ["Any areas where reliable data is lacking or marked 'INSUFFICIENT VERIFIED EVIDENCE'"]
  }
}

CRITICAL: Return ONLY valid JSON, with no markdown code fences, no surrounding commentary.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: AGENT_02_SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        // When using googleSearch, model returns grounded text. We parse JSON.
      },
    });

    const responseText = response.text || "";
    
    // Extract web citations from search grounding metadata
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];
    
    const groundedSources = groundingChunks
      .filter((chunk: any) => chunk.web && chunk.web.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || "Web Reference",
        url: chunk.web.uri,
        sourceType: "LIVE_SEARCH_GROUNDED",
      }));

    // Parse the JSON output safely
    let cleanJson = responseText.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    let parsedReport;
    try {
      parsedReport = JSON.parse(cleanJson);
    } catch (parseError) {
      // Fallback: attempt to find JSON substring
      const jsonStart = cleanJson.indexOf("{");
      const jsonEnd = cleanJson.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        parsedReport = JSON.parse(cleanJson.substring(jsonStart, jsonEnd + 1));
      } else {
        throw new Error("Model response was not valid JSON format.");
      }
    }

    // Merge live grounded sources if model didn't include full list
    if (groundedSources.length > 0) {
      const existingUrls = new Set((parsedReport.sourcesAndEvidence || []).map((s: any) => s.url));
      groundedSources.forEach((gs: any) => {
        if (!existingUrls.has(gs.url)) {
          parsedReport.sourcesAndEvidence = parsedReport.sourcesAndEvidence || [];
          parsedReport.sourcesAndEvidence.push({
            title: gs.title,
            url: gs.url,
            sourceType: "GROUNDED_WEB_EVIDENCE",
            keyClaimVerified: "Live verified search reference",
            date: "Current (2026/2025)",
          });
        }
      });
    }

    parsedReport._groundingMetadata = {
      webSearchQueries,
      groundedChunksCount: groundedSources.length,
    };

    return res.json(parsedReport);
  } catch (error: any) {
    console.error("Error executing research:", error);
    return res.status(500).json({
      error: error.message || "Failed to execute autonomous market research.",
    });
  }
});

// Endpoint: Targeted CEO Agent Briefing / Query Follow-up
app.post("/api/research/query", async (req, res) => {
  try {
    const { question, reportContext } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const prompt = `Context of active Research Dossier:
${typeof reportContext === "object" ? JSON.stringify(reportContext).slice(0, 5000) : String(reportContext).slice(0, 5000)}

CEO / Executive Question: "${question}"

Respond directly as Agent 02 — Research Agent.
Maintain professional, concise, commercially rigorous analytical tone.
Highlight exact facts, verified metrics, customer demand proof, competitor weaknesses, and risks.
If evidence is insufficient to answer definitively, state "INSUFFICIENT VERIFIED EVIDENCE" and offer the best hypothesis clearly labelled as such.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: AGENT_02_SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
      .filter((c: any) => c.web && c.web.uri)
      .map((c: any) => ({ title: c.web.title, url: c.web.uri }));

    return res.json({
      answer: response.text,
      sources,
    });
  } catch (error: any) {
    console.error("Query error:", error);
    return res.status(500).json({ error: error.message || "Failed to answer query" });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Agent 02 Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
