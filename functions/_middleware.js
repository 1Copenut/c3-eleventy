export const onRequest = async ({ request, next, env }) => {
  const NONCE_SECRET = env.NONCE_SECRET;
  const NONCE_TOKEN = nonceGenerator();

  const response = await next();
  const headers = Object.fromEntries(response.headers);
  const contentType = headers["content-type"];

  // 200 OK. Set CSP headers.
  if (
    response.status === 200 &&
    contentType &&
    contentType.startsWith("text/html")
  ) {
    response.headers.set("cf-nonce-generator", "HIT");
    response.headers.set(
      "Content-Security-Policy",
      `default-src 'self'; base-uri 'none'; object-src 'none'; connect-src https://sentry.io/ https://analytics.umami.is/ https://api-gateway.umami.dev
 https://gateway.umami.is https://contactform.continuumdesign.net/; frame-src https://challenges.cloudflare.com; img-src 'self' data; style-src 'self'; script-src 'strict-dynamic' 'nonce-${NONCE_TOKEN}'; frame-ancestors 'none'; require-trusted-types-for 'script'; report-uri https://o1405800.ingest.sentry.io/api/6739194/security/?sentry_key=3e24862ff9ce4761ab71fce722fc4c6b;`
    );
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    response.headers.set("X-XSS-protection", "1; mode=block");

    // Find the nonce string and replace it
    const rewriter = new HTMLRewriter()
      .on("script", new AttributeWriter("nonce", NONCE_SECRET, NONCE_TOKEN))
      .transform(response);

    return rewriter;
  }

  // 304 not modified. No need to add CSP headers.
  if (response.status === 304) {
    return response;
  }

  return response;
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
  let nonce = btoa(crypto.getRandomValues(new Uint32Array(2)));
  return nonce;
}
