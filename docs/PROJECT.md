# Projekt: AL LEŠENÍ, spol. s r.o.

## Zadání a zdroje
- Cíl: nový klientský web jako samostatná kopie skutečného kódu CCNplus/ccn-web-template, s konfigurací obsahu v `sites/*.json`, moduly ze `src/modules/` a nasazením `dist` na Cloudflare. V iteraci 1 se zpracovává pouze zadání a struktura.
- Hlavní účel: srozumitelně představit pronájem a montáž lešení i zemní práce a dovést zájemce k telefonickému či e-mailovému kontaktu; poptávkový formulář je záměr do dalších iterací. Pravděpodobní návštěvníci: stavební firmy, správci objektů a soukromí stavebníci; jde o návrhový předpoklad, nikoli potvrzený marketingový brief.
- Zdrojová šablona: [CCNplus/ccn-web-template](https://github.com/CCNplus/ccn-web-template), větev `main`, commit `680b459c32b09ffd9cff88324e42560e869ac522` (ověřen přístup k obsahu, přečteny `AGENTS.md`, `IMPLEMENTATION.md`, `docs/MODULES.md` a vzor `sites/milacek.json`).
- Klientský repozitář: [CCNplus/al-leseni](https://github.com/CCNplus/al-leseni), soukromý, před iterací 1 prázdný. Kopie: [sebrlicek-team/al-leseni](https://github.com/sebrlicek-team/al-leseni), veřejná, před přenosem prázdná. Kód šablony byl zkopírován do obou repozitářů. Inicializační výstupy pro slug `al-leseni` odpovídají jednorázovému setupu podle `scripts/setup-project.mjs`; ukázková sestava `milacek` zatím zůstává provizorním základem. Připravené: `project.json`, aktivní `sites/al-leseni.json`, konfigurace Workeru `al-leseni`.
- Starý web: [www.al-leseni.cz](https://www.al-leseni.cz/) a jeho stránky [fasádní lešení](https://www.al-leseni.cz/fasadni-leseni.htm), [pojízdné lešení](https://www.al-leseni.cz/pojizdne-leseni-alufix.htm), [zemní práce](https://www.al-leseni.cz/zemni-prace-hradec-kralove-bagr-pardubice-rypadlo-trebechovice-vykopy-holice-nakladac-rychnov.htm), [lešení na mostech](https://www.al-leseni.cz/fotogalerie-leseni-na-mostech.htm), [lešení na budovách](https://www.al-leseni.cz/fotogalerie-leseni-na-budovach.htm), [spolupráce](https://www.al-leseni.cz/spolupracujeme.htm), [kontakt](https://www.al-leseni.cz/kontakt.htm). Informace ze starého webu jsou podklad k ověření aktuálnosti, nikoli automaticky schválený finální obsah.
- Dodané soubory: `al_leseni_logo_final.png` (1505 × 716, RGBA, bílé logo na transparentním pozadí) a `video_banner_al_leseni.mp4` (H.264/AAC, 1280 × 720, 25,83 s, 29 954 725 B ≈ 28,6 MiB). Záběr videa ukazuje konstrukci lešení na mostě nad vodou. Zdroj: uživatelem přiložené soubory.
- Pracovní adresa: `https://al-leseni.ccn-dev.cz`. Finální doména není výslovně určena; starý web je na `www.al-leseni.cz`, převzetí této domény musí být potvrzeno.
- Provozní a fakturační adresa jsou na starém webu odlišné; před zveřejněním znovu ověřit. Tam uvedené kontakty: `info@al-leseni.cz`, fasádní lešení `+420 603 450 693`, pojízdné lešení a fakturace `+420 495 535 313` a `+420 605 212 831`.

## Struktura a zvolený vzhled
Návrh stránek, cest a pořadí sekcí (zatím neschválený):

| Stránka | Navržená cesta | Sekce v pořadí a stávající moduly |
|---|---|---|
| Úvod | `/` | `hero` s dodaným videem a hlavní akcí „Poptat lešení“ → `cards` tří oblastí nabídky → `split` o firmě → `gallery` výběru realizací → `cta` → `contact` se základními kontakty |
| Fasádní lešení | `/fasadni-leseni/` | `hero` → `split` popis pronájmu a montáže → `cards` vybavení a způsobů řešení → `gallery` ukázek → `cta` na poptávku; orientační ceny ze starého webu až po potvrzení |
| Pojízdné lešení ALUFIX | `/pojizdne-leseni/` | `hero` → `cards` ALUFIX 5000/6000 (a případně 80) → `specs` rozměrů → `downloads` certifikátů a návodů → `cta`; rozsáhlý ceník vyžaduje rozhodnutí o aktuálnosti a vhodném zobrazení |
| Zemní práce | `/zemni-prace/` | `hero` → `split` stroj MECALAC 9MWR → `cards` činností → `gallery` stroje/prací → `cta` a oborový kontakt |
| Realizace | `/realizace/` | `hero` → `cards` dvou kategorií, odkazující na oddělené stránky mostů a budov → `cta` |
| Mosty | `/realizace/mosty/` | `hero` → `gallery` fotografií mostních konstrukcí s doloženými popisky → `cta` |\n| Budovy | `/realizace/budovy/` | `hero` → `gallery` fotografií lešení na budovách s doloženými popisky → `cta` |\n| Spolupracujeme | `/spolupracujeme/` | `hero` → `partners` skutečně potvrzených partnerů → `cta` |
| Kontakt | `/kontakt/` | `hero` → `contact` s oddělením fasádního a pojízdného lešení → `location` provozovny a případné mapy; formulář nejvýše v režimu `demo` bez odesílání |

- Navigace: Úvod, Fasádní lešení, Pojízdné lešení, Zemní práce, Realizace (Mosty / Budovy), Kontakt. „Spolupracujeme“ v patičce. Rozdělení mostů a budov zadavatel výslovně potvrdil.
- Každá stránka dostane jediný `hero`, unikátní cestu a vlastní metadata. Staré `.htm` adresy bude nutné při případném ostrém nahrazení webu přesměrovat na nové cesty; konkrétní mapu ověřit v pozdější iteraci.
- Vizuální směr je otevřený. Bílé horizontální logo vyžaduje tmavé nebo dostatečně kontrastní umístění; barvy, typografie a přesná kompozice hero jsou věcí iterace 2. Video použít přes existující `hero.media` s vlastním posterem pro načítání a omezený pohyb.
- Potřebná média: dodané logo a video, poster videa, schválené fotografie fasádních a pojízdných konstrukcí, mostů, budov a zemních prací, případné certifikáty/návody. Původní fotografie a dokumenty nejprve ověřit z hlediska použití a aktuálnosti. Video překračuje limit šablony 25 MiB na soubor, v iteraci 2 připravit optimalizovanou verzi a poster.
- Na starém webu jsou orientační ceny, tabulkový ceník a seznam projektů. Zatím se nepřejímají jako platné nabídky ani reference. Nové skutečnosti, recenze či certifikace se nevymýšlejí.

## Schválená rozhodnutí
- 2026-10-30, výslovné zadání: samostatná klientská kopie skutečné šablony; pouze iterace 1; pracovní subdoména `al-leseni.ccn-dev.cz`; dodané logo a video použít pro návrh/banner; systém modulů a `sites/*.json`; `dist` na Cloudflare; šablonu a jiné klienty neměnit.
- 2026-10-30, výslovné zadání: pracovní náhled bez indexace; formulář zatím bez odesílání e-mailů; ostré spuštění až později s vyřešeným formulářem a zapnutou, ověřenou indexací finální domény.
- 2026-10-30, následný pokyn: zadavatel ponechal podrobné řešení na nás, výslovně požadoval samostatné stránky mostů a budov a následnou kopii klientského repozitáře do `sebrlicek-team/al-leseni`. Struktura je tímto schválena v uvedeném rozsahu; konkrétní vzhled, obsah a ceny zůstávají otevřené.

## Aktuální iterace a hotová práce
- Iterace 1: prohlédnut skutečný repozitář šablony a dokumentace, starý web a dodaná média; připraven návrh struktury. Po schválení struktury byl na následný pokyn skutečný kód šablony přenesen do `CCNplus/al-leseni` a obsahově totožně do `sebrlicek-team/al-leseni`. Připraveny jsou `project.json`, `sites/al-leseni.json` (zatím ukázkový obsah, `indexable: false`, `form.mode: demo`) a `wrangler.jsonc` pro Worker `al-leseni`. Inicializační soubory odpovídají logice jednorázového setupu; příkaz setup nebyl přímo spuštěn. Dodaná média, skutečný klientský obsah a pracovní náhled dosud nejsou vytvořeny či nasazeny.
- Přenosový commit: `CCNplus/al-leseni` `0b41f532cecc73823d49bd57d074e404aae09641`, `sebrlicek-team/al-leseni` `0b51511bc8a66358b181c6bfeb7d0f56c525f079`. Git tree obou větví `main` po přenosu: `a3e8e046625c0aa504d0f8785abde86affd9f6db` (shodný). Náhled: zatím žádný.

## Chybějící podklady a otevřené otázky
- Struktura schválena; „Spolupracujeme“ zůstane v patičce, mosty a budovy mají samostatné stránky.
- Potvrdit finální doménu a strategii převodu starých adres — zadavatel; důležité pro spuštění a SEO.
- Ověřit platnost ceníků, rozměrů, certifikátů, seznamu partnerů, údajů o firmě a kontaktů ze starého webu — klient/zadavatel; bez potvrzení nezveřejňovat jako aktuální nabídku.
- Dodat nebo potvrdit právo k použití fotografií a dokumentů ze starého webu — klient/zadavatel; ovlivní galerii a stažení.
- Testovací příjemce formuláře a ostré příjemce — zadavatel později; pro nynější iteraci nejsou nutní. Nepřebírat automaticky `info@al-leseni.cz` jako příjemce centrální služby.
- Zvolit řešení dlouhého ceníku pojízdného lešení v existujících modulech; případný nový modul až po schválení rozsahu.
- Nastavení Cloudflare `Enable Preview builds` / `Builds for Preview branches` bude třeba při založení Workeru vypnout a ověřit, produkční buildy `main` zachovat.

## Ověření
- 2026-10-30: GitHub konektor potvrdil čtení soukromé šablony a právo zápisu do soukromého cílového repozitáře. Cílový repozitář před zápisem API označilo jako prázdný. Čteny `AGENTS.md`, `IMPLEMENTATION.md`, `docs/MODULES.md`, vzorové JSON a stav zdrojového commitu.
- Starý web prohlédnut na aktuálně dostupných stránkách; odkazy výše. Obsah nebyl ověřen u klienta.
- Lokální build, testy, prohlížeč, Cloudflare a živá adresa: dosud neprovedeno. Samotný přenos zdrojů není hotový klientský web.
- Formulář: návrh `demo`, žádné odesílání; testovací ani ostrý příjemce neurčen, doručení a Reply-To neověřeno.
- Indexace pracovní / finální adresy: zatím nic není nasazeno. Pro pracovní konfiguraci požadováno `indexable: false`; při výslovně zadaném ostrém spuštění skutečná HTTPS doména, `indexable: true` a kontrola `robots.txt`, `sitemap.xml`, canonical, meta robots a `X-Robots-Tag`. Pracovní adresa nesmí být další indexovatelnou kopií.

## Další krok
- Struktura byla upřesněna a schválena, kopie repozitáře dokončena. Další obsahová iterace připraví funkční úvodní stránku s optimalizovaným videem a lokální náhled. Zachovat `indexable: false` a formulář `demo`; po tomto kroku počkat na připomínky. 

## Aktualizace obsahu · 2026-10-30
- Na výslovný pokyn doplněny všechny existující podstránky, skutečné fotografie ze starého webu, nové dodané logo a optimalizované video (MP4 bez zvuku, přibližně 0,6 MiB) s posterem. Barevnost: tmavá zelenošedá, světlé pozadí a červený akcent. Fotogalerie mostů a budov jsou oddělené. Fotografie i popisky vycházejí ze starého webu AL LEŠENÍ.
- Obsah služeb a adres převzat z veřejných stránek starého webu dne 2026-10-30. Ceny, slevy, aktuální dostupnost, certifikace a dokumenty nejsou zveřejněny jako platné nabídky; vyžadují ověření klientem. Fotografie a jejich popisky z původní galerie je třeba před finálním spuštěním potvrdit u klienta.
- V aktivní konfiguraci je pracovní URL `https://al-leseni.seb-dev.cloud`, `indexable: false`. Kontaktní formulář je vynechán; telefon a e-mail fungují bez backendu. Provozní a fakturační adresy jsou jasně rozlišeny.
- Ověření: `npm test` (26/26), `npm run build:pages` (9 HTML stránek a lokální média); kontrola odkazů, souborů a metadat proběhla v buildu. Živá adresa, nastavení GitHub Pages a odezva domény vyžadují samostatnou kontrolu po zveřejnění.

## Úprava hlavičky a barev · 2026-10-30
- Na pokyn zadavatele je navigace a dodané bílé logo umístěné přímo přes banner místo samostatného tmavého pruhu. Stejné řešení je na úvodu i podstránkách; mobilní menu se otevírá jako samostatný kontrastní panel nad obrazem.
- Červený akcent nahradila žlutá `#e8bf36`. Na světlých plochách se pro drobný text používá tmavší zlatá a tlačítka mají tmavý popisek kvůli čitelnosti.
- Ověření: 26 testů a sestavení všech 9 stránek pro GitHub Pages; živou desktopovou a mobilní podobu ještě zkontrolovat po nasazení.
