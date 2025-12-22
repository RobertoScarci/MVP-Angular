import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';

@Component({
  selector: 'app-step-role',
  template: `
    <app-wizard>
      <div class="card">
        <h2>Qual è il tuo ruolo professionale?</h2>
        <p class="step-description">
          Descrivi in modo chiaro la tua posizione o professione (es. "Frontend Developer", "Digital Marketing Consultant", "Founder di StartupTech")
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Ruolo professionale</mat-label>
            <input matInput formControlName="role" placeholder="Es. Senior Frontend Developer">
            <mat-hint>Massimo 100 caratteri</mat-hint>
            <mat-error *ngIf="form.get('role')?.hasError('required')">
              Il ruolo è obbligatorio
            </mat-error>
            <mat-error *ngIf="form.get('role')?.hasError('maxlength')">
              Massimo 100 caratteri
            </mat-error>
          </mat-form-field>

          <div class="step-actions">
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
      justify-content: flex-end;
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
export class StepRoleComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    const currentData = this.stateService.getCurrentState().formData;
    
    this.form = this.fb.group({
      role: [currentData.role || '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.stateService.updateFormData({ role: this.form.value.role });
      this.router.navigate(['/bio-linkedin/step/target']);
    }
  }
}

