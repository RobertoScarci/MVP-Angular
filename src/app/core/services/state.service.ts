import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BioFormData, BioState, GeneratedBio, BioAnalysis } from '../models/bio-form.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: BioState = {
    formData: {
      role: '',
      target: '',
      activity: '',
      goal: ''
    },
    currentStep: 0,
    generatedBio: null,
    analysis: null,
    scoreEnabled: false
  };

  private stateSubject = new BehaviorSubject<BioState>(this.initialState);
  public state$: Observable<BioState> = this.stateSubject.asObservable();

  constructor() {}

  getCurrentState(): BioState {
    return this.stateSubject.value;
  }

  updateFormData(formData: Partial<BioFormData>): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      formData: { ...currentState.formData, ...formData }
    });
  }

  setCurrentStep(step: number): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      currentStep: step
    });
  }

  setGeneratedBio(bio: GeneratedBio): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      generatedBio: bio
    });
  }

  setAnalysis(analysis: BioAnalysis): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      analysis
    });
  }

  toggleScore(): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      scoreEnabled: !currentState.scoreEnabled
    });
  }

  reset(): void {
    this.stateSubject.next(this.initialState);
  }
}

