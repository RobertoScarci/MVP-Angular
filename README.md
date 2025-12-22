# LinkedIn Bio Generator - MVP Angular

MVP frontend Angular per aiutare professionisti digitali a creare una bio LinkedIn chiara, orientata al valore e con una call to action efficace.

## 🎯 Obiettivo

Guidare l'utente step-by-step nella scrittura di una bio LinkedIn efficace, trasformando input grezzi in una bio strutturata e valutata tramite regole deterministiche.

## 🚀 Caratteristiche

- **Wizard a step** con routing dedicato per ogni step
- **Generazione automatica** della bio LinkedIn strutturata
- **Analisi deterministica** basata su regole (nessuna AI)
- **Checklist di qualità** per valutare la bio
- **Warning e suggerimenti** per migliorare il contenuto
- **Punteggio opzionale** calcolato in base alle regole
- **UI moderna** ispirata a LinkedIn, desktop-first

## 📋 Prerequisiti

- Node.js (v18 o superiore)
- npm o yarn

## 🛠️ Installazione

```bash
npm install
```

## 🏃 Avvio

```bash
npm start
```

L'applicazione sarà disponibile su `http://localhost:4200`

## 📁 Struttura del progetto

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   └── bio-form.model.ts      # Modelli TypeScript
│   │   └── services/
│   │       ├── state.service.ts        # Gestione stato globale
│   │       └── bio-analysis.service.ts # Logica generazione e analisi
│   ├── features/
│   │   ├── wizard/
│   │   │   ├── wizard.component.ts
│   │   │   └── steps/
│   │   │       ├── step-role/
│   │   │       ├── step-target/
│   │   │       ├── step-activity/
│   │   │       └── step-goal/
│   │   └── result/
│   │       ├── result.component.ts
│   │       ├── checklist/
│   │       └── warnings/
│   └── app.component.ts
└── styles.scss
```

## 🏗️ Architettura

### Gestione dello stato

**Scelta: Service con BehaviorSubject**

Ho scelto un `StateService` con `BehaviorSubject` perché:
- **Adeguato per MVP**: semplice, efficace, senza overengineering
- **Scalabile**: facile da estendere o migrare a NgRx se necessario
- **Reattivo**: componenti si aggiornano automaticamente ai cambiamenti
- **Testabile**: logica centralizzata e facilmente testabile

Lo stato gestisce:
- Dati del form (role, target, activity, goal)
- Step corrente
- Bio generata
- Risultati dell'analisi
- Punteggio (attivabile/disattivabile)

### Logica di analisi

Il `BioAnalysisService` implementa regole deterministiche per:
- **Generazione bio**: struttura in 3 sezioni (Chi sei, Valore, CTA)
- **Analisi qualità**: chiarezza, presenza target, CTA, lunghezza
- **Warning**: autoreferenzialità, messaggi vaghi, mancanza focus valore
- **Punteggio**: calcolo opzionale basato su criteri di qualità

### Routing

Ogni step ha una route dedicata:
- `/step/role` - Ruolo professionale
- `/step/target` - Target
- `/step/activity` - Attività principali
- `/step/goal` - Obiettivo su LinkedIn
- `/result` - Bio generata + analisi

## 🎨 UI/UX

- **Design ispirato a LinkedIn**: colori, tipografia, spaziature
- **Desktop-first**: ottimizzato per schermi desktop
- **Angular Material**: componenti UI moderni e accessibili
- **Feedback visivo**: checklist, warning, suggerimenti chiari

## 📝 Note

- Progetto **solo frontend** - nessun backend, database, API
- **Nessuna AI** - tutta la logica è deterministica
- **Proof of concept** - codice pulito e facilmente estendibile
- **Portfolio-ready** - struttura professionale, pronta per GitHub

## 🔄 Flusso utente

1. Inserisce ruolo professionale
2. Definisce target
3. Descrive attività principali
4. Seleziona obiettivo su LinkedIn
5. Visualizza bio generata + analisi
6. Può tornare indietro e modificare
7. Può copiare la bio o ricominciare

## 📦 Tecnologie

- Angular 17
- Angular Material
- RxJS
- TypeScript
- SCSS

## 👤 Target utenti

- Junior e mid developer
- Freelance digitali
- Imprenditori / founder
- Professionisti che vogliono migliorare la propria presenza online

