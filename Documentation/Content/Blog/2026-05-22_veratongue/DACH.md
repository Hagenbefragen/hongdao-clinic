# VeraTongue: Lokale Zungentopographie & Bildverarbeitung im Web-Browser

### ⚡ Zusammenfassung (TL;DR)
VeraTongue implementiert eine serverlose Zungenanalyse, die vollständig lokal auf dem Endgerät läuft. Basierend auf der klassischen Zungentopographie nach Giovanni Maciocia segmentiert die Software die Zungenoberfläche in 9 Organzonen und wertet diese über 8 diagnostische Achsen aus. Da die Berechnung direkt im Browser-Speicher (Canvas) durchgeführt wird, verbleiben alle biometrischen Daten unter der vollen Kontrolle des Nutzers.

---

## Warum Zungenanalyse? Ein ehrlicher Blick in den Körper
Für die tägliche Gesundheitsbegleitung fehlen oft einfache, verlässliche Indikatoren. Schrittzähler und Pulsmesser erfassen zwar mechanische Bewegung, liefern aber kaum Aufschluss über den Zustand der Verdauungsorgane, den Hydrationsstatus oder unterschwellige Hitze- bzw. Entzündungsprozesse.

Die Traditionelle Chinesische Medizin (TCM) nutzt seit Jahrtausenden die Zunge als Spiegel der inneren Organe. Aufgrund der intensiven Durchblutung und der kontinuierlichen Speichelsekretion spiegeln sich Durchblutungsmuster, Schleimhautveränderungen und Flüssigkeitsmängel unmittelbar auf der Zungenoberfläche wider. 

**VeraTongue** macht diese Methodik digital zugänglich—ohne Datenschutzrisiken. Die Zunge wird mit der Smartphone-Kamera erfasst und vollständig lokal analysiert.

---

## Technische Funktionsweise: Die 3 Säulen von VeraTongue

### 1. Die 7 Qualitätsprüfungen (Quality Gates)
Um Messfehler durch Verwackeln oder ungünstige Lichtverhältnisse auszuschließen, muss jede Aufnahme sieben Filter passieren:
1. **Zungenerkennung:** Überprüft Pixelwerte im Zielrahmen (R > G &times; 1,15 und R > B &times; 1,15 für mindestens 10 % der Pixel).
2. **Ausstreckungsgrad:** Die Zunge muss mindestens 40 % der Rahmenhöhe ausfüllen, damit die Nieren-Zone (Zungenwurzel) sichtbar ist.
3. **Helligkeit:** Der Mittelwert der Helligkeit muss zwischen 45 und 220 liegen.
4. **Weißabgleich:** Das Verhältnis zwischen Blau- und Rotkanälen wird analysiert, um Farbverfälschungen durch Kunstlicht auszufiltern (Normlicht D65).
5. **Auflösung:** Mindestens 640&times;480 Pixel.
6. **Schärfe (Motion Blur):** Ein Laplace-Filter berechnet die Varianz der Kantenkontraste. Werte unter 100 werden als unscharf abgewiesen.
7. **Verdeckung:** Prüft das obere Segment auf Hautfarben, um eine Verdeckung der Wurzel durch Lippen oder Zähne auszuschließen.

### 2. Das Maciocia-Organraster (9 Zonen)
Nach erfolgreicher Validierung wird die Zunge topographisch unterteilt:
* **Herz-Zone (Z1):** Die Zungenspitze (0–8 % der Höhe).
* **Lungen-Zone (Z2):** Direkt hinter der Spitze (8–25 % der Höhe).
* **Milz/Magen-Zone (Z4):** Das Zentrum der Zunge (25–65 % der Höhe).
* **Leber/Gallenblase (Z3-L/R):** Die Zungenränder.
* **Nieren/Blasen-Zone (Z5/Z6):** Die Zungenwurzel (65–100 % der Höhe).

### 3. Segmentierung im CIELAB-Farbraum
Zur exakten Trennung von Zungenkörper und Zungenbelag konvertiert die Software das Bild lokal in den CIELAB-Farbraum. Mittels K-Means-Clustering ($k=3$) werden der Zungenkörper (höchster Rot-Wert $a^*$) und der Belag (höchste Helligkeit $L^*$) segmentiert. Daraus wird das Belagsverhältnis und die Rissdichte errechnet.

---

## Vereinshinweis & Rechtlicher Rahmen
Die angebotenen Zungenanalysen und Gesundheitspflege-Programme erfolgen im Rahmen des gemeinnützigen Vereins **Lebensfluss e.V.** (ZVR-Zahl: 1758759096, Sitz in Österreich). Die Auswertungen dienen der Gesundheitsförderung und Selbsterkenntnis. Sie stellen keine ärztliche Diagnostik, Therapie oder Heilkunde dar. Die Teilnahme der Mitglieder erfolgt auf Basis eines Kostenbeitrags zur Deckung der Vereinsaufwendungen.

*Für Lizenzanfragen: **IP@destill.ai***
*LinkedIn: [Hagen Befragen](https://www.linkedin.com/in/hagen-befragen) & [DESTILL.ai](https://www.linkedin.com/company/destill-ai)*
