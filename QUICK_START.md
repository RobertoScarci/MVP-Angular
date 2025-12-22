# Quick Start

## Installazione e Avvio

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

L'applicazione sarà disponibile su `http://localhost:4200`

## Flusso Utente

1. **Step 1 - Ruolo** (`/step/role`)
   - Inserisci il tuo ruolo professionale
   - Esempio: "Senior Frontend Developer"

2. **Step 2 - Target** (`/step/target`)
   - Definisci per chi lavori
   - Esempio: "startup tech e PMI digitali"

3. **Step 3 - Attività** (`/step/activity`)
   - Descrivi cosa fai concretamente
   - Minimo 50 caratteri, massimo 500

4. **Step 4 - Obiettivo** (`/step/goal`)
   - Scegli l'obiettivo su LinkedIn
   - Opzioni: lavoro, clienti, networking

5. **Risultato** (`/result`)
   - Visualizza la bio generata
   - Controlla checklist di qualità
   - Leggi warning e suggerimenti
   - Attiva/disattiva punteggio
   - Copia la bio o modifica i dati

## Struttura Chiave

- **StateService**: gestisce tutto lo stato dell'applicazione
- **BioAnalysisService**: genera la bio e analizza la qualità
- **Wizard Steps**: componenti per ogni step del form
- **Result Component**: mostra bio generata + analisi

## Note Importanti

- Lo stato viene mantenuto durante la navigazione tra gli step
- Puoi tornare indietro e modificare i dati in qualsiasi momento
- La bio viene generata solo al submit finale dello step "goal"
- Il punteggio è opzionale e può essere attivato/disattivato

## Troubleshooting

Se riscontri problemi:

1. Verifica che Node.js sia installato: `node --version` (v18+)
2. Elimina `node_modules` e `package-lock.json`, poi `npm install`
3. Verifica che la porta 4200 non sia già in uso

