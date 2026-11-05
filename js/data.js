/* =========================================================
   WHITEWOOD — dane świata
   Miejsca i słownik są w katalogu lore/ (patrz README).
   Tu: kronika, kodeks, ludy, bestiariusz, postacie, etos.
   Źródła: Google Docs „Whitewood”, „birdfolk_architektura_v2”,
   „Jack - Vulpin” (projekt D&D Krąg Cieni).
   ========================================================= */

window.WW = {};

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
    text: "Im bliżej Lasu, tym bogatsze złoża — i tym więcej wypadków, których nie dało się wyjaśnić. Zaczęto mówić, że Las tego nie pożąda. Whitewood wybrało handel z elfami zamiast eskalacji. Porzucone szyby zasiedlili Vulpini, wśród nich ród Thorlenów."
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
  { name: "Szlam Przemieńcowy", tier: "Dusza w wodzie", danger: true, text: "Nieco inny niż zwykłe i kaustyczne. Wierzy się, że to dusze tych, którzy przed Powodzią poszli na bagna i nie wrócili, albo tych, których po Powodzi zebrała woda. Póki mu nie przeszkadzasz, nie zaatakuje — dopóki nie dojdzie tam, dokąd zmierza." },
  { name: "Odprawienie", tier: "Obyczaj Whitewood", rite: true, text: "Przemieńcowego nie zabija się od razu. Pozwala mu się dojść tam, dokąd zmierza, by dusza zaznała ukojenia. Dopiero wtedy uznaje się go za potwora, którego trzeba zniszczyć. Nic z tego nie jest pewne — ale Szlamy zachowują się dokładnie tak, jakby to była prawda." },
  { name: "Istoty Wody", tier: "Po Powodzi", text: "Zwierzęta nurtu, drapieżne ryby skokowe, wodne szczury wzburzające wodę. Delta dała im nowy dom — i nowe tereny łowieckie." },
  { name: "Bestie", tier: "Po Powodzi", text: "Nie zniknęły — zmieniły się. Bardziej terytorialne, mniej przewidywalne, czasem uznające zabudowę za część środowiska. Whitewood nauczyło się je czytać, nie eksterminować." },
  { name: "Rusałka · Strażnik · Źródło", tier: "Byt nieokreślony", mystery: true, text: "Trzy imiona dla jednego — albo dla trzech. Jego natury nigdy nie rozstrzygnięto. Każde imię mówi więcej o tym, kto je wypowiada, niż o tym, co nazywa." }
];

/* ---------- POSTACIE ---------- */
WW.characters = [
  { name: "Oga Kornik", race: "Loxodon", role: "Ogä — przywódca Whitewood", initial: "K", text: "Stary Loxodon, który wiedzie i zakorzenia. „Kornik” to przydomek, nie rasa — ktoś, kto nie burzy struktury, lecz drąży ją i wzmacnia od środka. Próbuje utrzymać równowagę między zwolennikami Imperium a strażnikami dawnego porządku.", quote: "kornik = ogä" },
  { name: "Alastor", race: "Zwiastun Imperium", role: "Opiekun Vetory", initial: "A", text: "Wysłannik przydzielony do sprawowania pieczy nad Vetorą. Wcielenie Whitewood okazało się trudniejsze, niż przypuszczał — nikt w osadzie nie znał języka Imperium.", quote: "inyteratoor" },
  { name: "Aeliana", race: "Corvum", role: "Kruczyca, muzyczka", initial: "Æ", text: "Krukowata z Whitewood, z którą Jack grał w duecie. Jej imię zaczyna się od samogłoski — jeden z nielicznych wyjątków od reguł Birdfolka.", quote: "!aeliana! sal-ło: gali galsen." },
  { name: "Jack", race: "Vulpin", role: "Mnich Otwartej Dłoni", initial: "J", text: "Lis rudy, wychowany w norze-bibliotece rodu. Wędrowny mediator, tancerz i bajkopisarz z kalimbą. Wyruszył, by zdobyć wiedzę potrzebną do wprowadzenia harmonii w rodzinnej wiosce.", quote: "!jack! — imię potoczne" }
];

/* ---------- ETOS THORLENÓW ---------- */
WW.ethos = [
  "pomoc nie daje prawa do kontroli",
  "wiedza nie jest towarem, dopóki ktoś jej potrzebuje",
  "schronienie traci sens, gdy staje się narzędziem wpływu",
  "im mniej mówisz o swoim znaczeniu, tym dłużej ono trwa"
];

/* ---------- JĘZYK: demonstracja ruchomego „!” ---------- */
WW.emphasis = [
  { html: "vulpin <b>!jack!</b> tam poszedł", gloss: "Nacisk na osobę — to właśnie Jack, nikt inny." },
  { html: "vulpin !jack! <b>!tam</b> poszedł", gloss: "Nacisk na miejsce — poszedł właśnie tam." },
  { html: "vulpin !jack! tam <b>!poszedł</b>", gloss: "Nacisk na czynność — poszedł, nie pobiegł, nie został." },
  { html: "<b>?</b>!jack! tam poszedł", gloss: "Czy to Jack tam poszedł? — pytanie o osobę." },
  { html: "!jack! <b>?tam</b> poszedł", gloss: "Czy Jack poszedł właśnie tam? — pytanie o miejsce." }
];
