import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container">
          <h1>LinkedIn Bio Generator</h1>
          <p class="subtitle">Crea una bio LinkedIn efficace, step by step</p>
        </div>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: #ffffff;
      border-bottom: 1px solid #e9e5df;
      padding: 24px 0;
      margin-bottom: 32px;
    }

    .app-header h1 {
      font-size: 28px;
      font-weight: 600;
      color: #0a66c2;
      margin-bottom: 4px;
    }

    .app-header .subtitle {
      color: #666666;
      font-size: 14px;
      margin: 0;
    }

    .app-main {
      flex: 1;
      padding-bottom: 48px;
    }
  `]
})
export class AppComponent {
  title = 'LinkedIn Bio Generator';
}

