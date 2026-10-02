# Leanders Routine

Web-App für Leanders iPad: Morgen-, Nach-der-Schule- und Abendroutine mit Countdown, Zeitstrahl und Abhaken.

## Dateien

- `index.html` – Seite und Gestaltung
- `app.js` – gesamte Logik, Startbelegung aus dem PRD
- `sw.js` – Offline-Cache
- `manifest.webmanifest`, `icon-180.png`, `icon-512.png` – Homescreen-App

Keine Abhängigkeiten, kein Build-Schritt. Alle Daten bleiben lokal auf dem iPad (localStorage).

## Auf GitHub Pages veröffentlichen

1. Neues Repository anlegen, z. B. `leander-routine`, und alle Dateien in den Hauptordner hochladen.
2. Settings › Pages › Branch `main`, Ordner `/ (root)` › Save.
3. Nach 1–2 Minuten läuft die App unter `https://<benutzername>.github.io/leander-routine/`.

## Auf dem iPad einrichten

1. Adresse in Safari öffnen › Teilen › „Zum Home-Bildschirm“.
2. App vom Home-Bildschirm starten, auf den Stift tippen und eine 4-stellige PIN festlegen.
3. Optional: Einstellungen › Bedienungshilfen › Geführter Zugriff aktivieren und die App damit sperren.

## Gut zu wissen

- **Updates:** Nach dem Hochladen neuer Dateien in `sw.js` die Versionsnummer (`leander-routine-v4`) erhöhen. Die neue Version erscheint beim übernächsten Start der App.
- **Ton-Test:** `ton-test.html` auf dem iPad öffnen, während ein Podcast läuft, und die Knöpfe antippen. Läuft der Podcast weiter, passt alles. Sonst im Putz-Timer „Ton aus“ wählen.
- **Timer-Schritte:** Jede Aufgabe kann im Bearbeiten-Bereich Schritte mit Dauer bekommen (z. B. Zähne putzen 4 × 30 Sekunden).
- **Sicherung:** Bearbeiten › „Sichern“ speichert alle Routinen als Datei, „Laden“ stellt sie wieder her.
- **Testen mit anderer Uhrzeit:** `index.html?now=2026-10-07T06:52` an die Adresse hängen.
- **PIN vergessen:** App vom Home-Bildschirm löschen und neu hinzufügen. Damit ist alles zurückgesetzt, eigene Änderungen gehen verloren. Deshalb ab und zu sichern.
