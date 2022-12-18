function handleAsyncStylesheets(selector, observerNode) {
  const styleSheetPromise = new Promise((resolve, reject) => {
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
      reject("The provided selector was not found");
    });

    // Mutation Observer settings
    const node = observerNode;
    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(node, config);
  });

  return styleSheetPromise;
}

function _setMediaType(selector, mediaType) {
  const mediaArray = Array.prototype.slice.call(
    document.querySelectorAll(selector)
  );
  mediaArray.map((elem) => {
    elem.addEventListener("load", (e) => {
      e.currentTarget.media = mediaType;
      e.currentTarget.onload = null;
    });
  });
}

handleAsyncStylesheets(
  '[data-async="css-async-load"]',
  document.querySelector("head")
)
  .then(() => _setMediaType('[data-async="css-async-load"]', "all"))
  .catch((err) => {
    throw err;
  });
