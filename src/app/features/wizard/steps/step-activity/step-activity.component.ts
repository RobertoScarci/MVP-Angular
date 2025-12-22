import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-step-activity',
  template: `
    <app-wizard>
      <app-progress-indicator 
        [currentStep]="2" 
        [steps]="['Ruolo', 'Target', 'Attività', 'Obiettivo']">
      </app-progress-indicator>
      
      <div class="card" [@cardAnimation]>
        <div class="step-header">
          <div class="step-icon" style="background: linear-gradient(135deg, #b24020 0%, #8a3018 100%);">
            <mat-icon>work_outline</mat-icon>
          </div>
          <h2>Cosa fai concretamente?</h2>
        </div>
        <p class="step-description">
          Descrivi le attività principali e il valore che porti. Sii specifico e orientato ai risultati. (es. "Sviluppo applicazioni web moderne con Angular e React, aiutando le aziende a migliorare l'esperienza utente e aumentare le conversioni")
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width" [class.focused]="isFieldFocused">
            <mat-label>Attività principali</mat-label>
            <textarea 
              matInput 
              formControlName="activity" 
              rows="4" 
              placeholder="Descrivi cosa fai e il valore che porti..."
              (focus)="isFieldFocused = true"
              (blur)="isFieldFocused = false"></textarea>
            <mat-hint [class.warning]="characterCount < 50">{{ characterCount }}/500 caratteri</mat-hint>
            <mat-error *ngIf="form.get('activity')?.hasError('required')">
              Le attività sono obbligatorie
            </mat-error>
            <mat-error *ngIf="form.get('activity')?.hasError('minlength')">
              Minimo 50 caratteri
            </mat-error>
            <mat-error *ngIf="form.get('activity')?.hasError('maxlength')">
              Massimo 500 caratteri
            </mat-error>
          </mat-form-field>

          <div class="step-actions">
            <button mat-button type="button" (click)="goBack()">
              <mat-icon>arrow_back</mat-icon>
              Indietro
            </button>
            <button 
              mat-raised-button 
              color="primary" 
              type="submit" 
              [disabled]="form.invalid"
              [class.pulse]="form.valid"
              class="primary-button">
              <span>Avanti</span>
              <mat-icon>arrow_forward</mat-icon>
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
      box-shadow: 0 4px 12px rgba(178, 64, 32, 0.3);
    }

    .step-icon mat-icon {
      color: white;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #000000;
      margin: 0;
      background: linear-gradient(135deg, #000000 0%, #b24020 100%);
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
      color: #b24020;
      border-width: 2px;
    }

    ::ng-deep .mat-hint.warning {
      color: #b24020;
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
      background: rgba(178, 64, 32, 0.08);
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

    .primary-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(10, 102, 194, 0.4);
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
export class StepActivityComponent implements OnInit {
  form!: FormGroup;
  isFieldFocused = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    const currentData = this.stateService.getCurrentState().formData;
    
    this.form = this.fb.group({
      activity: [currentData.activity || '', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(500)
      ]]
    });
  }

  get characterCount(): number {
    return this.form.get('activity')?.value?.length || 0;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.stateService.updateFormData({ activity: this.form.value.activity });
      this.router.navigate(['/bio-linkedin/step/goal']);
    }
  }

  goBack(): void {
    this.router.navigate(['/bio-linkedin/step/target']);
  }
}

