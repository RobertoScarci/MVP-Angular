import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StartupFormData, StartupState, StartupAnalysis } from '../models/startup-form.model';

@Injectable({
  providedIn: 'root'
})
export class StartupStateService {
  private initialState: StartupState = {
    formData: {
      problem: '',
      solution: '',
      targetMarket: '',
      competition: '',
      businessModel: ''
    },
    currentStep: 0,
    analysis: null,
    scoreEnabled: false
  };

  private stateSubject = new BehaviorSubject<StartupState>(this.initialState);
  public state$: Observable<StartupState> = this.stateSubject.asObservable();

  constructor() {}

  getCurrentState(): StartupState {
    return this.stateSubject.value;
  }

  updateFormData(formData: Partial<StartupFormData>): void {
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

  setAnalysis(analysis: StartupAnalysis): void {
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

