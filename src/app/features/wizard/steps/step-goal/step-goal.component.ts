import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';
import { BioAnalysisService } from '@core/services/bio-analysis.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-step-goal',
  template: `
    <app-wizard>
      <app-progress-indicator 
        [currentStep]="3" 
        [steps]="['Ruolo', 'Target', 'Attività', 'Obiettivo']">
      </app-progress-indicator>
      
      <div class="card" [@cardAnimation]>
        <div class="step-header">
          <div class="step-icon" style="background: linear-gradient(135deg, #915907 0%, #6b4205 100%);">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
            </svg>
          </div>
          <h2>Qual è il tuo obiettivo su LinkedIn?</h2>
        </div>
        <p class="step-description">
          Scegli l'obiettivo principale della tua presenza su LinkedIn. Questo determinerà la call to action nella tua bio.
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width" [class.focused]="isFieldFocused">
            <mat-label>Obiettivo</mat-label>
            <mat-select 
              formControlName="goal"
              (openedChange)="isFieldFocused = $event">
              <mat-option value="lavoro">
                <div class="option-content">
                  <svg class="option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                  <span>Trovare nuove opportunità di lavoro</span>
                </div>
              </mat-option>
              <mat-option value="clienti">
                <div class="option-content">
                  <svg class="option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.34 9.32l-1.41-1.41-2.12 2.12 4.24 4.24-7.07 7.07-4.24-4.24-4.24 4.24-1.41-1.41 4.24-4.24-2.12-2.12-1.41 1.41-1.41-1.41 2.12-2.12-1.41-1.41-1.42 1.41-1.41-1.41 1.41-1.41-1.41-1.42 1.41-1.41 1.41 1.41 1.41-1.41 1.41 1.41-1.41 1.41 2.12 2.12 1.41-1.41 1.41 1.41-2.12 2.12 1.41 1.41 1.41-1.41 1.41 1.41-1.41 1.41zm-7.76 5.66l4.24-4.24 1.41 1.41-4.24 4.24-1.41-1.41z"/>
                  </svg>
                  <span>Trovare nuovi clienti</span>
                </div>
              </mat-option>
              <mat-option value="networking">
                <div class="option-content">
                  <svg class="option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  <span>Networking e collaborazioni</span>
                </div>
              </mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('goal')?.hasError('required')">
              Seleziona un obiettivo
            </mat-error>
          </mat-form-field>

          <div class="step-actions">
            <button mat-button type="button" (click)="goBack()" class="back-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="arrow-icon">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              <span>Indietro</span>
            </button>
            <button 
              mat-raised-button 
              color="primary" 
              type="submit" 
              [disabled]="form.invalid"
              [class.pulse]="form.valid"
              class="primary-button generate-button">
              <span>Genera Bio</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="check-icon">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </app-wizard>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      padding: 40px;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .card:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .step-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .step-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(145, 89, 7, 0.3);
    }

    .step-icon svg {
      width: 28px;
      height: 28px;
      color: white;
    }

    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #000000;
      margin: 0;
      background: linear-gradient(135deg, #000000 0%, #915907 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .step-description {
      color: #666666;
      font-size: 15px;
      margin-bottom: 32px;
      line-height: 1.7;
      padding-left: 72px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 24px;
      transition: all 0.3s ease;
    }

    .full-width.focused {
      transform: scale(1.02);
    }

    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline {
      transition: all 0.3s ease;
    }

    ::ng-deep .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
      color: #915907;
      border-width: 2px;
    }

    .option-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .option-icon {
      width: 20px;
      height: 20px;
      color: #666666;
    }

    .step-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
      gap: 12px;
    }

    button[mat-button] {
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    button[mat-button]:hover {
      background: rgba(145, 89, 7, 0.08);
    }

    .back-button {
      flex-direction: row-reverse;
    }

    .arrow-icon,
    .check-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .primary-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 32px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 24px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
    }

    .generate-button {
      background: linear-gradient(135deg, #0a66c2 0%, #057642 100%);
      box-shadow: 0 4px 16px rgba(10, 102, 194, 0.4);
    }

    .primary-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(10, 102, 194, 0.4);
    }

    .generate-button:hover:not(:disabled) {
      box-shadow: 0 6px 24px rgba(10, 102, 194, 0.5);
    }

    .primary-button.pulse {
      animation: buttonPulse 2s infinite;
    }

    @keyframes buttonPulse {
      0%, 100% {
        box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
      }
      50% {
        box-shadow: 0 4px 20px rgba(10, 102, 194, 0.5);
      }
    }

    @keyframes cardAnimation {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate('0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ])
  ]
})
export class StepGoalComponent implements OnInit {
  form!: FormGroup;
  isFieldFocused = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService,
    private bioAnalysisService: BioAnalysisService
  ) {}

  ngOnInit(): void {
    const currentData = this.stateService.getCurrentState().formData;
    
    this.form = this.fb.group({
      goal: [currentData.goal || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = {
        ...this.stateService.getCurrentState().formData,
        goal: this.form.value.goal
      };
      
      this.stateService.updateFormData({ goal: this.form.value.goal });
      
      const bio = this.bioAnalysisService.generateBio(formData);
      const analysis = this.bioAnalysisService.analyzeBio(
        bio,
        formData,
        this.stateService.getCurrentState().scoreEnabled
      );
      
      this.stateService.setGeneratedBio(bio);
      this.stateService.setAnalysis(analysis);
      
      this.router.navigate(['/bio-linkedin/result']);
    }
  }

  goBack(): void {
    this.router.navigate(['/bio-linkedin/step/activity']);
  }
}

