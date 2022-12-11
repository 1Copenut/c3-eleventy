export const onRequest = async ({ request, next, env }) => {
  const TEMP_NONCE_SECRET = env.TEMP_NONCE_SECRET;
  const TEMP_NONCE_TOKEN = env.TEMP_NONCE_TOKEN;

  const contentType = request.headers.get("accept");
  const response = await next();

  if (contentType.includes("text/html")) {
    return new HTMLRewriter()
      .on(
        "script",
        new AttributeWriter("nonce", TEMP_NONCE_SECRET, TEMP_NONCE_TOKEN)
      )
      .transform(response);
  } else {
    return response;
  }
  // response.headers.set("Access-Control-Allow-Origin", "*");
  // response.headers.set("Access-Control-Max-Age", "86400");
  // return response;
};

class AttributeWriter {
  constructor(attributeName, oldVal, newVal) {
    this.attributeName = attributeName;
    this.oldVal = oldVal;
    this.newVal = newVal;
  }

  element(element) {
    const attribute = element.getAttribute(this.attributeName);
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        attribute.replace(this.oldVal, this.newVal)
      );
    }
  }
}
