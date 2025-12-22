import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header" *ngIf="showHeader">
        <div class="container">
          <div class="header-content">
            <div class="logo-container" (click)="goHome()">
              <div class="logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="6" fill="#0a66c2"/>
                  <path d="M10 10L14 22L18 10H20L16 24H12L8 10H10Z" fill="white"/>
                  <path d="M22 10H24V22H22V10Z" fill="white"/>
                  <path d="M24 10C25.1046 10 26 10.8954 26 12C26 13.1046 25.1046 14 24 14C22.8954 14 22 13.1046 22 12C22 10.8954 22.8954 10 24 10Z" fill="white"/>
                </svg>
              </div>
              <h1 class="logo">Validation Tools</h1>
            </div>
            <p class="subtitle">Valida e migliora le tue idee</p>
          </div>
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

    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .logo-container:hover {
      opacity: 0.8;
    }

    .logo-icon {
      display: flex;
      align-items: center;
    }

    .logo-icon svg {
      transition: transform 0.2s;
    }

    .logo-container:hover .logo-icon svg {
      transform: scale(1.1);
    }

    .app-header h1.logo {
      font-size: 28px;
      font-weight: 600;
      color: #0a66c2;
      margin: 0;
      cursor: pointer;
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

