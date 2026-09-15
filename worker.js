export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response("OK - Sua Renda no Digital - teste");
    }

    return new Response("Sua Renda no Digital - teste");
  }
};
// Deploy via GitHub
// primeiro build Cloudflare
// build
