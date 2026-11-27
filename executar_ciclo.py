import csv
import os
import smtplib
import time
from datetime import datetime
from email.message import EmailMessage

CSV_PATH = "contactos.csv"
LOG_PATH = "envios_log.csv"

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
REMETENTE = "info@breakfastinbedlx.com"
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
LIMITE = int(os.environ.get("LIMITE_ENVIOS", "10"))
PAUSA = int(os.environ.get("PAUSA_SEGUNDOS", "20"))

CAMPOS_CSV = ["nome", "email", "zona", "estado", "ultima_data"]

def carregar_csv(caminho):
    if not os.path.exists(caminho):
        return []
    with open(caminho, mode="r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))

def guardar_csv(caminho, linhas):
    with open(caminho, mode="w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=CAMPOS_CSV, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(linhas)

def registar_log(email, status, detalhe):
    existe = os.path.exists(LOG_PATH)
    with open(LOG_PATH, mode="a", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["data", "email", "status", "detalhe"])
        if not existe:
            writer.writeheader()
        writer.writerow({
            "data": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "email": email,
            "status": status,
            "detalhe": detalhe
        })

def montar_email(c):
    nome = (c.get("nome") or "Parceiro").strip()
    zona = (c.get("zona") or "Lisboa").strip()
    assunto = f"Cartao QR Code gratuito para o vosso AL na {zona}"
    corpo = (
        f"Ola, {nome},\n\n"
        f"Preparamos um cartao com QR Code personalizado para colocarem no vosso alojamento na {zona}: "
        f"os hospedes pedem pequeno-almoco artesanal pelo telemovel e recebem na porta na manha seguinte, sem trabalho para a equipa.\n\n"
        f"Posso enviar-vos o cartao pronto e o menu? https://breakfastinbedlx.com/\n\n"
        f"Ana Alves\nBreakfast in Bed LX\nbreakfastinbedlx.com"
    )
    return assunto, corpo

def main():
    contactos = carregar_csv(CSV_PATH)
    pendentes = [c for c in contactos if (c.get("estado") or "").strip().lower() == "por_contactar"]
    if not pendentes:
        print("Nenhum contacto pendente para enviar.")
        return

    enviados = 0
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=30) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        for c in pendentes[:LIMITE]:
            assunto, corpo = montar_email(c)
            msg = EmailMessage()
            msg["From"] = REMETENTE
            msg["To"] = c["email"].strip()
            msg["Reply-To"] = "anaestevesac@gmail.com"
            msg["Subject"] = assunto
            msg.set_content(corpo)
            try:
                server.send_message(msg)
                c["estado"] = "enviado"
                c["ultima_data"] = datetime.now().strftime("%Y-%m-%d")
                registar_log(c["email"], "enviado", "OK")
                enviados += 1
                print(f"Enviado para {c['email']}")
                if enviados < min(LIMITE, len(pendentes)):
                    time.sleep(PAUSA)
            except Exception as exc:
                registar_log(c["email"], "erro", str(exc))
                print(f"Erro ao enviar para {c['email']}: {exc}")

    guardar_csv(CSV_PATH, contactos)
    print(f"Concluido. Enviados: {enviados}")

if __name__ == "__main__":
    main()
