// Countdown Timer for Code JAM
import config from "./config.js";

class CountdownTimer {
  constructor(targetDate, elementId) {
    this.targetDate = new Date(targetDate);
    this.timerElement = document.getElementById(elementId);
    this.interval = null;
    this.isJamActive = false;
  }

  start() {
    // Check if the timer element exists
    if (!this.timerElement) {
      console.error("Timer element not found!");
      return;
    }

    // Update immediately and then set interval
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  update() {
    const now = new Date();
    const distance = this.targetDate - now;

    // Check if the JAM has ended
    if (distance < 0) {
      this.stop();
      this.timerElement.innerHTML = `
        <div class="timer-container expired">
          <div class="timer-message">La JAM è conclusa!</div>
          <div class="timer-subtitle">Grazie a tutti i partecipanti</div>
        </div>
      `;
      this.isJamActive = false;
      return;
    }

    // JAM is still active
    this.isJamActive = true;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the timer display
    this.timerElement.innerHTML = `
      <div class="timer-container active">
        <div class="timer-message">La JAM è in corso!</div>
        <div class="timer-countdown">
          <div class="timer-unit">
            <span class="timer-value">${days}</span>
            <span class="timer-label">Giorni</span>
          </div>
          <div class="timer-unit">
            <span class="timer-value">${hours}</span>
            <span class="timer-label">Ore</span>
          </div>
          <div class="timer-unit">
            <span class="timer-value">${minutes}</span>
            <span class="timer-label">Minuti</span>
          </div>
          <div class="timer-unit">
            <span class="timer-value">${seconds}</span>
            <span class="timer-label">Secondi</span>
          </div>
        </div>
        <div class="timer-subtitle">Tempo rimanente</div>
      </div>
    `;
  }

  // Check if the JAM is active
  isActive() {
    return this.isJamActive;
  }
}

// Initialize the countdown timer when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Create timer element if it doesn't exist in the hero section
  const heroContainer = document.querySelector(".hero .container");
  if (heroContainer) {
    // Check if timer element already exists
    if (!document.getElementById("jam-timer")) {
      const timerElement = document.createElement("div");
      timerElement.id = "jam-timer";
      timerElement.className = "jam-timer";

      // Insert timer after the hero subtitle
      const heroSubtitle = heroContainer.querySelector(".hero-subtitle");
      if (heroSubtitle) {
        heroSubtitle.parentNode.insertBefore(
          timerElement,
          heroSubtitle.nextSibling
        );
      } else {
        // If no subtitle, append to the end of the container
        heroContainer.appendChild(timerElement);
      }
    }

    // Initialize and start the timer
    const timer = new CountdownTimer(config.event.endDate, "jam-timer");
    timer.start();
  }
});

export default CountdownTimer;
