const encMail = "c2VjdXJpdHlAY29udGludXVtZGVzaWduLm5ldA==";
const target = document.getElementById("contact");
target.setAttribute("href", "mailto:".concat(atob(encMail)));
