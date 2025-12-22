import { Component, Input } from '@angular/core';
import { BioAnalysis } from '@core/models/bio-form.model';

@Component({
  selector: 'app-checklist',
  template: `
    <div class="checklist-card">
      <h3>Checklist di qualità</h3>
      <div class="checklist-items">
        <div class="checklist-item" [class.checked]="analysis.clarity">
          <mat-icon [class.success]="analysis.clarity" [class.error]="!analysis.clarity">
            {{ analysis.clarity ? 'check_circle' : 'cancel' }}
          </mat-icon>
          <span>Chiarezza del messaggio</span>
        </div>
        
        <div class="checklist-item" [class.checked]="analysis.hasTarget">
          <mat-icon [class.success]="analysis.hasTarget" [class.error]="!analysis.hasTarget">
            {{ analysis.hasTarget ? 'check_circle' : 'cancel' }}
          </mat-icon>
          <span>Presenza del target</span>
        </div>
        
        <div class="checklist-item" [class.checked]="analysis.hasCta">
          <mat-icon [class.success]="analysis.hasCta" [class.error]="!analysis.hasCta">
            {{ analysis.hasCta ? 'check_circle' : 'cancel' }}
          </mat-icon>
          <span>Presenza di una CTA</span>
        </div>
        
        <div class="checklist-item" [class.checked]="analysis.adequateLength">
          <mat-icon [class.success]="analysis.adequateLength" [class.error]="!analysis.adequateLength">
            {{ analysis.adequateLength ? 'check_circle' : 'cancel' }}
          </mat-icon>
          <span>Lunghezza adeguata</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checklist-card {
      background: #f9fafb;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 16px;
    }

    .checklist-items {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .checklist-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: white;
      border-radius: 4px;
      border: 1px solid #e9e5df;
      transition: all 0.2s;
    }

    .checklist-item.checked {
      border-color: #057642;
      background: #f0f9f4;
    }

    .checklist-item mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .checklist-item mat-icon.success {
      color: #057642;
    }

    .checklist-item mat-icon.error {
      color: #b24020;
    }

    .checklist-item span {
      font-size: 15px;
      color: #000000;
      font-weight: 500;
    }
  `]
})
export class ChecklistComponent {
  @Input() analysis!: BioAnalysis;
}

