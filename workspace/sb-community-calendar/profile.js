const STORAGE_KEY = 'sb-calendar-saved-events';
const savedEventsList = document.getElementById('savedEventsList');

function getSavedEvents() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function syncSavedProfileEvents() {
  if (!savedEventsList) return;
  const saved = new Set(getSavedEvents());
  const cards = savedEventsList.querySelectorAll('[data-event-id]');
  cards.forEach((card) => {
    const id = card.dataset.eventId;
    card.style.display = saved.has(id) ? 'grid' : 'none';
  });
}

savedEventsList?.querySelectorAll('[data-heart-id]').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.heartId;
    const saved = new Set(getSavedEvents());
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved]));
    syncSavedProfileEvents();
  });
});

syncSavedProfileEvents();
