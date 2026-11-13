
// BLOOM SKIN — interacciones básicas de la landing page
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

// Mostrar y ocultar el menú en teléfonos.
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

// Cerrar el menú después de seleccionar una sección.
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  });
});

// Actualizar el año del pie de página.
document.querySelector('#year').textContent = new Date().getFullYear();

// Validación local del formulario; no se envía información a un servidor.
const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.className = 'form-feedback';

  if (!form.checkValidity()) {
    feedback.textContent = 'Revisa los campos: escribe tu nombre, un correo válido y un mensaje de al menos 10 caracteres.';
    feedback.classList.add('error');
    form.reportValidity();
    return;
  }

  const name = document.querySelector('#nombre').value.trim();
  feedback.textContent = `¡Gracias, ${name}! Este formulario es una demostración, así que tu mensaje no se ha enviado.`;
  feedback.classList.add('success');
  form.reset();
});
