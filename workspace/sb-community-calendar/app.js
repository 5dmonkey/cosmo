const pills = document.querySelectorAll('[data-view-target]');
const panels = document.querySelectorAll('[data-view]');
const title = document.getElementById('calendarTitle');

const titles = {
  today: 'Today',
  week: 'This Week',
  month: 'May 2026'
};

pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    const target = pill.dataset.viewTarget;

    pills.forEach((item) => item.classList.toggle('is-active', item === pill));
    panels.forEach((panel) => panel.classList.toggle('is-visible', panel.dataset.view === target));
    if (title && titles[target]) title.textContent = titles[target];
  });
});
