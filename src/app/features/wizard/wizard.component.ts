import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-wizard',
  template: `
    <div class="wizard-container">
      <div class="wizard-content" [@fadeInUp]>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .wizard-container {
      display: flex;
      justify-content: center;
      padding: 24px;
      min-height: calc(100vh - 200px);
    }

    .wizard-content {
      width: 100%;
      max-width: 700px;
      animation: fadeInUp 0.5s ease-out;
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
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WizardComponent {
}

