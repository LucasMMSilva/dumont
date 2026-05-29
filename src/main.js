import './styles/scss/dumont.scss';
import './components/dm-button.js';
import './components/dm-card.js';
import './components/dm-alert.js';
import './components/dm-toast.js';
import './components/dm-modal.js';
import './components/dm-navbar.js';
import './components/dm-floating-input.js';
import './components/dm-toggle.js';

const toastContainer = document.querySelector('dm-toast-container');
const toastButtons = document.querySelectorAll('[data-toast-message]');

toastButtons.forEach((button) => {
  button.addEventListener('dm:click', () => {
    const message = button.dataset.toastMessage;
    const variant = button.dataset.toastVariant || 'info';
    const duration = Number(button.dataset.toastDuration) || 4000;

    if (toastContainer) {
      toastContainer.show(message, variant, duration);
    }
  });
});

const modal = document.querySelector('dm-modal');
const modalButtons = document.querySelectorAll('[data-modal-title]');

modalButtons.forEach((button) => {
  button.addEventListener('dm:click', () => {
    const title = button.dataset.modalTitle || 'Modal Dialog';
    const content = button.dataset.modalContent || 'This is a simple modal dialog.';
    const dialog = modal;

    if (!dialog) return;

    dialog.setAttribute('title', title);
    dialog.innerHTML = `<p>${content}</p>`;
    dialog.show();
  });
});
