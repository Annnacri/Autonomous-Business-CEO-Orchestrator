import csv
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

CSV_PATH = Path("contactos.csv")
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

QUERY = """
[out:json][timeout:35];
(
  node["tourism"~"hotel|guest_house|apartment|hostel|chalet"](38.698,-9.210,38.765,-9.095);
  way["tourism"~"hotel|guest_house|apartment|hostel|chalet"](38.698,-9.210,38.765,-9.095);
);
out center tags;
"""

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def detectar_zona(tags: dict) -> str:
    for chave in ("addr:suburb", "addr:neighbourhood", "addr:district", "addr:city"):
        val = (tags.get(chave) or "").strip()
        if val:
            return val
    return "Lisboa"


def normalizar_email(tags: dict) -> str:
    for chave in ("email", "contact:email"):
        val = (tags.get(chave) or "").strip().lower()
        if EMAIL_RE.match(val) and "example" not in val and "dominio" not in val:
            return val
    return ""


def carregar_existentes() -> set[str]:
    if not CSV_PATH.exists():
        return set()
    existentes = set()
    with CSV_PATH.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = (row.get("email") or "").strip().lower()
            if email:
                existentes.add(email)
    return existentes


def buscar_overpass() -> list[dict]:
    data = urllib.parse.urlencode({"data": QUERY}).encode("utf-8")
    req = urllib.request.Request(
        OVERPASS_URL,
        data=data,
        headers={"User-Agent": "BreakfastInBedLX-Orchestrator/1.1"},
    )
    with urllib.request.urlopen(req, timeout=40) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    encontrados = []
    for el in payload.get("elements", []):
        tags = el.get("tags") or {}
        nome = (tags.get("name") or "").strip()
        email = normalizar_email(tags)
        if not nome or not email:
            continue
        encontrados.append({
            "nome": nome,
            "email": email,
            "zona": detectar_zona(tags),
            "estado": "por_contactar",
            "ultima_data": "",
        })
    return encontrados


def main() -> None:
    if not CSV_PATH.exists():
        with CSV_PATH.open("w", encoding="utf-8", newline="") as f:
            writer = csv.writer(f, quoting=csv.QUOTE_ALL)
            writer.writerow(["nome", "email", "zona", "estado", "ultima_data"])

    existentes = carregar_existentes()
    novos = []

    try:
        candidatos = buscar_overpass()
    except Exception as exc:
        print(f"Aviso na consulta externa: {exc}")
        candidatos = []

    for item in candidatos:
        if item["email"] not in existentes:
            existentes.add(item["email"])
            novos.append(item)

    if novos:
        with CSV_PATH.open("a", encoding="utf-8", newline="") as f:
            writer = csv.writer(f, quoting=csv.QUOTE_ALL)
            for n in novos:
                writer.writerow([n["nome"], n["email"], n["zona"], n["estado"], n["ultima_data"]])

    print(f"Novos contactos com e-mail encontrados: {len(novos)}")


if __name__ == "__main__":
    main()
