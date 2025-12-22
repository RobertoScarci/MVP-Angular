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
          <h1 class="hero-title">
            Valida le tue idee.<br>
            <span class="highlight">Allineale con quello che vuole la gente.</span>
          </h1>
          <p class="hero-subtitle">
            Strumenti intelligenti per professionisti che vogliono fare la differenza.
            Valuta, migliora e ottimizza il tuo messaggio per raggiungere il pubblico giusto.
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
              <div class="tool-icon" [style.background-color]="tool.color + '15'">
                <mat-icon [style.color]="tool.color">{{ tool.icon }}</mat-icon>
              </div>
              <h3 class="tool-title">{{ tool.title }}</h3>
              <p class="tool-description">{{ tool.description }}</p>
              <div class="tool-footer">
                <span class="tool-badge" *ngIf="tool.comingSoon">Prossimamente</span>
                <button mat-raised-button [color]="tool.comingSoon ? '' : 'primary'" [disabled]="tool.comingSoon">
                  Inizia
                  <mat-icon>arrow_forward</mat-icon>
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
              <mat-icon class="value-icon">speed</mat-icon>
              <h3>Risultati rapidi</h3>
              <p>Ottieni feedback immediato in pochi minuti</p>
            </div>
            <div class="value-item">
              <mat-icon class="value-icon">insights</mat-icon>
              <h3>Analisi approfondite</h3>
              <p>Regole deterministiche basate su best practice</p>
            </div>
            <div class="value-item">
              <mat-icon class="value-icon">trending_up</mat-icon>
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
      background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);
      color: white;
      padding: 80px 24px;
      text-align: center;
    }

    .hero-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 24px;
      letter-spacing: -0.5px;
    }

    .hero-title .highlight {
      background: linear-gradient(120deg, #70b5f9 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 20px;
      line-height: 1.6;
      opacity: 0.95;
      max-width: 700px;
      margin: 0 auto;
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

    .tool-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .tool-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
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
      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 18px;
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
      icon: 'work',
      color: '#0a66c2',
      route: '/bio-linkedin/step/role',
      comingSoon: false
    },
    {
      id: 'startup-validator',
      title: 'Valutazione Idea Startup',
      description: 'Valuta se la tua idea di startup ha potenziale. Analizza il problema, il target, la soluzione e ottieni feedback su cosa migliorare per allinearti al mercato.',
      icon: 'rocket_launch',
      color: '#057642',
      route: '/startup-validator',
      comingSoon: true
    },
    {
      id: 'video-analyzer',
      title: 'Analisi Tema Video',
      description: 'Analizza il tema del tuo video YouTube o TikTok. Scopri se il contenuto è allineato con quello che cerca il pubblico e ricevi suggerimenti per migliorare engagement.',
      icon: 'videocam',
      color: '#b24020',
      route: '/video-analyzer',
      comingSoon: true
    },
    {
      id: 'message-validator',
      title: 'Validazione Messaggio',
      description: 'Valida se il tuo messaggio di marketing o comunicazione risuona con il tuo target. Ottieni feedback su chiarezza, valore percepito e call to action.',
      icon: 'campaign',
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
}

