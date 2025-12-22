export interface BioFormData {
  role: string;
  target: string;
  activity: string;
  goal: 'lavoro' | 'clienti' | 'networking' | '';
}

export interface GeneratedBio {
  whoYouAre: string;
  valueProposition: string;
  callToAction: string;
}

export interface BioAnalysis {
  clarity: boolean;
  hasTarget: boolean;
  hasCta: boolean;
  adequateLength: boolean;
  warnings: string[];
  suggestions: string[];
  score?: number;
}

export interface BioState {
  formData: BioFormData;
  currentStep: number;
  generatedBio: GeneratedBio | null;
  analysis: BioAnalysis | null;
  scoreEnabled: boolean;
}

