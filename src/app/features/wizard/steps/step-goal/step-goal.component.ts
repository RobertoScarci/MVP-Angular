import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';
import { BioAnalysisService } from '@core/services/bio-analysis.service';

@Component({
  selector: 'app-step-goal',
  template: `
    <app-wizard>
      <div class="card">
        <h2>Qual è il tuo obiettivo su LinkedIn?</h2>
        <p class="step-description">
          Scegli l'obiettivo principale della tua presenza su LinkedIn. Questo determinerà la call to action nella tua bio.
        </p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Obiettivo</mat-label>
            <mat-select formControlName="goal">
              <mat-option value="lavoro">Trovare nuove opportunità di lavoro</mat-option>
              <mat-option value="clienti">Trovare nuovi clienti</mat-option>
              <mat-option value="networking">Networking e collaborazioni</mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('goal')?.hasError('required')">
              Seleziona un obiettivo
            </mat-error>
          </mat-form-field>

          <div class="step-actions">
            <button mat-button type="button" (click)="goBack()">
              <mat-icon>arrow_back</mat-icon>
              Indietro
            </button>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
              Genera Bio
              <mat-icon>check_circle</mat-icon>
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

    button mat-icon {
      margin-left: 8px;
    }
  `]
})
export class StepGoalComponent implements OnInit {
  form!: FormGroup;

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
      
      this.router.navigate(['/result']);
    }
  }

  goBack(): void {
    this.router.navigate(['/step/activity']);
  }
}

