import { Component, Input } from '@angular/core';
import { BioAnalysis } from '@core/models/bio-form.model';

@Component({
  selector: 'app-warnings',
  template: `
    <div class="warnings-container">
      <div *ngIf="analysis.warnings.length > 0" class="warnings-card">
        <h3>
          <mat-icon class="warning-icon">warning</mat-icon>
          Avvisi
        </h3>
        <div class="warnings-list">
          <div *ngFor="let warning of analysis.warnings" class="warning-item">
            <mat-icon>info</mat-icon>
            <span>{{ warning }}</span>
          </div>
        </div>
      </div>

      <div *ngIf="analysis.suggestions.length > 0" class="suggestions-card">
        <h3>
          <mat-icon class="suggestion-icon">lightbulb</mat-icon>
          Suggerimenti
        </h3>
        <div class="suggestions-list">
          <div *ngFor="let suggestion of analysis.suggestions" class="suggestion-item">
            <mat-icon>check_circle_outline</mat-icon>
            <span>{{ suggestion }}</span>
          </div>
        </div>
      </div>

      <div *ngIf="analysis.warnings.length === 0 && analysis.suggestions.length === 0" class="success-card">
        <mat-icon class="success-icon">check_circle</mat-icon>
        <p>Ottimo lavoro! La tua bio rispetta tutti i criteri di qualità.</p>
      </div>
    </div>
  `,
  styles: [`
    .warnings-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .warnings-card,
    .suggestions-card {
      border-radius: 8px;
      padding: 24px;
    }

    .warnings-card {
      background: #fff4f0;
      border: 1px solid #ffd4c4;
    }

    .suggestions-card {
      background: #f0f7ff;
      border: 1px solid #b3d9ff;
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 16px;
    }

    .warning-icon {
      color: #b24020;
    }

    .suggestion-icon {
      color: #0a66c2;
    }

    .warnings-list,
    .suggestions-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .warning-item,
    .suggestion-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;
      background: white;
      border-radius: 4px;
    }

    .warning-item mat-icon {
      color: #b24020;
      margin-top: 2px;
    }

    .suggestion-item mat-icon {
      color: #0a66c2;
      margin-top: 2px;
    }

    .warning-item span,
    .suggestion-item span {
      font-size: 14px;
      line-height: 1.5;
      color: #000000;
      flex: 1;
    }

    .success-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px;
      background: #f0f9f4;
      border: 1px solid #a8e6c3;
      border-radius: 8px;
      text-align: center;
    }

    .success-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #057642;
      margin-bottom: 16px;
    }

    .success-card p {
      font-size: 16px;
      color: #000000;
      margin: 0;
      font-weight: 500;
    }
  `]
})
export class WarningsComponent {
  @Input() analysis!: BioAnalysis;
}

