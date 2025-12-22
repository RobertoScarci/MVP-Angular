import { Component, Input } from '@angular/core';
import { BioAnalysis } from '@core/models/bio-form.model';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-checklist',
  template: `
    <div class="checklist-card" [@fadeIn]>
      <div class="checklist-header">
        <h3>
          <svg class="header-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/>
          </svg>
          Checklist di Qualità
        </h3>
        <div class="checklist-stats">
          <span class="stat-number">{{ getPassedCount() }}/4</span>
          <span class="stat-label">Criteri rispettati</span>
        </div>
      </div>
      <div class="checklist-items" [@staggerItems]>
        <div class="checklist-item" [class.checked]="analysis.clarity" [class.unchecked]="!analysis.clarity" [@itemAnimation]>
          <div class="item-icon-wrapper">
            <svg *ngIf="analysis.clarity" class="success-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg *ngIf="!analysis.clarity" class="error-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div class="item-content">
            <span class="item-title">Chiarezza del messaggio</span>
            <span class="item-description">
              {{ analysis.clarity ? 'Il messaggio è chiaro e facilmente comprensibile' : 'Il messaggio potrebbe essere più chiaro e specifico' }}
            </span>
          </div>
          <div class="item-score">
            <span class="score-value">{{ analysis.clarity ? '25' : '0' }}</span>
            <span class="score-max">/25</span>
          </div>
        </div>
        
        <div class="checklist-item" [class.checked]="analysis.hasTarget" [class.unchecked]="!analysis.hasTarget" [@itemAnimation]>
          <div class="item-icon-wrapper">
            <svg *ngIf="analysis.hasTarget" class="success-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg *ngIf="!analysis.hasTarget" class="error-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div class="item-content">
            <span class="item-title">Presenza del target</span>
            <span class="item-description">
              {{ analysis.hasTarget ? 'Il target è chiaramente identificato nella bio' : 'Il target non è esplicitamente menzionato' }}
            </span>
          </div>
          <div class="item-score">
            <span class="score-value">{{ analysis.hasTarget ? '25' : '0' }}</span>
            <span class="score-max">/25</span>
          </div>
        </div>
        
        <div class="checklist-item" [class.checked]="analysis.hasCta" [class.unchecked]="!analysis.hasCta" [@itemAnimation]>
          <div class="item-icon-wrapper">
            <svg *ngIf="analysis.hasCta" class="success-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg *ngIf="!analysis.hasCta" class="error-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div class="item-content">
            <span class="item-title">Presenza di una CTA</span>
            <span class="item-description">
              {{ analysis.hasCta ? 'La call to action è presente e chiara' : 'Manca una call to action esplicita' }}
            </span>
          </div>
          <div class="item-score">
            <span class="score-value">{{ analysis.hasCta ? '25' : '0' }}</span>
            <span class="score-max">/25</span>
          </div>
        </div>
        
        <div class="checklist-item" [class.checked]="analysis.adequateLength" [class.unchecked]="!analysis.adequateLength" [@itemAnimation]>
          <div class="item-icon-wrapper">
            <svg *ngIf="analysis.adequateLength" class="success-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg *ngIf="!analysis.adequateLength" class="error-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div class="item-content">
            <span class="item-title">Lunghezza adeguata</span>
            <span class="item-description">
              {{ analysis.adequateLength ? 'La lunghezza è ottimale per LinkedIn' : 'La bio è troppo breve o troppo lunga' }}
            </span>
          </div>
          <div class="item-score">
            <span class="score-value">{{ analysis.adequateLength ? '25' : '0' }}</span>
            <span class="score-max">/25</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checklist-card {
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 32px;
      border: 2px solid #e9e5df;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }

    .checklist-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e9e5df;
      flex-wrap: wrap;
      gap: 16px;
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 700;
      color: #000000;
      margin: 0;
    }

    .header-icon {
      width: 24px;
      height: 24px;
      color: #0a66c2;
    }

    .checklist-stats {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .stat-number {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(135deg, #0a66c2 0%, #057642 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }

    .stat-label {
      font-size: 12px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 4px;
    }

    .checklist-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .checklist-item {
      display: grid;
      grid-template-columns: 48px 1fr 80px;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      border: 2px solid #e9e5df;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .checklist-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #e9e5df;
      transition: all 0.3s ease;
    }

    .checklist-item.checked {
      border-color: #057642;
      background: linear-gradient(135deg, #f0f9f4 0%, #ffffff 100%);
      box-shadow: 0 4px 12px rgba(5, 118, 66, 0.1);
    }

    .checklist-item.checked::before {
      background: linear-gradient(180deg, #057642 0%, #034a2e 100%);
    }

    .checklist-item.unchecked {
      border-color: #ffd4c4;
      background: linear-gradient(135deg, #fff4f0 0%, #ffffff 100%);
    }

    .checklist-item.unchecked::before {
      background: #b24020;
    }

    .checklist-item:hover {
      transform: translateX(4px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    .item-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .success-icon,
    .error-icon {
      width: 32px;
      height: 32px;
      transition: all 0.3s ease;
    }

    .success-icon {
      color: #057642;
      animation: checkPulse 0.6s ease-out;
    }

    .error-icon {
      color: #b24020;
    }

    @keyframes checkPulse {
      0% {
        transform: scale(0.8);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }

    .item-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .item-title {
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }

    .item-description {
      font-size: 13px;
      color: #666666;
      line-height: 1.4;
    }

    .item-score {
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      gap: 2px;
    }

    .score-value {
      font-size: 20px;
      font-weight: 700;
      color: #000000;
    }

    .score-max {
      font-size: 14px;
      color: #666666;
    }

    .checklist-item.checked .score-value {
      color: #057642;
    }

    .checklist-item.unchecked .score-value {
      color: #b24020;
    }

    @media (max-width: 768px) {
      .checklist-item {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .item-score {
        justify-content: flex-start;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerItems', [
      transition(':enter', [
        query('.checklist-item', [
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
    ])
  ]
})
export class ChecklistComponent {
  @Input() analysis!: BioAnalysis;

  getPassedCount(): number {
    let count = 0;
    if (this.analysis.clarity) count++;
    if (this.analysis.hasTarget) count++;
    if (this.analysis.hasCta) count++;
    if (this.analysis.adequateLength) count++;
    return count;
  }
}

