import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertTriangle, RefreshCw, ShieldAlert, Check } from 'lucide-react';

interface StressTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAssumption?: string;
  initialPath?: string;
}

export const StressTestModal: React.FC<StressTestModalProps> = ({
  isOpen,
  onClose,
  initialAssumption = '',
  initialPath = 'Path A',
}) => {
  const [assumption, setAssumption] = useState<string>(initialAssumption);
  const [targetPath, setTargetPath] = useState<string>(initialPath);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [critique, setCritique] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialAssumption) {
      setAssumption(initialAssumption);
    }
    if (initialPath) {
      setTargetPath(initialPath);
    }
  }, [initialAssumption, initialPath]);

  if (!isOpen) return null;

  const handleRunStressTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assumption.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);
    setCritique(null);

    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: `Faz um stress-test implacÃ¡vel Ã  seguinte premissa de negÃ³cio (${targetPath}): "${assumption}". Identifica riscos reais, falhas operacionais e como validar com $0 de investimento.`,
          context: 'breakfastinbedlx.com (pequenos-almoços artesanais em Lisboa). Zonas autorizadas apenas para já: Penha de França, Graça, São Vicente, Santa Clara, Alfama, Santa Apolónia e Arroios (não atuar fora destas zonas). Público: Alojamentos Locais (AL) e qualquer turista hospedado nessas zonas. Regras:  gasto não autorizado; gerar apenas planos e rascunhos para revisão manual, sem enviar emails, WhatsApp ou mensagens automaticamente.',
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      const r = data.result;
      setCritique(`ðŸ›¡ï¸ VEREDITO CEO:\n${r.ceoDecision}\n\nâš ï¸ RISCOS & OPERAÃ‡Ã•ES:\n${r.operationsAgent}\n\nâœ… VALIDAÃ‡ÃƒO IMEDIATA:\n${(r.nextActions || []).map((a: string, i: number) => `${i + 1}. ${a}`).join('\n')}`);
    } catch (err: any) {
      console.error('Stress test failed:', err);
      setErrorMsg(err.message || 'Failed to execute stress test.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              CEO Red-Team Assumption Stress Tester
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <p className="text-slate-300">
            Operating Rule: <em>&quot;Challenge weak assumptions. Request additional research when evidence is insufficient.&quot;</em> Enter any premise to subject it to a ruthless CEO vulnerability review.
          </p>

          <form onSubmit={handleRunStressTest} className="space-y-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">
                Target Opportunity:
              </label>
              <select
                value={targetPath}
                onChange={(e) => setTargetPath(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Path A (AI Hotel Concierge)">Path A (AI Hotel Concierge)</option>
                <option value="Path A (AI Tourguide Creator)">Path A (AI Tourguide Creator)</option>
                <option value="Path A (NexusAIStore)">Path A (NexusAIStore)</option>
                <option value="Path B (Subcontractor RFP Assistant)">Path B (Subcontractor RFP Assistant)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">
                Assumption / Premise to Stress-Test:
              </label>
              <textarea
                rows={3}
                value={assumption}
                onChange={(e) => setAssumption(e.target.value)}
                placeholder="e.g. At least 25% of boutique hotel guests will scan the QR code on their nightstand instead of calling the front desk..."
                className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-3 text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !assumption.trim()}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Red-Teaming Assumption...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run CEO Stress Test</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-800 rounded-lg text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          {critique && (
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/40 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Red-Team Critique & 48-Hour Low-Cost Test
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Gemini 3.8 Flash
                </span>
              </div>
              <div className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {critique}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
