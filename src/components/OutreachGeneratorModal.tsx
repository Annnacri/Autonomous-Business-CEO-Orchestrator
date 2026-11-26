import React, { useState, useEffect } from 'react';
import { X, Sparkles, Copy, Check, RefreshCw, Send, Mail } from 'lucide-react';

interface OutreachGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  initialPersona?: string;
}

export const OutreachGeneratorModal: React.FC<OutreachGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialProduct = 'Breakfast in Bed LX',
  initialPersona = 'International tourists and accommodation hosts in Lisbon',
}) => {
  const [product, setProduct] = useState<string>(initialProduct);
  const [persona, setPersona] = useState<string>(initialPersona);
  const [channel, setChannel] = useState<string>('Cold Email');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPitch, setGeneratedPitch] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) setProduct(initialProduct);
    if (initialPersona) setPersona(initialPersona);
  }, [initialProduct, initialPersona]);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);
    setGeneratedPitch(null);

    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: `Escreve uma mensagem de outreach B2B pronta a enviar para "${persona}" atravÃ©s do canal "${channel}" promovendo "${product}".`,
          context: 'breakfastinbedlx.com (pequenos-almoços artesanais em Lisboa). Zonas autorizadas apenas para já: Penha de França, Graça, São Vicente, Santa Clara, Alfama, Santa Apolónia e Arroios (não atuar fora destas zonas). Público: Alojamentos Locais (AL) e qualquer turista hospedado nessas zonas. Regras:  gasto não autorizado; gerar apenas planos e rascunhos para revisão manual, sem enviar emails, WhatsApp ou mensagens automaticamente.',
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      const r = data.result;
      setGeneratedPitch(`${r.commercialAgent}\n\nðŸ’¡ Ã‚ngulo CEO:\n${r.ceoDecision}`);
    } catch (err: any) {
      console.error('Outreach generation failed:', err);
      setErrorMsg(err.message || 'Failed to generate outreach pitch.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPitch) return;
    navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              B2B Cold Pitch & Walk-in Script Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <p className="text-slate-300">
            Generate premium sales messages for Breakfast in Bed LX, targeting international tourists booking directly and Lisbon accommodation hosts and property managers. Preserve standard prices and the 10% host commission. No discounts or free pilots.
          </p>

          <form onSubmit={handleGenerate} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Product / Service:
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Breakfast in Bed LX">Breakfast in Bed LX</option>
                  
                  
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Target Customer ICP:
                </label>
                <input
                  type="text"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  placeholder="International tourists, Airbnb hosts and property managers in Lisbon"
                  className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Channel / Format:
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Cold Email (<110 words)">Cold Email (&lt;110 words)</option>
                  <option value="In-Person Walk-in Script (30 sec)">In-Person Walk-in Script (30 sec)</option>
                  <option value="Direct Phone Call (45 sec)">Direct Phone Call (45 sec)</option>
                  <option value="LinkedIn Direct Message">LinkedIn Direct Message</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Writing High-Converting Pitch...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Pitch</span>
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

          {generatedPitch && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-emerald-400 text-xs">
                  {channel} Pitch Copy ({product})
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded text-xs transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans text-xs">
                {generatedPitch}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
