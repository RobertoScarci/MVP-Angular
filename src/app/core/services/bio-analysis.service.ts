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
    'fornisco', 'forniamo', 'offro', 'offriamo', 'garantisco', 'garantiamo'
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
    
    // Template più sofisticati e variati
    const templates = [
      `${role}${target ? ` specializzato nel supportare ${target}` : ''}`,
      `${role}${target ? ` con focus su ${target}` : ''}`,
      `${role}${target ? ` che trasforma le sfide di ${target} in opportunità` : ''}`,
      `${role}${target ? ` dedicato a ${target}` : ''}`,
      `${role}${target ? ` che accompagna ${target} nella crescita digitale` : ''}`
    ];
    
    const selected = templates[Math.floor(Math.random() * templates.length)];
    return this.capitalizeFirst(selected) + '.';
  }

  private generateValueProposition(role: string, target: string, activity: string): string {
    if (!activity) return '';
    
    // Analizza l'attività per estrarre verbi d'azione e risultati
    const activityLower = activity.toLowerCase();
    
    // Verbi d'azione trovati nell'attività
    const foundVerbs = this.actionVerbs.filter(verb => 
      activityLower.includes(verb.toLowerCase())
    );
    
    // Template più sofisticati basati sul contenuto
    let proposition = '';
    
    if (foundVerbs.length > 0) {
      // Se ci sono verbi d'azione, costruisci una proposizione più strutturata
      const verb = foundVerbs[0];
      const activityCleaned = this.enhanceActivity(activity, verb);
      
      if (target) {
        const valueTemplates = [
          `${activityCleaned}, aiutando ${target} a raggiungere risultati concreti`,
          `${activityCleaned}. Il mio obiettivo è supportare ${target} nel loro percorso di crescita`,
          `${activityCleaned}, trasformando le esigenze di ${target} in soluzioni efficaci`,
          `${activityCleaned}. Lavoro con ${target} per creare valore duraturo`,
          `${activityCleaned}, guidando ${target} verso il successo attraverso soluzioni innovative`
        ];
        proposition = valueTemplates[Math.floor(Math.random() * valueTemplates.length)];
      } else {
        proposition = activityCleaned;
      }
    } else {
      // Se non ci sono verbi d'azione espliciti, aggiungili
      const enhancedActivity = this.addActionVerb(activity);
      if (target) {
        proposition = `${enhancedActivity} per ${target}`;
      } else {
        proposition = enhancedActivity;
      }
    }
    
    return this.capitalizeFirst(proposition) + '.';
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
    // Aggiungi un verbo d'azione appropriato se manca
    const activityLower = activity.toLowerCase();
    
    // Verbi appropriati per diversi contesti
    if (activityLower.includes('sviluppo') || activityLower.includes('codice') || activityLower.includes('applicazione')) {
      return `Sviluppo ${activity}`;
    }
    if (activityLower.includes('marketing') || activityLower.includes('comunicazione') || activityLower.includes('brand')) {
      return `Creo strategie di ${activity}`;
    }
    if (activityLower.includes('consulenza') || activityLower.includes('consulente')) {
      return `Offro consulenza per ${activity}`;
    }
    if (activityLower.includes('design') || activityLower.includes('ui') || activityLower.includes('ux')) {
      return `Progetto ${activity}`;
    }
    
    // Default: aggiungi un verbo generico ma efficace
    return `Aiuto le aziende attraverso ${activity}`;
  }

  private capitalizeFirst(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private generateCallToAction(goal: string, target: string): string {
    if (!goal) return '';
    
    const ctaMap: Record<string, string[]> = {
      'lavoro': [
        'Aperto a nuove opportunità che mi permettano di fare la differenza.',
        'In cerca di progetti stimolanti dove poter applicare le mie competenze.',
        'Disponibile per nuove sfide professionali in team dinamici e innovativi.',
        'Aperto a collaborazioni che valorizzino il mio contributo e la mia crescita.'
      ],
      'clienti': [
        `Contattami per scoprire come posso aiutare ${target || 'la tua azienda'} a raggiungere i suoi obiettivi.`,
        'Scrivimi per una consulenza personalizzata e soluzioni su misura.',
        'Pronto a discutere come possiamo lavorare insieme per ottenere risultati concreti.',
        'Contattami per esplorare come possiamo creare valore insieme.'
      ],
      'networking': [
        'Aperto a connessioni significative e collaborazioni che portino valore reciproco.',
        'Sempre interessato a conoscere professionisti con cui condividere idee e progetti.',
        'Connessioni aperte per networking costruttivo e opportunità di crescita.',
        'Pronto a connettermi con chi condivide la passione per l\'innovazione e l\'eccellenza.'
      ]
    };
    
    const ctas = ctaMap[goal] || ['Contattami per saperne di più.'];
    return ctas[Math.floor(Math.random() * ctas.length)];
  }

  private checkClarity(bio: GeneratedBio, warnings: string[], suggestions: string[]): boolean {
    const sections = [bio.whoYouAre, bio.valueProposition, bio.callToAction];
    const emptySections = sections.filter(s => !s || s.trim().length === 0).length;
    
    if (emptySections > 0) {
      warnings.push('Alcune sezioni della bio sono vuote o incomplete.');
      suggestions.push('Completa tutte le sezioni per una bio più efficace.');
      return false;
    }
    
    const allShort = sections.every(s => s.length < 30);
    if (allShort) {
      warnings.push('Le sezioni sono troppo brevi e poco descrittive.');
      suggestions.push('Aggiungi più dettagli per rendere la bio più chiara e coinvolgente.');
      return false;
    }
    
    return true;
  }

  private checkTargetPresence(bio: GeneratedBio, target: string, warnings: string[]): boolean {
    if (!target) return false;
    
    const fullBio = `${bio.whoYouAre} ${bio.valueProposition} ${bio.callToAction}`.toLowerCase();
    const targetLower = target.toLowerCase();
    
    if (!fullBio.includes(targetLower)) {
      warnings.push('Il target specificato non è menzionato esplicitamente nella bio.');
      return false;
    }
    
    return true;
  }

  private checkCtaPresence(bio: GeneratedBio, warnings: string[]): boolean {
    const ctaIndicators = ['contattami', 'scrivimi', 'connessioni', 'aperto', 'disponibile', 'discutere'];
    const ctaLower = bio.callToAction.toLowerCase();
    
    const hasCta = ctaIndicators.some(indicator => ctaLower.includes(indicator));
    
    if (!hasCta) {
      warnings.push('La call to action non è chiara o mancante.');
      return false;
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
    const selfRefCount = this.selfReferenceWords.filter(word => 
      bioLower.includes(word)
    ).length;
    
    if (selfRefCount > 5) {
      warnings.push('La bio è troppo autoreferenziale. Troppi riferimenti a "io", "mio", ecc.');
      suggestions.push('Usa un linguaggio più orientato al valore per il lettore, evitando troppi riferimenti personali.');
    }
  }

  private checkVagueMessages(bio: GeneratedBio, warnings: string[], suggestions: string[]): void {
    const fullBio = `${bio.whoYouAre} ${bio.valueProposition}`.toLowerCase();
    const vagueCount = this.vagueWords.filter(word => 
      fullBio.includes(word.toLowerCase())
    ).length;
    
    if (vagueCount > 2) {
      warnings.push('La bio contiene troppe parole vaghe come "esperto", "qualificato", ecc.');
      suggestions.push('Sostituisci le parole vaghe con descrizioni concrete di cosa fai e quali risultati ottieni.');
    }
  }

  private checkValueFocus(bio: GeneratedBio, warnings: string[], suggestions: string[]): void {
    const fullBio = `${bio.whoYouAre} ${bio.valueProposition}`.toLowerCase();
    const hasActionVerbs = this.actionVerbs.some(verb => 
      fullBio.includes(verb.toLowerCase())
    );
    
    if (!hasActionVerbs) {
      warnings.push('La bio manca di verbi d\'azione che evidenzino il valore portato.');
      suggestions.push('Usa verbi d\'azione come "aiuto", "risolvo", "creo" per rendere più chiaro il tuo valore.');
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
    
    if (clarity) score += 25;
    if (hasTarget) score += 25;
    if (hasCta) score += 25;
    if (adequateLength) score += 25;
    
    const penalty = Math.min(warningsCount * 5, 20);
    score = Math.max(0, score - penalty);
    
    return Math.round(score);
  }
}

