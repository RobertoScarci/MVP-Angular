import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';
import { ValidationService } from '@core/services/validation.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step-role',
  template: `
    <app-wizard>
      <app-progress-indicator 
        [currentStep]="0" 
        [steps]="['Ruolo', 'Target', 'Attività', 'Obiettivo']">
      </app-progress-indicator>
      
      <div class="card" [@cardAnimation]>
        <div class="step-header">
          <div class="step-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
            </svg>
          </div>
          <h2>Qual è il tuo ruolo professionale?</h2>
        </div>
        <p class="step-description">
          Descrivi in modo chiaro la tua posizione o professione (es. "Frontend Developer", "Digital Marketing Consultant", "Founder di StartupTech")
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width" [class.focused]="isFieldFocused" [class.has-errors]="hasValidationErrors" [class.has-suggestions]="hasSuggestions">
                <mat-label>Ruolo professionale</mat-label>
                <input 
                  matInput 
                  formControlName="role" 
                  placeholder="Es. Senior Frontend Developer"
                  (focus)="isFieldFocused = true"
              (blur)="isFieldFocused = false">
                <mat-hint>
                  <span *ngIf="validationResult">{{ validationResult.score }}/100</span>
                  <span *ngIf="!validationResult">Massimo 100 caratteri</span>
                </mat-hint>
                
            <!-- Errori di validazione -->
            <div class="validation-errors" *ngIf="validationResult && validationResult.errors.length > 0">
              <div *ngFor="let error of validationResult.errors" class="error-item">
                <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>{{ error }}</span>
              </div>
            </div>
            
            <!-- Suggerimenti -->
            <div class="validation-suggestions" *ngIf="validationResult && validationResult.suggestions.length > 0">
              <div *ngFor="let suggestion of validationResult.suggestions" class="suggestion-item">
                <svg class="suggestion-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
                </svg>
                <span>{{ suggestion }}</span>
              </div>
            </div>
                
                <!-- Errori standard -->
                <mat-error *ngIf="form.get('role')?.hasError('required')">
                  Il ruolo è obbligatorio
                </mat-error>
                <mat-error *ngIf="form.get('role')?.hasError('maxlength')">
                  Massimo 100 caratteri
                </mat-error>
              </mat-form-field>

          <div class="step-actions">
            <button 
              mat-raised-button 
              color="primary" 
              type="submit" 
              [disabled]="form.invalid"
              [class.pulse]="form.valid"
              class="primary-button">
              <span>Avanti</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="arrow-icon">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
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
      background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
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
      background: linear-gradient(135deg, #000000 0%, #0a66c2 100%);
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
      color: #0a66c2;
      border-width: 2px;
    }

    .step-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 32px;
      gap: 12px;
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

    .arrow-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
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

    /* Validation Styles */
    mat-form-field.has-errors ::ng-deep .mat-form-field-outline {
      color: #b24020 !important;
    }

    mat-form-field.has-suggestions ::ng-deep .mat-form-field-outline {
      color: #0a66c2 !important;
    }

    .validation-errors {
      margin-top: 8px;
      padding: 12px;
      background: #fff4f0;
      border-left: 3px solid #b24020;
      border-radius: 4px;
    }

    .error-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 13px;
      color: #b24020;
    }

    .error-item:last-child {
      margin-bottom: 0;
    }

    .error-icon {
      width: 18px;
      height: 18px;
    }

    .validation-suggestions {
      margin-top: 8px;
      padding: 12px;
      background: #f0f7ff;
      border-left: 3px solid #0a66c2;
      border-radius: 4px;
    }

    .suggestion-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 13px;
      color: #0a66c2;
    }

    .suggestion-item:last-child {
      margin-bottom: 0;
    }

    .suggestion-icon {
      width: 18px;
      height: 18px;
    }

    mat-hint {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    mat-hint span {
      font-weight: 600;
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
export class StepRoleComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isFieldFocused = false;
  validationResult: any = null;
  hasValidationErrors = false;
  hasSuggestions = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    const currentData = this.stateService.getCurrentState().formData;
    
    this.form = this.fb.group({
      role: [currentData.role || '', [
        Validators.required, 
        Validators.maxLength(100),
        this.validationService.roleValidator
      ]]
    });

    this.form.get('role')?.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => {
        const val = value || '';
        if (val.trim().length > 0) {
          this.validationResult = this.validationService.validateRole(val);
          this.hasValidationErrors = this.validationResult.errors.length > 0;
          this.hasSuggestions = this.validationResult.suggestions.length > 0;
        } else {
          this.validationResult = null;
          this.hasValidationErrors = false;
          this.hasSuggestions = false;
        }
      });

    // Validazione iniziale se c'è un valore
    if (currentData.role) {
      this.form.get('role')?.setValue(currentData.role, { emitEvent: true });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.stateService.updateFormData({ role: this.form.value.role });
      this.router.navigate(['/bio-linkedin/step/target']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

