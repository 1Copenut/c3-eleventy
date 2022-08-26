const contactForm = document.getElementById('continuum-contact-form');
const fields = Array.prototype.slice.call(document.querySelectorAll('.js-validate'));

function validateFormOnSubmit(e) {
  const form = e.target;

  fields.forEach(field => {
    if (field.checkValidity()) {
      field.closest('li').classList.remove('js-invalid');
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    } else {
      const fieldId = field.getAttribute('id');
      field.closest('li').classList.add('js-invalid');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', `error-msg-${fieldId}`);
    }
  });

  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopImmediatePropagation();
    alertOnSubmitError('.contact-form__alert');
  }
}

function clearErrorState(field) {
  const parent = field.closest('li');
  if (!parent.classList.contains('js-invalid')) return;

  parent.classList.remove('js-invalid');
  field.removeAttribute('aria-invalid');
  field.removeAttribute('aria-describedby');
}

function alertOnSubmitError(target) {
  const invalidInputs = document.querySelectorAll(':scope .contact-form__fieldset :invalid');
  const alertBox = document.querySelector(target);
  const alertTextNode = document.createElement('p')
  const alertTextMsg = `Your form has ${invalidInputs.length} errors. Please update and press Send message.`;

  while (alertBox.firstChild) {
    alertBox.removeChild(alertBox.firstChild);
  }

  alertTextNode.append(alertTextMsg);
  alertBox.append(alertTextNode);
  alertBox.focus();
}

contactForm.addEventListener('submit', validateFormOnSubmit);
fields.forEach(field => {
  field.addEventListener('blur', e => clearErrorState(e.target));
});
