# Architettura del Progetto

## Scelte Architetturali

### 1. Gestione dello Stato

**Soluzione implementata: StateService con BehaviorSubject**

#### Motivazione

Per un MVP frontend-only senza backend, ho scelto un approccio basato su service con `BehaviorSubject` di RxJS perché:

- **Semplicità**: nessun overengineering, facile da capire e mantenere
- **Adeguato alle esigenze**: gestisce perfettamente lo stato del wizard multi-step
- **Reattività**: i componenti si aggiornano automaticamente ai cambiamenti di stato
- **Scalabilità**: se in futuro servisse più complessità, è facile migrare a NgRx o Akita
- **Testabilità**: logica centralizzata, facile da testare in isolamento

#### Struttura dello Stato

```typescript
interface BioState {
  formData: BioFormData;        // Dati del form (role, target, activity, goal)
  currentStep: number;           // Step corrente del wizard
  generatedBio: GeneratedBio;    // Bio generata (null fino al submit finale)
  analysis: BioAnalysis;         // Risultati analisi (null fino al submit finale)
  scoreEnabled: boolean;         // Flag per attivare/disattivare punteggio
}
```

#### Pattern utilizzato

- **Single Source of Truth**: tutto lo stato è centralizzato in `StateService`
- **Immutable updates**: ogni update crea un nuovo oggetto stato
- **Observable pattern**: componenti si iscrivono a `state$` per reattività

### 2. Logica di Analisi

**Soluzione: BioAnalysisService con regole deterministiche**

#### Approccio

Tutta la logica di generazione e analisi è centralizzata in un unico service, senza dipendenze esterne o AI. Le regole sono:

1. **Generazione Bio**:
   - Sezione "Chi sei": combina ruolo + target
   - Sezione "Valore": combina attività + target
   - Sezione "CTA": mappa obiettivo a call-to-action specifica

2. **Analisi Qualità**:
   - **Chiarezza**: verifica sezioni complete e sufficientemente descrittive
   - **Presenza Target**: verifica menzione esplicita del target nella bio
   - **Presenza CTA**: verifica indicatori di call-to-action
   - **Lunghezza**: verifica range 50-2000 caratteri (best practice LinkedIn)

3. **Warning e Suggerimenti**:
   - **Autoreferenzialità**: conta parole autoreferenziali (io, mio, ecc.)
   - **Messaggi vaghi**: rileva parole generiche (esperto, qualificato, ecc.)
   - **Focus valore**: verifica presenza di verbi d'azione

4. **Punteggio** (opzionale):
   - Calcolo: 25 punti per ogni criterio rispettato
   - Penalità: -5 punti per ogni warning (max -20)
   - Range: 0-100

#### Vantaggi

- **Deterministico**: stesso input = stesso output
- **Trasparente**: regole chiare e modificabili
- **Performante**: nessuna chiamata API, tutto locale
- **Testabile**: facile da testare con input noti

### 3. Struttura Componenti

#### Organizzazione Feature-based

```
features/
├── wizard/           # Feature wizard multi-step
│   ├── wizard.component.ts
│   └── steps/        # Componenti per ogni step
└── result/           # Feature risultato
    ├── result.component.ts
    ├── checklist/
    └── warnings/
```

#### Principi

- **Separazione delle responsabilità**: ogni componente ha un unico scopo
- **Riusabilità**: componenti checklist e warnings riutilizzabili
- **Composizione**: componenti piccoli e focalizzati
- **Routing per step**: ogni step ha una route dedicata (URL cambia)

### 4. Routing

#### Strategia

Ogni step del wizard corrisponde a una route dedicata:

- `/step/role` → `StepRoleComponent`
- `/step/target` → `StepTargetComponent`
- `/step/activity` → `StepActivityComponent`
- `/step/goal` → `StepGoalComponent`
- `/result` → `ResultComponent`

#### Vantaggi

- **URL significativi**: utente può bookmarkare o condividere
- **Navigazione browser**: back/forward funzionano correttamente
- **Deep linking**: possibile linkare direttamente a uno step
- **UX chiara**: URL riflette lo stato dell'applicazione

### 5. UI/UX

#### Design System

- **Ispirazione LinkedIn**: colori, tipografia, spaziature
- **Angular Material**: componenti accessibili e consistenti
- **Desktop-first**: ottimizzato per schermi desktop (responsive opzionale)

#### Pattern UI

- **Card-based layout**: contenuti organizzati in card
- **Feedback visivo**: checklist con icone, warning colorati
- **Progressive disclosure**: informazioni mostrate progressivamente
- **Clear CTAs**: bottoni chiari con icone

### 6. TypeScript e Type Safety

#### Strategia

- **Strict mode**: TypeScript configurato in modalità strict
- **Interfaces**: modelli ben definiti per type safety
- **Path aliases**: `@core/*`, `@shared/*`, `@features/*` per import puliti

#### Modelli

Tutti i modelli sono centralizzati in `core/models/bio-form.model.ts`:
- `BioFormData`: dati input form
- `GeneratedBio`: bio generata (3 sezioni)
- `BioAnalysis`: risultati analisi
- `BioState`: stato globale applicazione

## Flusso Dati

```
User Input → Form Component → StateService.updateFormData()
                                    ↓
                            State Subject emits
                                    ↓
                        Components subscribe & update
                                    ↓
                    Final Submit → BioAnalysisService.generateBio()
                                    ↓
                    BioAnalysisService.analyzeBio()
                                    ↓
                            StateService.setGeneratedBio()
                            StateService.setAnalysis()
                                    ↓
                        ResultComponent displays
```

## Estendibilità

### Possibili evoluzioni future

1. **Backend Integration**:
   - Aggiungere API service per salvare bio
   - Autenticazione utente
   - Storia bio generate

2. **Analisi Avanzata**:
   - Integrazione AI (opzionale)
   - Analisi sentiment
   - Suggerimenti più specifici

3. **Template Bio**:
   - Template predefiniti per settori
   - Esempi di bio efficaci
   - Personalizzazione stile

4. **Export**:
   - Download PDF
   - Export per altri social
   - Condivisione diretta

5. **State Management**:
   - Migrazione a NgRx se complessità aumenta
   - Persistenza locale (localStorage)
   - Undo/Redo

## Testing Strategy (futuro)

- **Unit Tests**: service e logica business
- **Component Tests**: componenti isolati
- **Integration Tests**: flusso completo wizard
- **E2E Tests**: scenari utente end-to-end

## Performance

- **Lazy Loading**: feature modules (se progetto cresce)
- **OnPush Change Detection**: per componenti read-only
- **Memoization**: calcoli pesanti memoizzati
- **Virtual Scrolling**: se liste diventano lunghe

