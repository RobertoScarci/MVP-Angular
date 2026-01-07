import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  comingSoon?: boolean;
}

@Component({
  selector: 'app-homepage',
  template: `
    <div class="homepage-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-logo">
            <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="80" rx="16" fill="white" fill-opacity="0.2"/>
              <path d="M25 25L35 55L45 25H50L40 60H30L20 25H25Z" fill="white"/>
              <path d="M55 25H60V55H55V25Z" fill="white"/>
              <path d="M60 25C62.2091 25 64 26.7909 64 29C64 31.2091 62.2091 33 60 33C57.7909 33 56 31.2091 56 29C56 26.7909 57.7909 25 60 25Z" fill="white"/>
            </svg>
          </div>
          <h1 class="hero-title">
            Valida le tue idee
          </h1>
          <p class="hero-subtitle">
            Strumenti per allineare il tuo messaggio con quello che vuole la gente
          </p>
        </div>
      </section>

      <!-- Tools Grid -->
      <section class="tools-section">
        <div class="container">
          <h2 class="section-title">Scegli il tuo strumento</h2>
          <p class="section-description">
            Ogni strumento ti guida step-by-step per validare e migliorare il tuo messaggio
          </p>
          
          <div class="tools-grid">
            <div 
              *ngFor="let tool of tools" 
              class="tool-card"
              [class.coming-soon]="tool.comingSoon"
              (click)="navigateToTool(tool)"
            >
              <div class="tool-icon-wrapper">
                <div class="tool-icon" [style.background]="getIconGradient(tool.color)">
                  <!-- LinkedIn Logo -->
                  <div *ngIf="tool.id === 'linkedin-bio'" class="linkedin-logo">
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <!-- Startup Logo -->
                  <div *ngIf="tool.id === 'startup-validator'" class="startup-logo">
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.81 14.12L5.64 11.29L8.17 10.79C11.39 6.41 17.55 4.22 19.78 4.22C19.78 6.45 17.59 12.61 13.21 15.83L12.71 18.36L9.88 21.19C9.34 21.73 8.5 21.73 7.96 21.19L2.81 16.04C2.27 15.5 2.27 14.66 2.81 14.12M7.96 19.76L11.29 16.43L12.5 13.5L13.5 12.5L16.43 11.29L19.76 7.96L16.43 4.63L13.5 5.84L12.5 6.84L11.29 9.77L7.96 13.1L4.63 9.77L7.96 6.44L10.89 7.65L11.89 8.65L13.1 11.58L16.43 8.25L19.76 11.58L16.43 14.91L13.5 13.7L12.5 12.7L11.29 9.77L7.96 13.1L4.63 16.43L7.96 19.76Z"/>
                    </svg>
                  </div>
                  <!-- Video Logo -->
                  <div *ngIf="tool.id === 'video-analyzer'" class="video-logo">
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
                    </svg>
                  </div>
                  <!-- Message Logo -->
                  <div *ngIf="tool.id === 'message-validator'" class="message-logo">
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M20,16H6L4,18V4H20V16Z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 class="tool-title">{{ tool.title }}</h3>
              <p class="tool-description">{{ tool.description }}</p>
              <div class="tool-footer">
                <span class="tool-badge" *ngIf="tool.comingSoon">Prossimamente</span>
                <button mat-raised-button [color]="tool.comingSoon ? '' : 'primary'" [disabled]="tool.comingSoon">
                  Inizia
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Value Proposition -->
      <section class="value-section">
        <div class="container">
          <div class="value-grid">
            <div class="value-item">
              <svg class="value-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
              </svg>
              <h3>Risultati rapidi</h3>
              <p>Ottieni feedback immediato in pochi minuti</p>
            </div>
            <div class="value-item">
              <svg class="value-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55C21.56 12.26 23 11.45 23 10c0-1.1-.9-2-2-2z"/>
              </svg>
              <h3>Analisi approfondite</h3>
              <p>Regole deterministiche basate su best practice</p>
            </div>
            <div class="value-item">
              <svg class="value-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
              <h3>Miglioramento continuo</h3>
              <p>Suggerimenti concreti per ottimizzare il tuo messaggio</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .homepage-container {
      min-height: 100vh;
      background: linear-gradient(180deg, #f3f2ef 0%, #ffffff 100%);
    }

    /* Hero Section */
    .hero-section {
      background: #0a66c2;
      color: white;
      padding: 60px 24px 50px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
      pointer-events: none;
    }

    .hero-content {
      max-width: 700px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .hero-logo {
      margin-bottom: 24px;
      display: flex;
      justify-content: center;
      animation: fadeInDown 0.5s ease-out;
    }

    .hero-logo svg {
      opacity: 0.95;
      transition: opacity 0.3s ease;
    }

    .hero-logo:hover svg {
      opacity: 1;
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hero-title {
      font-size: 42px;
      font-weight: 700;
      line-height: 1.2;
      margin: 0 0 16px 0;
      letter-spacing: -0.5px;
      animation: fadeInUp 0.6s ease-out;
    }

    .hero-subtitle {
      font-size: 18px;
      line-height: 1.5;
      opacity: 0.9;
      margin: 0;
      animation: fadeInUp 0.6s 0.2s ease-out both;
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

    /* Tools Section */
    .tools-section {
      padding: 80px 24px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      color: #000000;
      margin-bottom: 16px;
    }

    .section-description {
      font-size: 18px;
      color: #666666;
      text-align: center;
      margin-bottom: 48px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
      margin-top: 48px;
    }

    .tool-card {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      cursor: pointer;
      border: 2px solid transparent;
      display: flex;
      flex-direction: column;
    }

    .tool-card:hover:not(.coming-soon) {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: #0a66c2;
    }

    .tool-card.coming-soon {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .tool-icon-wrapper {
      margin-bottom: 24px;
    }

    .tool-icon {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .tool-card:hover:not(.coming-soon) .tool-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .tool-icon-svg {
      font-size: 40px;
      width: 40px;
      height: 40px;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .linkedin-logo,
    .startup-logo,
    .video-logo,
    .message-logo {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .linkedin-logo svg,
    .startup-logo svg,
    .video-logo svg,
    .message-logo svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
    }

    .linkedin-logo {
      color: #0a66c2;
    }

    .linkedin-logo svg {
      filter: drop-shadow(0 2px 4px rgba(10, 102, 194, 0.3));
    }

    .startup-logo {
      color: #057642;
    }

    .startup-logo svg {
      filter: drop-shadow(0 2px 4px rgba(5, 118, 66, 0.3));
    }

    .video-logo {
      color: #b24020;
    }

    .video-logo svg {
      filter: drop-shadow(0 2px 4px rgba(178, 64, 32, 0.3));
    }

    .message-logo {
      color: #915907;
    }

    .message-logo svg {
      filter: drop-shadow(0 2px 4px rgba(145, 89, 7, 0.3));
    }

    .tool-title {
      font-size: 24px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 12px;
    }

    .tool-description {
      font-size: 16px;
      color: #666666;
      line-height: 1.6;
      flex: 1;
      margin-bottom: 24px;
    }

    .tool-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .tool-badge {
      background: #f3f2ef;
      color: #666666;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .tool-footer button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Value Section */
    .value-section {
      background: #f9fafb;
      padding: 80px 24px;
      border-top: 1px solid #e9e5df;
    }

    .value-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 48px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .value-item {
      text-align: center;
    }

    .value-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #0a66c2;
      margin-bottom: 16px;
    }

    .value-item h3 {
      font-size: 20px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 8px;
    }

    .value-item p {
      font-size: 16px;
      color: #666666;
      line-height: 1.6;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-section {
        padding: 50px 20px 40px;
      }

      .hero-title {
        font-size: 32px;
      }

      .hero-subtitle {
        font-size: 16px;
      }

      .tools-grid {
        grid-template-columns: 1fr;
      }

      .section-title {
        font-size: 28px;
      }
    }
  `]
})
export class HomepageComponent {
  tools: Tool[] = [
    {
      id: 'linkedin-bio',
      title: 'Bio LinkedIn',
      description: 'Crea una bio LinkedIn efficace, orientata al valore e con una call to action chiara. Perfetta per professionisti che vogliono migliorare la propria presenza online.',
      icon: 'business_center',
      color: '#0a66c2',
      route: '/bio-linkedin/step/role',
      comingSoon: false
    },
    {
      id: 'startup-validator',
      title: 'Valutazione Idea Startup',
      description: 'Valuta se la tua idea di startup ha potenziale. Analizza il problema, il target, la soluzione e ottieni feedback su cosa migliorare per allinearti al mercato.',
      icon: 'trending_up',
      color: '#057642',
      route: '/startup-validator/step/problem',
      comingSoon: false
    },
    {
      id: 'video-analyzer',
      title: 'Analisi Tema Video',
      description: 'Analizza il tema del tuo video YouTube o TikTok. Scopri se il contenuto è allineato con quello che cerca il pubblico e ricevi suggerimenti per migliorare engagement.',
      icon: 'play_circle',
      color: '#b24020',
      route: '/video-analyzer',
      comingSoon: true
    },
    {
      id: 'message-validator',
      title: 'Validazione Messaggio',
      description: 'Valida se il tuo messaggio di marketing o comunicazione risuona con il tuo target. Ottieni feedback su chiarezza, valore percepito e call to action.',
      icon: 'chat_bubble',
      color: '#915907',
      route: '/message-validator',
      comingSoon: true
    }
  ];

  constructor(private router: Router) {}

  navigateToTool(tool: Tool): void {
    if (!tool.comingSoon) {
      this.router.navigate([tool.route]);
    }
  }

  getIconGradient(color: string): string {
    return `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`;
  }
}

