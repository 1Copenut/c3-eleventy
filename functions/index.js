export const onRequest = async ({ request, next, env }) => {
  const TEMP_NONCE_SECRET = env.TEMP_NONCE_SECRET;
  const TEMP_NONCE_TOKEN = env.TEMP_NONCE_TOKEN;

  const contentType = request.headers.get("accept");
  const response = await next();

  if (contentType.includes("text/html")) {
    // Add basic CSP headers first
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set(
      "Content-Security-Policy",
      `default-src 'self'; base-uri 'none'; object-src 'none'; connect-src 'none'; frame-src https://challenges.cloudflare.com; img-src 'self' data; style-src 'self'; script-src 'self' 'sha256-0dhzRub3e7mU2g5sd8vHUEe971OY216EW+BnNkWNaQs=' https://challenges.cloudflare.com; frame-ancestors 'none'; require-trusted-types-for 'script';`
    );

    // Find the nonce string and replace it
    return new HTMLRewriter()
      .on(
        "script",
        new AttributeWriter("nonce", TEMP_NONCE_SECRET, TEMP_NONCE_TOKEN)
      )
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
