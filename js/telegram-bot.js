// Import configuration
import config from "./config.js";

// Function to load secrets from secrets.json file
async function loadSecrets() {
  try {
    const response = await fetch("data/secrets.json");
    if (!response.ok) {
      throw new Error("Failed to load project data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading secrets:", error);
    return {
      botToken: config.submission.telegram.botToken,
      chatId: config.submission.telegram.chatId,
    };
  }
}

// Load Telegram configuration from secrets, environment variables, or config

// Function to send project submission notification to Telegram
async function sendTelegramNotification(projectData) {
  const secrets = await loadSecrets();
  const TELEGRAM_BOT_TOKEN = secrets.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = secrets.TELEGRAM_CHAT_ID;

  try {
    // Prepare the inline keyboard for accept/reject buttons
    const inlineKeyboard = {
      inline_keyboard: [
        [
          {text: "✅ Accept", callback_data: `accept_${projectData.id}`},
          {text: "❌ Reject", callback_data: `reject_${projectData.id}`},
        ],
      ],
    };

    // Prepare the message text
    const messageText =
      `🆕 New Project Submission!!!\n\n` +
      `📝 Title: ${projectData.title}\n` +
      `📌 Subtitle: ${projectData.subtitle}\n` +
      `👤 Creator: ${projectData.creatorEmail}\n` +
      `🔗 GitHub: ${projectData.githubLink}`;

    // Send project image and details in a single message
    const formData = new FormData();
    formData.append("chat_id", TELEGRAM_CHAT_ID);
    formData.append("photo", projectData.image);
    formData.append("caption", messageText);
    formData.append("reply_markup", JSON.stringify(inlineKeyboard));
    formData.append("parse_mode", "Markdown");

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send Telegram notification");
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
}

// Function to handle project approval/rejection
async function handleProjectStatus(projectId, isApproved) {
  try {
    // Use the API endpoint to update project status
    const response = await fetch(`/api/projects/${projectId}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        approved: isApproved,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update project status: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error updating project status:", error);
    return false;
  }
}

// Export functions for use in form-validation.js
export {sendTelegramNotification, handleProjectStatus};
