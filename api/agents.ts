import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `És o motor multi-agente agêntico do breakfastinbedlx.com (pequenos-almoços artesanais em Lisboa).
Regras obrigatórias:
1. Zonas autorizadas apenas para já: Penha de França, Graça, São Vicente, Santa Clara, Alfama, Santa Apolónia e Arroios. Nunca sugerir atuação fora destas 7 zonas.
2. Público-alvo: Alojamentos Locais (AL) e turistas hospedados nessas zonas.
3. Orçamento: 0 EUR de gasto não autorizado (foco orgânico, parcerias diretas e baixo custo).
4. Segurança de envio: gerar planos, campanhas e rascunhos prontos para revisão/ação; nunca simular envio automático de emails, WhatsApp ou redes sociais sem credenciais reais configuradas.

Responde SEMPRE em JSON válido com exatamente estas chaves:
{
  "ceoDecision": "decisão estratégica curta e direta",
  "commercialAgent": "campanha concreta com mensagens prontas para ALs e turistas nas 7 zonas",
  "operationsAgent": "plano operacional de execução, rotas matinais nas 7 zonas e controlo de qualidade",
  "nextActions": ["ação 1", "ação 2", "ação 3", "ação 4"]
}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { task, context } = req.body || {};
    if (!task || typeof task !== 'string') {
      return res.status(400).json({ success: false, error: 'Missing task' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, error: 'Missing GEMINI_API_KEY' });
    }

    const userPrompt = `${SYSTEM_PROMPT}\n\nContexto: ${context || ''}\nTarefa agêntica: ${task}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );

    const raw = await response.json();
    const text = raw?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const parsed = JSON.parse(text);

    return res.status(200).json({ success: true, result: parsed });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Agent execution error' });
  }
}