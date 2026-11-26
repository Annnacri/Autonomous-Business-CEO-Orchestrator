import React, { useState } from "react";
import { Terminal, Send, Loader2, Sparkles, User, ShieldCheck, ExternalLink } from "lucide-react";
import { ResearchDossier } from "../data/benchmarkDossiers.ts";

interface CeoQueryTerminalProps {
  dossier: ResearchDossier;
}

interface Message {
  role: "ceo" | "agent02";
  text: string;
  sources?: { title?: string; url: string }[];
  timestamp: string;
}

export const CeoQueryTerminal: React.FC<CeoQueryTerminalProps> = ({ dossier }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent02",
      text: `Agent 02 standing by for executive queries regarding Dossier [${dossier.meta.reportId}] on "${dossier.meta.subject}". Inquire about specific customer churn risks, unit economics, regulatory nuances, or go-to-market strategies.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userText = query.trim();
    setQuery("");
    const newMsg: Message = {
      role: "ceo",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/research/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userText,
          reportContext: {
            meta: dossier.meta,
            summary: dossier.executiveSummary,
            matrix: dossier.commercialEvaluation,
            opportunity: dossier.opportunityDiscovery,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from Agent 02");
      }

      const data = await res.json();
      const agentMsg: Message = {
        role: "agent02",
        text: data.answer || "INSUFFICIENT VERIFIED EVIDENCE to answer with certainty.",
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent02",
          text: `Query error: ${err.message || "Failed to process question."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden mt-8">
      {/* Terminal Title Bar */}
      <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            CEO Agent Briefing Console // Interactive Follow-up
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Realtime Search Grounding Enabled</span>
        </div>
      </div>

      {/* Message Feed */}
      <div className="p-5 max-h-96 overflow-y-auto space-y-4 font-sans text-xs bg-slate-950/40">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${
              m.role === "ceo" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 ${
                m.role === "ceo"
                  ? "bg-indigo-600 text-white"
                  : "bg-cyan-950 border border-cyan-800 text-cyan-400"
              }`}
            >
              {m.role === "ceo" ? <User className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-xl p-3.5 ${
                m.role === "ceo"
                  ? "bg-indigo-950/80 border border-indigo-800/80 text-indigo-100"
                  : "bg-slate-900/90 border border-slate-800 text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-1 text-[10px] font-mono text-slate-400">
                <span className="font-bold">
                  {m.role === "ceo" ? "CEO Agent / Executive" : "Agent 02 (Research Analyst)"}
                </span>
                <span>{m.timestamp}</span>
              </div>

              <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>

              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                    Referenced Grounding Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {m.sources.map((s, sIdx) => (
                      <a
                        key={sIdx}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[10px] font-mono text-cyan-300 hover:text-cyan-200 bg-slate-950 px-2 py-1 rounded border border-slate-800"
                      >
                        <span className="truncate max-w-[200px]">{s.title || s.url}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 font-mono flex items-center space-x-2">
              <span>Agent 02 researching primary data and formulating response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Agent 02: e.g. What is the recommended customer acquisition channel for this segment?"
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
