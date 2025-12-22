import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '@core/services/state.service';
import { BioAnalysisService } from '@core/services/bio-analysis.service';
import { GeneratedBio, BioAnalysis } from '@core/models/bio-form.model';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-result',
  template: `
    <app-wizard>
      <div class="result-container" [@pageAnimation]>
        <!-- Success Header -->
        <div class="success-header" [@fadeInDown]>
          <div class="success-icon-wrapper">
            <mat-icon class="success-icon">celebration</mat-icon>
          </div>
          <h1 class="result-title">Bio Generata con Successo!</h1>
          <p class="result-subtitle">Ecco la tua bio LinkedIn ottimizzata e l'analisi completa</p>
        </div>

        <div class="card main-card" [@cardSlideIn]>
          <!-- Score Toggle -->
          <div class="score-toggle-section">
            <div class="toggle-wrapper">
              <mat-checkbox [(ngModel)]="scoreEnabled" (change)="toggleScore()" class="score-toggle">
                Mostra punteggio dettagliato
              </mat-checkbox>
            </div>
          </div>

          <!-- Bio Preview with Sections -->
          <div *ngIf="generatedBio" class="bio-preview" [@staggerAnimation]>
            <div class="bio-section" [@fadeInUp]>
              <div class="section-header">
                <div class="section-icon">
                  <mat-icon>person</mat-icon>
                </div>
                <h3>Chi sei</h3>
              </div>
              <div class="section-content">
                <p>{{ generatedBio.whoYouAre }}</p>
                <div class="section-tip">
                  <mat-icon>info</mat-icon>
                  <span>Questa sezione introduce te e il tuo ruolo professionale</span>
                </div>
              </div>
            </div>
            
            <div class="bio-section" [@fadeInUp]>
              <div class="section-header">
                <div class="section-icon">
                  <mat-icon>trending_up</mat-icon>
                </div>
                <h3>Che problema risolvi / che valore porti</h3>
              </div>
              <div class="section-content">
                <p>{{ generatedBio.valueProposition }}</p>
                <div class="section-tip">
                  <mat-icon>info</mat-icon>
                  <span>Qui evidenzi il valore concreto che porti ai tuoi clienti o colleghi</span>
                </div>
              </div>
            </div>
            
            <div class="bio-section" [@fadeInUp]>
              <div class="section-header">
                <div class="section-icon">
                  <mat-icon>call_to_action</mat-icon>
                </div>
                <h3>Call to action</h3>
              </div>
              <div class="section-content">
                <p>{{ generatedBio.callToAction }}</p>
                <div class="section-tip">
                  <mat-icon>info</mat-icon>
                  <span>La CTA invita il lettore a compiere un'azione specifica</span>
                </div>
              </div>
            </div>

            <!-- Full Bio -->
            <div class="bio-full" [@fadeInUp]>
              <div class="full-bio-header">
                <h3>
                  <mat-icon>description</mat-icon>
                  Bio completa pronta per LinkedIn
                </h3>
                <div class="bio-stats">
                  <div class="stat-item">
                    <mat-icon>text_fields</mat-icon>
                    <span>{{ fullBio.length }} caratteri</span>
                  </div>
                  <div class="stat-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{ getReadingTime() }} min lettura</span>
                  </div>
                </div>
              </div>
              <div class="bio-text-wrapper">
                <div class="bio-text">{{ fullBio }}</div>
                <button mat-raised-button (click)="copyToClipboard()" class="copy-btn" [class.copied]="copied">
                  <mat-icon>{{ copied ? 'check' : 'content_copy' }}</mat-icon>
                  <span>{{ copied ? 'Copiata!' : 'Copia bio' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Analysis Section -->
          <div *ngIf="analysis" class="analysis-section" [@fadeInUp]>
            <app-checklist [analysis]="analysis"></app-checklist>
            <app-warnings [analysis]="analysis"></app-warnings>
            
            <!-- Enhanced Score Section -->
            <div *ngIf="scoreEnabled && analysis.score !== undefined" class="score-section" [@scaleIn]>
              <div class="score-header">
                <h3>
                  <mat-icon>star</mat-icon>
                  Punteggio Qualità Bio
                </h3>
                <div class="score-badge" [class.excellent]="analysis.score >= 80" [class.good]="analysis.score >= 60 && analysis.score < 80" [class.needs-improvement]="analysis.score < 60">
                  {{ getScoreLabel() }}
                </div>
              </div>
              <div class="score-display">
                <div class="score-value-wrapper">
                  <div class="score-value">{{ analysis.score }}</div>
                  <div class="score-max">/ 100</div>
                </div>
                <div class="progress-wrapper">
                  <mat-progress-bar 
                    mode="determinate" 
                    [value]="analysis.score">
                  </mat-progress-bar>
                  <div class="progress-labels">
                    <span>Da migliorare</span>
                    <span>Eccellente</span>
                  </div>
                </div>
                <div class="score-breakdown">
                  <div class="breakdown-item">
                    <span class="breakdown-label">Chiarezza</span>
                    <div class="breakdown-bar">
                      <div class="breakdown-fill" [class.filled]="analysis.clarity" [style.width.%]="analysis.clarity ? 100 : 0"></div>
                    </div>
                    <span class="breakdown-value">{{ analysis.clarity ? '25' : '0' }}/25</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="breakdown-label">Target</span>
                    <div class="breakdown-bar">
                      <div class="breakdown-fill" [class.filled]="analysis.hasTarget" [style.width.%]="analysis.hasTarget ? 100 : 0"></div>
                    </div>
                    <span class="breakdown-value">{{ analysis.hasTarget ? '25' : '0' }}/25</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="breakdown-label">Call to Action</span>
                    <div class="breakdown-bar">
                      <div class="breakdown-fill" [class.filled]="analysis.hasCta" [style.width.%]="analysis.hasCta ? 100 : 0"></div>
                    </div>
                    <span class="breakdown-value">{{ analysis.hasCta ? '25' : '0' }}/25</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="breakdown-label">Lunghezza</span>
                    <div class="breakdown-bar">
                      <div class="breakdown-fill" [class.filled]="analysis.adequateLength" [style.width.%]="analysis.adequateLength ? 100 : 0"></div>
                    </div>
                    <span class="breakdown-value">{{ analysis.adequateLength ? '25' : '0' }}/25</span>
                  </div>
                </div>
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
              <span>Crea nuova bio</span>
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

    /* Success Header */
    .success-header {
      text-align: center;
      margin-bottom: 32px;
      padding: 40px 24px;
      background: #0a66c2;
      border-radius: 16px;
      color: white;
      box-shadow: 0 4px 16px rgba(10, 102, 194, 0.2);
    }

    .success-icon-wrapper {
      margin-bottom: 16px;
    }

    .success-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      animation: bounce 1s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .result-title {
      font-size: 36px;
      font-weight: 700;
      margin: 0 0 8px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .result-subtitle {
      font-size: 18px;
      opacity: 0.95;
      margin: 0;
    }

    /* Main Card */
    .main-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
      padding: 40px;
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }

    .main-card:hover {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    /* Score Toggle */
    .score-toggle-section {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid #f3f2ef;
    }

    .toggle-wrapper {
      display: flex;
      justify-content: center;
    }

    /* Bio Sections */
    .bio-preview {
      margin-bottom: 40px;
    }

    .bio-section {
      margin-bottom: 32px;
      padding: 24px;
      background: #f9fafb;
      border-radius: 12px;
      border-left: 4px solid #0a66c2;
      transition: all 0.3s ease;
    }

    .bio-section:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .section-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: #0a66c2;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(10, 102, 194, 0.15);
    }

    .section-icon mat-icon {
      color: white;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .section-header h3 {
      font-size: 20px;
      font-weight: 700;
      color: #000000;
      margin: 0;
    }

    .section-content p {
      font-size: 17px;
      line-height: 1.8;
      color: #000000;
      margin: 0 0 12px 0;
      font-weight: 500;
    }

    .section-tip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      background: #f3f2ef;
      border-radius: 8px;
      margin-top: 12px;
    }

    .section-tip mat-icon {
      color: #666666;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .section-tip span {
      font-size: 13px;
      color: #666666;
      font-style: italic;
    }

    /* Full Bio */
    .bio-full {
      margin-top: 40px;
      padding: 32px;
      background: #f9fafb;
      border-radius: 16px;
      border: 1px solid #e9e5df;
    }

    .full-bio-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .full-bio-header h3 {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 22px;
      font-weight: 700;
      color: #0a66c2;
      margin: 0;
    }

    .full-bio-header mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .bio-stats {
      display: flex;
      gap: 24px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .stat-item mat-icon {
      color: #0a66c2;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .stat-item span {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
    }

    .bio-text-wrapper {
      position: relative;
    }

    .bio-text {
      background: white;
      border: 1px solid #e9e5df;
      border-radius: 12px;
      padding: 24px;
      font-size: 16px;
      line-height: 1.8;
      color: #000000;
      white-space: pre-wrap;
      margin-bottom: 20px;
      min-height: 120px;
      transition: all 0.3s ease;
    }

    .bio-text:hover {
      border-color: #0a66c2;
      box-shadow: 0 2px 8px rgba(10, 102, 194, 0.1);
    }

    .copy-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 24px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(10, 102, 194, 0.2);
    }

    .copy-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
    }

    .copy-btn.copied {
      background: #0a66c2;
      color: white;
    }

    /* Analysis Section */
    .analysis-section {
      margin-top: 40px;
      padding-top: 40px;
      border-top: 3px solid #e9e5df;
    }

    /* Score Section */
    .score-section {
      margin-top: 32px;
      padding: 32px;
      background: #f9fafb;
      border-radius: 16px;
      border: 1px solid #e9e5df;
    }

    .score-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .score-header h3 {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 700;
      color: #000000;
      margin: 0;
    }

    .score-header mat-icon {
      color: #0a66c2;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .score-badge {
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .score-badge.excellent {
      background: #0a66c2;
      color: white;
    }

    .score-badge.good {
      background: #666666;
      color: white;
    }

    .score-badge.needs-improvement {
      background: #999999;
      color: white;
    }

    .score-display {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .score-value-wrapper {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
    }

    .score-value {
      font-size: 64px;
      font-weight: 700;
      color: #0a66c2;
      line-height: 1;
    }

    .score-max {
      font-size: 32px;
      font-weight: 600;
      color: #666666;
    }

    .progress-wrapper {
      margin-top: 8px;
    }

    ::ng-deep .mat-progress-bar-fill::after {
      background: #0a66c2;
    }

    .progress-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 12px;
      color: #666666;
    }

    .score-breakdown {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 24px;
    }

    .breakdown-item {
      display: grid;
      grid-template-columns: 120px 1fr 60px;
      align-items: center;
      gap: 16px;
    }

    .breakdown-label {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
    }

    .breakdown-bar {
      height: 8px;
      background: #e9e5df;
      border-radius: 4px;
      overflow: hidden;
    }

    .breakdown-fill {
      height: 100%;
      border-radius: 4px;
      background: #e9e5df;
      transition: width 0.8s ease, background 0.3s ease;
    }

    .breakdown-fill.filled {
      background: #0a66c2;
    }

    .breakdown-value {
      font-size: 14px;
      font-weight: 700;
      color: #666666;
      text-align: right;
    }

    /* Actions */
    .result-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 32px;
      border-top: 2px solid #e9e5df;
      gap: 16px;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 24px;
      transition: all 0.3s ease;
    }

    .action-btn.primary {
      box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
    }

    .action-btn:hover {
      transform: translateY(-2px);
    }

    .action-btn.primary:hover {
      box-shadow: 0 6px 20px rgba(10, 102, 194, 0.4);
    }

    .back-button {
      flex-direction: row-reverse;
    }

    .arrow-icon,
    .refresh-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    /* Animations */
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

    @media (max-width: 768px) {
      .result-title {
        font-size: 28px;
      }

      .result-subtitle {
        font-size: 16px;
      }

      .main-card {
        padding: 24px;
      }

      .score-value {
        font-size: 48px;
      }

      .breakdown-item {
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .breakdown-value {
        text-align: left;
      }
    }
  `],
  animations: [
    trigger('pageAnimation', [
      transition(':enter', [
        query('.success-header, .main-card', [
          style({ opacity: 0 })
        ])
      ])
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
    trigger('staggerAnimation', [
      transition(':enter', [
        query('.bio-section', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
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
export class ResultComponent implements OnInit {
  generatedBio: GeneratedBio | null = null;
  analysis: BioAnalysis | null = null;
  scoreEnabled = false;
  copied = false;

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
      this.router.navigate(['/bio-linkedin/step/role']);
    }
  }

  get fullBio(): string {
    if (!this.generatedBio) return '';
    return `${this.generatedBio.whoYouAre} ${this.generatedBio.valueProposition} ${this.generatedBio.callToAction}`;
  }

  getReadingTime(): number {
    const words = this.fullBio.split(/\s+/).length;
    return Math.ceil(words / 200); // Assumendo 200 parole al minuto
  }

  getScoreLabel(): string {
    if (!this.analysis?.score) return '';
    if (this.analysis.score >= 80) return 'Eccellente';
    if (this.analysis.score >= 60) return 'Buono';
    return 'Da migliorare';
  }

  getScoreColor(): string {
    if (!this.analysis?.score) return 'primary';
    if (this.analysis.score >= 80) return 'accent';
    if (this.analysis.score >= 60) return 'warn';
    return 'warn';
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
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }

  goBack(): void {
    this.router.navigate(['/bio-linkedin/step/goal']);
  }

  startOver(): void {
    this.stateService.reset();
    this.router.navigate(['/']);
  }
}

