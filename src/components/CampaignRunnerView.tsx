import React, { useState } from 'react';
import { Send, Eye, Plus, MapPin, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';

export interface AlLeadItem {
  id: string;
  nome: string;
  zona: string;
  email: string;
  ativo: boolean;
}

const ALLOWED_ZONES = [
  'Penha de França',
  'Graça',
  'São Vicente',
  'Santa Clara',
  'Alfama',
  'Santa Apolónia',
  'Arroios',
];

const INITIAL_LEADS: AlLeadItem[] = [
  {
    id: 'al-001',
    nome: 'Teste Interno Breakfast in Bed LX',
    zona: 'Graça',
    email: 'info@breakfastinbedlx.com',
    ativo: true,
  },
];

export const CampaignRunnerView: React.FC = () => {
  const [leads, setLeads] = useState<AlLeadItem[]>(INITIAL_LEADS);
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newZone, setNewZone] = useState<string>('Graça');
  const [newEmail, setNewEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [outputJson, setOutputJson] = useState<string>('');
  const [statusBanner, setStatusBanner] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      setStatusBanner({ type: 'err', text: 'Preenche o nome e o email do Alojamento Local.' });
      return;
    }

    const lead: AlLeadItem = {
      id: `al-${Date.now()}`,
      nome: newName.trim(),
      zona: newZone,
      email: newEmail.trim(),
      ativo: true,
    };

    setLeads((prev) => [...prev, lead]);
    setNewName('');
    setNewEmail('');
    setStatusBanner({ type: 'ok', text: `AL "${lead.nome}" adicionado em ${lead.zona}.` });
  };

  const toggleLeadActive = (id: string) => {
    setLeads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ativo: !item.ativo } : item))
    );
  };

  const runCampaign = async (dryRun: boolean) => {
    setLoading(true);
    setStatusBanner(null);

    try {
      const payload: { dryRun: boolean; zone?: string; leads?: AlLeadItem[] } = {
        dryRun,
        leads,
      };
      if (selectedZone) {
        payload.zone = selectedZone;
      }

      const response = await fetch('/api/campaigns/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setOutputJson(JSON.stringify(data, null, 2));

      if (response.ok && data.success) {
        setStatusBanner({
          type: 'ok',
          text: dryRun
            ? `Pré-visualização pronta: ${data.eligibleCount ?? 0} destinatário(s) elegível(eis).`
            : `Envio concluído: ${data.sentCount ?? 0} enviado(s), ${data.failedCount ?? 0} falha(s).`,
        });
      } else {
        setStatusBanner({
          type: 'err',
          text: data.error || 'Falha ao executar a campanha.',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro de rede ao contactar /api/campaigns/run';
      setStatusBanner({ type: 'err', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const visibleLeads = selectedZone
    ? leads.filter((l) => l.zona.toLowerCase() === selectedZone.toLowerCase())
    : leads;

  return (
    <div className="space-y-6 p-6 bg-slate-900 text-slate-100 rounded-xl border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-400" />
            Breakfast in Bed LX — Motor de Campanhas AL (7 Zonas)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Orçamento: 0 EUR | Zonas ativas: {ALLOWED_ZONES.join(', ')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-2 text-white"
          >
            <option value="">Todas as 7 zonas</option>
            {ALLOWED_ZONES.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>
      </div>

      {statusBanner && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg text-sm border ${
            statusBanner.type === 'ok'
              ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
              : 'bg-rose-950/60 border-rose-700 text-rose-200'
          }`}
        >
          {statusBanner.type === 'ok' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusBanner.text}</span>
        </div>
      )}

      <form onSubmit={handleAddLead} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
        <input
          type="text"
          placeholder="Nome do AL (ex: Casa da Graça)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
        />
        <select
          value={newZone}
          onChange={(e) => setNewZone(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
        >
          {ALLOWED_ZONES.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>
        <input
          type="email"
          placeholder="email@alojamento.pt"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg px-4 py-2 transition"
        >
          <Plus className="w-4 h-4" />
          Adicionar AL
        </button>
      </form>

      <div className="overflow-x-auto border border-slate-800 rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/80 text-slate-300">
            <tr>
              <th className="py-2.5 px-4">Ativo</th>
              <th className="py-2.5 px-4">Alojamento Local</th>
              <th className="py-2.5 px-4">Zona</th>
              <th className="py-2.5 px-4">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {visibleLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-800/40">
                <td className="py-2.5 px-4">
                  <input
                    type="checkbox"
                    checked={lead.ativo}
                    onChange={() => toggleLeadActive(lead.id)}
                    className="rounded border-slate-600"
                  />
                </td>
                <td className="py-2.5 px-4 font-medium text-white">{lead.nome}</td>
                <td className="py-2.5 px-4 text-amber-300">{lead.zona}</td>
                <td className="py-2.5 px-4 text-slate-300">{lead.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={loading}
          onClick={() => runCampaign(true)}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
        >
          <Eye className="w-4 h-4" />
          {loading ? 'A processar...' : 'Pré-visualizar (Dry Run)'}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => runCampaign(false)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-sm font-bold px-5 py-2.5 rounded-lg transition"
        >
          <Send className="w-4 h-4" />
          {loading ? 'A enviar...' : 'Disparar Campanha Real (Resend)'}
        </button>
      </div>

      {outputJson && (
        <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs text-emerald-300 overflow-x-auto">
          {outputJson}
        </pre>
      )}
    </div>
  );
};