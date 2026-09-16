const PRODUCT_ID = "2fffa400-b132-11f1-b958-cd4bca857c9f";
const SESSION_DAYS = 30;
const OTP_MINUTES = 10;

const HTML = {
  login: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sua Renda no Digital</title><style>
  body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:520px;margin:0 auto;padding:48px 22px}.box{border:1px solid #cfc9bd;background:#f9f7f2;padding:28px;border-radius:18px}h1{font-size:30px;margin:0 0 10px}p{line-height:1.55;color:#444}input{width:100%;box-sizing:border-box;padding:15px;border:1px solid #aaa;border-radius:10px;background:#fff;font-size:16px;margin:8px 0 12px}button{width:100%;padding:15px;border:0;border-radius:10px;background:#111;color:#fff;font-weight:700;font-size:16px}small{display:block;margin-top:14px;color:#777}</style></head><body><main class="wrap"><div class="box"><div style="font-size:13px;font-weight:700;letter-spacing:.08em">SUA RENDA NO DIGITAL</div><h1>Área do aluno</h1><p>Digite o mesmo e-mail usado na compra. Enviaremos um código de acesso.</p><form method="post" action="/login"><input name="email" type="email" autocomplete="email" placeholder="seu@email.com" required><button>ENVIAR CÓDIGO</button></form><small>O acesso é liberado somente para compras aprovadas.</small></div></main></body></html>`,
  otp: (email) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Confirmar acesso</title><style>body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:520px;margin:0 auto;padding:48px 22px}.box{border:1px solid #cfc9bd;background:#f9f7f2;padding:28px;border-radius:18px}h1{font-size:28px}input{width:100%;box-sizing:border-box;padding:15px;border:1px solid #aaa;border-radius:10px;font-size:20px;letter-spacing:.3em;text-align:center}button{width:100%;margin-top:12px;padding:15px;border:0;border-radius:10px;background:#111;color:#fff;font-weight:700}</style></head><body><main class="wrap"><div class="box"><h1>Digite o código</h1><p>Enviamos um código de 6 dígitos para <b>${escapeHtml(email)}</b>.</p><form method="post" action="/verify"><input name="email" type="hidden" value="${escapeAttr(email)}"><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required><button>ENTRAR</button></form></div></main></body></html>`,
  app: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sua Renda no Digital</title><style>body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:720px;margin:0 auto;padding:40px 20px}.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em}h1{font-size:38px;line-height:1.05;margin:12px 0}p{line-height:1.6;color:#444}.card{background:#f9f7f2;border:1px solid #cfc9bd;border-radius:18px;padding:22px;margin:18px 0}.item{padding:17px 0;border-top:1px solid #111}.item:first-child{border-top:0}.num{font-size:12px;color:#777}a{color:#111;font-weight:700;text-decoration:none}.item a:hover{text-decoration:underline}form{margin-top:24px}button{padding:12px 18px;border:1px solid #111;background:#111;color:#fff;border-radius:9px}</style></head><body><main class="wrap"><div class="eyebrow">SUA RENDA NO DIGITAL</div><h1>Seu ponto de partida.</h1><p>Conteúdo prático para começar a entender caminhos de venda pela internet sem ficar perdido com tanta informação.</p><div class="card"><h2>O que você vai encontrar</h2><div class="item"><span class="num">01</span><br><a href="/app/modulo/1">Vendendo produtos</a></div><div class="item"><span class="num">02</span><br><a href="/app/modulo/2">Prestando serviços</a></div><div class="item"><span class="num">03</span><br><a href="/app/modulo/3">Encontrando clientes</a></div><div class="item"><span class="num">04</span><br><a href="/app/modulo/4">Indicações & parcerias</a></div><div class="item"><span class="num">05</span><br><a href="/app/modulo/5">Vendendo pelo WhatsApp</a></div><div class="item"><span class="num">06</span><br><a href="/app/modulo/6">Criando sua oferta</a></div><div class="item"><span class="num">07</span><br><a href="/app/modulo/7">Primeiro teste</a></div></div><form method="post" action="/logout"><button>SAIR</button></form></main></body></html>`
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

    if (url.pathname.startsWith("/app/modulo/")) {
      const session = await getSession(request, env);
      if (!session) return redirect("/login");
      const id = Number(url.pathname.split("/").pop());
      if (!Number.isInteger(id) || id < 1 || id > MODULES.length) return new Response("Not found", { status: 404 });
      return html(modulePage(MODULES[id - 1]));
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


const MODULES = [
  {id:1,title:"Vendendo produtos",intro:"Entenda como escolher algo simples para vender e fazer um primeiro teste.",sections:[
    ["1. Comece pelo problema","Pense primeiro em qual problema ou necessidade você consegue atender."],
    ["2. Escolha uma forma de venda","Você pode vender por redes sociais, WhatsApp, marketplaces ou uma página própria."],
    ["3. Faça um teste pequeno","Antes de investir mais, coloque sua oferta na frente de algumas pessoas e observe o interesse."],
    ["4. Só aumente depois de validar","Use o que aprendeu para melhorar a oferta e testar novamente."]
  ]},
  {id:2,title:"Prestando serviços",intro:"Serviços podem ser uma forma de começar usando uma habilidade que você já possui.",sections:[
    ["1. Pense no que você consegue entregar","Liste tarefas que você sabe fazer ou consegue aprender rapidamente."],
    ["2. Transforme a habilidade em oferta","Deixe claro qual serviço você presta, para quem e o que a pessoa recebe."],
    ["3. Monte um exemplo","Um exemplo simples ajuda o possível cliente a entender o que você oferece."],
    ["4. Procure os primeiros interessados","Comece por contatos e negócios que realmente possam ter necessidade do serviço."]
  ]},
  {id:3,title:"Encontrando clientes",intro:"Depois de definir sua oferta, encontre pessoas que possam ter interesse.",sections:[
    ["1. Defina seu público","Tenha uma ideia clara de quem pode se beneficiar do que você oferece."],
    ["2. Encontre onde essas pessoas estão","Redes sociais, grupos, contatos e negócios locais podem ser pontos de partida."],
    ["3. Faça uma abordagem simples","Explique rapidamente o que você oferece e por que entrou em contato."],
    ["4. Aprenda com as respostas","As respostas ajudam a descobrir o que precisa ser ajustado."]
  ]},
  {id:4,title:"Indicações & parcerias",intro:"Parcerias e indicações podem ajudar você a chegar a pessoas novas.",sections:[
    ["1. Procure parceiros complementares","Busque pessoas ou negócios que atendam um público parecido, mas ofereçam algo diferente."],
    ["2. Apresente uma proposta clara","Explique como a parceria pode funcionar e o que cada lado fará."],
    ["3. Combine as condições","Defina de forma clara como serão feitas as indicações e eventuais comissões."],
    ["4. Acompanhe os resultados","Veja quais parcerias realmente geram contatos e vendas."]
  ]},
  {id:5,title:"Vendendo pelo WhatsApp",intro:"Use o WhatsApp para conversar com interessados e apresentar uma oferta.",sections:[
    ["1. Comece a conversa","Use uma mensagem curta e respeitosa."],
    ["2. Entenda a necessidade","Faça perguntas simples para saber se sua oferta faz sentido."],
    ["3. Apresente a oferta","Mostre o que está sendo vendido, o preço e as condições de forma clara."],
    ["4. Faça o acompanhamento","Se houver interesse, combine um próximo passo em vez de insistir repetidamente."]
  ]},
  {id:6,title:"Criando sua oferta",intro:"Uma boa oferta deixa claro o que está sendo vendido, para quem é e qual é o próximo passo.",sections:[
    ["1. Defina o produto ou serviço","Explique exatamente o que a pessoa está comprando."],
    ["2. Mostre o principal benefício","Fale sobre o problema que a oferta ajuda a resolver, sem prometer resultados garantidos."],
    ["3. Deixe preço e condições claros","Evite esconder informações importantes."],
    ["4. Termine com uma ação","Diga de forma simples o que a pessoa deve fazer para continuar."]
  ]},
  {id:7,title:"Primeiro teste",intro:"O primeiro teste serve para descobrir se existe interesse real antes de aumentar o investimento.",sections:[
    ["1. Escolha uma oferta","Teste uma ideia por vez para conseguir entender o que funcionou."],
    ["2. Defina um pequeno período","Observe os primeiros sinais sem transformar o teste em um compromisso grande."],
    ["3. Observe os números","Acessos, mensagens, interessados e vendas ajudam a entender o comportamento da oferta."],
    ["4. Ajuste e teste novamente","Use o que aprendeu para mudar uma parte da oferta e comparar o resultado."]
  ]}
];

function modulePage(module) {
  const sections = module.sections.map((s,i)=>`<div class="module-section"><div class="module-number">${String(i+1).padStart(2,"0")}</div><div><h2>${escapeHtml(s[0])}</h2><p>${escapeHtml(s[1])}</p></div></div>`).join("");
  const previous = module.id > 1 ? `<a class="module-nav" href="/app/modulo/${module.id-1}">← Módulo anterior</a>` : `<a class="module-nav" href="/app">← Voltar aos módulos</a>`;
  const next = module.id < MODULES.length ? `<a class="module-nav" href="/app/modulo/${module.id+1}">Próximo módulo →</a>` : `<a class="module-nav" href="/app">Voltar aos módulos →</a>`;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(module.title)} - Sua Renda no Digital</title><style>body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:720px;margin:0 auto;padding:40px 20px}.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em}.back{display:inline-block;margin-bottom:28px;color:#111;text-decoration:none;font-weight:700}h1{font-size:38px;line-height:1.05;margin:12px 0}p{line-height:1.6;color:#444}.intro{font-size:18px;margin-bottom:28px}.card{background:#f9f7f2;border:1px solid #cfc9bd;border-radius:18px;padding:22px;margin:18px 0}.module-section{display:flex;gap:16px;padding:20px 0;border-top:1px solid #111}.module-section:first-child{border-top:0}.module-number{font-size:12px;color:#777;min-width:28px}.module-section h2{font-size:19px;margin:0 0 8px}.module-section p{margin:0}.module-navs{display:flex;justify-content:space-between;gap:20px;margin-top:28px}.module-nav{color:#111;font-weight:700;text-decoration:none}.module-nav:hover{text-decoration:underline}@media(max-width:520px){h1{font-size:32px}.module-navs{flex-direction:column}}</style></head><body><main class="wrap"><a class="back" href="/app">← Sua Renda no Digital</a><div class="eyebrow">MÓDULO ${String(module.id).padStart(2,"0")}</div><h1>${escapeHtml(module.title)}</h1><p class="intro">${escapeHtml(module.intro)}</p><div class="card">${sections}</div><div class="module-navs">${previous}${next}</div></main></body></html>`;
}

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
    return html("<!doctype html><meta charset='utf-8'><body style='font-family:Arial;padding:40px;background:#f5f1e8'><h2>Verifique seu e-mail</h2><p>Se houver uma compra aprovada vinculada a esse endereço, você receberá um código.</p><a href='/login'>Voltar</a></body>");
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
      subject: "Seu código de acesso — Sua Renda no Digital",
      text: `Seu código de acesso é: ${code}\n\nEle expira em ${OTP_MINUTES} minutos.`
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
function 
