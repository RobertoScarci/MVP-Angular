import { Injectable } from '@angular/core';
import { StartupFormData, StartupAnalysis } from '../models/startup-form.model';

@Injectable({
  providedIn: 'root'
})
export class StartupValidationService {
  private readonly MIN_LENGTH = 50;
  private readonly MAX_LENGTH = 1000;

  // Parole chiave per problemi validi
  private problemIndicators = [
    'problema', 'sfida', 'difficoltà', 'dolore', 'pain point', 'frustrazione',
    'inefficienza', 'costo', 'tempo', 'qualità', 'accesso', 'disponibilità',
    'complessità', 'mancanza', 'gap', 'limite', 'barriera'
  ];

  // Parole chiave per soluzioni valide
  private solutionIndicators = [
    'soluzione', 'risolve', 'migliora', 'ottimizza', 'automatizza', 'semplifica',
    'accelera', 'riduce', 'aumenta', 'fornisce', 'offre', 'crea', 'sviluppa',
    'piattaforma', 'app', 'servizio', 'prodotto', 'sistema', 'tool'
  ];

  // Parole chiave per target di mercato
  private targetIndicators = [
    'aziende', 'startup', 'PMI', 'professionisti', 'utenti', 'clienti',
    'consumatori', 'mercato', 'settore', 'nicchia', 'segmento', 'audience'
  ];

  // Parole chiave per competizione
  private competitionIndicators = [
    'competitor', 'concorrenza', 'alternativa', 'simile', 'già esiste',
    'mercato saturo', 'differenziazione', 'vantaggio', 'unicità'
  ];

  // Parole chiave per modello di business
  private businessModelIndicators = [
    'ricavi', 'revenue', 'prezzo', 'abbonamento', 'subscription', 'freemium',
    'commissione', 'fee', 'vendita', 'licenza', 'B2B', 'B2C', 'monetizzazione',
    'sostenibilità', 'scalabilità', 'costi', 'margine'
  ];

  // Parole che indicano problemi comuni
  private redFlags = [
    'nessun problema', 'tutti', 'tutto', 'facile', 'semplice', 'veloce',
    'senza competizione', 'monopolio', 'garantito', 'sicuro al 100%',
    'nessun rischio', 'soldi facili', 'get rich quick'
  ];

  analyzeStartup(formData: StartupFormData, scoreEnabled: boolean = false): StartupAnalysis {
    const analysis: StartupAnalysis = {
      hasClearProblem: this.hasClearProblem(formData.problem),
      hasViableSolution: this.hasViableSolution(formData.solution),
      hasDefinedTarget: this.hasDefinedTarget(formData.targetMarket),
      hasCompetitionAnalysis: this.hasCompetitionAnalysis(formData.competition),
      hasBusinessModel: this.hasBusinessModel(formData.businessModel),
      strengths: [],
      weaknesses: [],
      improvements: [],
      risks: [],
      problemAnalysis: this.analyzeProblem(formData.problem),
      solutionAnalysis: this.analyzeSolution(formData.solution, formData.problem),
      marketAnalysis: this.analyzeMarket(formData.targetMarket),
      competitionAnalysis: this.analyzeCompetition(formData.competition),
      businessModelAnalysis: this.analyzeBusinessModel(formData.businessModel)
    };

    // Analisi complessiva
    this.identifyStrengths(analysis, formData);
    this.identifyWeaknesses(analysis, formData);
    this.identifyImprovements(analysis, formData);
    this.identifyRisks(analysis, formData);

    if (scoreEnabled) {
      analysis.overallScore = this.calculateOverallScore(analysis);
    }

    return analysis;
  }

  private hasClearProblem(problem: string): boolean {
    if (!problem || problem.trim().length < this.MIN_LENGTH) return false;
    return this.problemIndicators.some(indicator => 
      problem.toLowerCase().includes(indicator)
    );
  }

  private hasViableSolution(solution: string): boolean {
    if (!solution || solution.trim().length < this.MIN_LENGTH) return false;
    return this.solutionIndicators.some(indicator => 
      solution.toLowerCase().includes(indicator)
    );
  }

  private hasDefinedTarget(target: string): boolean {
    if (!target || target.trim().length < this.MIN_LENGTH) return false;
    return this.targetIndicators.some(indicator => 
      target.toLowerCase().includes(indicator)
    );
  }

  private hasCompetitionAnalysis(competition: string): boolean {
    if (!competition || competition.trim().length < this.MIN_LENGTH) return false;
    return this.competitionIndicators.some(indicator => 
      competition.toLowerCase().includes(indicator)
    );
  }

  private hasBusinessModel(businessModel: string): boolean {
    if (!businessModel || businessModel.trim().length < this.MIN_LENGTH) return false;
    return this.businessModelIndicators.some(indicator => 
      businessModel.toLowerCase().includes(indicator)
    );
  }

  private analyzeProblem(problem: string) {
    const analysis = {
      clarity: 0,
      urgency: 0,
      size: 0,
      issues: [] as string[]
    };

    if (!problem || problem.trim().length < this.MIN_LENGTH) {
      analysis.issues.push('Il problema non è descritto o è troppo vago');
      return analysis;
    }

    const problemLower = problem.toLowerCase();
    const words = problem.split(/\s+/).length;

    // Chiarezza
    if (words >= 20 && words <= 100) {
      analysis.clarity = 80;
    } else if (words >= 10) {
      analysis.clarity = 60;
    } else {
      analysis.clarity = 40;
      analysis.issues.push('Il problema è descritto in modo troppo sintetico');
    }

    // Urgenza (cerca indicatori di urgenza)
    const urgencyWords = ['urgente', 'critico', 'importante', 'necessario', 'essenziale', 'cruciale'];
    const hasUrgency = urgencyWords.some(word => problemLower.includes(word));
    if (hasUrgency) {
      analysis.urgency = 70;
    } else {
      analysis.urgency = 40;
      analysis.issues.push('Non è chiaro quanto sia urgente risolvere questo problema');
    }

    // Dimensione del problema (cerca indicatori di scala)
    const sizeIndicators = ['milioni', 'migliaia', 'molti', 'tutti', 'ampio', 'grande', 'vasto'];
    const hasSize = sizeIndicators.some(indicator => problemLower.includes(indicator));
    if (hasSize) {
      analysis.size = 70;
    } else {
      analysis.size = 50;
      analysis.issues.push('Non è chiaro quanto sia grande il problema o quante persone colpisce');
    }

    // Red flags
    const hasRedFlags = this.redFlags.some(flag => problemLower.includes(flag));
    if (hasRedFlags) {
      analysis.issues.push('Attenzione: il problema potrebbe essere troppo generico o poco realistico');
    }

    return analysis;
  }

  private analyzeSolution(solution: string, problem: string) {
    const analysis = {
      feasibility: 0,
      differentiation: 0,
      scalability: 0,
      issues: [] as string[]
    };

    if (!solution || solution.trim().length < this.MIN_LENGTH) {
      analysis.issues.push('La soluzione non è descritta o è troppo vaga');
      return analysis;
    }

    const solutionLower = solution.toLowerCase();
    const words = solution.split(/\s+/).length;

    // Fattibilità
    const techIndicators = ['tecnologia', 'software', 'app', 'piattaforma', 'sistema', 'algoritmo'];
    const hasTech = techIndicators.some(indicator => solutionLower.includes(indicator));
    if (hasTech && words >= 30) {
      analysis.feasibility = 70;
    } else if (words >= 20) {
      analysis.feasibility = 60;
    } else {
      analysis.feasibility = 40;
      analysis.issues.push('La soluzione è descritta in modo troppo generico');
    }

    // Differenziazione
    const diffIndicators = ['innovativo', 'unico', 'diverso', 'nuovo', 'rivoluzionario', 'differente'];
    const hasDiff = diffIndicators.some(indicator => solutionLower.includes(indicator));
    if (hasDiff) {
      analysis.differentiation = 60;
    } else {
      analysis.differentiation = 40;
      analysis.issues.push('Non è chiaro in cosa la soluzione si differenzia dalle alternative esistenti');
    }

    // Scalabilità
    const scaleIndicators = ['scalabile', 'crescita', 'espansione', 'globale', 'milioni', 'automatizzato'];
    const hasScale = scaleIndicators.some(indicator => solutionLower.includes(indicator));
    if (hasScale) {
      analysis.scalability = 70;
    } else {
      analysis.scalability = 50;
      analysis.issues.push('Non è chiaro come la soluzione possa scalare');
    }

    // Verifica coerenza con il problema
    if (problem && solution) {
      const problemWords = problem.toLowerCase().split(/\s+/);
      const solutionWords = solution.toLowerCase().split(/\s+/);
      const commonWords = problemWords.filter(w => solutionWords.includes(w) && w.length > 4);
      if (commonWords.length < 2) {
        analysis.issues.push('La soluzione potrebbe non essere direttamente collegata al problema descritto');
      }
    }

    return analysis;
  }

  private analyzeMarket(target: string) {
    const analysis = {
      size: 0,
      accessibility: 0,
      growth: 0,
      issues: [] as string[]
    };

    if (!target || target.trim().length < this.MIN_LENGTH) {
      analysis.issues.push('Il target di mercato non è definito');
      return analysis;
    }

    const targetLower = target.toLowerCase();
    const words = target.split(/\s+/).length;

    // Dimensione del mercato
    const sizeIndicators = ['grande', 'ampio', 'milioni', 'migliaia', 'crescente', 'in crescita'];
    const hasSize = sizeIndicators.some(indicator => targetLower.includes(indicator));
    if (hasSize) {
      analysis.size = 70;
    } else {
      analysis.size = 50;
      analysis.issues.push('Non è chiaro quanto sia grande il mercato target');
    }

    // Accessibilità
    const accessIndicators = ['accessibile', 'raggiungibile', 'contattabile', 'online', 'digitale'];
    const hasAccess = accessIndicators.some(indicator => targetLower.includes(indicator));
    if (hasAccess) {
      analysis.accessibility = 70;
    } else {
      analysis.accessibility = 50;
      analysis.issues.push('Non è chiaro come raggiungere il target di mercato');
    }

    // Crescita
    const growthIndicators = ['crescita', 'crescente', 'in espansione', 'emergente', 'nuovo'];
    const hasGrowth = growthIndicators.some(indicator => targetLower.includes(indicator));
    if (hasGrowth) {
      analysis.growth = 70;
    } else {
      analysis.growth = 50;
      analysis.issues.push('Non è chiaro se il mercato è in crescita o stabile');
    }

    // Troppo generico
    if (targetLower.includes('tutti') || targetLower.includes('chiunque')) {
      analysis.issues.push('Il target è troppo generico. Sii più specifico');
      analysis.size = Math.max(0, analysis.size - 20);
    }

    return analysis;
  }

  private analyzeCompetition(competition: string) {
    const analysis = {
      awareness: 0,
      differentiation: 0,
      competitiveAdvantage: 0,
      issues: [] as string[]
    };

    if (!competition || competition.trim().length < this.MIN_LENGTH) {
      analysis.issues.push('L\'analisi della competizione è mancante o insufficiente');
      return analysis;
    }

    const competitionLower = competition.toLowerCase();

    // Consapevolezza della competizione
    const competitorNames = competitionLower.match(/\b[a-z]+\b/g) || [];
    if (competitorNames.length >= 3) {
      analysis.awareness = 80;
    } else if (competitorNames.length >= 1) {
      analysis.awareness = 60;
    } else {
      analysis.awareness = 30;
      analysis.issues.push('Non sono menzionati competitor specifici');
    }

    // Differenziazione
    const diffIndicators = ['diverso', 'meglio', 'più', 'migliore', 'unico', 'innovativo'];
    const hasDiff = diffIndicators.some(indicator => competitionLower.includes(indicator));
    if (hasDiff) {
      analysis.differentiation = 70;
    } else {
      analysis.differentiation = 40;
      analysis.issues.push('Non è chiaro come ti differenzi dalla competizione');
    }

    // Vantaggio competitivo
    const advantageIndicators = ['vantaggio', 'superiore', 'migliore', 'più veloce', 'più economico', 'più facile'];
    const hasAdvantage = advantageIndicators.some(indicator => competitionLower.includes(indicator));
    if (hasAdvantage) {
      analysis.competitiveAdvantage = 70;
    } else {
      analysis.competitiveAdvantage = 40;
      analysis.issues.push('Non è chiaro quale sia il tuo vantaggio competitivo');
    }

    // Red flag: "non c'è competizione"
    if (competitionLower.includes('nessun') && competitionLower.includes('competitor')) {
      analysis.issues.push('Attenzione: è raro che non ci sia competizione. Potresti non averla identificata correttamente');
      analysis.awareness = Math.max(0, analysis.awareness - 30);
    }

    return analysis;
  }

  private analyzeBusinessModel(businessModel: string) {
    const analysis = {
      clarity: 0,
      sustainability: 0,
      scalability: 0,
      issues: [] as string[]
    };

    if (!businessModel || businessModel.trim().length < this.MIN_LENGTH) {
      analysis.issues.push('Il modello di business non è descritto');
      return analysis;
    }

    const modelLower = businessModel.toLowerCase();
    const words = businessModel.split(/\s+/).length;

    // Chiarezza
    if (words >= 30) {
      analysis.clarity = 70;
    } else if (words >= 15) {
      analysis.clarity = 50;
    } else {
      analysis.clarity = 30;
      analysis.issues.push('Il modello di business è descritto in modo troppo sintetico');
    }

    // Sostenibilità
    const revenueIndicators = ['ricavi', 'revenue', 'prezzo', 'abbonamento', 'vendita', 'commissione', 'fee'];
    const hasRevenue = revenueIndicators.some(indicator => modelLower.includes(indicator));
    if (hasRevenue) {
      analysis.sustainability = 70;
    } else {
      analysis.sustainability = 40;
      analysis.issues.push('Non è chiaro come genererai ricavi');
    }

    // Scalabilità
    const scaleIndicators = ['scalabile', 'crescita', 'margine', 'costi', 'automatizzato'];
    const hasScale = scaleIndicators.some(indicator => modelLower.includes(indicator));
    if (hasScale) {
      analysis.scalability = 70;
    } else {
      analysis.scalability = 50;
      analysis.issues.push('Non è chiaro come il modello di business possa scalare');
    }

    return analysis;
  }

  private identifyStrengths(analysis: StartupAnalysis, formData: StartupFormData): void {
    if (analysis.problemAnalysis.clarity >= 70) {
      analysis.strengths.push('Problema descritto in modo chiaro e dettagliato');
    }
    if (analysis.problemAnalysis.urgency >= 70) {
      analysis.strengths.push('Il problema sembra urgente e importante per il target');
    }
    if (analysis.solutionAnalysis.feasibility >= 70) {
      analysis.strengths.push('La soluzione sembra fattibile e ben pensata');
    }
    if (analysis.solutionAnalysis.differentiation >= 70) {
      analysis.strengths.push('La soluzione si differenzia chiaramente dalle alternative');
    }
    if (analysis.marketAnalysis.size >= 70) {
      analysis.strengths.push('Il mercato target sembra avere buone dimensioni');
    }
    if (analysis.competitionAnalysis.awareness >= 70) {
      analysis.strengths.push('Hai una buona consapevolezza della competizione');
    }
    if (analysis.competitionAnalysis.competitiveAdvantage >= 70) {
      analysis.strengths.push('Hai identificato un chiaro vantaggio competitivo');
    }
    if (analysis.businessModelAnalysis.sustainability >= 70) {
      analysis.strengths.push('Il modello di business sembra sostenibile');
    }
  }

  private identifyWeaknesses(analysis: StartupAnalysis, formData: StartupFormData): void {
    if (analysis.problemAnalysis.clarity < 50) {
      analysis.weaknesses.push('Il problema non è descritto con sufficiente chiarezza');
    }
    if (analysis.problemAnalysis.urgency < 50) {
      analysis.weaknesses.push('Non è chiaro quanto sia urgente risolvere il problema');
    }
    if (analysis.solutionAnalysis.feasibility < 50) {
      analysis.weaknesses.push('La fattibilità della soluzione non è chiara');
    }
    if (analysis.solutionAnalysis.differentiation < 50) {
      analysis.weaknesses.push('La differenziazione dalla competizione è debole');
    }
    if (analysis.marketAnalysis.size < 50) {
      analysis.weaknesses.push('Il mercato target potrebbe essere troppo piccolo o poco definito');
    }
    if (analysis.competitionAnalysis.awareness < 50) {
      analysis.weaknesses.push('La conoscenza della competizione è insufficiente');
    }
    if (analysis.businessModelAnalysis.clarity < 50) {
      analysis.weaknesses.push('Il modello di business non è chiaramente definito');
    }
    if (analysis.businessModelAnalysis.sustainability < 50) {
      analysis.weaknesses.push('La sostenibilità economica del modello è incerta');
    }
  }

  private identifyImprovements(analysis: StartupAnalysis, formData: StartupFormData): void {
    // Miglioramenti basati sulle issues
    analysis.problemAnalysis.issues.forEach(issue => {
      analysis.improvements.push(`Problema: ${issue}`);
    });
    analysis.solutionAnalysis.issues.forEach(issue => {
      analysis.improvements.push(`Soluzione: ${issue}`);
    });
    analysis.marketAnalysis.issues.forEach(issue => {
      analysis.improvements.push(`Mercato: ${issue}`);
    });
    analysis.competitionAnalysis.issues.forEach(issue => {
      analysis.improvements.push(`Competizione: ${issue}`);
    });
    analysis.businessModelAnalysis.issues.forEach(issue => {
      analysis.improvements.push(`Modello di business: ${issue}`);
    });

    // Miglioramenti generali
    if (analysis.problemAnalysis.size < 60) {
      analysis.improvements.push('Quantifica meglio la dimensione del problema (quante persone colpisce?)');
    }
    if (analysis.solutionAnalysis.scalability < 60) {
      analysis.improvements.push('Spiega meglio come la soluzione può scalare');
    }
    if (analysis.marketAnalysis.accessibility < 60) {
      analysis.improvements.push('Definisci meglio come raggiungere il tuo target di mercato');
    }
  }

  private identifyRisks(analysis: StartupAnalysis, formData: StartupFormData): void {
    // Rischi critici
    if (analysis.problemAnalysis.clarity < 40) {
      analysis.risks.push('RISCHIO ALTO: Il problema non è chiaro - potresti risolvere un problema che non esiste');
    }
    if (analysis.solutionAnalysis.feasibility < 40) {
      analysis.risks.push('RISCHIO ALTO: La soluzione potrebbe non essere fattibile tecnicamente o economicamente');
    }
    if (analysis.marketAnalysis.size < 40) {
      analysis.risks.push('RISCHIO ALTO: Il mercato potrebbe essere troppo piccolo per sostenere il business');
    }
    if (analysis.competitionAnalysis.awareness < 40) {
      analysis.risks.push('RISCHIO ALTO: Non conoscere la competizione può portare a fallire nel mercato');
    }
    if (analysis.businessModelAnalysis.sustainability < 40) {
      analysis.risks.push('RISCHIO ALTO: Il modello di business potrebbe non essere sostenibile nel lungo termine');
    }

    // Rischi medi
    if (analysis.solutionAnalysis.differentiation < 50) {
      analysis.risks.push('RISCHIO MEDIO: Senza differenziazione chiara, sarà difficile competere');
    }
    if (analysis.marketAnalysis.accessibility < 50) {
      analysis.risks.push('RISCHIO MEDIO: Se non riesci a raggiungere il target, il business non decollerà');
    }
    if (analysis.businessModelAnalysis.scalability < 50) {
      analysis.risks.push('RISCHIO MEDIO: Un modello non scalabile limita la crescita');
    }

    // Rischi specifici
    const allText = `${formData.problem} ${formData.solution} ${formData.targetMarket}`.toLowerCase();
    if (allText.includes('tutti') || allText.includes('chiunque')) {
      analysis.risks.push('RISCHIO: Target troppo generico - "tutti" non è un target di mercato');
    }
    if (allText.includes('facile') || allText.includes('semplice')) {
      analysis.risks.push('RISCHIO: Se fosse così facile, qualcuno l\'avrebbe già fatto');
    }
  }

  private calculateOverallScore(analysis: StartupAnalysis): number {
    let score = 0;
    const weights = {
      problem: 0.20,
      solution: 0.25,
      market: 0.20,
      competition: 0.15,
      businessModel: 0.20
    };

    // Punteggio problema
    const problemScore = (
      analysis.problemAnalysis.clarity * 0.4 +
      analysis.problemAnalysis.urgency * 0.3 +
      analysis.problemAnalysis.size * 0.3
    );
    score += problemScore * weights.problem;

    // Punteggio soluzione
    const solutionScore = (
      analysis.solutionAnalysis.feasibility * 0.4 +
      analysis.solutionAnalysis.differentiation * 0.3 +
      analysis.solutionAnalysis.scalability * 0.3
    );
    score += solutionScore * weights.solution;

    // Punteggio mercato
    const marketScore = (
      analysis.marketAnalysis.size * 0.4 +
      analysis.marketAnalysis.accessibility * 0.3 +
      analysis.marketAnalysis.growth * 0.3
    );
    score += marketScore * weights.market;

    // Punteggio competizione
    const competitionScore = (
      analysis.competitionAnalysis.awareness * 0.3 +
      analysis.competitionAnalysis.differentiation * 0.4 +
      analysis.competitionAnalysis.competitiveAdvantage * 0.3
    );
    score += competitionScore * weights.competition;

    // Punteggio modello di business
    const businessModelScore = (
      analysis.businessModelAnalysis.clarity * 0.3 +
      analysis.businessModelAnalysis.sustainability * 0.4 +
      analysis.businessModelAnalysis.scalability * 0.3
    );
    score += businessModelScore * weights.businessModel;

    // Penalità per rischi critici
    const criticalRisks = analysis.risks.filter(r => r.includes('RISCHIO ALTO')).length;
    score -= criticalRisks * 10;

    // Bonus per punti forti
    if (analysis.strengths.length >= 5) {
      score += 5;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }
}

