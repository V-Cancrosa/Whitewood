# Whitewood

Strona świata **Whitewood** (Sekoraz, „miejsce pierwszego kręgu”): osady zwierzoludzi w delcie na granicy Wielkich Elfickich Lasów. Region Vetora, prowincja Krong. Kampania D&D **Krąg Cieni**.

Strona jest statyczna: HTML, CSS i JS, bez budowania i bez zależności.

## Strony

| Plik | Co zawiera |
|---|---|
| `index.html` | wejście, prolog, interaktywny atlas, kafle prowadzące dalej |
| `osada.html` | jak żyje Whitewood: rytm dnia, zmartwienia, pieniądz, święta, architektura |
| `kronika.html` | historia od Epoki Czuwania do dziś |
| `powodz.html` | Powódź Tysiąclecia, Szlamy Przemieńcowe, Dzień Ukojenia |
| `krag.html` | kręgi wspólnoty i Kodeks Przyjęcia Obcych |
| `ludy.html` | rodziny ras i gwary |
| `bestiariusz.html` | Szlamy, Istoty Wody, Rusałka |
| `jezyk.html` | Birdfolk: zasady, zapis imion, **szybki tłumacz**, słownik, pory roku |
| `postacie.html` | ród Thorlenów, imiona Vulpinów i twarze Whitewood |
| `opowiesc.html` | **tryb opowieści**: wspomnienia Jacka do przeczytania na głos, ekran po ekranie, na tle mapy |
| `miejsce.html?id=…` | pełna strona jednego miejsca (generowana z pliku w `lore/miejsca/`) |
| `pracownia.html` | tylko dla twórców: propozycje, słowa, miejsca do opisania, otwarte pytania |

## Tryb twórców

Klucz w prawym górnym rogu i hasło `leothern` (wielkość liter bez znaczenia). Po wejściu widać:

- notatki prowadzącego (sekcje „· MG”),
- propozycje `[?]` czekające na zatwierdzenie,
- słowa-propozycje w słowniku,
- Pracownię.

Twórca może w każdej chwili przełączyć się na **widok gracza**, żeby sprawdzić, co zobaczą inni.

> To zasłonka dla znajomych, nie zamek. Wszystkie treści leżą w plikach publicznego repozytorium.

## Edycja treści

Lore jest w katalogu **`lore/`**. To tymi plikami wymieniasz się między czatami.

| Plik | Co zawiera |
|---|---|
| `lore/osada.md` | zasady całej osady |
| `lore/powodz.md` | pełna strona o Powodzi |
| `lore/wspomnienia.md` | Whitewood, jakie zostawił Jack: teksty do czytania graczom (`## Tytuł [id-miejsca]`) |
| `lore/vulpini.md` | imiona Vulpinów, Zejście |
| `lore/swieta.md` | święta ras |
| `lore/gwary.tsv` | słowa z gwar ras |
| `lore/miejsca/*.md` | jedno miejsce = jeden plik; wzór w `_SZABLON.md` |
| `lore/ustawienia.json` | kolejność miejsc na mapie |
| `lore/slownik.tsv` | słownik Birdfolk (kolumny rozdzielone tabulatorem, można wkleić do Arkuszy Google) |
| `lore/do-ustalenia.md` | otwarte pytania, sprzeczności, brakujące słowa |

Oznaczenia w plikach `.md`:

- `## Tytuł · MG`: sekcja widoczna tylko dla twórców.
- `[?]` na początku akapitu lub punktu: propozycja. Zatwierdzasz ją, usuwając znacznik.
- `status:` w nagłówku miejsca: `kanon`, `propozycja`, `sprzeczność` albo `do opisania`.

Pozostałe treści (kronika, kodeks, ludy, bestiariusz, postacie) są na razie w `js/data.js`.

## Kod

- `js/site.js`: menu, stopka, tryb twórców, animacje
- `js/lore.js`: wczytywanie i filtrowanie plików z `lore/`
- `js/pages.js`: treść podstron, atlas, tłumacz, Pracownia
- `js/data.js`: dane, które nie są jeszcze w `lore/`

## Podgląd lokalny

```bash
python3 -m http.server 8000
```

Potem otwórz `http://localhost:8000`. Bezpośrednio z dysku (`file://`) pliki z `lore/` się nie wczytają.

## Źródła lore

Dokumenty Google: „Whitewood” (historia według Mieszka, Kodeks, rasy), „Birdfolk: Architektura języka v2.0” oraz „Jack - Vulpin”.
