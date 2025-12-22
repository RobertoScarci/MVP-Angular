import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-indicator',
  template: `
    <div class="progress-container">
      <div class="progress-steps">
        <div 
          *ngFor="let step of steps; let i = index" 
          class="progress-step"
          [class.active]="i === currentStep"
          [class.completed]="i < currentStep"
        >
          <div class="step-circle">
            <mat-icon *ngIf="i < currentStep">check</mat-icon>
            <span *ngIf="i >= currentStep">{{ i + 1 }}</span>
          </div>
          <span class="step-label">{{ step }}</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" [style.width.%]="progressPercentage"></div>
      </div>
    </div>
  `,
  styles: [`
    .progress-container {
      margin-bottom: 32px;
    }

    .progress-steps {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      position: relative;
    }

    .progress-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
      z-index: 2;
    }

    .step-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e9e5df;
      border: 2px solid #e9e5df;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #666666;
      transition: all 0.3s ease;
      position: relative;
      z-index: 3;
    }

    .progress-step.completed .step-circle {
      background: #057642;
      border-color: #057642;
      color: white;
      transform: scale(1.1);
    }

    .progress-step.active .step-circle {
      background: #0a66c2;
      border-color: #0a66c2;
      color: white;
      transform: scale(1.15);
      box-shadow: 0 0 0 4px rgba(10, 102, 194, 0.2);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 4px rgba(10, 102, 194, 0.2);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(10, 102, 194, 0.1);
      }
    }

    .step-circle mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .step-label {
      margin-top: 8px;
      font-size: 12px;
      color: #666666;
      font-weight: 500;
      text-align: center;
      transition: color 0.3s ease;
    }

    .progress-step.active .step-label {
      color: #0a66c2;
      font-weight: 600;
    }

    .progress-step.completed .step-label {
      color: #057642;
    }

    .progress-bar {
      height: 4px;
      background: #e9e5df;
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #0a66c2 0%, #057642 100%);
      border-radius: 2px;
      transition: width 0.5s ease;
      position: relative;
      overflow: hidden;
    }

    .progress-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @media (max-width: 768px) {
      .step-label {
        font-size: 10px;
      }

      .step-circle {
        width: 32px;
        height: 32px;
        font-size: 14px;
      }
    }
  `]
})
export class ProgressIndicatorComponent {
  @Input() currentStep: number = 0;
  @Input() steps: string[] = [];
  
  get progressPercentage(): number {
    if (this.steps.length === 0) return 0;
    return ((this.currentStep + 1) / this.steps.length) * 100;
  }
}

