from datetime import datetime
from pathlib import Path

now = datetime.utcnow()
ciclo = (now.timetuple().tm_yday * 2) + (1 if now.hour >= 12 else 0)

angulos = [
    {
        "tema": "Manhãs tranquilas em Lisboa (Hóspedes)",
        "pt": (
            "Acordar em Lisboa sem pressas e receber o pequeno-almoço diretamente onde estás faz toda a diferença no ritmo do dia. "
            "No Breakfast in Bed LX, preparas tudo em minutos em breakfastinbedlx.com para começar a manhã com calma antes de sair."
        ),
        "en": (
            "Waking up in Lisbon without rushing and having breakfast delivered straight to where you are changes the whole pace of your morning. "
            "With Breakfast in Bed LX, order in minutes at breakfastinbedlx.com and start the day unhurried before exploring."
        ),
        "tags": "#BreakfastInBedLX #Lisboa #PequenoAlmocoLisboa #LisbonBreakfast #VisitLisbon #SlowMorning",
    },
    {
        "tema": "Parceria QR Code para Alojamentos Locais (B2B)",
        "pt": (
            "Tens um Alojamento Local ou guesthouse em Lisboa e queres elevar a experiência dos hóspedes sem complicações na operação? "
            "O Breakfast in Bed LX disponibiliza cartões com QR Code para o quarto, ligando os teus hóspedes a breakfastinbedlx.com de forma simples."
        ),
        "en": (
            "Running an Alojamento Local or guesthouse in Lisbon and want to elevate guest mornings without adding operational friction? "
            "Breakfast in Bed LX offers room QR code cards connecting your guests to breakfastinbedlx.com effortlessly."
        ),
        "tags": "#AlojamentoLocal #LisboaAL #HospitalityLisbon #BreakfastInBedLX #GuestExperience #LisbonHosts",
    },
    {
        "tema": "Escala de reservas e conveniência (Foco Direto)",
        "pt": (
            "Menos correria de manhã, mais sabor à mesa. Se estás hospedado em Lisboa ou geres alojamentos na cidade, "
            "pede o teu pequeno-almoço em breakfastinbedlx.com e garante manhãs mais práticas para quem chega."
        ),
        "en": (
            "Less morning rush, more flavor on the table. Whether you are staying in Lisbon or managing local stays, "
            "order at breakfastinbedlx.com and make mornings smoother for every guest."
        ),
        "tags": "#BreakfastInBedLX #LisbonFood #Lisboa #MorningInLisbon #TravelLisbon #RoomServiceLX",
    },
]

escolhido = angulos[ciclo % len(angulos)]

conteudo = f"""# Breakfast in Bed LX — Plano & Posts (Ciclo #{ciclo})

- **Atualizado (UTC):** {now.strftime("%Y-%m-%d %H:%M")}
- **Meta operacional:** Mínimo de **20 reservas/dia**
- **Site oficial:** https://breakfastinbedlx.com
- **Ângulo ativo:** {escolhido["tema"]}

---

## Português (PT)

{escolhido["pt"]}

---

## English (EN)

{escolhido["en"]}

---

## Hashtags

{escolhido["tags"]}
"""

Path("posts_semana.md").write_text(conteudo, encoding="utf-8")
print("posts_semana.md gerado com sucesso.")
