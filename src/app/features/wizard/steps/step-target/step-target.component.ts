import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';

@Component({
  selector: 'app-step-target',
  template: `
    <app-wizard>
      <div class="card">
        <h2>Per chi lavori?</h2>
        <p class="step-description">
          Definisci il tuo target: chi sono le persone o le aziende a cui ti rivolgi? (es. "startup tech", "PMI digitali", "e-commerce", "agenzie creative")
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Target</mat-label>
            <input matInput formControlName="target" placeholder="Es. startup tech e PMI digitali">
            <mat-hint>Massimo 150 caratteri</mat-hint>
            <mat-error *ngIf="form.get('target')?.hasError('required')">
              Il target è obbligatorio
            </mat-error>
            <mat-error *ngIf="form.get('target')?.hasError('maxlength')">
              Massimo 150 caratteri
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
export class StepTargetComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    const currentData = this.stateService.getCurrentState().formData;
    
    this.form = this.fb.group({
      target: [currentData.target || '', [Validators.required, Validators.maxLength(150)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.stateService.updateFormData({ target: this.form.value.target });
      this.router.navigate(['/bio-linkedin/step/activity']);
    }
  }

  goBack(): void {
    this.router.navigate(['/bio-linkedin/step/role']);
  }
}

