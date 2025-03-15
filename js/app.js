import './weather.js';
import './todo.js';
import './bunny.js';
import './spotify.js';
import './lang.js';

import { initSky } from './sky.js';
import { updateClock } from './clock.js';

let currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const langSelect = document.getElementById("lang-select");
langSelect?.addEventListener("change", () => {
  currentTimezone =
    langSelect.value === "ja" ? "Asia/Tokyo" :
    langSelect.value === "zh" ? "Asia/Shanghai" :
    langSelect.value === "en" ? "America/New_York" :
    "Europe/Paris";
});

document.addEventListener("DOMContentLoaded", () => {
  initSky();
  updateClock(currentTimezone); 
  setInterval(() => updateClock(currentTimezone), 1000); 
});
