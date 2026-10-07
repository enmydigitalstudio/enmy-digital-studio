'use strict';
const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });
document.querySelectorAll('[data-filter]').forEach(button => { button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); }); document.querySelectorAll('[data-category]').forEach(project => { project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter; }); }); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#download-request').addEventListener('click', event => { const form = document.querySelector('#contact-form'); if (!validateRequest(form)) return; const data = new FormData(form); const request = ['SOLICITUD DE PROYECTO — ENMY DIGITAL STUDIO', '', `Nombre: ${data.get('nombre')}`, `Correo: ${data.get('correo')}`, `Servicio: ${data.get('servicio')}`, '', 'Idea del proyecto:', data.get('mensaje'), ''].join('\n'); const url = URL.createObjectURL(new Blob([request], {type:'text/plain;charset=utf-8'})); const link = document.createElement('a'); link.href = url; link.download = 'solicitud-enmy.txt'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); document.querySelector('#status').textContent = 'Solicitud preparada para descargar. Puedes compartir el archivo con el estudio. No se ha enviado ningún mensaje.'; });

// Numero de WhatsApp de contacto. Modifica esta constante para cambiarlo.
// Formato internacional: codigo de pais + numero, solo digitos, sin + ni espacios.
const WHATSAPP_NUMBER = '18494471493';

function validateRequest(form) {
  for (const field of form.querySelectorAll('[required]')) {
    field.setCustomValidity(field.value.trim() ? '' : 'Completa este campo.');
  }
  return form.reportValidity();
}
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('input', event => {
  if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
});
contactForm.addEventListener('change', event => {
  if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
});
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!validateRequest(contactForm)) return;
  const data = new FormData(contactForm);
  const message = [
    'Solicitud de Proyecto — Enmy Digital Studio',
    '',
    `Nombre: ${data.get('nombre').trim()}`,
    `Correo: ${data.get('correo').trim()}`,
    `Servicio: ${data.get('servicio').trim()}`,
    '',
    'Idea del proyecto:',
    data.get('mensaje').trim()
  ].join('\n');
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});