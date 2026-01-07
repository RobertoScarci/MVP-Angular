import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupStateService } from '@core/services/startup-state.service';
import { StartupValidationService } from '@core/services/startup-validation.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step-business-model',
  template: `
    <app-wizard>
      <app-progress-indicator 
        [currentStep]="4" 
        [steps]="['Problema', 'Soluzione', 'Mercato', 'Competizione', 'Business Model']">
      </app-progress-indicator>
      
      <div class="card" [@cardAnimation]>
        <div class="step-header">
          <div class="step-icon" style="background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
            </svg>
          </div>
          <h2>Qual è il tuo modello di business?</h2>
        </div>
        <p class="step-description">
          Descrivi come genererai ricavi. Qual è il tuo modello di business? Come monetizzi? Quali sono i costi principali? Come scalerà?
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width" [class.focused]="isFieldFocused">
            <mat-label>Modello di business</mat-label>
            <textarea 
              matInput 
              formControlName="businessModel" 
              rows="6" 
              placeholder="Descrivi il tuo modello di business..."
              (focus)="isFieldFocused = true"
              (blur)="isFieldFocused = false"></textarea>
            <mat-hint>
              {{ characterCount }}/1000 caratteri
            </mat-hint>
            
            <mat-error *ngIf="form.get('businessModel')?.hasError('required')">
              Il modello di business è obbligatorio
            </mat-error>
            <mat-error *ngIf="form.get('businessModel')?.hasError('minlength')">
              Minimo 50 caratteri
            </mat-error>
            <mat-error *ngIf="form.get('businessModel')?.hasError('maxlength')">
              Massimo 1000 caratteri
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
              <span>Analizza Idea</span>
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
    }

    .step-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
    }

    button[mat-button] {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .back-button {
      flex-direction: row-reverse;
    }

    .primary-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 32px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 24px;
    }

    .generate-button {
      background: linear-gradient(135deg, #0a66c2 0%, #057642 100%);
    }

    .arrow-icon,
    .check-icon {
      width: 20px;
      height: 20px;
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
export class StepBusinessModelComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isFieldFocused = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StartupStateService,
    private validationService: StartupValidationService
  ) {}

  ngOnInit(): void {
    const currentData = this.stateService.getCurrentState().formData;
    
    this.form = this.fb.group({
      businessModel: [currentData.businessModel || '', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000)
      ]]
    });

    this.form.get('businessModel')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      if (this.form.valid) {
        this.stateService.updateFormData({ businessModel: value });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get characterCount(): number {
    return this.form.get('businessModel')?.value?.length || 0;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = {
        ...this.stateService.getCurrentState().formData,
        businessModel: this.form.value.businessModel
      };
      
      this.stateService.updateFormData({ businessModel: this.form.value.businessModel });
      
      const analysis = this.validationService.analyzeStartup(
        formData,
        this.stateService.getCurrentState().scoreEnabled
      );
      
      this.stateService.setAnalysis(analysis);
      
      this.router.navigate(['/startup-validator/result']);
    }
  }

  goBack(): void {
    this.router.navigate(['/startup-validator/step/competition']);
  }
}

