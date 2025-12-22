import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header" *ngIf="showHeader">
        <div class="container">
          <h1 (click)="goHome()" class="logo">Validation Tools</h1>
          <p class="subtitle">Valida e migliora le tue idee</p>
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

    .app-header h1.logo {
      font-size: 28px;
      font-weight: 600;
      color: #0a66c2;
      margin-bottom: 4px;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .app-header h1.logo:hover {
      opacity: 0.8;
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
  showHeader = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Mostra header solo quando NON siamo sulla homepage
        this.showHeader = event.url !== '/';
      });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}

