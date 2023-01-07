const encodeEmail = (targetClass, encodedAddress) => {
  const target = document.querySelector(targetClass);
  target.setAttribute("href", `mailto: ${atob(encodedAddress)}`);
};

document.addEventListener("DOMContentLoaded", () => {
  const emailHandler = encodeEmail(
    ".js-link--email",
    "c2VjdXJpdHlAY29udGludXVtZGVzaWduLm5ldA=="
  );
});
