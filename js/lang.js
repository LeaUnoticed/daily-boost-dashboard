import { updateClock } from './clock.js';
import { fetchWeather } from './weather.js';

const langSelect = document.getElementById("lang-select");

async function loadLang(lang) {
  const res = await fetch('./data/i18n.json');
  const data = await res.json();

  const texts = data[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (texts[key]) el.textContent = texts[key];
  });

  const input = document.getElementById('todo-input');
  if (input && texts.placeholder) {
    input.placeholder = texts.placeholder;
  }

  updateClock(texts.timezone);

  fetchWeather(texts.city);
}

langSelect.addEventListener("change", e => {
  const lang = e.target.value;
  loadLang(lang);
});

loadLang("en");
