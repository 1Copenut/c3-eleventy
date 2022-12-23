const ALERT_BOX = ".contact-form__alert"; // Alert box for errors on submit
const JS_INVALID = "js--invalid";

const contactForm = document.getElementById("continuum-contact-form");
const fields = Array.prototype.slice.call(
  document.querySelectorAll(".js--validate")
);

const createInputErrorMessage = (field) => {
  const parent = field.closest("li");
  const fieldId = field.getAttribute("id");
  if (parent.classList.contains(JS_INVALID)) return;

  parent.classList.add(JS_INVALID);
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", `error-msg-${fieldId}`);
};

const removeInputErrorMessage = (field) => {
  const parent = field.closest("li");
  if (!parent.classList.contains(JS_INVALID)) return;

  parent.classList.remove(JS_INVALID);
  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");
};

const createSubmitErrorMessage = (target) => {
  const invalidInputs = document.querySelectorAll(
    ":scope .contact-form__fieldset :invalid"
  );
  const alertBox = document.querySelector(target);
  const alertTextNode = document.createElement("p");
  const alertTextMsg = `Your form has ${invalidInputs.length} error${
    invalidInputs.length === 1 ? "" : "s"
  }. Please update and press Send message.`;

  while (alertBox.firstChild) {
    alertBox.removeChild(alertBox.firstChild);
  }

  alertTextNode.append(alertTextMsg);
  alertBox.append(alertTextNode);
  requestAnimationFrame(() => {
    alertBox.focus();
  });
};

const validateInputs = (e) => {
  fields.forEach((field) => {
    if (!field.checkValidity()) {
      createInputErrorMessage(field);
    } else {
      removeInputErrorMessage(field);
    }
  });

  if (!contactForm.checkValidity()) {
    console.log("Halt heathens!");
    e.preventDefault();
    e.stopImmediatePropagation();
    createSubmitErrorMessage(ALERT_BOX);
    return;
  }

  // TODO: Add submitFormData()

  window.location.href = "/contact/thankyou/";
};

const submitFormData = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();

  // Turnstile requires a FormData object
  const formData = new FormData(contactForm);
};

contactForm.addEventListener("submit", validateInputs);
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Error messages are hard to get right and can be a cognitive challenge
   * if they're omnipresent. I prefer to "turn down" the volume on errors
   * when an input receives focus and remove them (errors) entirely when
   * the input is blurred.
   */
  fields.forEach((field) => {
    field.addEventListener("blur", (e) => removeInputErrorMessage(e.target));
  });
});
