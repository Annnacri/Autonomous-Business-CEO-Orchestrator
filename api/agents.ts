import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Permitir pedidos vindos do breakfastinbedlx.com e do próprio painel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Usa POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY nas variáveis de ambiente.' });
  }

  try {
    const { task, context = 'breakfastinbedlx.com - entregas de pequeno-almoço artesanal em Lisboa' } = req.body || {};

    if (!task) {
      return res.status(400).json({ error: 'Envia o campo "task" no corpo do pedido.' });
    }

    const prompt = `És um conselho executivo multi-agente do negócio "${context}".
Analisa o seguinte pedido/cenário e responde APENAS em JSON válido com este formato exato:
{
  "ceoDecision": "Decisão final objetiva e prioridade imediata",
  "commercialAgent": "Estratégia de vendas, parcerias (ex: Alojamento Local) ou mensagem de outreach",
  "operationsAgent": "Passos práticos de execução, logística e mitigação de risco",
  "nextActions": ["Ação 1", "Ação 2", "Ação 3"]
}

Pedido: ${task}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'Erro na API de LLM', details: errText });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const decision = JSON.parse(rawText);

    return res.status(200).json({ success: true, result: decision });
  } catch (error: any) {
    return res.status(500).json({ error: 'Falha no orquestrador de agentes', details: error?.message });
  }
}
