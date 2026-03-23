document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
  if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab-button]');
    const panels = group.querySelectorAll('[data-tab-panel]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab-button');
        buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
        panels.forEach((panel) => {
          panel.classList.toggle('active', panel.getAttribute('data-tab-panel') === target);
        });
      });
    });
  });

  const filterButtons = document.querySelectorAll('[data-filter-button]');
  const filterItems = document.querySelectorAll('[data-filter-item]');
  if (filterButtons.length && filterItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter-button');
        filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
        filterItems.forEach((item) => {
          const value = item.getAttribute('data-filter-item');
          item.style.display = filter === 'all' || filter === value ? '' : 'none';
        });
      });
    });
  }
});
