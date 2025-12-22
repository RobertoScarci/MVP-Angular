# Comandi Git - Commit Step by Step

Esegui questi comandi in sequenza per creare commit separati per ogni modifica.

## 1. Configurazione iniziale progetto

```bash
git add package.json angular.json tsconfig.json tsconfig.app.json .gitignore
git commit -m "chore: configurazione iniziale progetto Angular 17

- Setup package.json con dipendenze Angular e Angular Material
- Configurazione angular.json e tsconfig
- Path aliases per @core, @shared, @features
- .gitignore configurato"
```

## 2. Struttura base applicazione

```bash
git add src/index.html src/main.ts src/styles.scss src/favicon.ico
git commit -m "feat: struttura base applicazione

- index.html con setup base
- main.ts per bootstrap Angular
- styles.scss con tema ispirato a LinkedIn
- Favicon placeholder"
```

## 3. App component e routing

```bash
git add src/app/app.component.ts src/app/app.module.ts
git commit -m "feat: setup AppComponent e routing

- AppComponent con header e layout principale
- AppModule con configurazione routing
- Routes per wizard steps e result
- Integrazione Angular Material e FormsModule"
```

## 4. Modelli TypeScript

```bash
git add src/app/core/models/bio-form.model.ts
git commit -m "feat: modelli TypeScript per bio form

- BioFormData: dati input form
- GeneratedBio: struttura bio generata
- BioAnalysis: risultati analisi qualità
- BioState: stato globale applicazione"
```

## 5. StateService - gestione stato

```bash
git add src/app/core/services/state.service.ts
git commit -m "feat: StateService con BehaviorSubject

- Gestione stato globale con RxJS BehaviorSubject
- Metodi per update formData, step, bio, analysis
- Toggle punteggio opzionale
- Reset stato completo"
```

## 6. BioAnalysisService - logica generazione

```bash
git add src/app/core/services/bio-analysis.service.ts
git commit -m "feat: BioAnalysisService con logica deterministica

- Generazione bio in 3 sezioni (Chi sei, Valore, CTA)
- Analisi qualità: chiarezza, target, CTA, lunghezza
- Rilevamento warning: autoreferenzialità, messaggi vaghi
- Calcolo punteggio opzionale (0-100)
- Regole deterministiche senza AI"
```

## 7. Wizard component container

```bash
git add src/app/features/wizard/wizard.component.ts
git commit -m "feat: WizardComponent container

- Componente wrapper per wizard steps
- Layout centrato e responsive
- Styling card-based"
```

## 8. Step Role component

```bash
git add src/app/features/wizard/steps/step-role/step-role.component.ts
git commit -m "feat: StepRoleComponent - input ruolo professionale

- Form reattivo con validazione
- Input ruolo con max 100 caratteri
- Navigazione forward a step target
- Integrazione con StateService"
```

## 9. Step Target component

```bash
git add src/app/features/wizard/steps/step-target/step-target.component.ts
git commit -m "feat: StepTargetComponent - input target

- Form reattivo per definizione target
- Input target con max 150 caratteri
- Navigazione back/forward
- Persistenza stato tra step"
```

## 10. Step Activity component

```bash
git add src/app/features/wizard/steps/step-activity/step-activity.component.ts
git commit -m "feat: StepActivityComponent - input attività

- Textarea per descrizione attività principali
- Validazione min 50, max 500 caratteri
- Contatore caratteri in tempo reale
- Navigazione back/forward"
```

## 11. Step Goal component

```bash
git add src/app/features/wizard/steps/step-goal/step-goal.component.ts
git commit -m "feat: StepGoalComponent - selezione obiettivo LinkedIn

- Select per obiettivo (lavoro, clienti, networking)
- Generazione bio al submit finale
- Analisi automatica qualità
- Redirect a result page"
```

## 12. Result component

```bash
git add src/app/features/result/result.component.ts
git commit -m "feat: ResultComponent - visualizzazione bio generata

- Visualizzazione bio in 3 sezioni separate
- Bio completa con copia negli appunti
- Toggle punteggio opzionale
- Navigazione modifica dati o ricomincia
- Integrazione ChecklistComponent e WarningsComponent"
```

## 13. Checklist component

```bash
git add src/app/features/result/checklist/checklist.component.ts
git commit -m "feat: ChecklistComponent - checklist qualità bio

- Visualizzazione 4 criteri qualità
- Icone success/error per ogni criterio
- Styling ispirato a LinkedIn
- Feedback visivo immediato"
```

## 14. Warnings component

```bash
git add src/app/features/result/warnings/warnings.component.ts
git commit -m "feat: WarningsComponent - warning e suggerimenti

- Visualizzazione warning e suggerimenti
- Styling differenziato per warning/suggestions
- Messaggio success se nessun warning
- Icone e colori informativi"
```

## 15. Documentazione

```bash
git add README.md ARCHITETTURA.md QUICK_START.md TROUBLESHOOTING.md
git commit -m "docs: documentazione completa progetto

- README.md: overview e setup
- ARCHITETTURA.md: scelte architetturali dettagliate
- QUICK_START.md: guida rapida
- TROUBLESHOOTING.md: risoluzione problemi comuni"
```

## 16. Setup GitHub remote (solo la prima volta)

```bash
# Sostituisci USERNAME e REPO_NAME con i tuoi valori
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Push di tutti i commit

```bash
git push origin main
```

---

## Comandi rapidi (tutti insieme)

Se preferisci eseguire tutto in sequenza, copia e incolla questo blocco:

```bash
# 1. Configurazione
git add package.json angular.json tsconfig.json tsconfig.app.json .gitignore
git commit -m "chore: configurazione iniziale progetto Angular 17"

# 2. Struttura base
git add src/index.html src/main.ts src/styles.scss src/favicon.ico
git commit -m "feat: struttura base applicazione"

# 3. App e routing
git add src/app/app.component.ts src/app/app.module.ts
git commit -m "feat: setup AppComponent e routing"

# 4. Modelli
git add src/app/core/models/bio-form.model.ts
git commit -m "feat: modelli TypeScript per bio form"

# 5. StateService
git add src/app/core/services/state.service.ts
git commit -m "feat: StateService con BehaviorSubject"

# 6. BioAnalysisService
git add src/app/core/services/bio-analysis.service.ts
git commit -m "feat: BioAnalysisService con logica deterministica"

# 7. Wizard
git add src/app/features/wizard/wizard.component.ts
git commit -m "feat: WizardComponent container"

# 8-11. Steps
git add src/app/features/wizard/steps/step-role/step-role.component.ts
git commit -m "feat: StepRoleComponent - input ruolo professionale"

git add src/app/features/wizard/steps/step-target/step-target.component.ts
git commit -m "feat: StepTargetComponent - input target"

git add src/app/features/wizard/steps/step-activity/step-activity.component.ts
git commit -m "feat: StepActivityComponent - input attività"

git add src/app/features/wizard/steps/step-goal/step-goal.component.ts
git commit -m "feat: StepGoalComponent - selezione obiettivo LinkedIn"

# 12-14. Result components
git add src/app/features/result/result.component.ts
git commit -m "feat: ResultComponent - visualizzazione bio generata"

git add src/app/features/result/checklist/checklist.component.ts
git commit -m "feat: ChecklistComponent - checklist qualità bio"

git add src/app/features/result/warnings/warnings.component.ts
git commit -m "feat: WarningsComponent - warning e suggerimenti"

# 15. Docs
git add README.md ARCHITETTURA.md QUICK_START.md TROUBLESHOOTING.md
git commit -m "docs: documentazione completa progetto"

# 16. Push (dopo aver configurato remote)
# git remote add origin https://github.com/USERNAME/REPO_NAME.git
# git push -u origin main
```

