document.querySelectorAll('[data-success-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    const msg = form.querySelector('.thank-you');
    if (msg) msg.textContent = 'Thank you.';
  });
});


document.querySelectorAll('.card-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const form = button.parentElement.querySelector('.collapsible');
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    if (form) {
      form.hidden = isOpen;
      form.classList.toggle('open', !isOpen);
    }
  });
});
