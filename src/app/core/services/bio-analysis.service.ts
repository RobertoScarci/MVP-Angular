import { Injectable } from '@angular/core';
import { BioFormData, GeneratedBio, BioAnalysis } from '../models/bio-form.model';

@Injectable({
  providedIn: 'root'
})
export class BioAnalysisService {
  private readonly MIN_LENGTH = 50;
  private readonly MAX_LENGTH = 2000;
  private readonly IDEAL_SECTION_LENGTH = { min: 100, max: 500 };

  private actionVerbs = [
    'aiuto', 'aiutiamo', 'supporto', 'supportiamo', 'risolvo', 'risolviamo',
    'creo', 'creiamo', 'sviluppo', 'sviluppiamo', 'costruisco', 'costruiamo',
    'ottimizziamo', 'ottimizzo', 'miglioro', 'miglioriamo', 'trasformo', 'trasformiamo',
    'fornisco', 'forniamo', 'offro', 'offriamo', 'garantisco', 'garantiamo',
    'progetto', 'progettiamo', 'guido', 'guidiamo', 'facilito', 'facilitiamo',
    'accelero', 'acceleriamo', 'potenzio', 'potenziamo', 'innovo', 'innoviamo',
    'strategico', 'strategizziamo', 'consolido', 'consolidiamo', 'scalo', 'scaliamo'
  ];

  private vagueWords = [
    'esperto', 'esperienza', 'esperienze', 'esperienza pluriennale',
    'professionista', 'professionisti', 'qualificato', 'qualificati',
    'competente', 'competenti', 'eccellente', 'eccellenti'
  ];

  private selfReferenceWords = [
    'io', 'me', 'mio', 'mia', 'miei', 'mie', 'mi', 'sono', 'ho',
    'io sono', 'io ho', 'il mio', 'la mia', 'i miei', 'le mie'
  ];

  // Pattern recognition per ruoli e attività
  private rolePatterns = {
    tech: ['developer', 'sviluppatore', 'programmatore', 'engineer', 'ingegnere', 'tech', 'software', 'it'],
    marketing: ['marketing', 'marketer', 'comunicazione', 'brand', 'advertising', 'pubblicità', 'social media'],
    design: ['designer', 'design', 'ui', 'ux', 'grafico', 'creativo'],
    business: ['manager', 'consulente', 'consulenza', 'business', 'strategist', 'stratega', 'ceo', 'founder'],
    sales: ['sales', 'vendite', 'commerciale', 'account', 'business development'],
    hr: ['hr', 'risorse umane', 'recruiter', 'talent', 'people'],
    finance: ['finance', 'finanza', 'contabile', 'accountant', 'cfo'],
    product: ['product', 'prodotto', 'pm', 'product manager']
  };

  private activityPatterns = {
    development: ['sviluppo', 'codice', 'applicazione', 'app', 'software', 'sistema', 'piattaforma', 'backend', 'frontend'],
    strategy: ['strategia', 'pianificazione', 'strategico', 'roadmap', 'vision', 'obiettivi'],
    growth: ['crescita', 'growth', 'scalare', 'scalabilità', 'espansione', 'acquisizione'],
    optimization: ['ottimizzazione', 'ottimizzare', 'miglioramento', 'efficienza', 'performance', 'risultati'],
    consulting: ['consulenza', 'consulente', 'consiglio', 'supporto', 'guidare', 'accompagnare'],
    training: ['formazione', 'training', 'educazione', 'insegnare', 'coaching', 'mentoring']
  };

  generateBio(formData: BioFormData): GeneratedBio {
    const { role, target, activity, goal } = formData;

    const whoYouAre = this.generateWhoYouAre(role, target);
    const valueProposition = this.generateValueProposition(role, target, activity);
    const callToAction = this.generateCallToAction(goal, target);

    return {
      whoYouAre,
      valueProposition,
      callToAction
    };
  }

  analyzeBio(bio: GeneratedBio, formData: BioFormData, scoreEnabled: boolean = false): BioAnalysis {
    const fullBio = `${bio.whoYouAre} ${bio.valueProposition} ${bio.callToAction}`;
    const warnings: string[] = [];
    const suggestions: string[] = [];

    const clarity = this.checkClarity(bio, warnings, suggestions);
    const hasTarget = this.checkTargetPresence(bio, formData.target, warnings);
    const hasCta = this.checkCtaPresence(bio, warnings);
    const adequateLength = this.checkLength(fullBio, warnings, suggestions);

    this.checkSelfReference(fullBio, warnings, suggestions);
    this.checkVagueMessages(bio, warnings, suggestions);
    this.checkValueFocus(bio, warnings, suggestions);

    let score: number | undefined;
    if (scoreEnabled) {
      score = this.calculateScore(clarity, hasTarget, hasCta, adequateLength, warnings.length);
    }

    return {
      clarity,
      hasTarget,
      hasCta,
      adequateLength,
      warnings,
      suggestions,
      score
    };
  }

  private generateWhoYouAre(role: string, target: string): string {
    if (!role) return '';
    
    const roleLower = role.toLowerCase();
    const roleCategory = this.detectRoleCategory(roleLower);
    
    // Template base senza target
    const baseTemplates = [
      `${role}`,
      `${role} appassionato di innovazione`,
      `${role} con una visione orientata ai risultati`,
      `${role} focalizzato sull'eccellenza`,
      `${role} con esperienza nel settore`,
      `${role} specializzato in soluzioni innovative`
    ];
    
    // Template con target - varianti per categoria di ruolo
    let templatesWithTarget: string[] = [];
    
    if (roleCategory === 'tech') {
      templatesWithTarget = [
        `${role} specializzato nel supportare ${target} attraverso soluzioni tecnologiche innovative`,
        `${role} che aiuta ${target} a trasformare le loro sfide digitali in opportunità`,
        `${role} con focus su ${target}, costruendo soluzioni scalabili e performanti`,
        `${role} dedicato a ${target}, sviluppando tecnologie che fanno la differenza`,
        `${role} che accompagna ${target} nella loro trasformazione digitale`,
        `${role} esperto nel creare valore per ${target} attraverso l'innovazione tecnologica`,
        `${role} che lavora con ${target} per costruire il futuro digitale`,
        `${role} specializzato nell'aiutare ${target} a raggiungere i loro obiettivi tecnologici`
      ];
    } else if (roleCategory === 'marketing') {
      templatesWithTarget = [
        `${role} specializzato nel supportare ${target} attraverso strategie di marketing efficaci`,
        `${role} che aiuta ${target} a costruire una presenza di marca forte e riconoscibile`,
        `${role} con focus su ${target}, creando campagne che generano risultati concreti`,
        `${role} dedicato a ${target}, sviluppando strategie di comunicazione che risuonano`,
        `${role} che accompagna ${target} nella crescita della loro visibilità online`,
        `${role} esperto nel far crescere ${target} attraverso marketing data-driven`,
        `${role} che lavora con ${target} per costruire brand memorabili e coinvolgenti`,
        `${role} specializzato nell'aiutare ${target} a raggiungere i loro obiettivi di crescita`
      ];
    } else if (roleCategory === 'design') {
      templatesWithTarget = [
        `${role} specializzato nel supportare ${target} attraverso design che comunica e coinvolge`,
        `${role} che aiuta ${target} a trasformare le loro idee in esperienze visive memorabili`,
        `${role} con focus su ${target}, creando design che risuonano con il pubblico`,
        `${role} dedicato a ${target}, progettando soluzioni che combinano estetica e funzionalità`,
        `${role} che accompagna ${target} nella creazione di identità visive distintive`,
        `${role} esperto nel far emergere ${target} attraverso design strategico e innovativo`,
        `${role} che lavora con ${target} per costruire esperienze utente eccezionali`,
        `${role} specializzato nell'aiutare ${target} a comunicare attraverso il design`
      ];
    } else if (roleCategory === 'business') {
      templatesWithTarget = [
        `${role} specializzato nel supportare ${target} attraverso strategie di business efficaci`,
        `${role} che aiuta ${target} a trasformare le loro sfide in opportunità di crescita`,
        `${role} con focus su ${target}, sviluppando soluzioni che generano valore duraturo`,
        `${role} dedicato a ${target}, guidando processi di trasformazione e innovazione`,
        `${role} che accompagna ${target} nella loro crescita strategica`,
        `${role} esperto nel far scalare ${target} attraverso consulenza mirata`,
        `${role} che lavora con ${target} per costruire modelli di business sostenibili`,
        `${role} specializzato nell'aiutare ${target} a raggiungere i loro obiettivi strategici`
      ];
    } else {
      // Template generici ma variati
      templatesWithTarget = [
        `${role} specializzato nel supportare ${target}`,
        `${role} che aiuta ${target} a raggiungere i loro obiettivi`,
        `${role} con focus su ${target}, creando valore attraverso soluzioni mirate`,
        `${role} dedicato a ${target}, trasformando le loro sfide in opportunità`,
        `${role} che accompagna ${target} nella loro crescita`,
        `${role} esperto nel far crescere ${target} attraverso approcci innovativi`,
        `${role} che lavora con ${target} per ottenere risultati concreti`,
        `${role} specializzato nell'aiutare ${target} a superare le loro sfide`,
        `${role} che supporta ${target} nel raggiungimento dei loro obiettivi`,
        `${role} con una passione per aiutare ${target} a prosperare`,
        `${role} che trasforma le esigenze di ${target} in soluzioni efficaci`,
        `${role} focalizzato su ${target}, costruendo partnership di valore`
      ];
    }
    
    const allTemplates = target ? templatesWithTarget : baseTemplates;
    const selected = allTemplates[Math.floor(Math.random() * allTemplates.length)];
    return this.capitalizeFirst(selected) + '.';
  }

  private detectRoleCategory(role: string): string {
    for (const [category, patterns] of Object.entries(this.rolePatterns)) {
      if (patterns.some(pattern => role.includes(pattern))) {
        return category;
      }
    }
    return 'generic';
  }

  private generateValueProposition(role: string, target: string, activity: string): string {
    if (!activity) return '';
    
    const activityLower = activity.toLowerCase();
    const activityCategory = this.detectActivityCategory(activityLower);
    const foundVerbs = this.actionVerbs.filter(verb => 
      activityLower.includes(verb.toLowerCase())
    );
    
    let proposition = '';
    const activityCleaned = foundVerbs.length > 0 
      ? this.enhanceActivity(activity, foundVerbs[0])
      : this.addActionVerb(activity);
    
    // Template contestuali basati sulla categoria dell'attività
    if (target) {
      if (activityCategory === 'development') {
        const templates = [
          `${activityCleaned}, aiutando ${target} a costruire soluzioni tecnologiche scalabili e performanti`,
          `${activityCleaned}. Il mio obiettivo è supportare ${target} nello sviluppo di prodotti digitali che fanno la differenza`,
          `${activityCleaned}, trasformando le esigenze di ${target} in applicazioni robuste e user-friendly`,
          `${activityCleaned}. Lavoro con ${target} per creare sistemi che generano valore duraturo`,
          `${activityCleaned}, guidando ${target} verso soluzioni tecnologiche innovative e sostenibili`,
          `${activityCleaned}, permettendo a ${target} di scalare e crescere attraverso tecnologie moderne`,
          `${activityCleaned}. Aiuto ${target} a trasformare le loro idee in prodotti digitali di successo`,
          `${activityCleaned}, costruendo per ${target} piattaforme che risolvono problemi reali`
        ];
        proposition = templates[Math.floor(Math.random() * templates.length)];
      } else if (activityCategory === 'strategy') {
        const templates = [
          `${activityCleaned}, aiutando ${target} a definire e raggiungere obiettivi strategici chiari`,
          `${activityCleaned}. Il mio obiettivo è supportare ${target} nella pianificazione e nell'esecuzione di strategie efficaci`,
          `${activityCleaned}, trasformando le visioni di ${target} in piani d'azione concreti e misurabili`,
          `${activityCleaned}. Lavoro con ${target} per creare roadmap che guidano verso il successo`,
          `${activityCleaned}, guidando ${target} verso decisioni strategiche informate e orientate ai risultati`,
          `${activityCleaned}, permettendo a ${target} di navigare la complessità con chiarezza e focus`,
          `${activityCleaned}. Aiuto ${target} a trasformare le loro ambizioni in strategie eseguibili`,
          `${activityCleaned}, costruendo per ${target} framework strategici che generano valore`
        ];
        proposition = templates[Math.floor(Math.random() * templates.length)];
      } else if (activityCategory === 'growth') {
        const templates = [
          `${activityCleaned}, aiutando ${target} a scalare e crescere in modo sostenibile`,
          `${activityCleaned}. Il mio obiettivo è supportare ${target} nell'acquisizione e nel mantenimento di una crescita costante`,
          `${activityCleaned}, trasformando le opportunità di ${target} in risultati misurabili`,
          `${activityCleaned}. Lavoro con ${target} per creare modelli di crescita replicabili e scalabili`,
          `${activityCleaned}, guidando ${target} verso strategie di crescita che generano valore duraturo`,
          `${activityCleaned}, permettendo a ${target} di espandersi in nuovi mercati e segmenti`,
          `${activityCleaned}. Aiuto ${target} a trasformare il loro potenziale in crescita concreta`,
          `${activityCleaned}, costruendo per ${target} sistemi di crescita che si auto-alimentano`
        ];
        proposition = templates[Math.floor(Math.random() * templates.length)];
      } else if (activityCategory === 'optimization') {
        const templates = [
          `${activityCleaned}, aiutando ${target} a migliorare performance e risultati in modo misurabile`,
          `${activityCleaned}. Il mio obiettivo è supportare ${target} nell'ottimizzazione di processi e risorse`,
          `${activityCleaned}, trasformando le inefficienze di ${target} in opportunità di miglioramento`,
          `${activityCleaned}. Lavoro con ${target} per creare sistemi ottimizzati che generano maggiore valore`,
          `${activityCleaned}, guidando ${target} verso l'eccellenza operativa attraverso l'ottimizzazione continua`,
          `${activityCleaned}, permettendo a ${target} di ottenere di più con meno, massimizzando l'efficienza`,
          `${activityCleaned}. Aiuto ${target} a trasformare i loro processi in macchine ad alte prestazioni`,
          `${activityCleaned}, costruendo per ${target} framework di ottimizzazione che generano risultati tangibili`
        ];
        proposition = templates[Math.floor(Math.random() * templates.length)];
      } else if (activityCategory === 'consulting') {
        const templates = [
          `${activityCleaned}, aiutando ${target} a navigare complessità e sfide con chiarezza`,
          `${activityCleaned}. Il mio obiettivo è supportare ${target} nel prendere decisioni informate e strategiche`,
          `${activityCleaned}, trasformando le sfide di ${target} in opportunità di crescita e miglioramento`,
          `${activityCleaned}. Lavoro con ${target} per creare soluzioni personalizzate che generano valore immediato`,
          `${activityCleaned}, guidando ${target} verso approcci che combinano best practice e innovazione`,
          `${activityCleaned}, permettendo a ${target} di accedere a expertise e prospettive che fanno la differenza`,
          `${activityCleaned}. Aiuto ${target} a trasformare le loro ambizioni in piani d'azione concreti`,
          `${activityCleaned}, costruendo per ${target} partnership strategiche che generano risultati duraturi`
        ];
        proposition = templates[Math.floor(Math.random() * templates.length)];
      } else if (activityCategory === 'training') {
        const templates = [
          `${activityCleaned}, aiutando ${target} a sviluppare competenze e capacità che fanno la differenza`,
          `${activityCleaned}. Il mio obiettivo è supportare ${target} nella crescita professionale e personale`,
          `${activityCleaned}, trasformando il potenziale di ${target} in competenze concrete e applicabili`,
          `${activityCleaned}. Lavoro con ${target} per creare percorsi di apprendimento che generano valore immediato`,
          `${activityCleaned}, guidando ${target} verso l'eccellenza attraverso formazione pratica e mirata`,
          `${activityCleaned}, permettendo a ${target} di acquisire conoscenze che accelerano la loro crescita`,
          `${activityCleaned}. Aiuto ${target} a trasformare le loro aspirazioni in competenze misurabili`,
          `${activityCleaned}, costruendo per ${target} programmi formativi che generano impatto duraturo`
        ];
        proposition = templates[Math.floor(Math.random() * templates.length)];
      } else {
        // Template generici ma ricchi
        const templates = [
          `${activityCleaned}, aiutando ${target} a raggiungere risultati concreti e misurabili`,
          `${activityCleaned}. Il mio obiettivo è supportare ${target} nel loro percorso di crescita e successo`,
          `${activityCleaned}, trasformando le esigenze di ${target} in soluzioni efficaci e durature`,
          `${activityCleaned}. Lavoro con ${target} per creare valore che si traduce in risultati tangibili`,
          `${activityCleaned}, guidando ${target} verso il successo attraverso approcci innovativi e collaudati`,
          `${activityCleaned}, permettendo a ${target} di ottenere risultati che superano le aspettative`,
          `${activityCleaned}. Aiuto ${target} a trasformare le loro sfide in opportunità di crescita`,
          `${activityCleaned}, costruendo per ${target} soluzioni che generano impatto misurabile e duraturo`,
          `${activityCleaned}, focalizzandomi su ${target} per creare partnership che generano valore reciproco`,
          `${activityCleaned}. Collaboro con ${target} per sviluppare strategie che portano a risultati concreti`,
          `${activityCleaned}, supportando ${target} nel raggiungimento di obiettivi ambiziosi attraverso metodi provati`,
          `${activityCleaned}, lavorando a fianco di ${target} per costruire soluzioni che fanno la differenza`
        ];
        proposition = templates[Math.floor(Math.random() * templates.length)];
      }
    } else {
      // Senza target, ma comunque ricco
      const templates = [
        activityCleaned,
        `${activityCleaned}, focalizzandomi su risultati concreti e misurabili`,
        `${activityCleaned}. Il mio approccio combina best practice e innovazione`,
        `${activityCleaned}, trasformando sfide in opportunità di crescita`,
        `${activityCleaned}, creando valore attraverso soluzioni efficaci e durature`
      ];
      proposition = templates[Math.floor(Math.random() * templates.length)];
    }
    
    return this.capitalizeFirst(proposition) + '.';
  }

  private detectActivityCategory(activity: string): string {
    for (const [category, patterns] of Object.entries(this.activityPatterns)) {
      if (patterns.some(pattern => activity.includes(pattern))) {
        return category;
      }
    }
    return 'generic';
  }

  private enhanceActivity(activity: string, verb: string): string {
    // Rimuovi ripetizioni e migliora la struttura
    let enhanced = activity.trim();
    
    // Rimuovi punti finali multipli
    enhanced = enhanced.replace(/\.+$/, '');
    
    // Se l'attività inizia già con il verbo, mantienila
    // Altrimenti assicurati che abbia un verbo d'azione
    if (!enhanced.toLowerCase().startsWith(verb.toLowerCase())) {
      // Aggiungi il verbo se manca all'inizio
      if (!this.actionVerbs.some(v => enhanced.toLowerCase().startsWith(v.toLowerCase()))) {
        enhanced = `${verb} ${enhanced.toLowerCase()}`;
      }
    }
    
    return enhanced;
  }

  private addActionVerb(activity: string): string {
    const activityLower = activity.toLowerCase();
    const activityCategory = this.detectActivityCategory(activityLower);
    
    // Verbi appropriati per diversi contesti e categorie
    if (activityCategory === 'development') {
      const verbs = ['Sviluppo', 'Costruisco', 'Creo', 'Progetto', 'Implemento'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    if (activityCategory === 'strategy') {
      const verbs = ['Definisco', 'Pianifico', 'Strategizzo', 'Progetto', 'Strutturo'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    if (activityCategory === 'growth') {
      const verbs = ['Accelero', 'Scalo', 'Faccio crescere', 'Espando', 'Potenzio'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    if (activityCategory === 'optimization') {
      const verbs = ['Ottimizzo', 'Miglioro', 'Potenzio', 'Raffino', 'Perfeziono'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    if (activityCategory === 'consulting') {
      const verbs = ['Offro consulenza per', 'Supporto attraverso', 'Guido in', 'Accompagno in', 'Consiglio su'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    if (activityCategory === 'training') {
      const verbs = ['Formo su', 'Insegno', 'Trasferisco competenze su', 'Sviluppo talenti in', 'Educo su'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    // Verbi basati su pattern specifici
    if (activityLower.includes('marketing') || activityLower.includes('comunicazione') || activityLower.includes('brand')) {
      const verbs = ['Creo strategie di', 'Sviluppo campagne di', 'Progetto', 'Costruisco'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    if (activityLower.includes('design') || activityLower.includes('ui') || activityLower.includes('ux')) {
      const verbs = ['Progetto', 'Creo', 'Disegno', 'Sviluppo'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    if (activityLower.includes('vendite') || activityLower.includes('sales') || activityLower.includes('commerciale')) {
      const verbs = ['Gestisco', 'Sviluppo', 'Costruisco', 'Accelero'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `${verb} ${activity}`;
    }
    
    // Default: verbi generici ma efficaci
    const defaultVerbs = ['Aiuto attraverso', 'Supporto con', 'Lavoro su', 'Mi occupo di', 'Sviluppo'];
    const verb = defaultVerbs[Math.floor(Math.random() * defaultVerbs.length)];
    return `${verb} ${activity}`;
  }

  private capitalizeFirst(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private generateCallToAction(goal: string, target: string): string {
    if (!goal) return '';
    
    const targetText = target || 'la tua azienda';
    
    const ctaMap: Record<string, string[]> = {
      'lavoro': [
        'Aperto a nuove opportunità che mi permettano di fare la differenza e contribuire a progetti significativi.',
        'In cerca di progetti stimolanti dove poter applicare le mie competenze e crescere professionalmente.',
        'Disponibile per nuove sfide professionali in team dinamici, innovativi e orientati ai risultati.',
        'Aperto a collaborazioni che valorizzino il mio contributo e mi permettano di crescere insieme all\'organizzazione.',
        'Interessato a opportunità che combinino innovazione, crescita e impatto concreto.',
        'In cerca di ruoli dove possa applicare la mia esperienza per generare valore duraturo.',
        'Disponibile per posizioni che mi permettano di fare la differenza attraverso le mie competenze.',
        'Aperto a nuove sfide in ambienti che valorizzano l\'eccellenza e l\'innovazione.',
        'Interessato a progetti che mi permettano di crescere professionalmente mentre genero impatto.',
        'In cerca di team che condividano la passione per la qualità e i risultati concreti.',
        'Disponibile per opportunità che combinino crescita personale e contributo significativo.',
        'Aperto a collaborazioni con organizzazioni che investono nel talento e nell\'innovazione.'
      ],
      'clienti': [
        `Contattami per scoprire come posso aiutare ${targetText} a raggiungere i suoi obiettivi e superare le sfide.`,
        `Scrivimi per una consulenza personalizzata e soluzioni su misura per ${targetText}.`,
        `Pronto a discutere come possiamo lavorare insieme per ottenere risultati concreti e misurabili per ${targetText}.`,
        `Contattami per esplorare come possiamo creare valore insieme e trasformare le opportunità in successi.`,
        `Aperto a collaborare con ${targetText} per sviluppare soluzioni innovative che generano impatto.`,
        `Scrivimi per capire come posso supportare ${targetText} nel raggiungimento dei loro obiettivi strategici.`,
        `Contattami per una discussione su come possiamo lavorare insieme per ottenere risultati eccezionali.`,
        `Disponibile per esplorare partnership che portino valore concreto a ${targetText}.`,
        `Pronto a collaborare con ${targetText} per trasformare le loro ambizioni in realtà.`,
        `Contattami per scoprire come possiamo creare insieme soluzioni che fanno la differenza.`,
        `Aperto a discutere come posso aiutare ${targetText} a navigare le sfide e cogliere le opportunità.`,
        `Scrivimi per esplorare come possiamo costruire insieme un percorso di crescita e successo.`,
        `Contattami per capire come possiamo lavorare insieme per ottenere risultati che superano le aspettative.`,
        `Disponibile per una consulenza iniziale su come posso supportare ${targetText} nel loro percorso.`
      ],
      'networking': [
        'Aperto a connessioni significative e collaborazioni che portino valore reciproco e crescita condivisa.',
        'Sempre interessato a conoscere professionisti con cui condividere idee, progetti e opportunità di crescita.',
        'Connessioni aperte per networking costruttivo, scambio di esperienze e opportunità di collaborazione.',
        'Pronto a connettermi con chi condivide la passione per l\'innovazione, l\'eccellenza e il miglioramento continuo.',
        'Interessato a costruire relazioni professionali basate su valore reciproco e crescita condivisa.',
        'Aperto a connessioni con professionisti che condividono la visione di creare impatto attraverso il lavoro.',
        'Sempre disponibile per scambiare idee, esperienze e opportunità con professionisti del settore.',
        'Connessioni aperte per networking autentico e collaborazioni che generano valore per entrambe le parti.',
        'Interessato a conoscere professionisti con cui condividere conoscenze e creare sinergie.',
        'Aperto a connessioni che portino a scambi costruttivi, apprendimento reciproco e opportunità di crescita.',
        'Pronto a connettermi con chi condivide l\'approccio orientato ai risultati e all\'innovazione.',
        'Sempre interessato a costruire relazioni professionali basate su rispetto, valore e crescita reciproca.',
        'Connessioni aperte per networking strategico e collaborazioni che generano impatto positivo.',
        'Aperto a conoscere professionisti con cui condividere visioni, progetti e opportunità di sviluppo.'
      ]
    };
    
    const ctas = ctaMap[goal] || ['Contattami per saperne di più e esplorare come possiamo collaborare.'];
    return ctas[Math.floor(Math.random() * ctas.length)];
  }

  private checkClarity(bio: GeneratedBio, warnings: string[], suggestions: string[]): boolean {
    const sections = [bio.whoYouAre, bio.valueProposition, bio.callToAction];
    const emptySections = sections.filter(s => !s || s.trim().length === 0).length;
    
    if (emptySections > 0) {
      warnings.push('Alcune sezioni della bio sono vuote o incomplete.');
      if (emptySections === 1) {
        suggestions.push('Completa la sezione mancante per una bio più efficace e professionale.');
      } else {
        suggestions.push('Completa tutte le sezioni mancanti per creare una bio completa e convincente.');
      }
      return false;
    }
    
    // Analisi più dettagliata per ogni sezione
    const sectionAnalysis = sections.map((s, index) => {
      const length = s.trim().length;
      const sectionNames = ['Chi sei', 'Valore che porti', 'Call to action'];
      return { name: sectionNames[index], length, content: s };
    });
    
    const shortSections = sectionAnalysis.filter(s => s.length < 30);
    if (shortSections.length > 0) {
      const shortNames = shortSections.map(s => s.name).join(', ');
      warnings.push(`Le sezioni "${shortNames}" sono troppo brevi e poco descrittive.`);
      suggestions.push(`Espandi le sezioni brevi con dettagli specifici per rendere la bio più chiara, coinvolgente e professionale.`);
      return false;
    }
    
    // Controllo qualità del contenuto
    const veryShortSections = sectionAnalysis.filter(s => s.length < 50);
    if (veryShortSections.length === sections.length) {
      warnings.push('Tutte le sezioni sono molto brevi, la bio risulta poco descrittiva.');
      suggestions.push('Aggiungi più dettagli concreti su chi sei, il valore che porti e come contattarti per una bio più efficace.');
      return false;
    }
    
    return true;
  }

  private checkTargetPresence(bio: GeneratedBio, target: string, warnings: string[]): boolean {
    if (!target) return false;
    
    const fullBio = `${bio.whoYouAre} ${bio.valueProposition} ${bio.callToAction}`.toLowerCase();
    const targetLower = target.toLowerCase();
    
    // Controllo più sofisticato: cerca il target o varianti
    const targetWords = targetLower.split(/\s+/);
    const foundWords = targetWords.filter(word => 
      word.length > 3 && fullBio.includes(word)
    );
    
    // Se meno del 50% delle parole chiave del target sono presenti
    if (foundWords.length < targetWords.length * 0.5) {
      warnings.push(`Il target "${target}" non è menzionato chiaramente nella bio.`);
      warnings.push('Menzionare esplicitamente il tuo target aiuta i lettori a capire per chi lavori.');
      return false;
    }
    
    // Controllo se il target è menzionato in modo troppo generico
    const genericTargets = ['aziende', 'clienti', 'persone', 'professionisti', 'team'];
    const isGeneric = genericTargets.some(gt => targetLower.includes(gt));
    if (isGeneric && foundWords.length === 0) {
      warnings.push('Il target è troppo generico. Specifica meglio per chi lavori per una bio più efficace.');
      return false;
    }
    
    return true;
  }

  private checkCtaPresence(bio: GeneratedBio, warnings: string[]): boolean {
    const ctaIndicators = [
      'contattami', 'scrivimi', 'connessioni', 'aperto', 'disponibile', 'discutere',
      'collaborare', 'lavorare insieme', 'parlare', 'esplorare', 'scoprire',
      'interessato', 'cercare', 'disponibile per', 'aperto a', 'pronto a'
    ];
    const ctaLower = bio.callToAction.toLowerCase();
    
    const foundIndicators = ctaIndicators.filter(indicator => ctaLower.includes(indicator));
    
    if (foundIndicators.length === 0) {
      warnings.push('La call to action non è chiara o mancante.');
      warnings.push('Una CTA chiara invita i lettori a contattarti o connettersi, aumentando le opportunità di networking.');
      return false;
    }
    
    // Controllo se la CTA è troppo debole
    const weakCtas = ['forse', 'potrei', 'magari', 'eventualmente'];
    const hasWeakCta = weakCtas.some(weak => ctaLower.includes(weak));
    if (hasWeakCta && foundIndicators.length === 1) {
      warnings.push('La call to action potrebbe essere più diretta e convincente.');
      return true; // Non è un errore critico, ma un suggerimento
    }
    
    return true;
  }

  private checkLength(fullBio: string, warnings: string[], suggestions: string[]): boolean {
    const length = fullBio.length;
    
    if (length < this.MIN_LENGTH) {
      warnings.push(`La bio è troppo breve (${length} caratteri). LinkedIn consiglia almeno ${this.MIN_LENGTH} caratteri.`);
      suggestions.push('Aggiungi più dettagli sulle tue competenze e sul valore che porti.');
      return false;
    }
    
    if (length > this.MAX_LENGTH) {
      warnings.push(`La bio è troppo lunga (${length} caratteri). LinkedIn consiglia massimo ${this.MAX_LENGTH} caratteri.`);
      suggestions.push('Sintetizza il contenuto mantenendo solo le informazioni più rilevanti.');
      return false;
    }
    
    return true;
  }

  private checkSelfReference(fullBio: string, warnings: string[], suggestions: string[]): void {
    const bioLower = fullBio.toLowerCase();
    
    // Conta le occorrenze di parole autoreferenziali
    let selfRefCount = 0;
    this.selfReferenceWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = bioLower.match(regex);
      if (matches) {
        selfRefCount += matches.length;
      }
    });
    
    // Calcola la densità rispetto alla lunghezza totale
    const bioLength = fullBio.split(/\s+/).length;
    const selfRefDensity = selfRefCount / bioLength;
    
    if (selfRefCount > 8 || selfRefDensity > 0.15) {
      warnings.push('La bio è troppo autoreferenziale. Troppi riferimenti a "io", "mio", "sono", ecc.');
      suggestions.push('Riformula usando un linguaggio più orientato al valore per il lettore. Invece di "Io aiuto..." prova "Aiuto aziende a..." o "Supporto professionisti nel...".');
    } else if (selfRefCount > 5 || selfRefDensity > 0.10) {
      warnings.push('La bio contiene diversi riferimenti personali che potrebbero essere ridotti.');
      suggestions.push('Considera di riformulare alcune frasi per mettere più focus sul valore per il lettore piuttosto che su te stesso.');
    }
  }

  private checkVagueMessages(bio: GeneratedBio, warnings: string[], suggestions: string[]): void {
    const fullBio = `${bio.whoYouAre} ${bio.valueProposition}`.toLowerCase();
    
    // Conta le occorrenze di parole vaghe
    let vagueCount = 0;
    const foundVagueWords: string[] = [];
    
    this.vagueWords.forEach(word => {
      const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'gi');
      const matches = fullBio.match(regex);
      if (matches) {
        vagueCount += matches.length;
        if (!foundVagueWords.includes(word)) {
          foundVagueWords.push(word);
        }
      }
    });
    
    if (vagueCount > 3) {
      warnings.push(`La bio contiene troppe parole vaghe come "${foundVagueWords.slice(0, 3).join('", "')}" che non aggiungono valore concreto.`);
      suggestions.push('Sostituisci le parole vaghe con descrizioni specifiche. Invece di "esperto" prova "con 5 anni di esperienza in..." o "specializzato in [area specifica]".');
    } else if (vagueCount > 1) {
      warnings.push('La bio contiene alcune parole vaghe che potrebbero essere più specifiche.');
      suggestions.push('Rendi la bio più concreta sostituendo termini generici con dettagli specifici su competenze, risultati o esperienze.');
    }
  }

  private checkValueFocus(bio: GeneratedBio, warnings: string[], suggestions: string[]): void {
    const fullBio = `${bio.whoYouAre} ${bio.valueProposition}`.toLowerCase();
    
    // Conta i verbi d'azione trovati
    const foundVerbs = this.actionVerbs.filter(verb => {
      const regex = new RegExp(`\\b${verb.toLowerCase()}\\b`, 'gi');
      return regex.test(fullBio);
    });
    
    if (foundVerbs.length === 0) {
      warnings.push('La bio manca di verbi d\'azione che evidenzino il valore portato.');
      suggestions.push('Usa verbi d\'azione concreti come "aiuto", "risolvo", "creo", "sviluppo", "ottimizzo" per rendere più chiaro e tangibile il valore che porti.');
    } else if (foundVerbs.length === 1) {
      warnings.push('La bio potrebbe beneficiare di più verbi d\'azione per evidenziare meglio il valore.');
      suggestions.push('Aggiungi più verbi d\'azione specifici per descrivere meglio cosa fai e i risultati che ottieni.');
    }
    
    // Controllo se ci sono risultati misurabili o concreti
    const resultIndicators = ['risultati', 'risultato', 'risolvere', 'migliorare', 'aumentare', 'ridurre', 'ottimizzare', 'crescere', 'scalare'];
    const hasResults = resultIndicators.some(indicator => fullBio.includes(indicator));
    
    if (!hasResults && foundVerbs.length > 0) {
      suggestions.push('Considera di menzionare i risultati o benefici concreti che ottieni per i tuoi clienti/target.');
    }
  }

  private calculateScore(
    clarity: boolean,
    hasTarget: boolean,
    hasCta: boolean,
    adequateLength: boolean,
    warningsCount: number
  ): number {
    let score = 0;
    
    // Punteggio base per ogni criterio fondamentale
    if (clarity) score += 30; // Chiarezza è il più importante
    if (hasTarget) score += 25; // Target specifico aumenta la rilevanza
    if (hasCta) score += 25; // CTA è essenziale per l'azione
    if (adequateLength) score += 20; // Lunghezza adeguata
    
    // Penalità progressiva per i warning
    // I primi warning hanno meno impatto, quelli successivi pesano di più
    let penalty = 0;
    if (warningsCount > 0) {
      penalty = Math.min(5 + (warningsCount - 1) * 4, 30);
    }
    
    score = Math.max(0, score - penalty);
    
    // Bonus per bio senza warning (qualità eccellente)
    if (warningsCount === 0 && score >= 80) {
      score = Math.min(100, score + 5);
    }
    
    return Math.round(score);
  }
}

