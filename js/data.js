/* =========================================================
   WHITEWOOD — dane świata
   Ten plik to „kanon” strony. Edytuj tu, a strona się zaktualizuje.
   Źródła: Google Docs „Whitewood”, „birdfolk_architektura_v2”,
   „Jack - Vulpin” (projekt D&D Krąg Cieni).
   ========================================================= */

window.WW = {};

/* ---------- ATLAS: punkty na mapie (x/y w % obrazu) ---------- */
WW.locations = [
  {
    id: "dab",
    x: 40.6, y: 22.5,
    name: "Stabilna Wyspa",
    native: "Drengaz",
    nativeGloss: "miejsce wielkiego drzewa",
    kind: "Serce osady",
    text: [
      "Wyspa, którą utrzymał przy życiu jeden korzeń. Gdy Powódź Tysiąclecia zmyła wszystko, co nie było zakorzenione głęboko, ogromna brzoza przetrwała — jej system korzeniowy wyłapywał osady i kamienie, aż ziemia wokół stała się stała.",
      "Drzewo rosło dalej, przybierając rozmiary i formę bliższą dębowi niż brzozie. Dziś zwane jest Brzozowym Dębem. Władza Whitewood nie została zamknięta w murach — rozproszono ją w strukturze drzewa i przestrzeni wspólnej."
    ],
    tags: ["Brzozowy Dąb", "Ogä", "Rada"]
  },
  {
    id: "rynek",
    x: 41, y: 58,
    name: "Rynek",
    native: "dontarol",
    nativeGloss: "miejsce dawania-i-brania",
    kind: "Handel i spotkania",
    text: [
      "Centralna wyspa delty, połączona mostami z każdym brzegiem. Tu krzyżują się wszystkie drogi Whitewood — i wszystkie spory.",
      "Handel z Imperium pozostaje mocno ograniczony; od wieków najważniejszym partnerem są elfy z Wielkich Lasów. Rzemieślnicy Mapach wnieśli na targ swoją skalę jakości — od gali-katga (arcydzieło) po strigi-katga (partactwo)."
    ],
    tags: ["dontar", "Mapachi", "elfi kupcy"]
  },
  {
    id: "nory",
    x: 13, y: 77,
    name: "Nory Leothernów",
    native: "!leothern!-or tan",
    nativeGloss: "dom Leothernów",
    kind: "Dawna kopalnia",
    text: [
      "Porzucony szyb kopalniany przy granicy Lasu, odzyskany — nie wykuty — przez ród Vulpinów Leothern. W czasie Powodzi Tysiąclecia woda go ominęła, a jego drzwi pozostały otwarte dla każdego.",
      "W zamian za schronienie Leothernowie prosili tylko o wiedzę. Tak powstała biblioteka rodu: notatki zielarskie, dawne trasy handlowe, szkice instrumentów — i skrzypce, które nie miały już do kogo wrócić."
    ],
    tags: ["Vulpini", "biblioteka", "Jack"]
  },
  {
    id: "las",
    x: 86.5, y: 66,
    name: "Wielkie Elfickie Lasy",
    native: "Drenkana",
    nativeGloss: "Las z dawnych czasów",
    kind: "Granica — kakren",
    text: [
      "Stąd wypływa rzeka, która stworzyła Whitewood. Las nie atakuje — mówi się, że po prostu nie akceptuje. Im bliżej niego, tym bogatsze złoża, i tym częstsze osuwiska, korzenie przebijające skałę, nagłe warstwy wodonośne.",
      "Whitewood wybrało pragmatyzm: handel z elfami, choć drogi, był rozsądniejszy niż dalsze ryzyko. Granica lasu elfickiego ma w Birdfolku własne słowo — kakren, „drzewa poza kręgiem”."
    ],
    tags: ["elfy", "kopalnie", "aelan"]
  },
  {
    id: "warownia",
    x: 63.5, y: 64,
    name: "Kamienna Warownia",
    native: "—",
    nativeGloss: "nazwa nieustalona",
    kind: "Do opisania",
    pending: true,
    text: [
      "Jedyna kamienna budowla z czerwonym dachem w delcie — wyraźnie inna niż drewniane chaty reszty osady.",
      "W lore nie ma jeszcze opisu tego miejsca. Uzupełnij w js/data.js."
    ],
    tags: ["do uzupełnienia"]
  },
  {
    id: "wschod",
    x: 66, y: 46,
    name: "Wyspa Wschodnia",
    native: "—",
    nativeGloss: "nazwa nieustalona",
    kind: "Do opisania",
    pending: true,
    text: [
      "Rozległa wyspa z zabudową gospodarczą, na skraju brzozowego lasu, mostem połączona z Rynkiem.",
      "W lore nie ma jeszcze opisu tego miejsca. Uzupełnij w js/data.js."
    ],
    tags: ["do uzupełnienia"]
  },
  {
    id: "zachod",
    x: 23, y: 51,
    name: "Wyspa Zachodnia",
    native: "—",
    nativeGloss: "nazwa nieustalona",
    kind: "Do opisania",
    pending: true,
    text: [
      "Mniejsza wyspa z gęstą zabudową, mostami spięta z Rynkiem i Stabilną Wyspą.",
      "W lore nie ma jeszcze opisu tego miejsca. Uzupełnij w js/data.js."
    ],
    tags: ["do uzupełnienia"]
  },
  {
    id: "delta",
    x: 52, y: 78,
    name: "Delta",
    native: "silkir",
    nativeGloss: "woda idąca",
    kind: "Krajobraz po Powodzi",
    text: [
      "Przed Powodzią była tu jedna rzeka — przewidywalna, nieszeroka. Gdy wody opadły, dolina stała się deltą: kilka odnóg, a między nimi wyspy.",
      "Bagna zniknęły z pobliża osady, ale woda „nie odeszła” — zmieniła tylko sposób istnienia. W nurtach żyją drapieżne ryby skokowe i wodne szczury, a w głębinie (lurn) — coś, czego natury nigdy nie rozstrzygnięto."
    ],
    tags: ["Istoty Wody", "wodne ptactwo", "lurn"]
  }
];

/* ---------- KRONIKA ---------- */
WW.timeline = [
  {
    era: "Przed nazwą",
    title: "Rzeka i miejsce, które pozwalało zostać",
    text: "Jedna rzeka wypływała z Wielkich Elfickich Lasów spokojnym, jednolitym nurtem. Jej podmokłe brzegi i mokradła stanowiły naturalną granicę między lasem a ziemią, na której można było żyć bez podporządkowania się jego rytmom. Birdfolk zatrzymali się tu pierwsi — nie by budować, lecz by obserwować. Nie istniała jeszcze wspólnota. Istniało czuwanie."
  },
  {
    era: "Epoka Czuwania",
    title: "Narodziny języka",
    text: "Krukowate zaproponowały wspólny standard mowy, wybierając z każdej gwary to, co da się wymówić każdym aparatem — dziobem, pyskiem, trąbą. Język nie wyrastał z hierarchii ani własności, lecz z potrzeby porozumienia między różnymi ciałami. Stał się fundamentem Whitewood."
  },
  {
    era: "Epoka Wspólnoty",
    title: "Przybycie Humblefolk",
    text: "Vulpini, Cervani, Jerbeen, Mapachi, Hedge i inni przybywali stopniowo — uciekając przed zagrożeniami, szukając ziemi możliwej do obrony. Tam, gdzie Birdfolk unikali i przewidywali, Humblefolk nauczyli się odpierać. Powstała pierwsza trwała osada, jeszcze bez nazwy, ale już z zasadą: żyć razem, nie dominować."
  },
  {
    era: "Epoka Bagien",
    title: "Szlamy i wiedza niepisana",
    text: "Dolny bieg rzeki regularnie się rozlewał. W bagnach żyły Szlamy — Przylepne i Kaustyczne, groźne, lecz przewidywalne. Szlamy Przemieńcowe były rzadkie i uchodziły za zły znak: pojawiały się, gdy ktoś poszedł „czyścić bagna” i nie wrócił."
  },
  {
    era: "Epoka Wydobycia",
    title: "Kopalnie i granica Lasu",
    text: "Im bliżej Lasu, tym bogatsze złoża — i tym więcej wypadków, których nie dało się wyjaśnić. Zaczęto mówić, że Las tego nie pożąda. Whitewood wybrało handel z elfami zamiast eskalacji. Porzucone szyby zasiedlili Vulpini, wśród nich ród Leothern."
  },
  {
    era: "Rok zero",
    title: "Powódź Tysiąclecia",
    text: "Rzeka wystąpiła z brzegów gwałtownie, jakby zerwał się jej rytm. Zmyła trakty, rozbiła brzegi, wdarła się w bagna i nory. Bestie i mieszkańcy uciekali w te same miejsca. Dawne granice przestały istnieć.",
    flood: true
  },
  {
    era: "Odbudowa",
    title: "Brzozowy Dąb",
    text: "Gdy wody opadły, dolina stała się deltą. Ocalała ogromna brzoza, której korzenie ustabilizowały wyspę. Wokół niej odbudowano osadę i nadano jej imię: Whitewood — w Birdfolku Sekoraz, „miejsce pierwszego kręgu”."
  },
  {
    era: "Świat po Powodzi",
    title: "Nowe wody, nowe bestie",
    text: "Szlamy stały się rzadsze, lecz nieprzewidywalne. Pojawiły się Istoty Wody. Bestie stały się bardziej terytorialne. Wydry wyemigrowały w dół rzeki ku Morzu Północnemu, a deltę opanowało wodne ptactwo. Whitewood nauczyło się czytać zmiany, nie eksterminować."
  },
  {
    era: "Epoka Imperium",
    title: "Wcielenie do Imperium",
    text: "Gdy ziemie elfów włączono do Imperium, przyszła kolej na Whitewood. Zadanie okazało się trudniejsze, niż przypuszczał Alastor, Zwiastun Vetory — żaden zwierzoczłek nie znał języka Imperium. Dopiero Tabaxi, którzy szybko opanowali Wspólny, a niektórzy nawet Imperialny, pozwolili porozumieć się po raz pierwszy."
  },
  {
    era: "Dziś",
    title: "Osada pogranicza",
    text: "Whitewood jest miejscem pogranicza: wody, lasu, pamięci i zmiany. Mieszkańcy są podzieleni — jedni widzą w Imperium zagrożenie dla wiekowego porządku, inni szansę na rozwój. Stary Oga Kornik stara się utrzymać równowagę, a każda nowa wiedza z Imperium poróżnia obie strony jeszcze bardziej."
  }
];

/* ---------- KODEKS PRZYJĘCIA OBCYCH ---------- */
WW.codex = [
  { n: "I", title: "Natura Czynu ponad Naturą Ciała", text: "Whitewood nie ocenia przybysza po formie, lecz po działaniu. Forma może budzić ostrożność. Czyn buduje zaufanie. Hybryda nie jest odrzucana z definicji — ale nie otrzymuje automatycznej równości." },
  { n: "II", title: "Zasada Drugiego Kręgu", text: "Każdy przyjęty obcy żyje w Drugim Kręgu (tekor) przez okres próbny: bez prawa do ziemi i głosu, ale może pracować, handlować i przebywać w osadzie. Trwa to do uznania przez Radę lub Ogę." },
  { n: "III", title: "Zasada Poręczenia", text: "Obcy musi mieć poręczyciela (donat) spośród rdzennej społeczności. Poręczyciel odpowiada reputacją za czyny przybysza. Brak poręczyciela — brak stałego osiedlenia." },
  { n: "IV", title: "Zasada Przejrzystości", text: "Istoty o naturze zmiennej muszą ujawnić zakres swoich przemian; istoty o pochodzeniu eksperymentalnym — źródło modyfikacji. Ukrywanie istotnych cech to złamanie zaufania." },
  { n: "V", title: "Zasada Wspólnego Bezpieczeństwa", text: "Whitewood nie toleruje form, które naruszają integralność biologiczną innych, szerzą toksyczność, pasożytnictwo lub niekontrolowaną mutację, albo działają w interesie obcych frakcji. To jedyna bezwzględna granica." },
  { n: "VI", title: "Zasada Korzenia", text: "Po latach stałego życia, pracy i braku naruszeń (np. pięciu) obcy może przejść do Pierwszego Kręgu (sekor): prawo do ziemi, głosu, dziedziczenia. Od tej chwili nie jest już obcym." }
];

/* ---------- KRĘGI ---------- */
WW.circles = [
  { id: "sekor", name: "sekor", pl: "Pierwszy Krąg", text: "Rdzenni — Birdfolk i Beastfolk, którzy współtworzyli Whitewood w epoce przedimperialnej. Prawo do ziemi, głosu i dziedziczenia." },
  { id: "tekor", name: "tekor", pl: "Drugi Krąg", text: "Przyjęci w próbie (tekan). Mogą pracować i handlować, nie mają ziemi ani głosu. Każdy ma poręczyciela z Pierwszego Kręgu." },
  { id: "kakor", name: "kakor", pl: "Poza Kręgiem", text: "Obcy i nieprzyjęci — kakat. Goście, kupcy, wędrowcy. Dystans w Whitewood mierzy się względem kręgu wspólnoty, nie względem siebie." }
];

/* ---------- LUDY ---------- */
WW.peoples = [
  // Birdfolk
  { fam: "birdfolk", group: "Krukowate", races: "Corvum · Kenku", role: "Archiwiści i inicjatorzy", text: "To one zaproponowały wspólny język. W Whitewood mówi się o nich jako o „szanowanej iskrze inicjatywy” — szacunek zapracowany czynem, nie nadany urodzeniem. Corvum scholastyczni, Kenku techniczno-rzemieślniczy." },
  { fam: "birdfolk", group: "Sowy", races: "Strig · Owlin", role: "Strażnicy i medytujący", text: "Dźwięki niosące się w ciszy nocy. Wnieśli słownictwo obserwacji i formy sentencjonalne. Strig militarni, Owlin filozoficzni. Od nich pochodzi słowo noc — strig." },
  { fam: "birdfolk", group: "Drapieżne", races: "Raptor · Aarakocra", role: "Pionierzy, zwiadowcy, łowcy", text: "Język zorientowany na działanie i przestrzeń: czasowniki ruchu, terminologia łowiecka, okrzyki bojowe. Dali Birdfolkowi ogień (ras) i powietrze (hen)." },
  { fam: "birdfolk", group: "Naziemne", races: "Gallus", role: "Domowi, religijni, gospodarscy", text: "Trzymają osadę przy ziemi. Słownictwo domu, rodziny, posiłku, rytuału i kalendarza. Od nich pochodzi dzień — gal — i nazwa pisma: Kuropatwa." },
  { fam: "birdfolk", group: "Miejskie", races: "Luma", role: "Mediatorzy i posłańcy", text: "Charyzmatyczni i adaptacyjni. Wnieśli powitania, grzeczności i dyplomację — uprzejmość wbudowaną w samą gramatykę." },
  { fam: "birdfolk", group: "Wodne", races: "kaczkowate · mewowate", role: "Rybacy i handlarze rzeczni", text: "Po Powodzi Tysiąclecia opanowali deltę. Słownictwo wodne, handlowe, zawołania portowe — i wchłonięte, recesywne słowa wydr." },
  // Beastfolk
  { fam: "beastfolk", group: "Psowate", races: "Vulpin · Lupin", role: "Dwór i stado", text: "Dwa bieguny jednej grupy. Vulpin — finezja, dwuznaczność, faux pas, poezja. Lupin — przysięga, więź, bezpośredniość, pamięć krzywd. Od Lupinów pochodzi najcięższa obelga Whitewood: pies." },
  { fam: "beastfolk", group: "Kotowate", races: "Tabaxi · Leonin", role: "Opowiadacze i honorowi", text: "Tabaxi to wędrowcy i tłumacze — to oni pierwsi porozumieli się z Imperium. Leonin mówią niewiele, ale ciężko: słownictwo honoru i kodeksu." },
  { fam: "beastfolk", group: "Trąbowce", races: "Loxodon", role: "Pamięć, sędziostwo, instytucja", text: "Mówią także trąbą — infradźwiękami. Wnieśli słownictwo instytucjonalne: ogä, krąg, sąd. Każdy umlaut (ä ö ü) w Birdfolku to dziedzictwo Loxodonów. Loxodonem jest Oga Kornik." },
  { fam: "beastfolk", group: "Zającowate", races: "Harengon", role: "Posłańcy i plotka", text: "Krótki pysk, bardzo szybki rytm. Markery epistemiczne — „słyszałem”, „mówią”, „podobno” — i rozróżnienie: potwierdzone czy plotka." },
  { fam: "beastfolk", group: "Jeleniowate", races: "Cervan", role: "Leśni duchowni, przewodnicy", text: "Kontakt z elfami. Słownictwo lasu, ziół, śladów, pór i cykli. Od nich drzewo — dren — i zapożyczenie elfickie aelan, drzewo święte." },
  { fam: "beastfolk", group: "Szopowate", races: "Mapach", role: "Rzemieślnicy i kombinatorzy", text: "Praktyczni i konkretni. Pełna skala jakości, słownictwo handlu i pragmatyczny sarkazm: dakur-ko to „tak zwany młot”." },
  { fam: "beastfolk", group: "Gryzonie", races: "Jerbeen", role: "Kronikarze codzienności", text: "Mali bohaterowie i opowiadacze anegdot. Cała morfologia zdrobnień w Birdfolku to ich dziedzictwo." },
  { fam: "beastfolk", group: "Jeżowate", races: "Hedge", role: "Mediatorzy kryzysowi", text: "Dyplomaci i pielęgniarze. Słownictwo mediacji, opieki i lecznictwa — formy, które wyciszają." },
  { fam: "beastfolk", group: "Łasicowate", races: "kuny · fretki", role: "Zwiadowcy i kurierzy", text: "Słownictwo dyskrecji i ukrytych szlaków. Wydry, niegdyś centralna gwara wodna, po Powodzi odeszły w dół rzeki ku Morzu Północnemu." },
  { fam: "beastfolk", group: "Niedźwiedziowate", races: "Ursine", role: "Pustelnicy i zielarze", text: "Strażnicy świętych miejsc, hibernatorzy. Słownictwo zimy, snu długiego i siły spokojnej. Od nich karkor — rok cykliczny." },
  { fam: "beastfolk", group: "Latające ssaki", races: "nietoperze", role: "Tłumacze — rasa pomostowa", text: "Wraz z Tabaxi pierwotni łącznicy między Birdfolk a Beastfolk. Dziś główni tłumacze Thri-kreen. Metajęzyk: narzędzia mówienia o samej mowie." },
  // Wtórne
  { fam: "hybrids", group: "Hybrydy", races: "Minotaur · Centaur · Satyr", role: "Przybysze Drugiego Kręgu", text: "Wnieśli rejestr przybysza: „proszę o gościnę”, „zobowiązuję się”. Nie tworzą frakcji, nie mają reprezentacji politycznej — przyjmowani z ostrożnością, tolerowani z racji czynów, nie natury." },
  { fam: "exotic", group: "Owady", races: "Thri-kreen", role: "Klikający adstrat", text: "Ich Birdfolk ma perkusyjny rytm chitynowego aparatu mowy. Wzajemna zrozumiałość ok. 75% przy wolnej mowie — dłuższe rozmowy tłumaczą nietoperze." },
  { fam: "exotic", group: "Gady", races: "Tortle", role: "Żywe muzeum języka", text: "Mówią archaizmami. Wypełniają zimową lukę po hibernacji Ursine. Od nich durin — pokolenie liniowe. Gdy Tortle spotka Ursine'a, rozmowa uchodzi za niemal świętą." }
];

WW.families = {
  birdfolk: { label: "Skrzydlaci", circle: "sekor" },
  beastfolk: { label: "Beastfolk", circle: "sekor" },
  hybrids: { label: "Hybrydy", circle: "tekor" },
  exotic: { label: "Egzotyczni", circle: "tekor" }
};

/* ---------- BESTIARIUSZ ---------- */
WW.bestiary = [
  { name: "Szlam Przylepny", tier: "Przed Powodzią — pospolity", text: "Groźny, lecz przewidywalny. Wiedziano, gdzie się go spodziewać i jak z nim postępować. Po Powodzi rzadszy — i przez to bardziej zdradliwy." },
  { name: "Szlam Kaustyczny", tier: "Przed Powodzią — pospolity", text: "Żrący mieszkaniec dawnych mokradeł. Po Powodzi proporcje typów Szlamów się wyrównały, a stare reguły przestały działać." },
  { name: "Szlam Przemieńcowy", tier: "Zły znak", danger: true, text: "Gdy ktoś zginie w wodzie, a zanim jego iskra zgaśnie zostanie pochłonięty przez Szlam — woda spowalnia śmierć, mózg jeszcze pamięta, magia nie pozwala odejść. Kiedyś znak jednostkowej tragedii. Po Powodzi — zbiorowej śmierci." },
  { name: "Praktyka Ukojeń", tier: "Obyczaj Whitewood", rite: true, text: "Przemieńcowego nie zabija się od razu. Próbuje się doprowadzić go tam, gdzie „chciał dotrzeć”. Dopiero gdy dusza zazna pochówku, a Szlam stanie się chaotycznym potworem — zostaje zniszczony." },
  { name: "Istoty Wody", tier: "Po Powodzi", text: "Zwierzęta nurtu, drapieżne ryby skokowe, wodne szczury wzburzające wodę. Delta dała im nowy dom — i nowe tereny łowieckie." },
  { name: "Bestie", tier: "Po Powodzi", text: "Nie zniknęły — zmieniły się. Bardziej terytorialne, mniej przewidywalne, czasem uznające zabudowę za część środowiska. Whitewood nauczyło się je czytać, nie eksterminować." },
  { name: "Rusałka · Strażnik · Źródło", tier: "Byt nieokreślony", mystery: true, text: "Trzy imiona dla jednego — albo dla trzech. Jego natury nigdy nie rozstrzygnięto. Każde imię mówi więcej o tym, kto je wypowiada, niż o tym, co nazywa." }
];

/* ---------- POSTACIE ---------- */
WW.characters = [
  { name: "Oga Kornik", race: "Loxodon", role: "Ogä — przywódca Whitewood", initial: "K", text: "Stary Loxodon, który wiedzie i zakorzenia. „Kornik” to przydomek, nie rasa — ktoś, kto nie burzy struktury, lecz drąży ją i wzmacnia od środka. Próbuje utrzymać równowagę między zwolennikami Imperium a strażnikami dawnego porządku.", quote: "kornik = ogä" },
  { name: "Alastor", race: "Zwiastun Imperium", role: "Opiekun Vetory", initial: "A", text: "Wysłannik przydzielony do sprawowania pieczy nad Vetorą. Wcielenie Whitewood okazało się trudniejsze, niż przypuszczał — nikt w osadzie nie znał języka Imperium.", quote: "inyteratoor" },
  { name: "Aeliana", race: "Corvum", role: "Corvumka", initial: "Æ", text: "Krukowata z Whitewood. Jej imię zaczyna się od samogłoski — jeden z nielicznych wyjątków od reguł Birdfolka.", quote: "!aeliana! sal-ło: gali galsen." , pending: true },
  { name: "Jack Leothern", race: "Vulpin", role: "Mnich Otwartej Dłoni", initial: "J", text: "Lis rudy z rodu Leothernów, wychowany w norze-bibliotece. Wędrowny mediator, tancerz i bajkopisarz z kalimbą. Wyruszył, by zdobyć wiedzę potrzebną do wprowadzenia harmonii w rodzinnej wiosce.", quote: "!jack! durtan-in !leothern!" }
];

/* ---------- ETOS LEOTHERNÓW ---------- */
WW.ethos = [
  "pomoc nie daje prawa do kontroli",
  "wiedza nie jest towarem, dopóki ktoś jej potrzebuje",
  "schronienie traci sens, gdy staje się narzędziem wpływu",
  "im mniej mówisz o swoim znaczeniu, tym dłużej ono trwa"
];

/* ---------- JĘZYK: słownik (słowo, znaczenie, kategoria, etymologia) ---------- */
WW.dict = [
  // zaimki
  ["na","ja","zaimki",""],["ti","ty","zaimki",""],["sa","on / ona / ono","zaimki","neutralne"],
  ["nati","my (ty i ja)","zaimki","inkluzywne"],["naor","my (bez ciebie)","zaimki","ekskluzywne"],
  ["tior","wy","zaimki",""],["saor","oni / one","zaimki",""],
  // kręgi i instytucje
  ["kor","krąg","instytucje",""],["sekor","pierwszy krąg — rdzenni","instytucje",""],
  ["tekor","drugi krąg — przyjęci w próbie","instytucje",""],["kakor","poza kręgiem","instytucje",""],
  ["ogä","Ogä — instytucja i osoba sędziego","instytucje","rdzeń Loxodon"],
  ["kören","wspólnota","instytucje","kor + -en"],["kösal","Rada","instytucje","krąg + mówić"],
  ["donat","poręczyciel","instytucje","dawać + wykonawca"],["donha","poręczenie (akt)","instytucje","skamieniała fuzja"],
  ["tekan","próba (okres)","instytucje","wspólne + tamten"],["kakat","obcy","instytucje","poza kręgiem + wykonawca"],
  ["gorat","świadek","instytucje","widzieć + wykonawca"],["ögsal","rozstrzygnięcie","instytucje","ogä + mówić"],
  ["lanka","zasada","instytucje","wiedzieć + dokonane"],["durol","korzeń (proces)","instytucje","trwać + miejsce"],
  // miejsca
  ["Sekoraz","Whitewood","miejsca","„miejsce pierwszego kręgu”"],["Drengaz","Brzozowy Dąb","miejsca","„miejsce wielkiego drzewa”"],
  ["Drenkana","Stary Las (elficki)","miejsca","„Las z dawnych czasów”"],["Silgakana","Morze Północne","miejsca","„wielka woda dawna”"],
  // czasowniki
  ["es","być","czasowniki",""],["dur","żyć","czasowniki",""],["lan","wiedzieć","czasowniki",""],
  ["gor","widzieć","czasowniki",""],["tek","słyszeć","czasowniki",""],["leh","słuchać","czasowniki",""],
  ["sal","mówić","czasowniki",""],["kir","iść","czasowniki",""],["don","dawać","czasowniki",""],
  ["tar","brać","czasowniki",""],["kat","robić","czasowniki",""],["nor","chcieć","czasowniki",""],
  ["sun","czuć","czasowniki",""],["lak","łowić","czasowniki","wkład wodnych"],["dak","kuć","czasowniki","wkład Mapach"],
  // natura
  ["tan","dom / miejsce","natura",""],["sil","woda","natura","wkład wodnych"],["ras","ogień","natura","wkład Drapieżnych"],
  ["dol","ziemia","natura","wkład Loxodon/Ursine"],["hen","powietrze","natura",""],["gal","dzień","natura","wkład Gallus"],
  ["strig","noc","natura","od nazwy rasy Sów"],["rasor","słońce","natura","„wielki ognisty”"],["silor","księżyc","natura","„wielki wodny”"],
  ["trin","gwiazda","natura",""],["dren","drzewo","natura","wkład Cervan"],["silan","brzoza","natura","„wodne drzewo”"],
  ["karen","dąb","natura","„trwałe”"],["aelan","drzewo święte","natura","zapożyczenie elfickie"],
  ["drenol","las","natura","„miejsce drzew”"],["kakren","granica lasu elfickiego","natura","„drzewa poza kręgiem”"],
  ["silkir","rzeka","natura","„woda idąca”"],["dolsilga","bagno","natura","„wielka ziemia-woda”"],
  ["silsen","źródło","natura","„woda tu się rodzi”"],["silkor","wir","natura","„wodny krąg”"],
  ["silhen","mgła","natura",""],["henga","burza","natura",""],["silun-drenol","cisza lasu","natura","„spokój lasu”"],
  ["lurn","głębina","natura","recesywne słowo wydr"],["olon","spokojny odcinek rzeki","natura","recesywne słowo wydr"],
  // rodzina
  ["donor","rodzic","rodzina","„ten, który dał”"],["donsu","dziecko","rodzina","„to, dla czego się dawało”"],
  ["kotan","rodzeństwo","rodzina","„ci z tego samego domu”"],["durtan","ród","rodzina","„trwały dom”"],
  ["kanat","przodek","rodzina",""],["norat","przyjaciel","rodzina","„ten, którego chce się przy sobie”"],
  ["norel","ukochany","rodzina","sufiks dworski Vulpin"],["korat","sojusznik","rodzina",""],["lark","wróg","rodzina",""],
  // emocje
  ["gali","radość","emocje","gal + -i"],["strigi","smutek","emocje",""],["rasun","gniew","emocje","„ognista emocja”"],
  ["silun","spokój","emocje","„płynąca emocja”"],["karak","strach","emocje",""],["durhen","odwaga","emocje","„życie w pełnym oddechu”"],
  ["nork","wstyd","emocje","Lupin"],["norha","nadzieja","emocje","„chcieć ku przyszłości”"],
  ["norgor","ciekawość","emocje","„chcieć widzieć”"],["kosun","dziękuję / współczuję","emocje","„wspólne czucie”"],
  ["kanorel","tęsknota","emocje","„miłość z dawnych czasów”"],["gorel","fascynacja","emocje",""],
  // czas
  ["karkor","rok cykliczny","czas","„cztery kręgi” (Ursine)"],["durin","pokolenie","czas","„życie zakorzenione” (Tortle)"],
  ["galha","świt","czas",""],["galsen","poranek","czas",""],["galło","zmierzch","czas",""],["strigha","wieczór","czas",""],
  ["drenha","wiosna","czas","„drzewa nadchodzą”"],["rasgal","lato","czas","„ognisty dzień”"],
  ["drenło","jesień","czas","„drzewa, które były”"],["silstrig","zima","czas","„wodna noc”"],
  ["silorga","pełnia","czas",""],["silorko","nów","czas",""],
  // rzemiosło i handel
  ["dakur","młot","rzemiosło",""],["katat","rzemieślnik","rzemiosło",""],["karor","metal","rzemiosło",""],
  ["gali-katga","arcydzieło","rzemiosło","„wielkie radosne robienie”"],["strigi-katga","partactwo","rzemiosło","„wielkie smutne robienie”"],
  ["dontar","handel","rzemiosło","„dawać-brać”"],["karorko","moneta","rzemiosło","„mały metal”"],
  ["don-strigi","łapówka","rzemiosło","„smutne dawanie”"],["dakur-ko","„tak zwany młot”","rzemiosło","ironia Mapach"],
  // formuły
  ["kosen","witam","formuły","„wspólnie tutaj”"],["kosen kor-su","witam w kręgu","formuły","ceremonialne"],
  ["gali galsen","dzień dobry","formuły","„radości poranka”"],["silun strig","dobranoc","formuły","„spokoju nocy”"],
  ["kanagor","do zobaczenia","formuły","„kiedyś zobaczę”"],["durha ti","żegnaj","formuły","„trwaj ku przyszłości”"],
  ["silun kira-te","powodzenia","formuły","„spokoju przez drogę”"],["norha ti","proszę","formuły",""],
  ["nork nain","przepraszam","formuły","„wstyd mój”"],["na lan","rozumiem","formuły","„ja wiem”"],
  ["gor!","uważaj!","formuły","rozkaz"],["kosu!","pomocy!","formuły","rozkaz"],["ne-kir!","stop!","formuły","rozkaz"],
  // imperium
  ["inyteratoor","imperator (wymowa ptasia)","imperium","zapożyczenie"],["łyspólny","Wspólny (język)","imperium",""],
  ["larkkat","żołnierz","imperium","„robiący wroga”"],["gorat-ir","straż","imperium","„świadkowie”"],
  ["ne-kören","Imperium (pejoratywnie)","imperium","„nie-wspólnota”"],["sekorat","obywatel","imperium","słowo bojkotu"]
];

WW.dictCats = {
  "wszystko": "Wszystko", "formuły": "Formuły", "instytucje": "Instytucje", "miejsca": "Miejsca",
  "natura": "Natura", "czas": "Czas", "emocje": "Emocje", "rodzina": "Rodzina",
  "czasowniki": "Czasowniki", "rzemiosło": "Rzemiosło", "zaimki": "Zaimki", "imperium": "Imperium"
};

/* ---------- JĘZYK: demonstracja ruchomego „!” ---------- */
WW.emphasis = [
  { html: "vulpin <b>!jack!</b> tam poszedł", gloss: "Nacisk na osobę — to właśnie Jack, nikt inny." },
  { html: "vulpin !jack! <b>!tam</b> poszedł", gloss: "Nacisk na miejsce — poszedł właśnie tam." },
  { html: "vulpin !jack! tam <b>!poszedł</b>", gloss: "Nacisk na czynność — poszedł, nie pobiegł, nie został." },
  { html: "<b>?</b>!jack! tam poszedł", gloss: "Czy to Jack tam poszedł? — pytanie o osobę." },
  { html: "!jack! <b>?tam</b> poszedł", gloss: "Czy Jack poszedł właśnie tam? — pytanie o miejsce." }
];
