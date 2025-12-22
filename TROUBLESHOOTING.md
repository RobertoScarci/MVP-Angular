# Troubleshooting

## Errore: ERR_REQUIRE_ESM con ng serve

Se vedi questo errore:
```
Error [ERR_REQUIRE_ESM]: require() of ES Module ... not supported.
```

### Soluzione

**Usa `npm start` invece di `ng serve` direttamente**

Il problema è causato da un conflitto tra:
- Angular CLI installato globalmente (versione vecchia)
- Node.js v21.4.0 (versione nuova)

### Opzioni

1. **Usa npm start (consigliato)**
   ```bash
   npm start
   ```
   Questo usa la versione locale di Angular CLI installata nel progetto.

2. **Usa npx**
   ```bash
   npx ng serve
   ```
   Questo forza l'uso della versione locale.

3. **Aggiorna Angular CLI globale (opzionale)**
   ```bash
   npm install -g @angular/cli@latest
   ```

### Perché succede?

- Node.js v21.4.0 usa ES Modules di default
- Angular CLI globale potrebbe essere una versione vecchia che usa CommonJS
- La versione locale nel progetto è compatibile

### Verifica

Dopo `npm install`, verifica che Angular CLI sia installato localmente:
```bash
./node_modules/.bin/ng version
```

Se funziona, usa sempre `npm start` o `npx ng` invece di `ng` direttamente.

