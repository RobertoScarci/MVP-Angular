export interface StartupFormData {
  problem: string;           // Problema che risolve
  solution: string;          // Soluzione proposta
  targetMarket: string;      // Target di mercato
  competition: string;       // Competizione esistente
  businessModel: string;     // Modello di business
}

export interface StartupAnalysis {
  // Criteri base
  hasClearProblem: boolean;
  hasViableSolution: boolean;
  hasDefinedTarget: boolean;
  hasCompetitionAnalysis: boolean;
  hasBusinessModel: boolean;
  
  // Analisi approfondita
  strengths: string[];       // Punti forti
  weaknesses: string[];      // Aspetti negativi / debolezze
  improvements: string[];    // Cosa migliorare
  risks: string[];          // Cosa potrebbe far crollare tutto
  
  // Dettagli per categoria
  problemAnalysis: {
    clarity: number;        // 0-100
    urgency: number;        // 0-100
    size: number;          // 0-100
    issues: string[];
  };
  
  solutionAnalysis: {
    feasibility: number;    // 0-100
    differentiation: number; // 0-100
    scalability: number;   // 0-100
    issues: string[];
  };
  
  marketAnalysis: {
    size: number;          // 0-100
    accessibility: number;  // 0-100
    growth: number;        // 0-100
    issues: string[];
  };
  
  competitionAnalysis: {
    awareness: number;     // 0-100
    differentiation: number; // 0-100
    competitiveAdvantage: number; // 0-100
    issues: string[];
  };
  
  businessModelAnalysis: {
    clarity: number;       // 0-100
    sustainability: number; // 0-100
    scalability: number;   // 0-100
    issues: string[];
  };
  
  // Punteggio complessivo
  overallScore?: number;   // 0-100
}

export interface StartupState {
  formData: StartupFormData;
  currentStep: number;
  analysis: StartupAnalysis | null;
  scoreEnabled: boolean;
}

