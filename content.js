/* ============================================================
   PowerMatch Onboarding — Content Library
   ------------------------------------------------------------
   All trainee-facing copy in Danish. Slide content extracted
   from the PowerMatch decks; quiz Q&A pulled and polished
   from the legacy index.html. Explanations written fresh
   based on slide context.
   ============================================================ */

const CONTENT = {
  /* ---------------- TRACKS / ROLES ---------------- */
  tracks: {
    hr: {
      id: 'hr',
      label: 'HR / Screening',
      tagline: 'Du finder, screener og opretter kandidater.',
      modules: ['velkommen', 'branche', 'matches', 'screening']
    },
    salg: {
      id: 'salg',
      label: 'Salg',
      tagline: 'Du lukker virksomhederne.',
      modules: ['velkommen', 'branche', 'kt']
    },
    kundeservice: {
      id: 'kundeservice',
      label: 'Kundeservice',
      tagline: 'Du sikrer trivsel og driften efter ansættelsen.',
      modules: ['velkommen', 'branche', 'kontrakt']
    },
    csm: {
      id: 'csm',
      label: 'Candidate Success Manager',
      tagline: 'Du følger op på kandidaterne efter de er kommet i job.',
      modules: ['velkommen', 'branche', 'kontrakt']
    }
  },

  /* ---------------- MODULES ---------------- */
  modules: {

    /* =============================================
       MODUL 1 — Velkommen til PowerMatch
       ============================================= */
    velkommen: {
      id: 'velkommen',
      track: 'shared',
      order: 1,
      title: 'Velkommen til PowerMatch',
      subtitle: 'Hvad PowerMatch er, og hvorfor vi eksisterer',
      duration: '15 min',
      slides: [
        {
          kind: 'cover',
          eyebrow: 'Modul 1',
          title: 'Velkommen til PowerMatch',
          body: 'I dag lærer du, hvad PowerMatch er, og hvorfor vi eksisterer.'
        },
        {
          kind: 'agenda',
          title: 'Hvad vi skal igennem',
          items: [
            'Hvad er PowerMatch',
            'Teamet bag PowerMatch',
            'Vision og mission',
            'Jeres rolle'
          ]
        },
        {
          kind: 'three-up',
          title: 'Hvorfor PowerMatch findes',
          items: [
            { icon: 'fist', text: 'Håndværkere har manglet nogen på deres side.' },
            { icon: 'handshake', text: 'Vi giver dem frihed, tryghed og ejerskab.' },
            { icon: 'rocket', text: 'Virksomheder slipper for alt det manuelle arbejde.' }
          ]
        },
        {
          kind: 'feature-grid',
          title: 'Hvad er PowerMatch?',
          items: [
            { tag: 'PLATFORM', text: 'PowerMatch er en platform — ikke et rekrutteringsbureau.' },
            { tag: 'FOKUS', text: 'Vi arbejder kun med håndværkere.' },
            { tag: 'AUTOMATIK', text: 'Vi forbinder håndværkere og virksomheder automatisk.' }
          ]
        },
        {
          kind: 'split',
          title: 'Alt styres af proces og data',
          left: { tone: 'yellow', title: 'PowerMatch er drevet af god data' },
          right: { tone: 'soft', title: 'Jo bedre vi arbejder i HR, desto bedre bliver hele systemet.' }
        },
        {
          kind: 'people',
          title: 'Folkene bag',
          people: [
            {
              name: 'Las Sabir',
              bullets: [
                'Bygget virksomheder siden gymnasiet.',
                '3x succesfulde exits på tidligere virksomheder.',
                'Bygget rekrutteringsløsninger som ekstern konsulent.',
                'Så hul i markedet: ingen hjalp håndværkere ordentligt.',
                'Fokus: Struktur, effektivitet.'
              ]
            },
            {
              name: 'Sebastian',
              bullets: [
                'Baggrund i salg og forretningsudvikling.',
                'Vækstet salg fra 0 til 100 mio.',
                'Manglede mening — ville skabe reel værdi.',
                'Fokus: strategi, ledelse, vækst.'
              ]
            }
          ]
        },
        {
          kind: 'three-up',
          title: 'Fra soveværelse — historien',
          items: [
            { icon: 'screen', text: 'Alt startede manuelt: kald, CV’er, match, opfølgning.' },
            { icon: 'bulb', text: 'Hver fejl blev en læring: "Hvordan kan vi automatisere næste gang?"' },
            { icon: 'team', text: 'Las byggede produktet — Sebastian byggede salget.' }
          ]
        },
        {
          kind: 'three-up',
          title: 'Fra manuel drift til automatisering',
          items: [
            { icon: 'doc', text: '1.000+ dokumenter med idéer og læring.' },
            { icon: 'puzzle', text: 'Idé → udvikling → test.' },
            { icon: 'rocket', text: 'Alt manuelt arbejde blev grundlaget for automatisering.' }
          ]
        },
        {
          kind: 'split',
          title: 'PowerMatch i dag',
          left: { tone: 'soft', title: 'Dansk team', body: 'HR, salg og kundeservice.' },
          right: { tone: 'soft', title: 'Udviklingsteam i Lahore', body: 'Udviklere, testere og designere.' }
        },
        {
          kind: 'statement',
          text: 'Vi er en platform, ikke et rekrutteringsbureau.'
        },
        {
          kind: 'numbered',
          title: 'Forretningsmodellen',
          items: [
            'Virksomheder betaler kun, når kandidaten starter.',
            'Kandidaten ansat hos PowerMatch i opstartsperiode.',
            'Vi dækker løn, pension, feriepenge og arbejdstøj.',
            'Efter 518 timer → fri fastansættelse.'
          ]
        },
        {
          kind: 'pains-vs-pros',
          title: 'Kunderne',
          left: {
            title: 'Hvem er kunderne?',
            items: [
              'Små mestre — vokser via PowerMatch.',
              'Store virksomheder — vælger os for kvalitet og tid.'
            ]
          },
          right: {
            title: 'Hvad får de?',
            items: ['Ubegrænset jobs', 'Ubegrænset kandidater', 'Ubegrænset jobsamtaler']
          }
        },
        {
          kind: 'icons-row',
          title: 'Kandidaterne',
          subtitle: 'Faglærte håndværkere',
          items: ['Tømrer', 'Murer', 'Elektriker', 'VVS', 'Maler']
        },
        {
          kind: 'two-up',
          title: 'Det perfekte match',
          eyebrow: 'Kortsigtet mål',
          items: [
            'Gennem PowerMatch er kandidater og virksomheder sikret det helt rette match.',
            'Udvikling af platformen i samarbejde med jer.'
          ]
        },
        {
          kind: 'two-up',
          title: 'Vi vil ændre branchen — for altid',
          eyebrow: 'Langsigtet mål',
          items: [
            'Vi vil ændre måden håndværkere får arbejde på.',
            'PowerMatch skal give håndværkere ejerskab over deres liv.'
          ]
        },
        {
          kind: 'org',
          title: 'Organisationen',
          roles: [
            { label: 'HR / Screening', desc: 'finder, screener og opretter kandidater.' },
            { label: 'Salg', desc: 'lukker virksomheder.' },
            { label: 'Kundeservice', desc: 'sikrer trivsel.' },
            { label: 'Administration', desc: 'håndterer drift og løn.' }
          ]
        },
        {
          kind: 'dna',
          title: 'Vores DNA',
          values: [
            'Alle har en stemme.',
            'Direkte adgang til ledelsen.',
            'Kvalitet først.',
            'Ejerskab og tempo.',
            'Team over ego.',
            'Solutions, not excuses.'
          ]
        }
      ],
      questions: [
        {
          id: 'v1',
          q: 'Hvad er PowerMatch — kort fortalt?',
          options: [
            'Et traditionelt rekrutteringsbureau med fokus på håndværkere.',
            'En platform der automatisk forbinder håndværkere og virksomheder.',
            'En vikarbureau-app for kontoransatte.'
          ],
          correct: 1,
          explanation: 'PowerMatch er en platform — ikke et rekrutteringsbureau. Vi forbinder håndværkere og virksomheder automatisk gennem data og proces.'
        },
        {
          id: 'v2',
          q: 'Hvornår betaler virksomheden?',
          options: [
            'Når de opretter et job.',
            'Når kandidaten har været ansat i 6 måneder.',
            'Først når kandidaten starter.'
          ],
          correct: 2,
          explanation: 'Virksomheder betaler kun, når kandidaten starter. Det fjerner risikoen for kunden, og presser os til at levere reelle matches.'
        },
        {
          id: 'v3',
          q: 'Hvor mange timer skal kandidaten arbejde, før de overgår til fri fastansættelse?',
          options: ['260 timer', '518 timer', '1.040 timer'],
          correct: 1,
          explanation: 'Efter 518 timer overgår kandidaten til fri fastansættelse hos virksomheden. I opstartsperioden er kandidaten ansat hos PowerMatch.'
        },
        {
          id: 'v4',
          q: 'Hvad dækker PowerMatch i opstartsperioden?',
          options: [
            'Kun løn.',
            'Løn, pension, feriepenge og arbejdstøj.',
            'Kun arbejdstøj og værktøj.'
          ],
          correct: 1,
          explanation: 'I opstartsperioden er kandidaten ansat hos os, og vi dækker løn, pension, feriepenge og arbejdstøj.'
        },
        {
          id: 'v5',
          q: 'Hvilke fag arbejder PowerMatch primært med?',
          options: [
            'Alle typer kontoransatte.',
            'Kun elektrikere og VVS\'ere.',
            'Tømrer, murer, elektriker, VVS og maler.'
          ],
          correct: 2,
          explanation: 'Vi fokuserer på de fem mest efterspurgte håndværksfag i Danmark: tømrer, murer, elektriker, VVS og maler.'
        },
        {
          id: 'v6',
          q: 'Hvad er det langsigtede mål?',
          options: [
            'At blive Danmarks største vikarbureau.',
            'At ændre måden håndværkere får arbejde på, og give dem ejerskab over deres liv.',
            'At ekspandere til kontorpersonale i hele Norden.'
          ],
          correct: 1,
          explanation: 'Vores langsigtede mål er at ændre branchen for altid — håndværkere skal have ejerskab over deres liv og arbejde.'
        }
      ],
      reflections: [
        { id: 'r1', prompt: 'Hvad overraskede dig mest ved PowerMatch indtil videre?' },
        { id: 'r2', prompt: 'Hvad tror du gør PowerMatch anderledes end konkurrenterne?' },
        { id: 'r3', prompt: 'Hvordan kan du bidrage til visionen i din rolle?' }
      ]
    },

    /* =============================================
       MODUL 2 — Introduktion til byggebranchen
       ============================================= */
    branche: {
      id: 'branche',
      track: 'shared',
      order: 2,
      title: 'Introduktion til byggebranchen',
      subtitle: 'Mød håndværkerne, fagene og overenskomsterne',
      duration: '15 min',
      slides: [
        {
          kind: 'cover',
          eyebrow: 'Modul 2',
          title: 'Introduktion til byggebranchen',
          body: 'En af Danmarks største og mest stabile brancher. Byggeriet dækker alt — fra små serviceopgaver til kæmpe industriprojekter.'
        },
        {
          kind: 'bullets',
          title: 'Generelt om håndværkere',
          items: [
            'De hader tom snak og "HR-sprog".',
            'Meget direkte og ærlig kultur.',
            'Respekt for faglighed og erfaring.',
            'Hurtige beslutninger, korte ansættelsesprocesser.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Fagene vi arbejder med',
          items: [
            'Vi arbejder med de største og mest efterspurgte håndværksfag i Danmark.',
            'Fagene arbejder meget sammen på kryds og tværs.',
            'Tømrer, murer, elektriker, VVS-montør, bygningsmaler.'
          ]
        },
        {
          kind: 'profile',
          title: 'Tømrer',
          icon: 'hammer',
          profile: 'Meget jordnære, normale typer.',
          tasks: ['Enterprise', 'Døre, vinduer', 'Nybyg, renovering, tag', 'Spjæld og service'],
          notes: ['Projekter og opgaver varierer meget — laver ofte det hele.', 'Meget samarbejde.']
        },
        {
          kind: 'profile',
          title: 'Murer',
          icon: 'brick',
          profile: 'Klassisk håndværkertype — direkte, hurtige, ærlige.',
          tasks: ['Fliser, klinker', 'Service og spjæld', 'Nybyg og renovering'],
          notes: ['Har fart på.', 'Reagerer godt på respekt og lige snak — ikke HR-sprog.', 'Kan være meget blandet i opgaver.']
        },
        {
          kind: 'profile',
          title: 'Elektriker',
          icon: 'bulb',
          profile: 'Nørderne i branchen. Meget tekniske.',
          tasks: ['Større byggepladser, hiver ledninger', 'Service og spjæld — mindre opgaver (fx en lampe)'],
          notes: ['Ofte tekniske og strukturerede — skal have styr på det hele.', 'Tænker før de handler — mere rolige end de andre fag.']
        },
        {
          kind: 'profile',
          title: 'Bygningsmaler',
          icon: 'roller',
          profile: 'Meget snakkesalige typer.',
          tasks: ['Store byggerier — bygninger, huse, lejligheder', 'Service og spjæld — mindre opgaver'],
          notes: ['Nemmeste uddannelse af de fem fag vi arbejder med.', 'Sidste led i processen, når man bygger eller renoverer.']
        },
        {
          kind: 'profile',
          title: 'VVS-montør',
          icon: 'pipe',
          profile: 'Problemløsere.',
          tasks: ['Store byggepladser / entrepriser', 'Service og spjæld'],
          notes: ['Sværeste fag at få fat i de gode profiler.']
        },
        {
          kind: 'numbered',
          title: 'Overenskomster',
          items: [
            'Det er røv kedeligt det her — men stadig nice to know.',
            'Håndværkere = overenskomst.',
            'Vi følger altid overenskomst.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Hovedaktørerne på arbejdsmarkedet',
          items: [
            '3F → tømrer, murer, bygningsmaler.',
            'Dansk Industri / Dansk Byggeri → arbejdsgiverside for byg.',
            'TekniQ → Elektrikeroverenskomsten & Blik og Rør-overenskomsten.',
            'El-Forbundet → Elektrikernes fagforening.',
            'Blik & Rør → VVS-fagforening.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Typiske overenskomster i PowerMatch-fagene',
          items: [
            'Tømrer/snedker = Bygningsoverenskomsten.',
            'Murer = Murer- og Murerarbejdsmandsoverenskomsten.',
            'Maler = Maleroverenskomsten.',
            'Elektriker = Elektrikeroverenskomsten.',
            'VVS = Metal- og Blik- og Røroverenskomsten.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Hvad dækker overenskomsterne typisk?',
          items: [
            'SH / særlig lønopsparing.',
            'Pension.',
            'Overarbejde.',
            'Sygepenge og sikkerhed.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Opsigelsesvarsler i håndværkerbranchen',
          items: [
            'Kort opsigelsesvarsel — typisk 2–3 dage.',
            'Speed is king: en god kandidat kan forsvinde på få dage.'
          ]
        },
        {
          kind: 'split',
          title: 'For jer som screener',
          left: { tone: 'soft', title: '1', body: 'SH, pension og overarbejde er vigtigt for dem.' },
          right: { tone: 'soft', title: '2', body: 'Utilfredshed med lønforhold = ofte årsag til jobskifte.' },
          footer: 'Speed is really king.'
        },
        {
          kind: 'two-up',
          title: 'De vigtigste punkter om branchen',
          items: [
            'Speed is really, really king.',
            'Kvalitet is also king.'
          ]
        }
      ],
      questions: [
        {
          id: 'b1',
          q: 'Hvad er én af de vigtigste ting at huske, når man taler med håndværkere?',
          options: [
            'Brug professionelt HR-sprog og lange forklaringer.',
            'Vær direkte og ærlig — undgå tom snak og HR-sprog.',
            'Tal udelukkende om løn — alt andet er ligegyldigt.'
          ],
          correct: 1,
          explanation: 'Håndværkere hader tom snak og HR-sprog. De værdsætter direkte, ærlig kommunikation og respekt for deres faglighed.'
        },
        {
          id: 'b2',
          q: 'Hvilke fem fag arbejder PowerMatch primært med?',
          options: [
            'Tømrer, murer, elektriker, VVS-montør, bygningsmaler.',
            'Smed, mekaniker, snedker, glarmester, klejnsmed.',
            'Kun elektriker og VVS-montør.'
          ],
          correct: 0,
          explanation: 'Vi arbejder med de fem mest efterspurgte håndværksfag i Danmark: tømrer, murer, elektriker, VVS-montør og bygningsmaler.'
        },
        {
          id: 'b3',
          q: 'Hvad er typisk opsigelsesvarsel i håndværkerbranchen?',
          options: [
            '3 måneder — som de fleste andre brancher.',
            '14 dage.',
            'Typisk 2–3 dage.'
          ],
          correct: 2,
          explanation: 'Opsigelsesvarslet er kort i håndværkerbranchen — typisk 2–3 dage. Det betyder at en god kandidat kan forsvinde på få dage. Speed is king.'
        },
        {
          id: 'b4',
          q: 'Hvilken fagforening dækker tømrere, murere og bygningsmalere?',
          options: ['3F', 'TekniQ', 'Blik & Rør'],
          correct: 0,
          explanation: '3F dækker tømrere, murere og bygningsmalere. TekniQ er for elektrikere og VVS, og Blik & Rør er specifikt VVS-fagforening.'
        },
        {
          id: 'b5',
          q: 'Hvilket fag beskrives som "nørderne i branchen — meget tekniske og strukturerede"?',
          options: ['Murer', 'Elektriker', 'Bygningsmaler'],
          correct: 1,
          explanation: 'Elektrikere er ofte teknisk anlagt, strukturerede og tænker før de handler. De er roligere end de andre fag og kræver styr på detaljerne.'
        },
        {
          id: 'b6',
          q: 'Hvilket fag er typisk det sværeste at finde gode profiler i?',
          options: ['Tømrer', 'Bygningsmaler', 'VVS-montør'],
          correct: 2,
          explanation: 'VVS-montør er det sværeste fag at få fat i de gode profiler. Det er en vigtig faktor at have med, når du screener eller sælger.'
        },
        {
          id: 'b7',
          q: 'Hvad er ofte den hyppigste årsag til at en håndværker skifter job?',
          options: [
            'De vil prøve noget nyt.',
            'De vil tættere på hjemmet.',
            'Utilfredshed med lønforhold.'
          ],
          correct: 2,
          explanation: 'Utilfredshed med lønforhold er ofte den primære årsag til jobskifte. SH, pension og overarbejde betyder meget for håndværkere.'
        }
      ],
      reflections: [
        { id: 'r1', prompt: 'Hvilket fag synes du virker mest interessant at arbejde med, og hvorfor?' },
        { id: 'r2', prompt: 'Hvordan kan du tilpasse din kommunikation, når du taler med håndværkere?' }
      ]
    },

    /* =============================================
       MODUL 3 — Kundetilmelding (KT) — Salg-track
       ============================================= */
    kt: {
      id: 'kt',
      track: 'salg',
      order: 3,
      title: 'Kundetilmelding (KT)',
      subtitle: 'Salgsproces og script',
      duration: '30 min',
      slides: [
        {
          kind: 'cover',
          eyebrow: 'Modul 3 — Salg',
          title: 'Kundetilmelding (KT)',
          body: 'Alt du skal vide om KT-processen — fra første kald til kunden er på platformen.'
        },
        {
          kind: 'flow',
          title: 'Hvad er en KT?',
          body: 'KT er det første led i vores salgsproces. Her indhenter vi den rigtige data på kommende kunder og bygger deres profil i systemet. Jo bedre data fra starten, jo bedre matches.',
          steps: ['Indhentning af data', 'Self Service / Matches', 'Jobsamtale', 'Mand i marken']
        },
        {
          kind: 'good-bad',
          title: 'Hvorfor KT er kritisk',
          quote: '"Uden den rigtige data falder resten fra hinanden. Matches, jobsamtaler, ansættelser — det hele starter med det du taster ind."',
          good: { title: 'Rigtig data', items: ['Præcise matches', 'Glade kunder', 'Tillid til platformen'] },
          bad: { title: 'Forkert data', items: ['Dårlige matches', 'Spildt tid', 'Tab af tillid'] }
        },
        {
          kind: 'bullets',
          title: 'KT-formularen — Virksomhedsoplysninger',
          items: [
            'CVR, navn, adresse, kontaktperson.',
            'Antal ansatte og virksomhedstype.',
            'Hvor præcist arbejder de — geografisk og fagligt?'
          ]
        },
        {
          kind: 'bullets',
          title: 'Job — Hvad søger virksomheden?',
          items: [
            'Arbejdsopgaver',
            'Min. erfaring',
            'Afstand (tommelfinger: maks 30–40 km — medmindre firmabil)',
            'Aldersinterval',
            'Arbejdssted'
          ]
        },
        {
          kind: 'statement',
          text: 'Få den rigtige info. Manipulér aldrig.'
        },
        {
          kind: 'bullets',
          title: 'Job — Hvad tilbyder virksomheden?',
          items: [
            'Lønniveau',
            'Firmabil',
            'Transport',
            'Arbejdsform'
          ]
        },
        {
          kind: 'gangefaktor',
          title: 'Gangefaktoren',
          body: 'Gangefaktoren er den faktor vi bruger til at omregne kandidatens timeløn til virksomhedens pris. Forskelligt fag — forskellig faktor.',
          rows: [
            { fag: 'VVS', faktor: '1,9 – 2,1' },
            { fag: 'Tømrer / Murer', faktor: '1,8 – 1,95' },
            { fag: 'Elektriker', faktor: '1,9 – 2,1' },
            { fag: 'Bygningsmaler', faktor: '1,8 – 1,95' }
          ],
          note: 'Minimum gangefaktor vi accepterer: 1,75.'
        },
        {
          kind: 'numbered',
          title: 'Åbningen — kald scriptet',
          items: [
            'Præsenter dig kort og direkte.',
            'Sig hvorfor du ringer (en konkret kandidat — ikke "vi sælger en platform").',
            'Spørg om de har tid til 2 minutter.'
          ]
        },
        {
          kind: 'numbered',
          title: 'Behovsafdækning — Hvad søger de?',
          items: [
            'Hvilken type opgaver?',
            'Hvor stort er teamet i dag?',
            'Hvad er typiske udfordringer ved at finde de rigtige folk?',
            'Hvor langt vil kandidaten max være fra arbejdspladsen?'
          ]
        },
        {
          kind: 'numbered',
          title: 'Behovsafdækning — Hvad tilbyder de?',
          items: [
            'Lønniveau (vær direkte — det her er vigtigt for håndværkere).',
            'Pension, SH, feriepenge.',
            'Firmabil eller transport.',
            'Hvilken kultur er der i firmaet?'
          ]
        },
        {
          kind: 'numbered',
          title: 'Løsningen — Sådan præsenterer du PowerMatch',
          items: [
            'Vi finder den rette kandidat baseret på data — ikke gæt.',
            'I betaler kun, når kandidaten starter.',
            'Kandidaten er ansat hos os i opstartsperioden — ingen risiko for jer.',
            'Efter 518 timer overgår de til fri fastansættelse hos jer.'
          ]
        },
        {
          kind: 'mirror',
          title: 'Sådan håndterer du en indvending',
          body: 'Start altid med at vise du har hørt det. Hopper du direkte i forklaring, lukker kunden af.',
          examples: ['"Fair nok."', '"Det forstår jeg godt."', '"Det giver mening."', '"Det hører jeg tit."', '"Det er helt fair."']
        },
        {
          kind: 'closing',
          title: 'Luk-spørgsmål',
          examples: ['"Giver det mening?"', '"Skal vi ikke bare få det sat op?"', '"Skal vi tage kravene kort?"', '"Vil du være åben for at se det?"']
        },
        {
          kind: 'numbered',
          title: 'Self Service',
          items: [
            'Virksomheder kan selv oprette jobs, se matches og booke samtaler.',
            'Du får samme provision uanset om du gør det for dem, eller de selv gør det.',
            'Vil du håndtere et begrænset antal kunder — eller et ubegrænset?'
          ]
        }
      ],
      questions: [
        {
          id: 'q1',
          q: 'Hvad er formålet med en KT?',
          options: [
            'At sælge et produkt til virksomheden.',
            'At indhente den rigtige data og bygge virksomhedens profil korrekt.',
            'At booke et møde med virksomheden.'
          ],
          correct: 1,
          explanation: 'KT er ikke et salg — det er dataindsamling. Du skal indhente den rigtige data og bygge virksomhedens profil korrekt. Mødet og det reelle salg sker bagefter, når matches er klar.'
        },
        {
          id: 'q2',
          q: 'Hvad sker der når data i en KT er forkert?',
          options: [
            'Det kan rettes senere uden konsekvenser.',
            'Det skaber støj i hele systemet og ødelægger matches.',
            'Det har kun betydning for den ene virksomhed.'
          ],
          correct: 1,
          explanation: 'Forkert data skaber støj i hele systemet. Det ødelægger matches, spilder kandidaternes tid og koster os tillid hos kunden. Derfor: rigtig data fra starten.'
        },
        {
          id: 'q3',
          q: 'Hvad er tommelfingerreglen for afstand?',
          options: [
            'Maks 50 km.',
            'Maks 30–40 km — medmindre virksomheden tilbyder firmabil.',
            'Afstand er ikke vigtigt.'
          ],
          correct: 1,
          explanation: 'Maks 30–40 km er tommelfingerreglen, medmindre virksomheden tilbyder firmabil. Håndværkere kører meget, men for langt slider på dem og giver dårlige matches.'
        },
        {
          id: 'q4',
          q: 'Hvilken virksomhedsstørrelse kræver typisk længst salgsproces?',
          options: ['Lille (3–25 ansatte)', 'Mellem (26–100 ansatte)', 'Stor (100+ ansatte)'],
          correct: 2,
          explanation: 'Store virksomheder (100+) har flere beslutningstagere, længere godkendelsesveje og typisk længere salgsproces. Små mestre beslutter ofte på kaldet.'
        },
        {
          id: 'q5',
          q: 'Hvad er gangefaktoren for VVS?',
          options: ['1,5 – 1,7', '1,9 – 2,1', '1,8 – 1,95'],
          correct: 1,
          explanation: 'VVS ligger i intervallet 1,9 – 2,1. Det er højere end tømrer/murer, fordi VVS er sværere at finde gode profiler i, og kvaliteten skal afspejles i prisen.'
        },
        {
          id: 'q6',
          q: 'Hvad er gangefaktoren for tømrer/murer?',
          options: ['1,9 – 2,1', '1,8 – 1,95', '1,5 – 1,7'],
          correct: 1,
          explanation: 'Tømrer og murer ligger i 1,8 – 1,95. Lavere end VVS og elektriker, fordi der er flere kvalificerede kandidater på markedet.'
        },
        {
          id: 'q7',
          q: 'Hvorfor skal du aldrig manipulere data i en KT?',
          options: [
            'Det er ulovligt.',
            'Det ødelægger matchkvaliteten og skaber dårlige resultater for alle.',
            'Det gør ingen forskel.'
          ],
          correct: 1,
          explanation: 'Manipulation af data ødelægger matchkvaliteten — kandidater og kunder bliver utilfredse, vi mister tillid, og hele systemet bliver dårligere. Få den rigtige info. Manipulér aldrig.'
        },
        {
          id: 'q8',
          q: 'Hvad er "Mirroring" som samtaleteknik?',
          options: [
            'At kopiere virksomhedens hjemmeside.',
            'At gentage hvad virksomheden siger og følge op med spørgsmål.',
            'At sende den samme besked til flere virksomheder.'
          ],
          correct: 1,
          explanation: 'Mirroring er at gentage de sidste 2–3 ord, kunden sagde — som et spørgsmål. Det får dem til at uddybe og giver dig dybere data, uden du skal stille endnu et spørgsmål.'
        },
        {
          id: 'q9',
          q: 'Hvad gør du, når en virksomhed tøver med at svare?',
          options: [
            'Går videre til næste spørgsmål.',
            'Spørger flere gange med eksempler, så de forstår vigtigheden.',
            'Springer feltet over og udfylder det selv bagefter.'
          ],
          correct: 1,
          explanation: 'Spørg igen. Brug eksempler. Forklar hvorfor svaret er vigtigt for matchet. Springer du over, får kandidaten et dårligt match — og det rammer tilbage på dig.'
        },
        {
          id: 'q10',
          q: 'Hvad er minimums-gangefaktoren vi accepterer?',
          options: ['1,5', '1,75', '2,0'],
          correct: 1,
          explanation: '1,75 er gulvet. Går vi under, er der ikke margin nok til at drive forretningen forsvarligt. Hvis kunden ikke vil derop, er de ikke en kunde for os.'
        }
      ],
      reflections: [
        { id: 'r1', prompt: 'Hvilken del af KT-processen tror du bliver sværest for dig — og hvorfor?' },
        { id: 'r2', prompt: 'Hvordan vil du håndtere en kunde, der presser på en lavere gangefaktor end 1,75?' }
      ]
    },

    /* =============================================
       MODUL 4 — Matches — HR/Screening track
       ============================================= */
    matches: {
      id: 'matches',
      track: 'hr',
      order: 3,
      title: 'Matches',
      subtitle: 'Søgninger og kandidater',
      duration: '20 min',
      slides: [
        {
          kind: 'cover',
          eyebrow: 'Modul 3 — HR / Screening',
          title: 'Matches',
          body: 'Sådan virker matchingen — fra søgning oprettes til jobtilbud.'
        },
        {
          kind: 'flow',
          title: 'Sådan virker en søgning',
          steps: ['Søgning oprettes', 'System matcher (under 1 minut)', 'Mail til virksomhed', 'Jobsamtale', 'Jobtilbud']
        },
        {
          kind: 'bullets',
          title: 'Opret ny søgning',
          items: [
            'Vælg fag og evt. specialer.',
            'Sæt min. erfaring og afstand.',
            'Definér krav og ønsker (lønniveau, transport, kultur).',
            'Tjek at jobopslaget er præcist — undgå fluffy ord.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Match score',
          items: [
            'Match score er baseret på en vægtet kombination — erfaring, krav og virksomhedens ønsker.',
            'Højere score = bedre fit. Men score erstatter ikke menneskelig vurdering.',
            'Brug match-scoren som start, ikke som facit.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Gennemgang af CV',
          items: [
            'Læs CV\'et grundigt — ikke kun overskrifter.',
            'Hold øje med jobskifte: 3 arbejdssteder på ét år er et faresignal.',
            'Spørg ind til pauser, jobskifte og certifikater.'
          ]
        },
        {
          kind: 'split',
          title: 'Interesseret eller ikke?',
          left: { tone: 'yellow', title: 'Interesseret', body: 'Bedste scenarie: virksomheden booker en jobsamtale med kandidaten.' },
          right: { tone: 'soft', title: 'Ikke interesseret', body: 'Vælg en grund — søgningen bliver klogere af det.' }
        },
        {
          kind: 'bullets',
          title: 'Jobsamtale & jobtilbud',
          items: [
            'Følg op aktivt — kandidater forsvinder hurtigt i denne branche.',
            'Hjælp begge sider igennem forhandlingen.',
            'Når jobtilbud er givet, går kandidaten videre til screening og kontrakt.'
          ]
        }
      ],
      questions: [
        {
          id: 'mq1',
          q: 'Hvor hurtigt matcher systemet, efter en søgning er oprettet?',
          options: ['Inden for 24 timer.', 'Under 1 minut.', 'Virksomheden skal manuelt starte matching.'],
          correct: 1,
          explanation: 'Systemet matcher automatisk under 1 minut, efter søgningen er oprettet. Det er en del af vores "speed is king"-tilgang.'
        },
        {
          id: 'mq2',
          q: 'Hvornår modtager virksomheden mail om nye matches?',
          options: ['Ved alle nye matches.', 'Kun ved matches over en vis score.', 'Kun ugentligt.'],
          correct: 1,
          explanation: 'Virksomheden får kun mail om matches over en vis score, så vi ikke spammer dem. Lav-score matches ligger på platformen, hvis de selv vil kigge.'
        },
        {
          id: 'mq3',
          q: 'Hvad er match score baseret på?',
          options: [
            'Kun kandidatens erfaring.',
            'En vægtet kombination af erfaring, krav og virksomhedens ønsker.',
            'Hvor tæt på virksomheden kandidaten bor.'
          ],
          correct: 1,
          explanation: 'Match score er en vægtet kombination af kandidatens erfaring, virksomhedens krav og virksomhedens ønsker. Afstand er kun én af mange faktorer.'
        },
        {
          id: 'mq4',
          q: 'Hvad sker der, når virksomheden afviser en kandidat og vælger en årsag?',
          options: [
            'Kandidaten slettes fra systemet.',
            'Det går videre til administration.',
            'Søgningen bliver klogere — fremtidige matches justeres efter den årsag.'
          ],
          correct: 2,
          explanation: 'Når virksomheden vælger en årsag, lærer søgningen af det. Næste runde matches er bedre tilpasset deres reelle ønsker.'
        },
        {
          id: 'mq5',
          q: 'Hvad er det bedste scenarie, når virksomheden er interesseret i en kandidat?',
          options: ['De skriver en mail.', 'De booker en jobsamtale.', 'De ringer direkte til kandidaten.'],
          correct: 1,
          explanation: 'En booket jobsamtale er det bedste scenarie. Det betyder at processen kører videre, og kandidaten bliver passet på i platformen — ikke uden for.'
        }
      ],
      reflections: [
        { id: 'r1', prompt: 'Hvad vil du være ekstra opmærksom på, når du gennemgår CV\'er?' }
      ]
    },

    /* =============================================
       MODUL 5 — Screening — HR/Screening track
       ============================================= */
    screening: {
      id: 'screening',
      track: 'hr',
      order: 4,
      title: 'Screening',
      subtitle: 'Kandidatvurdering og faresignaler',
      duration: '20 min',
      slides: [
        {
          kind: 'cover',
          eyebrow: 'Modul 4 — HR / Screening',
          title: 'Screening',
          body: 'Sådan vurderer du kandidater. Hvad er et faresignal — og hvad er bare branchen?'
        },
        {
          kind: 'bullets',
          title: 'Det første faresignal',
          items: [
            'Kandidaten har for stor lønforskel mellem ønsket løn og marked.',
            'Tjek altid lønniveau først — det stopper et match hurtigt.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Jobhistorik — hvad skal du kigge efter?',
          items: [
            '3 arbejdssteder på ét år = ofte ustabilitet eller dårlige matches tidligere.',
            'Pauser i CV\'et: spørg ind, det er ikke automatisk dårligt.',
            'Lange ansættelser (3+ år) er ofte et godt tegn på stabilitet.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Lønforskel og match',
          items: [
            'Stor lønforskel mellem ønsket og tilbudt løn stopper matchet.',
            'Tommelfinger: over 10 kr i forskel kan være kritisk.',
            'Spørg altid — nogle kandidater er fleksible, hvis de ved hvorfor.'
          ]
        },
        {
          kind: 'bullets',
          title: 'Referencer',
          items: [
            'Reference er guldværd for PowerMatch — det er social proof.',
            'Brug referencen aktivt i salgsprocessen.',
            'Spørg åbent: hvad var de bedste til? Hvor kunne de blive bedre?'
          ]
        },
        {
          kind: 'bullets',
          title: 'Hvorfor har vi bedre data på kandidatsiden?',
          items: [
            'Kandidater går igennem en grundig screening med os.',
            'Virksomheder udfylder selv KT — vi kan kun tjekke det vi indhenter.',
            'Derfor: KT-data skal være skarp, ellers matcher den dårligt med god kandidatdata.'
          ]
        }
      ],
      questions: [
        {
          id: 'sq1',
          q: 'Hvad er det første faresignal for en screener?',
          options: [
            'Kandidaten har skiftet branche.',
            'Lønforskel mellem ønsket løn og marked.',
            'Kandidaten har lange ansættelser.'
          ],
          correct: 1,
          explanation: 'Lønforskel er typisk det første alvorlige faresignal. Hvis kandidaten ønsker væsentligt mere end markedet, eller virksomheden tilbyder for lidt, stopper matchet hurtigt.'
        },
        {
          id: 'sq2',
          q: 'Hvad signalerer 3 arbejdssteder på ét år?',
          options: [
            'Kandidaten er fleksibel og eftertragtet.',
            'Ofte ustabilitet eller dårlige matches tidligere — kig nærmere.',
            'Det er normalt i håndværkerbranchen og betyder intet.'
          ],
          correct: 1,
          explanation: '3 arbejdssteder på ét år er sjældent et godt tegn — det signalerer ofte ustabilitet eller dårlige matches. Spørg ind, før du går videre.'
        },
        {
          id: 'sq3',
          q: 'Hvor stor lønforskel stopper typisk et match?',
          options: ['Over 5 kroner i forskel.', 'Over 10 kroner i forskel.', 'Lønforskel stopper aldrig et match.'],
          correct: 1,
          explanation: 'Tommelfinger: over 10 kr i forskel er kritisk. Mindre forskelle kan ofte forhandles, hvis begge parter forstår hinandens situation.'
        },
        {
          id: 'sq4',
          q: 'Hvad gør en reference for PowerMatch?',
          options: [
            'Det er valgfrit og sjældent brugt.',
            'Den er guldværd — bruges aktivt i salget og som social proof.',
            'Den fjernes fra kandidatens profil efter 30 dage.'
          ],
          correct: 1,
          explanation: 'Referencer er guldværd. De er social proof, der hjælper salget, og de giver os reel indsigt i kandidatens styrker og udviklingspunkter.'
        },
        {
          id: 'sq5',
          q: 'Hvorfor har vi ofte bedre data på kandidatsiden end på virksomhedssiden?',
          options: [
            'Fordi kandidater lyver mindre.',
            'Fordi kandidater går gennem grundig screening, mens virksomheder selv udfylder KT.',
            'Fordi virksomheder ikke vil samarbejde.'
          ],
          correct: 1,
          explanation: 'Kandidater går igennem en grundig screening hos os. Virksomheder udfylder selv KT — derfor afhænger virksomhedsdata helt af, hvor godt sælgeren har spurgt og noteret.'
        }
      ],
      reflections: [
        { id: 'r1', prompt: 'Hvilket faresignal vil du være mest opmærksom på i din screening?' }
      ]
    },

    /* =============================================
       MODUL 6 — Kontrakt, App & Faktura — Kundeservice/CSM
       ============================================= */
    kontrakt: {
      id: 'kontrakt',
      track: 'kundeservice',
      order: 3,
      title: 'Kontrakt, App & Faktura',
      subtitle: 'Hvad sker der efter ansættelsen',
      duration: '15 min',
      slides: [
        {
          kind: 'cover',
          eyebrow: 'Modul 3 — Kundeservice / CSM',
          title: 'Kontrakt, App & Faktura',
          body: 'Det fulde flow efter kandidaten er ansat — så du ved hvad der sker, og hvad du skal følge op på.'
        },
        {
          kind: 'four-step',
          title: 'Hele flowet',
          steps: [
            { tag: 'Kontrakt', body: 'Oprettes automatisk.' },
            { tag: 'App-bruger', body: 'Kandidaten får adgang.' },
            { tag: 'Tidsregistrering', body: 'Kandidaten logger dagligt.' },
            { tag: 'Faktura', body: 'Sendes automatisk ugentligt.' }
          ]
        },
        {
          kind: 'three-up',
          title: 'Hvad gør kandidaten i appen?',
          items: [
            { icon: 'clock', text: 'Tilføjer timer dagligt.' },
            { icon: 'wallet', text: 'Følger optjent løn løbende.' },
            { icon: 'chat', text: 'Kontakter kundeservice direkte i appen.' }
          ]
        },
        {
          kind: 'split',
          title: 'Roller i flowet',
          left: { tone: 'yellow', title: 'Sælger', body: '100% fokus på salg.' },
          right: { tone: 'yellow', title: 'Screener', body: '100% fokus på screening.' }
        },
        {
          kind: 'bullets',
          title: 'Når noget går skævt',
          items: [
            'Hvis virksomheden ikke reagerer på timer: vi rykker for godkendelse — timerne bliver ikke slettet.',
            'Hvis kandidaten glemmer timer: vi minder dem fra appen.',
            'Hvis fakturaen ikke betales: administration tager den derfra.'
          ]
        },
        {
          kind: 'statement',
          text: 'Jo mere platformen håndterer automatisk, jo mere kan vi fokusere på menneskerne.'
        }
      ],
      questions: [
        {
          id: 'kq1',
          q: 'Hvad sker der, hvis virksomheden ikke reagerer på timerne?',
          options: [
            'Timerne slettes automatisk.',
            'Vi rykker for godkendelse — timerne bliver ikke slettet.',
            'Kandidaten skal selv kontakte virksomheden.'
          ],
          correct: 1,
          explanation: 'Timer slettes ikke. Vi rykker virksomheden for godkendelse, så kandidaten får sin løn til tiden. Manglende reaktion fra virksomheden er ikke kandidatens problem.'
        },
        {
          id: 'kq2',
          q: 'Hvad skal kandidaten gøre, efter kontrakten er godkendt?',
          options: [
            'Vente på, at sælgeren aktiverer appen.',
            'Logge ind i appen og begynde tidsregistrering fra dag ét.',
            'Sende timer til kundeservice manuelt.'
          ],
          correct: 1,
          explanation: 'Kandidaten skal logge ind og registrere timer fra dag ét. Appen er allerede aktiv, og forsinkelse i tidsregistrering forsinker faktura og løn.'
        },
        {
          id: 'kq3',
          q: 'Hvor meget af processen håndterer platformen?',
          options: [
            '50% — resten er manuelt.',
            'Cirka 75% — kontrakten er manuel.',
            'Næsten 100% — kontrakt, app, tidsregistrering og faktura kører automatisk.'
          ],
          correct: 2,
          explanation: 'Næsten alt — kontrakt, app, tidsregistrering og faktura — kører automatisk. Det frigør tid til at passe på kandidaten og bygge relationer til virksomheden.'
        }
      ],
      reflections: [
        { id: 'r1', prompt: 'Hvor i flowet tror du der oftest opstår problemer, og hvordan kan du forebygge det?' }
      ]
    }
  }
};

if (typeof module !== 'undefined') module.exports = CONTENT;
