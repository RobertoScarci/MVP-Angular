import { Component, Input } from '@angular/core';
import { BioAnalysis } from '@core/models/bio-form.model';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-warnings',
  template: `
    <div class="warnings-container" [@fadeIn]>
      <!-- Warnings -->
      <div *ngIf="analysis.warnings.length > 0" class="warnings-card" [@slideIn]>
        <div class="card-header warning-header">
          <div class="header-content">
            <div class="header-icon warning-icon-bg">
              <mat-icon class="warning-icon">warning</mat-icon>
            </div>
            <div>
              <h3>Avvisi da Considerare</h3>
              <p class="header-subtitle">{{ analysis.warnings.length }} {{ analysis.warnings.length === 1 ? 'punto' : 'punti' }} da migliorare</p>
            </div>
          </div>
        </div>
        <div class="warnings-list" [@staggerItems]>
          <div *ngFor="let warning of analysis.warnings; let i = index" class="warning-item" [@itemAnimation]>
            <div class="item-number">{{ i + 1 }}</div>
            <div class="item-content">
              <div class="item-header">
                <mat-icon class="item-icon">error_outline</mat-icon>
                <span class="item-title">{{ getWarningTitle(warning) }}</span>
              </div>
              <p class="item-description">{{ warning }}</p>
              <div class="item-example" *ngIf="getWarningExample(warning)">
                <mat-icon>lightbulb_outline</mat-icon>
                <span>{{ getWarningExample(warning) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <div *ngIf="analysis.suggestions.length > 0" class="suggestions-card" [@slideIn]>
        <div class="card-header suggestion-header">
          <div class="header-content">
            <div class="header-icon suggestion-icon-bg">
              <mat-icon class="suggestion-icon">lightbulb</mat-icon>
            </div>
            <div>
              <h3>Suggerimenti per Migliorare</h3>
              <p class="header-subtitle">{{ analysis.suggestions.length }} {{ analysis.suggestions.length === 1 ? 'suggerimento' : 'suggerimenti' }} pratici</p>
            </div>
          </div>
        </div>
        <div class="suggestions-list" [@staggerItems]>
          <div *ngFor="let suggestion of analysis.suggestions; let i = index" class="suggestion-item" [@itemAnimation]>
            <div class="item-number suggestion-number">{{ i + 1 }}</div>
            <div class="item-content">
              <div class="item-header">
                <mat-icon class="item-icon">trending_up</mat-icon>
                <span class="item-title">{{ getSuggestionTitle(suggestion) }}</span>
              </div>
              <p class="item-description">{{ suggestion }}</p>
              <div class="item-benefit">
                <mat-icon>star</mat-icon>
                <span>Questo miglioramento aumenterà l'efficacia della tua bio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Perfect Score -->
      <div *ngIf="analysis.warnings.length === 0 && analysis.suggestions.length === 0" class="success-card" [@scaleIn]>
        <div class="success-icon-wrapper">
          <mat-icon class="success-icon">celebration</mat-icon>
        </div>
        <h3>Perfetto! 🎉</h3>
        <p class="success-message">La tua bio rispetta tutti i criteri di qualità!</p>
        <div class="success-details">
          <div class="detail-item">
            <mat-icon>check_circle</mat-icon>
            <span>Messaggio chiaro e professionale</span>
          </div>
          <div class="detail-item">
            <mat-icon>check_circle</mat-icon>
            <span>Target ben identificato</span>
          </div>
          <div class="detail-item">
            <mat-icon>check_circle</mat-icon>
            <span>Call to action efficace</span>
          </div>
          <div class="detail-item">
            <mat-icon>check_circle</mat-icon>
            <span>Lunghezza ottimale</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .warnings-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    /* Warnings Card */
    .warnings-card {
      border-radius: 16px;
      overflow: hidden;
      background: white;
      border: 2px solid #ffd4c4;
      box-shadow: 0 4px 16px rgba(178, 64, 32, 0.1);
    }

    .warning-header {
      background: linear-gradient(135deg, #fff4f0 0%, #ffe8e0 100%);
      padding: 24px;
      border-bottom: 2px solid #ffd4c4;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .header-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .warning-icon-bg {
      background: linear-gradient(135deg, #b24020 0%, #8a3018 100%);
      box-shadow: 0 4px 12px rgba(178, 64, 32, 0.3);
    }

    .warning-icon {
      color: white;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    h3 {
      font-size: 22px;
      font-weight: 700;
      color: #000000;
      margin: 0 0 4px 0;
    }

    .header-subtitle {
      font-size: 14px;
      color: #666666;
      margin: 0;
    }

    .warnings-list {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .warning-item {
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, #fff4f0 0%, #ffffff 100%);
      border-radius: 12px;
      border-left: 4px solid #b24020;
      transition: all 0.3s ease;
    }

    .warning-item:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(178, 64, 32, 0.15);
    }

    .item-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #b24020;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }

    .item-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .item-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .item-icon {
      color: #b24020;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .item-title {
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }

    .item-description {
      font-size: 14px;
      line-height: 1.6;
      color: #666666;
      margin: 0;
    }

    .item-example {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 12px;
      background: rgba(178, 64, 32, 0.08);
      border-radius: 8px;
      margin-top: 4px;
    }

    .item-example mat-icon {
      color: #b24020;
      font-size: 18px;
      width: 18px;
      height: 18px;
      margin-top: 2px;
    }

    .item-example span {
      font-size: 13px;
      color: #666666;
      font-style: italic;
    }

    /* Suggestions Card */
    .suggestions-card {
      border-radius: 16px;
      overflow: hidden;
      background: white;
      border: 2px solid #b3d9ff;
      box-shadow: 0 4px 16px rgba(10, 102, 194, 0.1);
    }

    .suggestion-header {
      background: linear-gradient(135deg, #f0f7ff 0%, #e3f2fd 100%);
      padding: 24px;
      border-bottom: 2px solid #b3d9ff;
    }

    .suggestion-icon-bg {
      background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);
      box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
    }

    .suggestion-icon {
      color: white;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .suggestions-list {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .suggestion-item {
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%);
      border-radius: 12px;
      border-left: 4px solid #0a66c2;
      transition: all 0.3s ease;
    }

    .suggestion-item:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(10, 102, 194, 0.15);
    }

    .suggestion-number {
      background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);
    }

    .suggestion-item .item-icon {
      color: #0a66c2;
    }

    .item-benefit {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 12px;
      background: rgba(10, 102, 194, 0.08);
      border-radius: 8px;
      margin-top: 4px;
    }

    .item-benefit mat-icon {
      color: #0a66c2;
      font-size: 18px;
      width: 18px;
      height: 18px;
      margin-top: 2px;
    }

    .item-benefit span {
      font-size: 13px;
      color: #666666;
      font-weight: 500;
    }

    /* Success Card */
    .success-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background: linear-gradient(135deg, #f0f9f4 0%, #ffffff 100%);
      border: 2px solid #a8e6c3;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 16px rgba(5, 118, 66, 0.1);
    }

    .success-icon-wrapper {
      margin-bottom: 20px;
    }

    .success-icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      color: #057642;
      animation: successBounce 1s ease-in-out infinite;
    }

    @keyframes successBounce {
      0%, 100% {
        transform: scale(1) rotate(0deg);
      }
      25% {
        transform: scale(1.1) rotate(-5deg);
      }
      75% {
        transform: scale(1.1) rotate(5deg);
      }
    }

    .success-card h3 {
      font-size: 28px;
      font-weight: 700;
      color: #057642;
      margin: 0 0 12px 0;
    }

    .success-message {
      font-size: 18px;
      color: #000000;
      margin: 0 0 24px 0;
      font-weight: 500;
    }

    .success-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      width: 100%;
      max-width: 600px;
      margin-top: 24px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .detail-item mat-icon {
      color: #057642;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .detail-item span {
      font-size: 14px;
      color: #000000;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .warning-item,
      .suggestion-item {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .item-number {
        width: 28px;
        height: 28px;
        font-size: 12px;
      }

      .success-details {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerItems', [
      transition(':enter', [
        query('.warning-item, .suggestion-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(100, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ]),
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
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
export class WarningsComponent {
  @Input() analysis!: BioAnalysis;

  getWarningTitle(warning: string): string {
    if (warning.includes('chiarezza')) return 'Chiarezza del Messaggio';
    if (warning.includes('target')) return 'Target non Identificato';
    if (warning.includes('CTA') || warning.includes('call to action')) return 'Call to Action Mancante';
    if (warning.includes('lunghezza') || warning.includes('breve') || warning.includes('lunga')) return 'Lunghezza Non Ottimale';
    if (warning.includes('autoreferenziale')) return 'Troppo Autoreferenziale';
    if (warning.includes('vago') || warning.includes('vaghe')) return 'Messaggi Vaghi';
    if (warning.includes('valore')) return 'Focus sul Valore';
    return 'Punto da Migliorare';
  }

  getWarningExample(warning: string): string {
    if (warning.includes('chiarezza')) return 'Esempio: invece di "esperto", specifica "5 anni di esperienza in sviluppo web"';
    if (warning.includes('target')) return 'Esempio: aggiungi "lavoro con startup tech e PMI digitali"';
    if (warning.includes('CTA')) return 'Esempio: "Contattami per discutere come posso aiutarti"';
    if (warning.includes('lunghezza')) return 'LinkedIn consiglia tra 50 e 2000 caratteri per una bio efficace';
    if (warning.includes('autoreferenziale')) return 'Esempio: invece di "io sono", usa "aiuto le aziende a..."';
    if (warning.includes('vago')) return 'Esempio: invece di "qualificato", descrivi risultati concreti';
    return '';
  }

  getSuggestionTitle(suggestion: string): string {
    if (suggestion.includes('completa')) return 'Completa le Sezioni';
    if (suggestion.includes('dettagli')) return 'Aggiungi Dettagli';
    if (suggestion.includes('target')) return 'Menziona il Target';
    if (suggestion.includes('verbi')) return 'Usa Verbi d\'Azione';
    if (suggestion.includes('sintetizza')) return 'Sintetizza il Contenuto';
    return 'Suggerimento Pratico';
  }
}


