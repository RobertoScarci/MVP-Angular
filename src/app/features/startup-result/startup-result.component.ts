import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartupStateService } from '@core/services/startup-state.service';
import { StartupValidationService } from '@core/services/startup-validation.service';
import { StartupAnalysis } from '@core/models/startup-form.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-startup-result',
  template: `
    <app-wizard>
      <div class="result-container" [@pageAnimation]>
        <div class="success-header" [@fadeInDown]>
          <div class="success-icon-wrapper">
            <svg class="success-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 class="result-title">Analisi Idea Startup</h1>
          <p class="result-subtitle">Ecco l'analisi completa della tua idea con punti forti, debolezze, miglioramenti e rischi</p>
        </div>

        <div class="card main-card" [@cardSlideIn] *ngIf="analysis">
          <!-- Score Toggle -->
          <div class="score-toggle-section">
            <div class="toggle-wrapper">
              <mat-checkbox [(ngModel)]="scoreEnabled" (change)="toggleScore()" class="score-toggle">
                Mostra punteggio dettagliato
              </mat-checkbox>
            </div>
          </div>

          <!-- Overall Score -->
          <div *ngIf="scoreEnabled && analysis.overallScore !== undefined" class="score-section" [@scaleIn]>
            <div class="score-header">
              <h3>
                <svg class="score-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                Punteggio Complessivo
              </h3>
              <div class="score-badge" [class.excellent]="analysis.overallScore >= 70" [class.good]="analysis.overallScore >= 50 && analysis.overallScore < 70" [class.needs-improvement]="analysis.overallScore < 50">
                {{ getScoreLabel() }}
              </div>
            </div>
            <div class="score-display">
              <div class="score-value-wrapper">
                <div class="score-value">{{ analysis.overallScore }}</div>
                <div class="score-max">/ 100</div>
              </div>
              <mat-progress-bar mode="determinate" [value]="analysis.overallScore"></mat-progress-bar>
            </div>
          </div>

          <!-- Strengths -->
          <div *ngIf="analysis.strengths.length > 0" class="analysis-section strengths" [@fadeInUp]>
            <div class="section-header">
              <div class="section-icon success">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>Punti Forti</h3>
            </div>
            <div class="items-list">
              <div *ngFor="let strength of analysis.strengths" class="item success-item">
                <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>{{ strength }}</span>
              </div>
            </div>
          </div>

          <!-- Weaknesses -->
          <div *ngIf="analysis.weaknesses.length > 0" class="analysis-section weaknesses" [@fadeInUp]>
            <div class="section-header">
              <div class="section-icon warning">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              </div>
              <h3>Aspetti da Migliorare</h3>
            </div>
            <div class="items-list">
              <div *ngFor="let weakness of analysis.weaknesses" class="item warning-item">
                <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>{{ weakness }}</span>
              </div>
            </div>
          </div>

          <!-- Improvements -->
          <div *ngIf="analysis.improvements.length > 0" class="analysis-section improvements" [@fadeInUp]>
            <div class="section-header">
              <div class="section-icon info">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
                </svg>
              </div>
              <h3>Cosa Migliorare</h3>
            </div>
            <div class="items-list">
              <div *ngFor="let improvement of analysis.improvements; let i = index" class="item info-item">
                <div class="item-number">{{ i + 1 }}</div>
                <span>{{ improvement }}</span>
              </div>
            </div>
          </div>

          <!-- Risks -->
          <div *ngIf="analysis.risks.length > 0" class="analysis-section risks" [@fadeInUp]>
            <div class="section-header">
              <div class="section-icon danger">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              </div>
              <h3>Cosa Potrebbe Far Crollare Tutto</h3>
            </div>
            <div class="items-list">
              <div *ngFor="let risk of analysis.risks" class="item danger-item" [class.high-risk]="risk.includes('RISCHIO ALTO')" [class.medium-risk]="risk.includes('RISCHIO MEDIO')">
                <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <span>{{ risk }}</span>
              </div>
            </div>
          </div>

          <!-- Detailed Analysis -->
          <div class="detailed-analysis" [@fadeInUp]>
            <h3 class="detailed-title">Analisi Dettagliata per Categoria</h3>
            
            <!-- Problem Analysis -->
            <div class="category-analysis">
              <h4>Problema</h4>
              <div class="metrics">
                <div class="metric">
                  <span class="metric-label">Chiarezza</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.problemAnalysis.clarity"></div>
                  </div>
                  <span class="metric-value">{{ analysis.problemAnalysis.clarity }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Urgenza</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.problemAnalysis.urgency"></div>
                  </div>
                  <span class="metric-value">{{ analysis.problemAnalysis.urgency }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Dimensione</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.problemAnalysis.size"></div>
                  </div>
                  <span class="metric-value">{{ analysis.problemAnalysis.size }}%</span>
                </div>
              </div>
              <div *ngIf="analysis.problemAnalysis.issues.length > 0" class="issues">
                <div *ngFor="let issue of analysis.problemAnalysis.issues" class="issue">{{ issue }}</div>
              </div>
            </div>

            <!-- Solution Analysis -->
            <div class="category-analysis">
              <h4>Soluzione</h4>
              <div class="metrics">
                <div class="metric">
                  <span class="metric-label">Fattibilità</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.solutionAnalysis.feasibility"></div>
                  </div>
                  <span class="metric-value">{{ analysis.solutionAnalysis.feasibility }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Differenziazione</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.solutionAnalysis.differentiation"></div>
                  </div>
                  <span class="metric-value">{{ analysis.solutionAnalysis.differentiation }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Scalabilità</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.solutionAnalysis.scalability"></div>
                  </div>
                  <span class="metric-value">{{ analysis.solutionAnalysis.scalability }}%</span>
                </div>
              </div>
              <div *ngIf="analysis.solutionAnalysis.issues.length > 0" class="issues">
                <div *ngFor="let issue of analysis.solutionAnalysis.issues" class="issue">{{ issue }}</div>
              </div>
            </div>

            <!-- Market Analysis -->
            <div class="category-analysis">
              <h4>Mercato</h4>
              <div class="metrics">
                <div class="metric">
                  <span class="metric-label">Dimensione</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.marketAnalysis.size"></div>
                  </div>
                  <span class="metric-value">{{ analysis.marketAnalysis.size }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Accessibilità</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.marketAnalysis.accessibility"></div>
                  </div>
                  <span class="metric-value">{{ analysis.marketAnalysis.accessibility }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Crescita</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.marketAnalysis.growth"></div>
                  </div>
                  <span class="metric-value">{{ analysis.marketAnalysis.growth }}%</span>
                </div>
              </div>
              <div *ngIf="analysis.marketAnalysis.issues.length > 0" class="issues">
                <div *ngFor="let issue of analysis.marketAnalysis.issues" class="issue">{{ issue }}</div>
              </div>
            </div>

            <!-- Competition Analysis -->
            <div class="category-analysis">
              <h4>Competizione</h4>
              <div class="metrics">
                <div class="metric">
                  <span class="metric-label">Consapevolezza</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.competitionAnalysis.awareness"></div>
                  </div>
                  <span class="metric-value">{{ analysis.competitionAnalysis.awareness }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Differenziazione</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.competitionAnalysis.differentiation"></div>
                  </div>
                  <span class="metric-value">{{ analysis.competitionAnalysis.differentiation }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Vantaggio Competitivo</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.competitionAnalysis.competitiveAdvantage"></div>
                  </div>
                  <span class="metric-value">{{ analysis.competitionAnalysis.competitiveAdvantage }}%</span>
                </div>
              </div>
              <div *ngIf="analysis.competitionAnalysis.issues.length > 0" class="issues">
                <div *ngFor="let issue of analysis.competitionAnalysis.issues" class="issue">{{ issue }}</div>
              </div>
            </div>

            <!-- Business Model Analysis -->
            <div class="category-analysis">
              <h4>Modello di Business</h4>
              <div class="metrics">
                <div class="metric">
                  <span class="metric-label">Chiarezza</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.businessModelAnalysis.clarity"></div>
                  </div>
                  <span class="metric-value">{{ analysis.businessModelAnalysis.clarity }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Sostenibilità</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.businessModelAnalysis.sustainability"></div>
                  </div>
                  <span class="metric-value">{{ analysis.businessModelAnalysis.sustainability }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Scalabilità</span>
                  <div class="metric-bar">
                    <div class="metric-fill" [style.width.%]="analysis.businessModelAnalysis.scalability"></div>
                  </div>
                  <span class="metric-value">{{ analysis.businessModelAnalysis.scalability }}%</span>
                </div>
              </div>
              <div *ngIf="analysis.businessModelAnalysis.issues.length > 0" class="issues">
                <div *ngFor="let issue of analysis.businessModelAnalysis.issues" class="issue">{{ issue }}</div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="result-actions" [@fadeInUp]>
            <button mat-button (click)="goBack()" class="action-btn back-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="arrow-icon">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              <span>Modifica dati</span>
            </button>
            <button mat-raised-button color="primary" (click)="startOver()" class="action-btn primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="refresh-icon">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              <span>Valuta nuova idea</span>
            </button>
          </div>
        </div>
      </div>
    </app-wizard>
  `,
  styles: [`
    .result-container {
      max-width: 1000px;
      padding: 24px;
    }

    .success-header {
      text-align: center;
      margin-bottom: 32px;
      padding: 40px 24px;
      background: #057642;
      border-radius: 16px;
      color: white;
      box-shadow: 0 4px 16px rgba(5, 118, 66, 0.2);
    }

    .success-icon {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }

    .result-title {
      font-size: 36px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    .result-subtitle {
      font-size: 18px;
      opacity: 0.95;
      margin: 0;
    }

    .main-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
      padding: 40px;
    }

    .score-toggle-section {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid #f3f2ef;
    }

    .toggle-wrapper {
      display: flex;
      justify-content: center;
    }

    .score-section {
      margin-bottom: 40px;
      padding: 32px;
      background: #f9fafb;
      border-radius: 16px;
    }

    .score-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .score-header h3 {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }

    .score-icon {
      width: 28px;
      height: 28px;
      color: #0a66c2;
    }

    .score-badge {
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .score-badge.excellent {
      background: #057642;
      color: white;
    }

    .score-badge.good {
      background: #666666;
      color: white;
    }

    .score-badge.needs-improvement {
      background: #b24020;
      color: white;
    }

    .score-value-wrapper {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .score-value {
      font-size: 64px;
      font-weight: 700;
      color: #0a66c2;
    }

    .score-max {
      font-size: 32px;
      font-weight: 600;
      color: #666666;
    }

    .analysis-section {
      margin-bottom: 32px;
      padding: 24px;
      border-radius: 12px;
    }

    .analysis-section.strengths {
      background: #f0f9f4;
      border-left: 4px solid #057642;
    }

    .analysis-section.weaknesses {
      background: #fff4f0;
      border-left: 4px solid #b24020;
    }

    .analysis-section.improvements {
      background: #f0f7ff;
      border-left: 4px solid #0a66c2;
    }

    .analysis-section.risks {
      background: #fff4f0;
      border-left: 4px solid #b24020;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .section-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .section-icon.success {
      background: #057642;
    }

    .section-icon.warning {
      background: #b24020;
    }

    .section-icon.info {
      background: #0a66c2;
    }

    .section-icon.danger {
      background: #b24020;
    }

    .section-icon svg {
      width: 24px;
      height: 24px;
      color: white;
    }

    .section-header h3 {
      font-size: 22px;
      font-weight: 700;
      margin: 0;
    }

    .items-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .item-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .success-item .item-icon {
      color: #057642;
    }

    .warning-item .item-icon {
      color: #b24020;
    }

    .info-item {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 12px;
    }

    .item-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #0a66c2;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }

    .danger-item .item-icon {
      color: #b24020;
    }

    .danger-item.high-risk {
      border-left: 4px solid #b24020;
      background: #fff4f0;
    }

    .danger-item.medium-risk {
      border-left: 4px solid #915907;
      background: #fffbf0;
    }

    .detailed-analysis {
      margin-top: 40px;
      padding-top: 40px;
      border-top: 3px solid #e9e5df;
    }

    .detailed-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 32px;
    }

    .category-analysis {
      margin-bottom: 32px;
      padding: 24px;
      background: #f9fafb;
      border-radius: 12px;
    }

    .category-analysis h4 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .metrics {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 20px;
    }

    .metric {
      display: grid;
      grid-template-columns: 150px 1fr 60px;
      align-items: center;
      gap: 16px;
    }

    .metric-label {
      font-size: 14px;
      font-weight: 600;
    }

    .metric-bar {
      height: 8px;
      background: #e9e5df;
      border-radius: 4px;
      overflow: hidden;
    }

    .metric-fill {
      height: 100%;
      background: #0a66c2;
      border-radius: 4px;
      transition: width 0.8s ease;
    }

    .metric-value {
      font-size: 14px;
      font-weight: 700;
      text-align: right;
    }

    .issues {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e9e5df;
    }

    .issue {
      padding: 12px;
      background: white;
      border-radius: 8px;
      margin-bottom: 8px;
      font-size: 14px;
      color: #666666;
    }

    .result-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 32px;
      border-top: 2px solid #e9e5df;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 24px;
    }

    .back-button {
      flex-direction: row-reverse;
    }

    .arrow-icon,
    .refresh-icon {
      width: 20px;
      height: 20px;
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes cardSlideIn {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `],
  animations: [
    trigger('pageAnimation', [
      transition(':enter', [])
    ]),
    trigger('fadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cardSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('0.6s 0.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class StartupResultComponent implements OnInit {
  analysis: StartupAnalysis | null = null;
  scoreEnabled = false;

  constructor(
    private stateService: StartupStateService,
    private validationService: StartupValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = this.stateService.getCurrentState();
    this.analysis = state.analysis;
    this.scoreEnabled = state.scoreEnabled;

    if (!this.analysis) {
      this.router.navigate(['/startup-validator/step/problem']);
    }
  }

  getScoreLabel(): string {
    if (!this.analysis?.overallScore) return '';
    if (this.analysis.overallScore >= 70) return 'Eccellente';
    if (this.analysis.overallScore >= 50) return 'Buono';
    return 'Da migliorare';
  }

  toggleScore(): void {
    this.stateService.toggleScore();
    this.scoreEnabled = this.stateService.getCurrentState().scoreEnabled;
    
    if (this.analysis) {
      const formData = this.stateService.getCurrentState().formData;
      const newAnalysis = this.validationService.analyzeStartup(
        formData,
        this.scoreEnabled
      );
      this.stateService.setAnalysis(newAnalysis);
      this.analysis = newAnalysis;
    }
  }

  goBack(): void {
    this.router.navigate(['/startup-validator/step/business-model']);
  }

  startOver(): void {
    this.stateService.reset();
    this.router.navigate(['/']);
  }
}

