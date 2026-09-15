const PRODUCT_ID = "2fffa400-b132-11f1-b958-cd4bca857c9f";
const SESSION_DAYS = 30;
const OTP_MINUTES = 10;

const HTML = {
  login: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sua Renda no Digital</title><style>
  body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:520px;margin:0 auto;padding:48px 22px}.box{border:1px solid #cfc9bd;background:#f9f7f2;padding:28px;border-radius:18px}h1{font-size:30px;margin:0 0 10px}p{line-height:1.55;color:#444}input{width:100%;box-sizing:border-box;padding:15px;border:1px solid #aaa;border-radius:10px;background:#fff;font-size:16px;margin:8px 0 12px}button{width:100%;padding:15px;border:0;border-radius:10px;background:#111;color:#fff;font-weight:700;font-size:16px}small{display:block;margin-top:14px;color:#777}</style></head><body><main class="wrap"><div class="box"><div style="font-size:13px;font-weight:700;letter-spacing:.08em">SUA RENDA NO DIGITAL</div><h1>Ãrea do aluno</h1><p>Digite o mesmo e-mail usado na compra. Enviaremos um cÃ³digo de acesso.</p><form method="post" action="/login"><input name="email" type="email" autocomplete="email" placeholder="seu@email.com" required><button>ENVIAR CÃ“DIGO</button></form><small>O acesso Ã© liberado somente para compras aprovadas.</small></div></main></body></html>`,
  otp: (email) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Confirmar acesso</title><style>body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:520px;margin:0 auto;padding:48px 22px}.box{border:1px solid #cfc9bd;background:#f9f7f2;padding:28px;border-radius:18px}h1{font-size:28px}input{width:100%;box-sizing:border-box;padding:15px;border:1px solid #aaa;border-radius:10px;font-size:20px;letter-spacing:.3em;text-align:center}button{width:100%;margin-top:12px;padding:15px;border:0;border-radius:10px;background:#111;color:#fff;font-weight:700}</style></head><body><main class="wrap"><div class="box"><h1>Digite o cÃ³digo</h1><p>Enviamos um cÃ³digo de 6 dÃ­gitos para <b>${escapeHtml(email)}</b>.</p><form method="post" action="/verify"><input name="email" type="hidden" value="${escapeAttr(email)}"><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required><button>ENTRAR</button></form></div></main></body></html>`,
  app: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sua Renda no Digital</title><style>body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:720px;margin:0 auto;padding:40px 20px}.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em}h1{font-size:38px;line-height:1.05;margin:12px 0}p{line-height:1.6;color:#444}.card{background:#f9f7f2;border:1px solid #cfc9bd;border-radius:18px;padding:22px;margin:18px 0}.item{padding:17px 0;border-top:1px solid #111}.item:first-child{border-top:0}.num{font-size:12px;color:#777}a{color:#111;font-weight:700}form{margin-top:24px}button{padding:12px 18px;border:1px solid #111;background:#111;color:#fff;border-radius:9px}</style></head><body><main class="wrap"><div class="eyebrow">SUA RENDA NO DIGITAL</div><h1>Seu ponto de partida.</h1><p>ConteÃºdo prÃ¡tico para comeÃ§ar a entender caminhos de venda pela internet sem ficar perdido com tanta informaÃ§Ã£o.</p><div class="card"><h2>O que vocÃª vai encontrar</h2><div class="item"><span class="num">01</span><br>Vendendo produtos</div><div class="item"><span class="num">02</span><br>Prestando serviÃ§os</div><div class="item"><span class="num">03</span><br>Encontrando clientes</div><div class="item"><span class="num">04</span><br>IndicaÃ§Ãµes & parcerias</div><div class="item"><span class="num">05</span><br>Vendendo pelo WhatsApp</div><div class="item"><span class="num">06</span><br>Criando sua oferta</div><div class="item"><span class="num">07</span><br>Primeiro teste</div></div><form method="post" action="/logout"><button>SAIR</button></form></main></body></html>`
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    if (url.pathname === "/health") {
  return json({
    ok: true,
    service: "sua-renda-no-digital",
    product_id: PRODUCT_ID,
    diagnostics: {
      db: !!env.DB,
      from_email: !!env.FROM_EMAIL,
      resend_api_key: !!env.RESEND_API_KEY
    }
  });
    }

    if (url.pathname === "/webhooks/kiwify" && method === "POST") {
      return handleKiwifyWebhook(request, env);
    }

    if (url.pathname === "/login" && method === "GET") {
      return html(HTML.login);
    }

    if (url.pathname === "/login" && method === "POST") {
      return requestLogin(request, env);
    }

    if (url.pathname === "/verify" && method === "POST") {
      return verifyOtp(request, env);
    }

    if (url.pathname === "/logout" && method === "POST") {
      return logout(request, env);
    }

    if (url.pathname === "/app") {
      const session = await getSession(request, env);
      if (!session) return redirect("/login");
      return html(HTML.app);
    }

    if (url.pathname === "/") {
      return new Response("Sua Renda no Digital", { headers: { "content-type": "text/plain; charset=utf-8" } });
    }

    return new Response("Not found", { status: 404 });
  }
};

async function handleKiwifyWebhook(request, env) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ ok: false, error: "invalid_json" }, 400);

  // Kiwify's classic webhook API includes a token in the webhook payload.
  // Configure the same token as the Worker secret KIWIFY_WEBHOOK_TOKEN.
  if (env.KIWIFY_WEBHOOK_TOKEN && body.token !== env.KIWIFY_WEBHOOK_TOKEN) {
    return json({ ok: false, error: "invalid_webhook_token" }, 401);
  }

  const event = String(body.webhook_event_type || body.event || body.trigger || "").toLowerCase();
  const productId = String(body.product_id || body.product?.id || "");
  const email = normalizeEmail(
    body.Customer?.email || body.customer?.email || body.email || body.buyer?.email || ""
  );

  if (productId && productId !== PRODUCT_ID) {
    return json({ ok: true, ignored: "different_product" });
  }

  if (!email) return json({ ok: false, error: "buyer_email_not_found" }, 400);

  const approved = ["compra_aprovada", "purchase_approved", "approved"].includes(event);
  const revoked = ["compra_reembolsada", "chargeback", "refund", "refunded"].includes(event);

  if (approved) {
    await env.DB.prepare(
      "INSERT INTO buyers(email, active, product_id, updated_at) VALUES(?,1,?,?) ON CONFLICT(email) DO UPDATE SET active=1, product_id=excluded.product_id, updated_at=excluded.updated_at"
    ).bind(email, PRODUCT_ID, new Date().toISOString()).run();
  } else if (revoked) {
    await env.DB.prepare(
      "UPDATE buyers SET active=0, updated_at=? WHERE email=? AND (product_id=? OR product_id IS NULL)"
    ).bind(new Date().toISOString(), email, PRODUCT_ID).run();
    await env.DB.prepare("DELETE FROM sessions WHERE email=?").bind(email).run();
  }

  return json({ ok: true });
}

async function requestLogin(request, env) {
  const form = await request.formData();
  const email = normalizeEmail(form.get("email") || "");
  if (!email) return html(HTML.login, 400);

  const buyer = await env.DB.prepare(
    "SELECT email FROM buyers WHERE email=? AND active=1 AND product_id=?"
  ).bind(email, PRODUCT_ID).first();

  // Generic response prevents account enumeration.
  if (!buyer) {
    return html("<!doctype html><meta charset='utf-8'><body style='font-family:Arial;padding:40px;background:#f5f1e8'><h2>Verifique seu e-mail</h2><p>Se houver uma compra aprovada vinculada a esse endereÃ§o, vocÃª receberÃ¡ um cÃ³digo.</p><a href='/login'>Voltar</a></body>");
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const codeHash = await sha256(code);
  const expires = new Date(Date.now() + OTP_MINUTES * 60_000).toISOString();

  await env.DB.prepare(
    "DELETE FROM login_codes WHERE email=?"
  ).bind(email).run();

  await env.DB.prepare(
    "INSERT INTO login_codes(email, code_hash, expires_at, attempts) VALUES(?,?,?,0)"
  ).bind(email, codeHash, expires).run();

  if (!env.RESEND_API_KEY || !env.FROM_EMAIL) {
    return json({ ok: false, error: "email_provider_not_configured" }, 500);
  }

  const sent = await sendEmail(env, email, code);
  if (!sent.ok) return json({ ok: false, error: "email_send_failed" }, 502);

  return html(HTML.otp(email));
}

async function verifyOtp(request, env) {
  const form = await request.formData();
  const email = normalizeEmail(form.get("email") || "");
  const code = String(form.get("code") || "").trim();

  const row = await env.DB.prepare(
    "SELECT email, code_hash, expires_at, attempts FROM login_codes WHERE email=?"
  ).bind(email).first();

  if (!row || row.attempts >= 5 || new Date(row.expires_at).getTime() < Date.now()) {
    return html(HTML.otp(email), 401);
  }

  const hash = await sha256(code);
  if (!timingSafeEqual(hash, row.code_hash)) {
    await env.DB.prepare("UPDATE login_codes SET attempts=attempts+1 WHERE email=?").bind(email).run();
    return html(HTML.otp(email), 401);
  }

  const buyer = await env.DB.prepare(
    "SELECT email FROM buyers WHERE email=? AND active=1 AND product_id=?"
  ).bind(email, PRODUCT_ID).first();

  if (!buyer) return redirect("/login");

  const token = randomToken();
  const tokenHash = await sha256(token);
  const expires = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString();

  await env.DB.prepare("DELETE FROM sessions WHERE email=?").bind(email).run();
  await env.DB.prepare(
    "INSERT INTO sessions(token_hash,email,expires_at) VALUES(?,?,?)"
  ).bind(tokenHash, email, expires).run();
  await env.DB.prepare("DELETE FROM login_codes WHERE email=?").bind(email).run();

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/app",
      "Set-Cookie": `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}`
    }
  });
}

async function getSession(request, env) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  if (!match) return null;
  const hash = await sha256(match[1]);
  const row = await env.DB.prepare(
    "SELECT email, expires_at FROM sessions WHERE token_hash=?"
  ).bind(hash).first();
  if (!row || new Date(row.expires_at).getTime() < Date.now()) return null;

  const buyer = await env.DB.prepare(
    "SELECT email FROM buyers WHERE email=? AND active=1 AND product_id=?"
  ).bind(row.email, PRODUCT_ID).first();
  return buyer ? row : null;
}

async function logout(request, env) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  if (match) {
    const hash = await sha256(match[1]);
    await env.DB.prepare("DELETE FROM sessions WHERE token_hash=?").bind(hash).run();
  }
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
      "Set-Cookie": "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
    }
  });
}

async function sendEmail(env, email, code) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [email],
      subject: "Seu cÃ³digo de acesso â€” Sua Renda no Digital",
      text: `Seu cÃ³digo de acesso Ã©: ${code}\n\nEle expira em ${OTP_MINUTES} minutos.`
    })
  });
  return { ok: response.ok };
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

function html(body, status = 200) {
  return new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8" } });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

function redirect(location) {
  return new Response(null, { status: 302, headers: { Location: location } });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }
