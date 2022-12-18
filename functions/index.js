import CryptoJS from "crypto-js";
import { v4 } from "uuid";

export const onRequest = async ({ request, next, env }) => {
  const NONCE_SECRET = env.NONCE_SECRET;
  const NONCE_TOKEN = nonceGenerator();

  const contentType = request.headers.get("accept");
  const response = await next();

  if (contentType.includes("text/html")) {
    // TODO: Replace the SHA256 value
    response.headers.set(
      "Content-Security-Policy",
      `default-src 'self'; base-uri 'none'; object-src 'none'; connect-src 'none'; frame-src https://challenges.cloudflare.com; img-src 'self' data; style-src 'self'; script-src 'self' 'nonce-${NONCE_TOKEN}' https://challenges.cloudflare.com; frame-ancestors 'none'; require-trusted-types-for 'script';`
    );

    // Find the nonce string and replace it
    return new HTMLRewriter()
      .on("script", new AttributeWriter("nonce", NONCE_SECRET, NONCE_TOKEN))
      .transform(response);
  } else {
    return response;
  }
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

function nonceGenerator() {
  var hash = CryptoJS.SHA256(v4());
  return hash.toString();
}
