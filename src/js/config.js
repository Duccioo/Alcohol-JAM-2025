const config = {
  // Theme Configuration
  theme: {
    // Color palette
    colors: {
      primary: "#cd5f2a", // Vibrant purple
      secondary: "#f2ab37", // Coral accent
      dark: "#21181b",
      light: "#faf5d8",
    },
    // Font families
    fonts: {
      heading: "'Press Start 2P', cursive",
      body: "'JetBrains Mono', monospace",
    },
  },
  // Event Information
  event: {
    name: "Alcohol JAM",
    subtitle: "Una code JAM sull... alcool!",
    ctaText: "Guarda gli altri progetti",
    ctaLink: "#projects",
    year: 2025,
    endDate: "2025-03-19T20:00:00", // Data di fine JAM in formato ISO
  },

  // Submission Configuration
  submission: {
    // Notification method: 'telegram' or 'email'
    notificationMethod: "telegram",

    // Telegram Configuration (used if notificationMethod is 'telegram')
    telegram: {
      botToken: "",
      chatId: "",
    },

    // Email Configuration (used if notificationMethod is 'email')
    email: {
      // Recipient email address for project submissions
      recipientEmail: "admin@codejam.example.com",
      // Email subject prefix
      subjectPrefix: "[Code JAM Submission]",
      // SMTP configuration (for server-side implementation)
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
  },

  // Prizes Configuration
  prizes: {
    // Number of prizes to display (1-4)
    count: 4,
    // Prize details
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
    // Note displayed below prizes
    note: "Provate a partecipare anche se non è obbligatorio!",
  },
};

export default config;
