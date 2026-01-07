import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupStateService } from '@core/services/startup-state.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step-problem',
  template: `
    <app-wizard>
      <app-progress-indicator 
        [currentStep]="0" 
        [steps]="['Problema', 'Soluzione', 'Mercato', 'Competizione', 'Business Model']">
      </app-progress-indicator>
      
      <div class="card" [@cardAnimation]>
        <div class="step-header">
          <div class="step-icon" style="background: linear-gradient(135deg, #b24020 0%, #8a3018 100%);">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <h2>Quale problema risolve la tua startup?</h2>
        </div>
        <p class="step-description">
          Descrivi in dettaglio il problema che la tua startup intende risolvere. Sii specifico: chi ha questo problema, quanto è urgente, e quanto è grande il problema.
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width" [class.focused]="isFieldFocused">
            <mat-label>Problema</mat-label>
            <textarea 
              matInput 
              formControlName="problem" 
              rows="6" 
              placeholder="Descrivi il problema in dettaglio..."
              (focus)="isFieldFocused = true"
              (blur)="isFieldFocused = false"></textarea>
            <mat-hint>
              {{ characterCount }}/1000 caratteri
            </mat-hint>
            
            <mat-error *ngIf="form.get('problem')?.hasError('required')">
              Il problema è obbligatorio
            </mat-error>
            <mat-error *ngIf="form.get('problem')?.hasError('minlength')">
              Minimo 50 caratteri
            </mat-error>
            <mat-error *ngIf="form.get('problem')?.hasError('maxlength')">
              Massimo 1000 caratteri
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
      justify-content: flex-end;
      margin-top: 32px;
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
export class StepProblemComponent implements OnInit, OnDestroy {
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
      problem: [currentData.problem || '', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000)
      ]]
    });

    // Debounce per salvare automaticamente
    this.form.get('problem')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      if (this.form.valid) {
        this.stateService.updateFormData({ problem: value });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get characterCount(): number {
    return this.form.get('problem')?.value?.length || 0;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.stateService.updateFormData({ problem: this.form.value.problem });
      this.router.navigate(['/startup-validator/step/solution']);
    }
  }
}

