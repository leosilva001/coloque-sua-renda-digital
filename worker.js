export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response("OK - Sua Renda no Digital");
    }

    return new Response("Sua Renda no Digital");
  }
};
// Deploy via GitHub
// primeiro build Cloudflare
