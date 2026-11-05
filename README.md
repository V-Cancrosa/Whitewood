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

Lore jest w katalogu **`lore/`**. To tymi plikami wymieniasz się między czatami.

| Plik | Co zawiera |
|---|---|
| `lore/ustawienia.json` | tryb (`"mg"` albo `"publiczny"`) i kolejność miejsc na mapie |
| `lore/osada.md` | zasady całej osady: charakter, architektura, klimat, co przyszło z Imperium |
| `lore/miejsca/*.md` | jedno miejsce = jeden plik; wzór w `_SZABLON.md` |
| `lore/slownik.tsv` | słownik Birdfolk (kolumny rozdzielone tabulatorem, można wkleić do Arkuszy Google) |
| `lore/do-ustalenia.md` | otwarte pytania, sprzeczności, brakujące słowa |

W plikach są **statusy** `kanon`, `propozycja`, `sprzeczność` i `do opisania`. Propozycje są na stronie wyraźnie oznaczone.

Sekcje z dopiskiem **`· MG`** (Na głos, Zmysły, Mieszkańcy, Haczyki, Otwarte pytania) to notatki prowadzącego. Widać je tylko w trybie MG. Dopisek `?publiczny` w adresie pokazuje stronę tak, jak zobaczą ją inni.

Pozostałe treści (kronika, kodeks, ludy, bestiariusz, postacie) są na razie w `js/data.js`.

> Wersja publiczna tylko ukrywa notatki MG na stronie. W samych plikach repozytorium nadal są.

## GitHub Pages

**Nie włączaj, dopóki trwa wątek w Whitewood**, bo gracze mogliby trafić na notatki prowadzącego.

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
