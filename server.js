// Server for Alcohol JAM 2025 with Telegram webhook support
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv";
import fs from "fs";
import TelegramBot from "node-telegram-bot-api";

// Import project configuration
import config from "./src/js/config.js";

// Load environment variables
dotenv.config();

// Get the Telegram bot token from config or environment variable
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Initialize Telegram Bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
  polling: !config.submission.telegram.useWebhook,
});

// Setup Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, "src")));

// Setup Telegram bot event handlers
if (config.submission.telegram.useWebhook) {
  console.log("Using webhook mode for Telegram bot");
} else {
  console.log("Using polling mode for Telegram bot");
}

// Estrai le informazioni dal messaggio Telegram
function extractProjectDataFromMessage(message) {
  const titleMatch = message.match(/📝 Title: (.*)\n/);
  const subtitleMatch = message.match(/📌 Subtitle: (.*)\n/);
  const creatorMatch = message.match(/👤 Creator: (.*)\n/);
  const githubMatch = message.match(/🔗 GitHub: (.*)/);

  return {
    title: titleMatch ? titleMatch[1] : "Untitled Project",
    subtitle: subtitleMatch ? subtitleMatch[1] : "",
    creatorEmail: creatorMatch ? creatorMatch[1] : "",
    detailsUrl: githubMatch ? githubMatch[1] : "",
    visible: false,
  };
}

// Handle callback queries (button presses)
bot.on("callback_query", async (query) => {
  const {data: callbackData, id: queryId} = query;
  const {
    chat: {id: chatId},
    caption: textMessage,
  } = query.message;
  const newProject = extractProjectDataFromMessage(textMessage);

  // Path to projects data file
  const projectsFilePath = path.join(__dirname, "src", "data", "projects.json");

  // Check if projects file exists, if not create it with empty projects array
  if (!fs.existsSync(projectsFilePath)) {
    const initialData = {
      projects: [],
    };
    // Create directory if it doesn't exist
    const dir = path.dirname(projectsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
    fs.writeFileSync(projectsFilePath, JSON.stringify(initialData, null, 2));
  }
  const projectsData = JSON.parse(fs.readFileSync(projectsFilePath, "utf8"));

  try {
    const projectId = callbackData.split("_")[1];
    const isAccepting = callbackData.startsWith("accept_");

    // Find existing project

    let project = null;
    for (const p of projectsData.projects) {
      if (p.id == parseInt(projectId)) {
        project = p;
        break;
      }
    }

    if (project) {
      // Update existing project
      project.visible = isAccepting;
      await updateProjectsFile(projectsFilePath, projectsData);

      const status = isAccepting ? "approved" : "rejected";
      const visibility = isAccepting ? "visible" : "hidden";

      if (!isAccepting) {
        await bot.answerCallbackQuery(queryId, {
          text: `Project ${status} and ${visibility} from the website.`,
        });
      }

      await bot.sendMessage(
        chatId,
        `Project "${project.title}" has been ${status} and is now ${visibility} on the website.`
      );
    } else {
      // Add new project
      await bot.answerCallbackQuery(queryId, {
        text: "Project not found! Adding project...",
      });

      newProject.id = projectId;
      newProject.visible = isAccepting;
      const image_id =
        query.message.photo[[query.message.photo.length - 1]].file_id;

      //   download image and save it in the images folder
      const file_name = await bot.downloadFile(
        image_id,
        path.join(__dirname, "src", "data")
      );
      newProject.image = file_name.split(path.join(__dirname, "src"))[1];

      projectsData.projects.push(newProject);

      await updateProjectsFile(projectsFilePath, projectsData);

      if (isAccepting) {
        await bot.sendMessage(
          chatId,
          `Project "${newProject.title}" has been added and is now visible on the website.`
        );
      }
    }
  } catch (error) {
    console.error("Error handling callback query:", error);
    bot.answerCallbackQuery(queryId, {
      text: "An error occurred while processing your request.",
    });
  }
});

// Helper function to update projects file
async function updateProjectsFile(filePath, data) {
  return fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Root endpoint - serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);

  if (config.submission.telegram.useWebhook) {
    console.log(
      `Webhook URL: ${
        config.submission.telegram.webhookUrl ||
        `https://your-domain.com/webhook/${TELEGRAM_BOT_TOKEN}`
      }`
    );
    console.log(
      "For local testing, use ngrok or similar service to expose this server to the internet"
    );

    // Set webhook only if configured to use it
    bot
      .setWebHook(
        config.submission.telegram.webhookUrl ||
          `https://your-domain.com/webhook/${TELEGRAM_BOT_TOKEN}`
      )
      .then((success) => {
        if (success) {
          console.log("Webhook set successfully!");
        } else {
          console.error("Failed to set webhook");
        }
      })
      .catch((error) => {
        console.error("Error setting webhook:", error);
      });
  } else {
    console.log("Telegram bot is running in polling mode");
  }

  // Send a startup message to the configured chat
  bot.sendMessage(
    TELEGRAM_CHAT_ID,
    "Alcohol JAM 2025 server is now running! 🚀\nReady to receive project submissions."
  );
});
