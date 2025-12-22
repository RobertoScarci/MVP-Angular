import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';

@Component({
  selector: 'app-step-activity',
  template: `
    <app-wizard>
      <div class="card">
        <h2>Cosa fai concretamente?</h2>
        <p class="step-description">
          Descrivi le attività principali e il valore che porti. Sii specifico e orientato ai risultati. (es. "Sviluppo applicazioni web moderne con Angular e React, aiutando le aziende a migliorare l'esperienza utente e aumentare le conversioni")
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Attività principali</mat-label>
            <textarea matInput formControlName="activity" rows="4" placeholder="Descrivi cosa fai e il valore che porti..."></textarea>
            <mat-hint>{{ characterCount }}/500 caratteri</mat-hint>
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
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
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
      border-radius: 8px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08);
      padding: 32px;
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 8px;
    }

    .step-description {
      color: #666666;
      font-size: 14px;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .step-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
      gap: 12px;
    }

    button[type="submit"] {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class StepActivityComponent implements OnInit {
  form!: FormGroup;

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

