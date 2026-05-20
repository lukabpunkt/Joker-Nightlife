'use strict';

const form = document.querySelector('.contact-form');
if (form) {
  const nameField    = form.querySelector('[name="name"]');
  const emailField   = form.querySelector('[name="email"]');
  const messageField = form.querySelector('[name="message"]');
  const honeypot     = form.querySelector('[name="website"]');
  const statusEl     = form.querySelector('.form-status');
  const submitBtn    = form.querySelector('[type="submit"]');

  const showErr = (field, msg) => {
    field.classList.add('error');
    const err = field.closest('.form-group')?.querySelector('.err-msg');
    if (err) { err.textContent = msg; err.classList.add('show'); }
  };
  const clearErr = (field) => {
    field.classList.remove('error');
    const err = field.closest('.form-group')?.querySelector('.err-msg');
    if (err) err.classList.remove('show');
  };

  [nameField, emailField, messageField].forEach(f => {
    f?.addEventListener('input', () => clearErr(f));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    /* Honeypot check */
    if (honeypot?.value) return;

    let valid = true;
    const name    = nameField?.value.trim()    || '';
    const email   = emailField?.value.trim()   || '';
    const message = messageField?.value.trim() || '';

    if (!name) {
      showErr(nameField, 'Bitte gib deinen Namen ein.');
      valid = false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showErr(emailField, 'Bitte gib eine gültige E-Mail-Adresse ein.');
      valid = false;
    }
    if (message.length < 10) {
      showErr(messageField, 'Deine Nachricht ist zu kurz.');
      valid = false;
    }

    if (!valid) return;

    /* mailto fallback — TODO: replace with server-side endpoint */
    const subject = encodeURIComponent(`Kontaktanfrage von ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@joker-nightlife.de?subject=${subject}&body=${body}`;

    if (statusEl) {
      statusEl.textContent = 'Ihr E-Mail-Programm wird geöffnet…';
      statusEl.className = 'form-status ok';
    }
    submitBtn.disabled = true;
    setTimeout(() => { submitBtn.disabled = false; }, 3000);
  });
}
