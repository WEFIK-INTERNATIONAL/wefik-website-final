/**
 * Daily Token Budget & Kill Switch Tracker
 * Location: src/lib/ai/budget.js
 */

import { TOKEN_LIMITS } from "./config.js";

let inMemoryDailyTokens = 0;
let lastResetDate = new Date().toISOString().slice(0, 10);

function checkAndResetDay() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== lastResetDate) {
    inMemoryDailyTokens = 0;
    lastResetDate = today;
  }
}

export function isKillSwitchActive() {
  return process.env.CHATBOT_KILL_SWITCH === "true";
}

export function isBudgetExceeded() {
  if (isKillSwitchActive()) {
    return true;
  }
  checkAndResetDay();
  return inMemoryDailyTokens >= TOKEN_LIMITS.dailyGlobalTokenCap;
}

export function recordTokenUsage(tokenCount) {
  checkAndResetDay();
  inMemoryDailyTokens += tokenCount;
  return inMemoryDailyTokens;
}

export function getDailyTokenUsage() {
  checkAndResetDay();
  return inMemoryDailyTokens;
}
