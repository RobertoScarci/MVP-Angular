import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupStateService } from '@core/services/startup-state.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step-target-market',
  template: `
    <app-wizard>
      <app-progress-indicator 
        [currentStep]="2" 
        [steps]="['Problema', 'Soluzione', 'Mercato', 'Competizione', 'Business Model']">
      </app-progress-indicator>
      
      <div class="card" [@cardAnimation]>
        <div class="step-header">
          <div class="step-icon" style="background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
          <h2>Chi è il tuo target di mercato?</h2>
        </div>
        <p class="step-description">
          Definisci il tuo target di mercato. Sii specifico: chi sono i tuoi clienti ideali, quanto è grande questo mercato, e come puoi raggiungerli.
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width" [class.focused]="isFieldFocused">
            <mat-label>Target di mercato</mat-label>
            <textarea 
              matInput 
              formControlName="targetMarket" 
              rows="6" 
              placeholder="Descrivi il tuo target di mercato..."
              (focus)="isFieldFocused = true"
              (blur)="isFieldFocused = false"></textarea>
            <mat-hint>
              {{ characterCount }}/1000 caratteri
            </mat-hint>
            
            <mat-error *ngIf="form.get('targetMarket')?.hasError('required')">
              Il target di mercato è obbligatorio
            </mat-error>
            <mat-error *ngIf="form.get('targetMarket')?.hasError('minlength')">
              Minimo 50 caratteri
            </mat-error>
            <mat-error *ngIf="form.get('targetMarket')?.hasError('maxlength')">
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

    .arrow-icon {
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
export class StepTargetMarketComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isFieldFocused = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StartupStateService
  ) {}

  ngOnInit(): void {
    const currentData = this.stateService.getCurrentState().formData;
    
    this.form = this.fb.group({
      targetMarket: [currentData.targetMarket || '', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000)
      ]]
    });

    this.form.get('targetMarket')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      if (this.form.valid) {
        this.stateService.updateFormData({ targetMarket: value });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get characterCount(): number {
    return this.form.get('targetMarket')?.value?.length || 0;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.stateService.updateFormData({ targetMarket: this.form.value.targetMarket });
      this.router.navigate(['/startup-validator/step/competition']);
    }
  }

  goBack(): void {
    this.router.navigate(['/startup-validator/step/solution']);
  }
}

