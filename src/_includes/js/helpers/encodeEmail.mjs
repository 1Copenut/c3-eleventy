const encodeEmail = (targetClass, encodedAddress) => {
  const target = document.querySelector(targetClass);
  target.setAttribute("href", `mailto: ${atob(encodedAddress)}`);
};

export { encodeEmail };
