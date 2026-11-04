# Whitewood

Strona świata **Whitewood** (Sekoraz, „miejsce pierwszego kręgu”): osady zwierzoludzi w delcie na granicy Wielkich Elfickich Lasów. Region Vetora, prowincja Krong. Kampania D&D **Krąg Cieni**.

Strona jest statyczna: HTML, CSS i JS, bez budowania i bez zależności.

## Sekcje

- **Atlas**: interaktywna mapa z punktami (zoom, panel opisu, strzałki ← →)
- **Kronika**: oś czasu od Epoki Czuwania do Imperium
- **Powódź Tysiąclecia**
- **Krąg**: sekor / tekor / kakor oraz Kodeks Przyjęcia Obcych
- **Ludy**: rodziny ras z filtrami
- **Bestiariusz**: Szlamy, Istoty Wody, Rusałka/Strażnik/Źródło
- **Birdfolk**: ruchomy `!`, zapis imienia z wymową ptasią, słownik z wyszukiwarką, pory roku
- **Leothernowie** i **Postacie**

## Edycja treści

Cały lore jest w **`js/data.js`**: lokacje na mapie (współrzędne w % obrazu), kronika, kodeks, ludy, bestiariusz, postacie i słownik. Wystarczy zmienić dane, bez ruszania HTML.

Miejsca oznaczone jako „Do opisania” (Kamienna Warownia, Wyspa Wschodnia i Wyspa Zachodnia) oraz postać ze statusem „szkic” (Aeliana) czekają na uzupełnienie w lore.

## GitHub Pages

1. **Settings → Pages**
2. *Source*: **Deploy from a branch**
3. *Branch*: `main` (lub inna gałąź ze stroną), folder **`/ (root)`**
4. Strona będzie pod adresem `https://v-cancrosa.github.io/Whitewood/`

Plik `.nojekyll` wyłącza przetwarzanie przez Jekyll.

## Podgląd lokalny

```bash
python3 -m http.server 8000
```

Potem otwórz `http://localhost:8000`.

## Źródła lore

Dokumenty Google: „Whitewood” (historia według Mieszka, Kodeks, rasy), „Birdfolk: Architektura języka v2.0” oraz „Jack - Vulpin”.
