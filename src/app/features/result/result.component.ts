import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';
import { BioAnalysisService } from '@core/services/bio-analysis.service';
import { GeneratedBio, BioAnalysis } from '@core/models/bio-form.model';

@Component({
  selector: 'app-result',
  template: `
    <app-wizard>
      <div class="result-container">
        <div class="card">
          <div class="result-header">
            <h2>La tua bio LinkedIn</h2>
            <div class="score-toggle">
              <mat-checkbox [(ngModel)]="scoreEnabled" (change)="toggleScore()">
                Mostra punteggio
              </mat-checkbox>
            </div>
          </div>

          <div *ngIf="generatedBio" class="bio-preview">
            <div class="bio-section">
              <h3>Chi sei</h3>
              <p>{{ generatedBio.whoYouAre }}</p>
            </div>
            
            <div class="bio-section">
              <h3>Che problema risolvi / che valore porti</h3>
              <p>{{ generatedBio.valueProposition }}</p>
            </div>
            
            <div class="bio-section">
              <h3>Call to action</h3>
              <p>{{ generatedBio.callToAction }}</p>
            </div>

            <div class="bio-full">
              <h3>Bio completa</h3>
              <div class="bio-text">{{ fullBio }}</div>
              <button mat-stroked-button (click)="copyToClipboard()" class="copy-btn">
                <mat-icon>content_copy</mat-icon>
                Copia bio
              </button>
            </div>
          </div>

          <div *ngIf="analysis" class="analysis-section">
            <app-checklist [analysis]="analysis"></app-checklist>
            <app-warnings [analysis]="analysis"></app-warnings>
            
            <div *ngIf="scoreEnabled && analysis.score !== undefined" class="score-section">
              <h3>Punteggio</h3>
              <div class="score-display">
                <div class="score-value">{{ analysis.score }}/100</div>
                <mat-progress-bar mode="determinate" [value]="analysis.score"></mat-progress-bar>
              </div>
            </div>
          </div>

          <div class="result-actions">
            <button mat-button (click)="goBack()">
              <mat-icon>arrow_back</mat-icon>
              Modifica dati
            </button>
            <button mat-raised-button color="primary" (click)="startOver()">
              <mat-icon>refresh</mat-icon>
              Ricomincia
            </button>
          </div>
        </div>
      </div>
    </app-wizard>
  `,
  styles: [`
    .result-container {
      max-width: 900px;
    }

    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08);
      padding: 32px;
    }

    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e9e5df;
    }

    h2 {
      font-size: 28px;
      font-weight: 600;
      color: #000000;
      margin: 0;
    }

    .bio-preview {
      margin-bottom: 32px;
    }

    .bio-section {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f3f2ef;
    }

    .bio-section:last-of-type {
      border-bottom: none;
    }

    .bio-section h3 {
      font-size: 16px;
      font-weight: 600;
      color: #666666;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .bio-section p {
      font-size: 16px;
      line-height: 1.6;
      color: #000000;
      margin: 0;
    }

    .bio-full {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 2px solid #e9e5df;
    }

    .bio-full h3 {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 16px;
    }

    .bio-text {
      background: #f9fafb;
      border: 1px solid #e9e5df;
      border-radius: 4px;
      padding: 16px;
      font-size: 15px;
      line-height: 1.7;
      color: #000000;
      white-space: pre-wrap;
      margin-bottom: 16px;
      min-height: 100px;
    }

    .copy-btn {
      margin-top: 8px;
    }

    .analysis-section {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 2px solid #e9e5df;
    }

    .score-section {
      margin-top: 24px;
      padding: 24px;
      background: #f9fafb;
      border-radius: 8px;
    }

    .score-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 16px;
    }

    .score-display {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .score-value {
      font-size: 32px;
      font-weight: 700;
      color: #0a66c2;
    }

    .result-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e9e5df;
      gap: 12px;
    }

    button mat-icon {
      margin-left: 8px;
    }
  `]
})
export class ResultComponent implements OnInit {
  generatedBio: GeneratedBio | null = null;
  analysis: BioAnalysis | null = null;
  scoreEnabled = false;

  constructor(
    private stateService: StateService,
    private bioAnalysisService: BioAnalysisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = this.stateService.getCurrentState();
    this.generatedBio = state.generatedBio;
    this.analysis = state.analysis;
    this.scoreEnabled = state.scoreEnabled;

    if (!this.generatedBio) {
      this.router.navigate(['/step/role']);
    }
  }

  get fullBio(): string {
    if (!this.generatedBio) return '';
    return `${this.generatedBio.whoYouAre} ${this.generatedBio.valueProposition} ${this.generatedBio.callToAction}`;
  }

  toggleScore(): void {
    this.stateService.toggleScore();
    this.scoreEnabled = this.stateService.getCurrentState().scoreEnabled;
    
    if (this.generatedBio) {
      const formData = this.stateService.getCurrentState().formData;
      const newAnalysis = this.bioAnalysisService.analyzeBio(
        this.generatedBio,
        formData,
        this.scoreEnabled
      );
      this.stateService.setAnalysis(newAnalysis);
      this.analysis = newAnalysis;
    }
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.fullBio).then(() => {
      alert('Bio copiata negli appunti!');
    });
  }

  goBack(): void {
    this.router.navigate(['/step/goal']);
  }

  startOver(): void {
    this.stateService.reset();
    this.router.navigate(['/step/role']);
  }
}

