import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
  score: number; // 0-100
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private readonly MIN_WORDS = 2;
  private readonly MAX_WORDS_ROLE = 8;
  private readonly MAX_WORDS_TARGET = 10;
  private readonly MAX_WORDS_ACTIVITY = 50;

  // Pattern per parole italiane comuni (verbi, nomi, aggettivi)
  private readonly ITALIAN_WORD_PATTERN = /^[a-zA-Zàèéìíîòóùú]+$/;
  
  // Termini professionali comuni
  private readonly PROFESSIONAL_TERMS = [
    'developer', 'sviluppatore', 'consulente', 'manager', 'designer', 'marketing',
    'frontend', 'backend', 'fullstack', 'digital', 'web', 'mobile', 'app',
    'startup', 'azienda', 'cliente', 'progetto', 'soluzione', 'servizio',
    'esperienza', 'competenza', 'skill', 'tecnologia', 'piattaforma', 'sistema'
  ];

  // Parole sospette o non professionali
  private readonly SUSPICIOUS_WORDS = [
    'asdf', 'qwerty', 'test', 'prova', 'ciao', 'hello', 'abc', 'xyz',
    '123', 'aaa', 'bbb', 'ccc', 'lorem', 'ipsum'
  ];

  validateRole(role: string): ValidationResult {
    const errors: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    if (!role || role.trim().length === 0) {
      return { isValid: false, errors: ['Il ruolo è obbligatorio'], suggestions: [], score: 0 };
    }

    const trimmed = role.trim();
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);

    // Controllo lunghezza
    if (trimmed.length < 3) {
      errors.push('Il ruolo è troppo breve (minimo 3 caratteri)');
      score -= 30;
    }

    if (trimmed.length > 100) {
      errors.push('Il ruolo è troppo lungo (massimo 100 caratteri)');
      score -= 20;
    }

    if (words.length < this.MIN_WORDS) {
      errors.push(`Il ruolo deve contenere almeno ${this.MIN_WORDS} parole`);
      suggestions.push('Esempio: "Frontend Developer" o "Digital Marketing Consultant"');
      score -= 25;
    }

    if (words.length > this.MAX_WORDS_ROLE) {
      errors.push(`Il ruolo è troppo lungo (massimo ${this.MAX_WORDS_ROLE} parole)`);
      suggestions.push('Sintetizza il ruolo in poche parole chiave');
      score -= 15;
    }

    // Controllo caratteri validi
    const invalidChars = this.findInvalidCharacters(trimmed);
    if (invalidChars.length > 0) {
      errors.push(`Caratteri non validi trovati: ${invalidChars.join(', ')}`);
      score -= 20;
    }

    // Controllo parole sospette
    const suspicious = this.findSuspiciousWords(trimmed);
    if (suspicious.length > 0) {
      errors.push(`Parole sospette rilevate: ${suspicious.join(', ')}`);
      suggestions.push('Usa termini professionali reali e specifici');
      score -= 40;
    }

    // Controllo solo numeri o simboli
    if (/^[\d\s\W]+$/.test(trimmed)) {
      errors.push('Il ruolo non può contenere solo numeri o simboli');
      suggestions.push('Inserisci un ruolo professionale reale con parole');
      score -= 50;
    }

    // Controllo ripetizioni eccessive
    if (this.hasExcessiveRepetition(trimmed)) {
      errors.push('Troppe ripetizioni di caratteri o parole');
      suggestions.push('Verifica di aver scritto correttamente il ruolo');
      score -= 30;
    }

    // Controllo presenza di almeno una parola valida
    const validWords = words.filter(w => this.isValidWord(w));
    if (validWords.length === 0) {
      errors.push('Nessuna parola valida trovata');
      suggestions.push('Usa parole italiane o inglesi comuni nel contesto professionale');
      score -= 50;
    }

    // Suggerimenti positivi
    if (this.containsProfessionalTerms(trimmed)) {
      suggestions.push('Ottimo! Hai usato termini professionali appropriati');
    }

    if (words.length >= 2 && words.length <= 4) {
      suggestions.push('Lunghezza del ruolo ottimale');
    }

    const isValid = errors.length === 0;
    score = Math.max(0, Math.min(100, score));

    return { isValid, errors, suggestions, score };
  }

  validateTarget(target: string): ValidationResult {
    const errors: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    if (!target || target.trim().length === 0) {
      return { isValid: false, errors: ['Il target è obbligatorio'], suggestions: [], score: 0 };
    }

    const trimmed = target.trim();
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);

    // Controllo lunghezza
    if (trimmed.length < 5) {
      errors.push('Il target è troppo breve (minimo 5 caratteri)');
      score -= 30;
    }

    if (trimmed.length > 150) {
      errors.push('Il target è troppo lungo (massimo 150 caratteri)');
      score -= 20;
    }

    if (words.length < this.MIN_WORDS) {
      errors.push(`Il target deve contenere almeno ${this.MIN_WORDS} parole`);
      suggestions.push('Esempio: "startup tech" o "PMI digitali"');
      score -= 25;
    }

    if (words.length > this.MAX_WORDS_TARGET) {
      errors.push(`Il target è troppo lungo (massimo ${this.MAX_WORDS_TARGET} parole)`);
      suggestions.push('Sintetizza il target in poche parole chiave');
      score -= 15;
    }

    // Controllo caratteri validi
    const invalidChars = this.findInvalidCharacters(trimmed);
    if (invalidChars.length > 0) {
      errors.push(`Caratteri non validi trovati: ${invalidChars.join(', ')}`);
      score -= 20;
    }

    // Controllo parole sospette
    const suspicious = this.findSuspiciousWords(trimmed);
    if (suspicious.length > 0) {
      errors.push(`Parole sospette rilevate: ${suspicious.join(', ')}`);
      suggestions.push('Usa termini professionali reali per descrivere il tuo target');
      score -= 40;
    }

    // Controllo solo numeri o simboli
    if (/^[\d\s\W]+$/.test(trimmed)) {
      errors.push('Il target non può contenere solo numeri o simboli');
      suggestions.push('Descrivi il tuo target con parole reali');
      score -= 50;
    }

    // Controllo presenza di almeno una parola valida
    const validWords = words.filter(w => this.isValidWord(w));
    if (validWords.length === 0) {
      errors.push('Nessuna parola valida trovata');
      suggestions.push('Usa parole italiane o inglesi comuni per descrivere il target');
      score -= 50;
    }

    // Suggerimenti positivi
    if (this.containsProfessionalTerms(trimmed)) {
      suggestions.push('Ottimo! Hai usato termini professionali appropriati');
    }

    const isValid = errors.length === 0;
    score = Math.max(0, Math.min(100, score));

    return { isValid, errors, suggestions, score };
  }

  validateActivity(activity: string): ValidationResult {
    const errors: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    if (!activity || activity.trim().length === 0) {
      return { isValid: false, errors: ['Le attività sono obbligatorie'], suggestions: [], score: 0 };
    }

    const trimmed = activity.trim();
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);

    // Controllo lunghezza
    if (trimmed.length < 50) {
      errors.push('Le attività sono troppo brevi (minimo 50 caratteri)');
      suggestions.push('Descrivi in dettaglio cosa fai e il valore che porti');
      score -= 30;
    }

    if (trimmed.length > 500) {
      errors.push('Le attività sono troppo lunghe (massimo 500 caratteri)');
      suggestions.push('Sintetizza mantenendo solo le informazioni più importanti');
      score -= 20;
    }

    if (words.length < 8) {
      errors.push('Le attività devono contenere almeno 8 parole');
      suggestions.push('Aggiungi più dettagli su cosa fai concretamente');
      score -= 25;
    }

    if (words.length > this.MAX_WORDS_ACTIVITY) {
      errors.push(`Le attività sono troppo lunghe (massimo ${this.MAX_WORDS_ACTIVITY} parole)`);
      score -= 15;
    }

    // Controllo caratteri validi
    const invalidChars = this.findInvalidCharacters(trimmed);
    if (invalidChars.length > 0) {
      errors.push(`Caratteri non validi trovati: ${invalidChars.join(', ')}`);
      score -= 20;
    }

    // Controllo parole sospette
    const suspicious = this.findSuspiciousWords(trimmed);
    if (suspicious.length > 0) {
      errors.push(`Parole sospette rilevate: ${suspicious.join(', ')}`);
      suggestions.push('Usa termini professionali reali e descrizioni concrete');
      score -= 40;
    }

    // Controllo solo numeri o simboli
    if (/^[\d\s\W]+$/.test(trimmed)) {
      errors.push('Le attività non possono contenere solo numeri o simboli');
      suggestions.push('Descrivi le tue attività con parole reali');
      score -= 50;
    }

    // Controllo presenza di verbi d'azione
    const actionVerbs = ['aiuto', 'sviluppo', 'creo', 'progetto', 'gestisco', 'ottimizzo', 
                         'miglioro', 'supporto', 'fornisco', 'offro', 'risolvo', 'trasformo'];
    const hasActionVerb = actionVerbs.some(verb => 
      trimmed.toLowerCase().includes(verb)
    );
    
    if (!hasActionVerb && words.length >= 8) {
      errors.push('Manca un verbo d\'azione che descriva cosa fai');
      suggestions.push('Inizia con verbi come "Sviluppo", "Creo", "Aiuto", "Progetto"');
      score -= 20;
    }

    // Controllo presenza di almeno una parola valida
    const validWords = words.filter(w => this.isValidWord(w));
    if (validWords.length < words.length * 0.7) {
      errors.push('Troppe parole non valide o sospette');
      suggestions.push('Verifica di aver scritto correttamente le tue attività');
      score -= 30;
    }

    // Controllo ripetizioni eccessive
    if (this.hasExcessiveRepetition(trimmed)) {
      errors.push('Troppe ripetizioni di caratteri o parole');
      suggestions.push('Variare il linguaggio rende la descrizione più professionale');
      score -= 20;
    }

    // Suggerimenti positivi
    if (this.containsProfessionalTerms(trimmed)) {
      suggestions.push('Ottimo! Hai usato termini professionali appropriati');
    }

    if (hasActionVerb) {
      suggestions.push('Ottimo! Hai incluso verbi d\'azione che rendono la descrizione più efficace');
    }

    if (trimmed.length >= 100 && trimmed.length <= 300) {
      suggestions.push('Lunghezza ottimale per una descrizione professionale');
    }

    const isValid = errors.length === 0;
    score = Math.max(0, Math.min(100, score));

    return { isValid, errors, suggestions, score };
  }

  // Validator per Angular Forms
  roleValidator = (control: AbstractControl): ValidationErrors | null => {
    const result = this.validateRole(control.value || '');
    return result.isValid ? null : { invalidRole: { errors: result.errors, suggestions: result.suggestions } };
  };

  targetValidator = (control: AbstractControl): ValidationErrors | null => {
    const result = this.validateTarget(control.value || '');
    return result.isValid ? null : { invalidTarget: { errors: result.errors, suggestions: result.suggestions } };
  };

  activityValidator = (control: AbstractControl): ValidationErrors | null => {
    const result = this.validateActivity(control.value || '');
    return result.isValid ? null : { invalidActivity: { errors: result.errors, suggestions: result.suggestions } };
  };

  // Metodi privati di supporto
  private isValidWord(word: string): boolean {
    if (word.length < 2) return false;
    // Rimuovi punteggiatura finale
    const cleanWord = word.replace(/[.,;:!?]+$/, '');
    // Controlla pattern base (lettere, accenti italiani)
    return /^[a-zA-Zàèéìíîòóùú]+$/.test(cleanWord) && cleanWord.length >= 2;
  }

  private findInvalidCharacters(text: string): string[] {
    // Caratteri non validi (esclusi lettere, numeri, spazi, punteggiatura comune)
    const invalidPattern = /[^a-zA-Zàèéìíîòóùú0-9\s.,;:!?'"()-]/g;
    const matches = text.match(invalidPattern);
    return matches ? [...new Set(matches)] : [];
  }

  private findSuspiciousWords(text: string): string[] {
    const lowerText = text.toLowerCase();
    return this.SUSPICIOUS_WORDS.filter(word => lowerText.includes(word));
  }

  private hasExcessiveRepetition(text: string): boolean {
    // Controlla ripetizioni di caratteri (es. "aaaa", "1111")
    if (/(.)\1{3,}/.test(text)) return true;
    
    // Controlla ripetizioni di parole
    const words = text.toLowerCase().split(/\s+/);
    const wordCounts = new Map<string, number>();
    words.forEach(word => {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    });
    
    // Se una parola appare più di 3 volte in un testo breve, è sospetto
    for (const [word, count] of wordCounts.entries()) {
      if (word.length > 2 && count > 3 && text.length < 200) {
        return true;
      }
    }
    
    return false;
  }

  private containsProfessionalTerms(text: string): boolean {
    const lowerText = text.toLowerCase();
    return this.PROFESSIONAL_TERMS.some(term => lowerText.includes(term.toLowerCase()));
  }
}

