import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const ALLOWED_ZONES = [
  'Penha de França',
  'Graça',
  'São Vicente',
  'Santa Clara',
  'Alfama',
  'Santa Apolónia',
  'Arroios',
];

interface AlLead {
  id: string;
  nome: string;
  zona: string;
  email: string;
  ativo: boolean;
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function isZoneAllowed(zone: string): boolean {
  const normalized = normalizeText(zone);
  return ALLOWED_ZONES.some((allowed) => normalizeText(allowed) === normalized);
}

function buildEmailHtml(al: AlLead): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6; max-width: 600px;">
      <p>Olá, equipa <strong>${al.nome}</strong>,</p>
      <p>Somos o <strong>Breakfast in Bed LX</strong>, serviço de pequenos-almoços artesanais entregues diretamente na porta dos hóspedes em Lisboa — com operação dedicada na zona de <strong>${al.zona}</strong>.</p>
      <p>Ajudamos Alojamentos Locais a elevar a experiência dos hóspedes sem custos fixos nem logística extra para o anfitrião:</p>
      <ul>
        <li>Menus artesanais frescos entregues na manhã seguinte</li>
        <li>Pedido simples online com QR Code dedicado para o vosso alojamento</li>
        <li>Sem mensalidades nem compromisso mínimo</li>
      </ul>
      <p>Pode conhecer os nossos menus em: <a href="https://breakfastinbedlx.com/">https://breakfastinbedlx.com/</a></p>
      <p>Se tiver interesse em receber um cartão/QR Code personalizado para colocar no vosso alojamento em <strong>${al.zona}</strong>, basta responder a este email.</p>
      <p>Com os melhores cumprimentos,<br/>
      <strong>Ana Alves</strong><br/>
      Breakfast in Bed LX<br/>
      <a href="https://breakfastinbedlx.com/">breakfastinbedlx.com</a></p>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
    const dryRun = body.dryRun !== false;
    const targetZone = typeof body.zone === 'string' ? body.zone.trim() : '';

    const dataPath = path.join(process.cwd(), 'data', 'als_7_zonas.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const allLeads: AlLead[] = Array.isArray(body.leads) && body.leads.length > 0 ? body.leads : JSON.parse(rawData);

    const eligibleLeads = allLeads.filter((lead) => {
      if (!lead.ativo || !lead.email) return false;
      if (!isZoneAllowed(lead.zona)) return false;
      if (targetZone && normalizeText(lead.zona) !== normalizeText(targetZone)) return false;
      return true;
    });

    const blockedLeads = allLeads.filter((lead) => !isZoneAllowed(lead.zona));

    if (dryRun) {
      return res.status(200).json({
        success: true,
        mode: 'DRY_RUN_PREVIEW',
        allowedZones: ALLOWED_ZONES,
        eligibleCount: eligibleLeads.length,
        blockedOutOfZoneCount: blockedLeads.length,
        preview: eligibleLeads.map((lead) => ({
          id: lead.id,
          nome: lead.nome,
          zona: lead.zona,
          email: lead.email,
        })),
        message: 'Nenhum email foi enviado. Envie POST com {"dryRun": false} para executar o envio real via Resend.',
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || 'Breakfast in Bed LX <info@breakfastinbedlx.com>';

    if (!resendApiKey) {
      return res.status(500).json({
        success: false,
        error: 'RESEND_API_KEY não configurada nas variáveis de ambiente.',
      });
    }

    const results = [];

    for (const al of eligibleLeads) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [al.email],
          subject: `Parceria Pequeno-Almoço Artesanal para Hóspedes em ${al.zona} | Breakfast in Bed LX`,
          html: buildEmailHtml(al),
        }),
      });

      const data = await response.json();
      results.push({
        id: al.id,
        nome: al.nome,
        zona: al.zona,
        email: al.email,
        ok: response.ok,
        resendId: data?.id || null,
        error: response.ok ? null : data,
      });
    }

    return res.status(200).json({
      success: true,
      mode: 'LIVE_EXECUTION',
      sentCount: results.filter((r) => r.ok).length,
      failedCount: results.filter((r) => !r.ok).length,
      results,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno no motor de campanhas';
    return res.status(500).json({ success: false, error: message });
  }
}