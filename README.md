# Auftragskompass

Zeigt in Wochen- und Monatsansicht, wie viele Aufträge bis zur Deckung der Fixkosten noch fehlen. Läuft als Webseite auf GitHub Pages, gleicht sich über Firebase zwischen Geräten ab und lässt sich als App installieren.

## Dateien

- `index.html`: die ganze App
- `firebase-config.js`: deine Firebase-Werte (siehe unten)
- `firestore.rules`: Sicherheitsregeln für die Datenbank
- `manifest.webmanifest`, `sw.js`, `icons/`: Installation als App und Offline-Betrieb

## 1. GitHub Pages

1. Neues Repository anlegen, alle Dateien hochladen (der Ordner `icons` gehört dazu).
2. Im Repository: Settings > Pages > Branch `main`, Ordner `/ (root)`, speichern.
3. Nach ein bis zwei Minuten ist die App unter `https://DEIN-NAME.github.io/REPO-NAME/` erreichbar.

## 2. Firebase

1. In der Firebase-Konsole ein Projekt anlegen.
2. Build > Authentication > Anmeldemethode > Google aktivieren.
3. Authentication > Einstellungen > Autorisierte Domains: `DEIN-NAME.github.io` hinzufügen.
4. Build > Firestore Database > Datenbank erstellen. Dann den Tab "Regeln" öffnen, den Inhalt von `firestore.rules` einfügen und veröffentlichen.
5. Projekteinstellungen > Allgemein > Meine Apps > Web-App (`</>`) registrieren. Die angezeigten Werte `apiKey`, `authDomain`, `projectId` und `appId` in `firebase-config.js` eintragen und die Datei erneut auf GitHub hochladen.

Beim ersten Öffnen in der App auf "Mit Google anmelden" tippen. Ab dann gleichen sich alle Geräte ab, auch wenn eines kurz offline ist.

## 3. Als App installieren

- **Mac (Chrome):** In der Adressleiste auf das Installieren-Symbol klicken, oder Menü > Speichern und teilen > Seite als App installieren.
- **Pixel (Chrome):** Menü > App installieren (oder "Zum Startbildschirm hinzufügen").

## Hinweise

- Hat die Cloud beim ersten Anmelden noch keine Daten, werden die Daten dieses Geräts hochgeladen. Sind dort schon Daten, gelten diese.
- Ohne eingetragene Firebase-Werte läuft die App nur auf dem jeweiligen Gerät.
- Nach Änderungen an `index.html` lädt die installierte App die neue Version beim nächsten Start mit Internet.
