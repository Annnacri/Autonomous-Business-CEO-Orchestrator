import datetime
import random

TEMAS = [
    {
        "dia": "Segunda-feira",
        "titulo": "Pequeno-almoço na cama em Lisboa",
        "pt": "Acordar em Lisboa sem pressas e receber um pequeno-almoço artesanal à porta do alojamento. Croissants frescos, sumo natural, fruta da época e café quente — tudo entregue à hora marcada. Peça já em breakfastinbedlx.com 🥐☕",
        "en": "Wake up slowly in Lisbon with an artisanal breakfast delivered straight to your door. Fresh croissants, natural juice, seasonal fruit, and hot coffee — right on time. Order at breakfastinbedlx.com 🥐☕",
        "hashtags": "#BreakfastInBedLX #LisbonBreakfast #VisitLisbon #Alfama #GracaLisboa #ArtisanalBreakfast",
    },
    {
        "dia": "Quarta-feira",
        "titulo": "Parceria com Alojamentos Locais (QR Code gratuito)",
        "pt": "Tem um Alojamento Local em Alfama, Graça, Castelo ou Mouraria? Oferecemos cartões QR Code gratuitos para os seus quartos. Os hóspedes pedem diretamente pelo telemóvel e nós tratamos da entrega matinal sem trabalho extra para si. Saiba mais em breakfastinbedlx.com 🏡✨",
        "en": "Host a boutique apartment in historic Lisbon? We provide free custom QR Code cards for your rooms. Your guests order breakfast directly on their phone, and we handle morning delivery with zero hassle for you. Learn more at breakfastinbedlx.com 🏡✨",
        "hashtags": "#AlojamentoLocal #Lisboa #LisbonHosts #HospitalityPortugal #BreakfastInBedLX",
    },
    {
        "dia": "Sexta-feira",
        "titulo": "Sabores mediterrânicos e caseiros",
        "pt": "Fim de semana a chegar e o pequeno-almoço já está tratado. Menus completos preparados de fresco todas as manhãs com ingredientes selecionados e entrega pontual no centro histórico de Lisboa. Reserve hoje em breakfastinbedlx.com 🍊🥖",
        "en": "Weekend is here and breakfast is sorted. Freshly prepared menus every morning with selected local ingredients and punctual delivery across historic Lisbon. Book today at breakfastinbedlx.com 🍊🥖",
        "hashtags": "#LisbonFoodie #MorningInLisbon #BreakfastDelivery #BreakfastInBedLX #LisbonTrip",
    },
]

def main():
    hoje = datetime.date.today().isoformat()
    selecionados = random.sample(TEMAS, k=len(TEMAS))

    linhas = [
        "# Plano Semanal de Redes Sociais — Breakfast in Bed LX\n",
        f"*Gerado automaticamente em {hoje}*\n\n---\n",
    ]

    for item in selecionados:
        linhas.append(f"## {item['dia']} — {item['titulo']}\n\n")
        linhas.append(f"**Português:**\n{item['pt']}\n\n")
        linhas.append(f"**English:**\n{item['en']}\n\n")
        linhas.append(f"**Hashtags:**\n`{item['hashtags']}`\n\n---\n")

    with open("posts_semana.md", "w", encoding="utf-8") as f:
        f.writelines(linhas)

    print("Ficheiro posts_semana.md gerado com sucesso!")

if __name__ == "__main__":
    main()
