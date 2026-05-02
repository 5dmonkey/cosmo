document.querySelectorAll('[data-success-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    const msg = form.querySelector('.thank-you');
    if (msg) msg.textContent = 'Thank you.';
  });
});
