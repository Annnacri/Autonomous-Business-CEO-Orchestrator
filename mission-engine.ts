import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface AgentTask {
  agentId: string;
  payload: Record<string, unknown>;
}

export interface MissionInput {
  objective: string;
  tasks: AgentTask[];
  executionMode?: "parallel" | "sequential";
}

export interface MissionResult {
  agentId: string;
  status: "completed" | "failed";
  data?: unknown;
  error?: string;
  durationMs: number;
}

export interface Mission {
  id: string;
  objective: string;
  status: "running" | "completed" | "partial" | "failed";
  createdAt: string;
  completedAt?: string;
  results: MissionResult[];
}

const AGENTS = {
  autonomous_market_intelligence: {
    name: "Autonomous Market Intelligence",
    url: process.env.AGENT_AMI_URL || "http://127.0.0.1:3101",
    endpoint: "/api/research/execute"
  },
  business_strategy: {
    name: "Business Strategy & Growth Analyst",
    url: process.env.AGENT_STRATEGY_URL || "http://127.0.0.1:3102",
    endpoint: "/api/strategy/generate-ceo-report"
  },
  financial_intelligence: {
    name: "Financial Intelligence",
    url: process.env.AGENT_FINANCE_URL || "http://127.0.0.1:3103",
    endpoint: "/api/financial-ai"
  },
  global_opportunity_hunter: {
    name: "Global Opportunity Hunter",
    url: process.env.AGENT_HUNTER_URL || "http://127.0.0.1:3104",
    endpoint: "/api/prospect-hunt"
  },
  market_research: {
    name: "Market Intelligence Research Agent",
    url: process.env.AGENT_RESEARCH_URL || "http://127.0.0.1:3105",
    endpoint: "/api/research/investigate"
  }
} as const;

type AgentId = keyof typeof AGENTS;

const DATA_DIR = path.join(process.cwd(), "data");
const HISTORY_FILE = path.join(DATA_DIR, "mission-history.json");

async function readHistory(): Promise<Mission[]> {
  try {
    return JSON.parse(await readFile(HISTORY_FILE, "utf8"));
  } catch {
    return [];
  }
}

async function saveHistory(missions: Mission[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(HISTORY_FILE, JSON.stringify(missions, null, 2), "utf8");
}

export function getRegisteredAgents() {
  return Object.entries(AGENTS).map(([id, agent]) => ({
    id,
    name: agent.name,
    url: agent.url,
    endpoint: agent.endpoint
  }));
}

function buildAgentPayload(
  task: AgentTask,
  objective: string,
  previousResults: MissionResult[]
): Record<string, unknown> {
  const raw = task.payload || {};

  const textValue = (value: unknown, fallback: string): string =>
    typeof value === "string" && value.trim()
      ? value.trim()
      : fallback;

  const businessContext = [
    "BUSINESS: Breakfast in Bed LX.",
    "Premium fresh breakfast and brunch delivery in Lisbon.",
    "CUSTOMER CHANNELS: Direct tourist bookings and referrals from hotels, Airbnb hosts and accommodation managers.",
    "HOST COMMISSION: 10% on referred bookings.",
    "PRICING POLICY: Preserve existing prices. No discounts or coupons.",
    "PRIORITY AREAS: Penha de FranÃ§a, GraÃ§a, SÃ£o Vicente, Santa Clara, Santa ApolÃ³nia, Arroios and Alfama.",
    "COMMERCIAL RULE: Research, lead discovery, campaign generation and sales preparation are autonomous. External outreach requires configured legal compliance, sender identification, opt-out and audit logging. Paid actions require human approval.",
  "SALES OBJECTIVE: Generate qualified direct tourist customers and accommodation referral partners. Prioritize conversion, repeat bookings and scalable customer acquisition.",
  "PROSPECTING AREAS: Penha de França, Graça, São Vicente, Santa Clara, Santa Apolónia, Arroios and Alfama.",
  "OUTPUT REQUIREMENT: Identify real prospects, available public business contact channels, qualification evidence, opportunity score, recommended campaign and measurable next action."
  ].join("\n");

  const previousContext = previousResults.length
    ? "PREVIOUS AGENT RESULTS:\n" + JSON.stringify(previousResults)
    : "";

  const sharedContext = [
    businessContext,
    "MISSION OBJECTIVE: " + objective,
    previousContext
  ].filter(Boolean).join("\n\n");

  const extra = (value: unknown) =>
    [typeof value === "string" ? value.trim() : "", sharedContext]
      .filter(Boolean)
      .join("\n\n");

  const missionContext = {
    objective,
    businessContext,
    previousResults
  };

  switch (task.agentId) {
    case "autonomous_market_intelligence":
      return {
        ...raw,
        topic: textValue(raw.topic, objective),
        targetMarket: textValue(raw.targetMarket, "Lisbon, Portugal"),
        researchMode: textValue(raw.researchMode, "FULL_DISCOVERY"),
        additionalContext: extra(raw.additionalContext),
        missionContext
      };

    case "business_strategy":
      return {
        ...raw,
        productOrIdea: extra(textValue(
          raw.productOrIdea,
          "Breakfast in Bed LX â€” Premium breakfast and brunch delivery"
        )),
        focusMarket: textValue(raw.focusMarket, "Lisbon, Portugal"),
        businessModel: textValue(
          raw.businessModel,
          "Direct tourist bookings and accommodation-host referrals with 10% commission"
        ),
        targetPricing: textValue(
          raw.targetPricing,
          "Maintain existing menu prices. No discounts."
        ),
        language: textValue(raw.language, "en"),
        missionContext
      };

    case "financial_intelligence": {
      const nested = raw.payload &&
        typeof raw.payload === "object" &&
        !Array.isArray(raw.payload)
          ? raw.payload as Record<string, unknown>
          : {};

      return {
        ...raw,
        action: textValue(raw.action, "financial_analysis"),
        payload: {
          ...nested,
          objective,
          businessContext,
          previousResults
        },
        language: textValue(raw.language, "en"),
        missionContext
      };
    }

    case "global_opportunity_hunter":
      return {
        ...raw,
        market: textValue(raw.market, "Lisbon, Portugal"),
        industry: textValue(
          raw.industry,
          "Hotels, Airbnb, short-term rentals and accommodation managers"
        ),
        targetQuery: extra(textValue(
          raw.targetQuery,
          objective + ". Identify real Lisbon accommodation businesses and referral partners."
        )),
        missionContext
      };

    case "market_research":
      return {
        ...raw,
        query: extra(textValue(raw.query, objective)),
        sector: textValue(
          raw.sector,
          "Lisbon tourism, hospitality, short-term rentals, breakfast and brunch delivery"
        ),
        depth: textValue(raw.depth, "deep"),
        missionContext
      };

    default:
      return {
        ...raw,
        missionContext
      };
  }
}
async function executeTask(
  task: AgentTask,
  objective: string,
  previousResults: MissionResult[]
): Promise<MissionResult> {
  const agent = AGENTS[task.agentId as AgentId];

  if (!agent) {
    return {
      agentId: task.agentId,
      status: "failed",
      error: "Agent not registered",
      durationMs: 0
    };
  }

  const started = Date.now();

  try {
    const response = await fetch(
      `${agent.url}${agent.endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildAgentPayload(task, objective, previousResults)),
        signal: AbortSignal.timeout(120000)
      }
    );

    const text = await response.text();
    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!response.ok) {
      throw new Error(
        `Agent HTTP ${response.status}: ${text.slice(0, 1000)}`
      );
    }

    return {
      agentId: task.agentId,
      status: "completed",
      data,
      durationMs: Date.now() - started
    };
  } catch (error: unknown) {
    return {
      agentId: task.agentId,
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - started
    };
  }
}

export async function runMission(input: MissionInput): Promise<Mission> {
  if (!input.objective?.trim()) {
    throw new Error("Mission objective is required");
  }

  if (!Array.isArray(input.tasks) || input.tasks.length === 0) {
    throw new Error("At least one agent task is required");
  }

  if (input.tasks.length > 10) {
    throw new Error("Maximum 10 tasks per mission");
  }

  const mission: Mission = {
    id: randomUUID(),
    objective: input.objective,
    status: "running",
    createdAt: new Date().toISOString(),
    results: []
  };

  const history = await readHistory();
  history.unshift(mission);
  await saveHistory(history);

  const persistProgress = async () => {
    const currentHistory = await readHistory();
    const index = currentHistory.findIndex(
      item => item.id === mission.id
    );

    if (index >= 0) {
      currentHistory[index] = {
        ...mission,
        results: [...mission.results]
      };
      await saveHistory(currentHistory);
    }
  };

  try {
    if (input.executionMode === "sequential") {
      for (const task of input.tasks) {
        console.log(`[MISSION ${mission.id}] Starting agent: ${task.agentId}`);

        const result = await executeTask(
          task,
          input.objective,
          mission.results
        );

        mission.results.push(result);

        console.log(`[MISSION ${mission.id}] Agent ${task.agentId}: ${result.status}`);

        await persistProgress();
      }
    } else {
      const results = await Promise.all(
        input.tasks.map(task =>
          executeTask(task, input.objective, [])
        )
      );

      mission.results.push(...results);
      await persistProgress();
    }

    const completed = mission.results.filter(
      result => result.status === "completed"
    ).length;

    mission.status =
      completed === input.tasks.length
        ? "completed"
        : completed > 0
          ? "partial"
          : "failed";

  } finally {
    mission.completedAt = new Date().toISOString();
    await persistProgress();
  }

  return mission;
}
export async function getMissionHistory(): Promise<Mission[]> {
  return readHistory();
}

export async function getMissionById(id: string): Promise<Mission | undefined> {
  const history = await readHistory();
  return history.find(mission => mission.id === id);
}


