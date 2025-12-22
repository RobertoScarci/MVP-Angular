import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard',
  template: `
    <div class="wizard-container">
      <div class="wizard-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .wizard-container {
      display: flex;
      justify-content: center;
      padding: 24px;
    }

    .wizard-content {
      width: 100%;
      max-width: 700px;
    }
  `]
})
export class WizardComponent {
}

