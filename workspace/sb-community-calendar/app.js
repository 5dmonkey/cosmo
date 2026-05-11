const pills = document.querySelectorAll('[data-view-target]');
const panels = document.querySelectorAll('[data-view]');
const title = document.getElementById('calendarTitle');
const prevBtn = document.getElementById('calendarPrev');
const nextBtn = document.getElementById('calendarNext');

const state = {
  view: 'today',
  dayOffset: 0,
  weekOffset: 0,
  monthOffset: 0,
};

const baseDate = new Date('2026-05-11T12:00:00');
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d;
}

function formatTitle() {
  if (state.view === 'today') {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + state.dayOffset);
    if (state.dayOffset === 0) return 'Today';
    return dayNames[d.getDay()];
  }
  if (state.view === 'week') {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + (state.weekOffset * 7));
    const start = startOfWeek(d);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `Week of ${monthNames[start.getMonth()]} ${start.getDate()}`;
  }
  const d = new Date(baseDate);
  d.setMonth(d.getMonth() + state.monthOffset);
  return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

function renderTitle() {
  if (title) title.textContent = formatTitle();
}

function setView(target) {
  state.view = target;
  pills.forEach((item) => item.classList.toggle('is-active', item.dataset.viewTarget === target));
  panels.forEach((panel) => panel.classList.toggle('is-visible', panel.dataset.view === target));
  renderTitle();
}

pills.forEach((pill) => {
  pill.addEventListener('click', () => setView(pill.dataset.viewTarget));
});

prevBtn?.addEventListener('click', () => {
  if (state.view === 'today') state.dayOffset -= 1;
  else if (state.view === 'week') state.weekOffset -= 1;
  else state.monthOffset -= 1;
  renderTitle();
});

nextBtn?.addEventListener('click', () => {
  if (state.view === 'today') state.dayOffset += 1;
  else if (state.view === 'week') state.weekOffset += 1;
  else state.monthOffset += 1;
  renderTitle();
});

renderTitle();

setView(state.view);


const weekDayButtons = document.querySelectorAll('.week-day-button');
weekDayButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.dayOffset = Number(button.dataset.dayNumber || 11) - 11;
    setView('today');
  });
});


weekDayButtons.forEach((button) => {
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      button.click();
    }
  });
  button.style.cursor = 'pointer';
});


window.setCalendarDay = function(dayNumber, dayName) {
  state.dayOffset = Number(dayNumber) - 11;
  setView('today');
  if (title) title.textContent = dayName;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


const STORAGE_KEY = 'sb-calendar-saved-events';
function getSavedEvents() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function setSavedEvents(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}
const heartButtons = document.querySelectorAll('.heart-btn');
function syncHearts() {
  const saved = new Set(getSavedEvents());
  heartButtons.forEach((btn) => {
    const active = saved.has(btn.dataset.heartId);
    btn.classList.toggle('is-saved', active);
    btn.textContent = active ? '♥' : '♡';
  });
}
heartButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const saved = new Set(getSavedEvents());
    const id = btn.dataset.heartId;
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    setSavedEvents([...saved]);
    syncHearts();
  });
});
syncHearts();
