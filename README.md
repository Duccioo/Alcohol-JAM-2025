# Alcohol JAM 2025

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Benvenuti alla Alcohol JAM 2025! Una competizione di coding dedicata al tema dell'alcool in tutte le sue forme. Questo template fornisce tutto il necessario per partecipare alla jam, inviare progetti, visualizzare le regole e scoprire i premi in palio.

[Guarda l'anteprima QUI !!!](https://duccioo.github.io/Alcohol-JAM-2025/)

![JAM Preview](assets/example.gif)

## 🍺 Caratteristiche

- **Design Responsive**: Funziona su desktop, tablet e dispositivi mobili
- **Vetrina Progetti**: Mostra i progetti inviati in una griglia visivamente accattivante
- **Form di Invio**: Modulo integrato per l'invio dei progetti
- **Visualizzazione Regole**: Regole basate su Markdown facili da aggiornare
- **Vetrina Premi**: Sezione premi configurabile
- **Tema Personalizzabile**: Cambia facilmente colori, font e contenuti
- **Sistema di Notifiche**: Supporto per notifiche via email o Telegram

## 🥃 Per Iniziare

### Prerequisiti

- Un server web o servizio di hosting per distribuire il sito
- Conoscenza base di HTML, CSS e JavaScript (per personalizzazione)

### Installazione

1. Clona questo repository:

   ```bash
   git clone https://github.com/Duccioo/Alcohol-JAM-2025.git
   ```

2. Carica i file sul tuo server web o servizio di hosting

3. Personalizza la configurazione in `src/js/config.js` per adattarla ai dettagli del tuo progetto

4. Aggiorna le regole in `src/data/rules.md` per riflettere le tue linee guida

5. Modifica i dati del progetto in `src/data/projects.json` per mostrare i progetti inviati

## 🍷 Configurazione

Il template è altamente configurabile attraverso il file `src/js/config.js`. Ecco le principali opzioni di configurazione:

### Configurazione Tema

```javascript
theme: {
  // Palette colori
  colors: {
    primary: "#cd5f2a", // Arancione ambrato
    secondary: "#f2ab37", // Giallo dorato
    dark: "#21181b",
    light: "#faf5d8",
  },
  // Famiglie di font
  fonts: {
    heading: "'Press Start 2P', cursive",
    body: "'JetBrains Mono', monospace",
  },
}
```

### Informazioni Evento

```javascript
event: {
  name: "Alcohol JAM",
  subtitle: "Una code JAM sull... alcool!",
  ctaText: "Guarda gli altri progetti",
  ctaLink: "#projects",
  year: 2025,
  endDate: "2025-03-19T20:00:00", // Data di fine JAM in formato ISO
}
```

### Configurazione Notifiche

Il template supporta due metodi di notifica per l'invio dei progetti:

#### Notifiche Email

```javascript
submission: {
  notificationMethod: "email",
  email: {
    recipientEmail: "admin@codejam.example.com",
    subjectPrefix: "[Alcohol JAM Submission]",
    smtp: {
      host: "smtp.example.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@example.com",
        pass: "your-password",
      },
    },
  },
}
```

#### Notifiche Telegram

```javascript
submission: {
  notificationMethod: "telegram",
  telegram: {
    botToken: "YOUR_BOT_TOKEN",
    chatId: "YOUR_CHAT_ID",
  },
}
```

### Configurazione Premi

```javascript
prizes: {
  count: 4, // Numero di premi da visualizzare (1-4)
  items: [
    {
      title: "Primo Premio",
      icon: "🏆",
      description: "...MISTEROooOo...",
      className: "first-prize",
    },
    {
      title: "Partecipazione",
      icon: "🎖️",
      description: "...MISTEROOoOoo...",
      className: "honorable-mention",
    },
  ],
  note: "Provate a partecipare anche se non è obbligatorio!",
}
```

## 📝 Aggiornamento delle Regole della Competizione

Le regole della competizione sono memorizzate nel file `src/data/rules.md` in formato Markdown. Modifica questo file per aggiornare le regole della tua competizione. Le modifiche saranno automaticamente riflesse nella pagina delle regole.

## 📊 Gestione degli Invii dei Progetti

Gli invii dei progetti sono memorizzati nel file `src/data/projects.json`. Puoi aggiornare manualmente questo file o implementare una logica lato server per aggiornarlo automaticamente quando gli utenti inviano progetti attraverso il modulo di invio.

## 🔧 Personalizzazione

### Stile

Il foglio di stile principale si trova in `src/css/style.css`. Puoi modificare questo file per personalizzare l'aspetto del sito web oltre a ciò che è disponibile nel file di configurazione.

### Aggiunta di Pagine

Per aggiungere nuove pagine al sito web:

1. Crea un nuovo file HTML basato sulle pagine esistenti
2. Aggiungi link alla nuova pagina nel menu di navigazione in ogni file HTML
3. Aggiorna i file JavaScript secondo necessità per supportare la nuova pagina

## 📄 Licenza

Questo progetto è concesso in licenza sotto la Licenza MIT - vedi il file LICENSE per i dettagli.

## 🤝 Contribuire

I contributi sono benvenuti! Sentiti libero di inviare problemi o pull request per migliorare il template.

## 📞 Feedback

Se hai qualche feedback, contattami all'indirizzo email: meconcelliduccio@gmail.com o visita il mio sito web
[duccio.me](https://duccio.me)

## Autori

- [@duccioo](https://github.com/Duccioo)

---

Realizzato con ❤️ e 🍻 per la comunità di coding
