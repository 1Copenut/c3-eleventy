const encodeEmail = (targetId, encodedAddress) => {
  const target = document.getElementById(targetId);
  target.setAttribute("href", `mailto: ${atob(encodedAddress)}`);
};

export { encodeEmail };
