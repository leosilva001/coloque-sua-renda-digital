const PRODUCT_ID = "2fffa400-b132-11f1-b958-cd4bca857c9f";
const SESSION_DAYS = 30;
const OTP_MINUTES = 10;

const MODULES = [
  {
    id: 1,
    title: "Vendendo produtos",
    intro: "Entenda como escolher algo simples para vender e como testar se existe interesse antes de gastar muito.",
    sections: [
      ["1. Comece pelo problema", "Em vez de procurar qualquer produto, pense em algo que resolva uma necessidade clara ou facilite alguma tarefa."],
      ["2. Escolha uma forma de venda", "Você pode vender pelas redes sociais, WhatsApp, marketplaces ou por uma página simples. O importante é ter uma oferta fácil de entender."],
      ["3. Faça um teste pequeno", "Antes de investir mais, apresente a oferta para algumas pessoas e observe perguntas, cliques e pedidos de informação."],
      ["4. Só aumente depois de validar", "Se houver interesse real, você pode melhorar a oferta e testar novos canais de divulgação." ]
    ]
  },
  {
    id: 2,
    title: "Prestando serviços",
    intro: "Serviços podem ser uma forma de começar sem precisar manter um estoque de produtos.",
    sections: [
      ["1. Pense no que você consegue entregar", "Pode ser algo presencial ou digital, desde que seja uma tarefa que você consiga executar com responsabilidade."],
      ["2. Transforme a habilidade em oferta", "Explique o que você faz, para quem é, o que está incluído e como a pessoa pode solicitar o serviço."],
      ["3. Monte um exemplo", "Um antes e depois, uma demonstração ou uma amostra ajuda o possível cliente a entender o resultado que você entrega."],
      ["4. Procure os primeiros clientes", "Use contatos, redes sociais e indicações para apresentar o serviço e receber feedback." ]
    ]
  },
  {
    id: 3,
    title: "Encontrando clientes",
    intro: "Ter uma oferta é apenas uma parte. Você também precisa descobrir onde estão as pessoas que podem se interessar por ela.",
    sections: [
      ["1. Defina seu público", "Pense em quem realmente teria motivo para comprar ou contratar o que você oferece."],
      ["2. Escolha um canal", "Instagram, TikTok, WhatsApp, grupos e contatos diretos são exemplos de canais. Comece com poucos para não se perder."],
      ["3. Faça uma abordagem clara", "Apresente o que você oferece, mostre o benefício e deixe fácil para a pessoa responder ou pedir mais informações."],
      ["4. Registre o que acontece", "Anote quantas pessoas responderam, quantas pediram detalhes e quais dúvidas apareceram. Isso ajuda a melhorar sua abordagem." ]
    ]
  },
  {
    id: 4,
    title: "Indicações & parcerias",
    intro: "Parcerias podem aproximar sua oferta de pessoas que já confiam em alguém ou em uma empresa.",
    sections: [
      ["1. Procure negócios complementares", "Um parceiro interessante é aquele que atende um público parecido, mas não concorre diretamente com você."],
      ["2. Faça uma proposta simples", "Explique como a parceria pode funcionar e o que cada lado ganha. Evite prometer resultados que você não pode garantir."],
      ["3. Combine as regras", "Defina como serão feitas as indicações, quais contatos serão encaminhados e, quando houver comissão, qual será o combinado."],
      ["4. Acompanhe os resultados", "Veja quais parcerias realmente geram conversas e oportunidades e mantenha as que fazem sentido." ]
    ]
  },
  {
    id: 5,
    title: "Vendendo pelo WhatsApp",
    intro: "O WhatsApp pode funcionar como um canal simples para conversar com interessados e organizar pedidos.",
    sections: [
      ["1. Tenha uma oferta pronta", "Deixe claro o que está sendo vendido, o preço, o que está incluído e como funciona a entrega."],
      ["2. Evite mensagens confusas", "Uma mensagem curta e personalizada costuma ser mais fácil de entender do que um texto enorme com várias informações."],
      ["3. Responda as dúvidas", "Use as perguntas das pessoas para descobrir o que ainda está pouco claro na sua oferta."],
      ["4. Facilite o próximo passo", "Quando houver interesse, explique de forma objetiva como a pessoa pode comprar, contratar ou agendar." ]
    ]
  },
  {
    id: 6,
    title: "Criando sua oferta",
    intro: "Uma boa oferta explica rapidamente o que você entrega e por que aquilo pode ser útil para a pessoa.",
    sections: [
      ["1. Diga o que é", "Comece pelo produto ou serviço, sem esconder a informação principal."],
      ["2. Mostre para quem é", "Quanto mais claro for o público, mais fácil será criar uma comunicação específica."],
      ["3. Explique o que está incluído", "Liste os principais itens, etapas ou benefícios que fazem parte da compra ou contratação."],
      ["4. Crie um próximo passo", "Use uma chamada simples, como pedir informações, entrar em contato ou acessar o checkout." ]
    ]
  },
  {
    id: 7,
    title: "Primeiro teste",
    intro: "O objetivo do primeiro teste não é provar que você encontrou um negócio perfeito. É aprender com uma experiência pequena e real.",
    sections: [
      ["1. Escolha uma única ideia", "Evite testar várias coisas ao mesmo tempo. Escolha uma oferta que você consiga colocar em prática."],
      ["2. Defina um limite", "Decida quanto tempo e dinheiro você aceita usar no teste antes de começar."],
      ["3. Observe sinais reais", "Conversas, pedidos de orçamento, cliques e vendas são informações mais úteis do que apenas curtidas."],
      ["4. Ajuste ou mude", "Se o teste não funcionar, descubra o que pode ser melhorado. Se não fizer sentido continuar, use o aprendizado na próxima tentativa." ]
    ]
  }
];

const HTML = {
  login: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sua Renda no Digital</title><style>
  body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:520px;margin:0 auto;padding:48px 22px}.box{border:1px solid #cfc9bd;background:#f9f7f2;padding:28px;border-radius:18px}h1{font-size:30px;margin:0 0 10px}p{line-height:1.55;color:#444}input{width:100%;box-sizing:border-box;padding:15px;border:1px solid #aaa;border-radius:10px;background:#fff;font-size:16px;margin:8px 0 12px}button{width:100%;padding:15px;border:0;border-radius:10px;background:#111;color:#fff;font-weight:700;font-size:16px}small{display:block;margin-top:14px;color:#777}</style></head><body><main class="wrap"><div class="box"><div style="font-size:13px;font-weight:700;letter-spacing:.08em">SUA RENDA NO DIGITAL</div><h1>Área do aluno</h1><p>Digite o mesmo e-mail usado na compra. Enviaremos um código de acesso.</p><form method="post" action="/login"><input name="email" type="email" autocomplete="email" placeholder="seu@email.com" required><button>ENVIAR CÓDIGO</button></form><small>O acesso é liberado somente para compras aprovadas.</small></div></main></body></html>`,
  otp: (email) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Confirmar acesso</title><style>body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:520px;margin:0 auto;padding:48px 22px}.box{border:1px solid #cfc9bd;background:#f9f7f2;padding:28px;border-radius:18px}h1{font-size:28px}input{width:100%;box-sizing:border-box;padding:15px;border:1px solid #aaa;border-radius:10px;font-size:20px;letter-spacing:.3em;text-align:center}button{width:100%;margin-top:12px;padding:15px;border:0;border-radius:10px;background:#111;color:#fff;font-weight:700}</style></head><body><main class="wrap"><div class="box"><h1>Digite o código</h1><p>Enviamos um código de 6 dÃ­gitos para <b>${escapeHtml(email)}</b>.</p><form method="post" action="/verify"><input name="email" type="hidden" value="${escapeAttr(email)}"><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required><button>ENTRAR</button></form></div></main></body></html>`,
  app: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sua Renda no Digital</title><style>body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:720px;margin:0 auto;padding:40px 20px}.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em}h1{font-size:38px;line-height:1.05;margin:12px 0}p{line-height:1.6;color:#444}.card{background:#f9f7f2;border:1px solid #cfc9bd;border-radius:18px;padding:22px;margin:18px 0}.item{padding:17px 0;border-top:1px solid #111}.item:first-child{border-top:0}.num{font-size:12px;color:#777}a{color:#111;font-weight:700;text-decoration:none}.item{display:block}.item:hover{opacity:.7}form{margin-top:24px}button{padding:12px 18px;border:1px solid #111;background:#111;color:#fff;border-radius:9px}</style></head><body><main class="wrap"><div class="eyebrow">SUA RENDA NO DIGITAL</div><h1>Seu ponto de partida.</h1><p>Conteúdo prático para começar a entender caminhos de venda pela internet sem ficar perdido com tanta informação.</p><div class="card"><h2>O que você vai encontrar</h2><a class="item" href="/app/modulo/1"><span class="num">01</span><br>Vendendo produtos</a><a class="item" href="/app/modulo/2"><span class="num">02</span><br>Prestando serviços</a><a class="item" href="/app/modulo/3"><span class="num">03</span><br>Encontrando clientes</a><a class="item" href="/app/modulo/4"><span class="num">04</span><br>Indicações &amp; parcerias</a><a class="item" href="/app/modulo/5"><span class="num">05</span><br>Vendendo pelo WhatsApp</a><a class="item" href="/app/modulo/6"><span class="num">06</span><br>Criando sua oferta</a><a class="item" href="/app/modulo/7"><span class="num">07</span><br>Primeiro teste</a></div><form method="post" action="/logout"><button>SAIR</button></form></main></body></html>`
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
      if (!Number.isInteger(id) || id < 1 || id > MODULES.length) {
        return new Response("Not found", { status: 404 });
      }

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

function modulePage(module) {
  const sections = module.sections.map(([title, text]) => `
    <section class="section">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(text)}</p>
    </section>
  `).join("");

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(module.title)} — Sua Renda no Digital</title><style>
  body{margin:0;background:#f5f1e8;color:#111;font-family:Arial,sans-serif}.wrap{max-width:720px;margin:0 auto;padding:40px 20px}.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em}h1{font-size:38px;line-height:1.05;margin:12px 0}p{line-height:1.65;color:#444}.card{background:#f9f7f2;border:1px solid #cfc9bd;border-radius:18px;padding:22px;margin:18px 0}.section{padding:18px 0;border-top:1px solid #111}.section:first-child{border-top:0}.section h2{font-size:19px;margin:0 0 8px}.back{display:inline-block;margin-bottom:18px;color:#111;font-weight:700;text-decoration:none}.nav{display:flex;justify-content:space-between;gap:12px;margin-top:22px}.nav a{color:#111;font-weight:700;text-decoration:none;border:1px solid #111;border-radius:9px;padding:11px 14px;background:#f9f7f2}.nav a:last-child{margin-left:auto}form{margin-top:24px}button{padding:12px 18px;border:1px solid #111;background:#111;color:#fff;border-radius:9px}</style></head><body><main class="wrap"><div class="eyebrow">SUA RENDA NO DIGITAL</div><a class="back" href="/app">← Voltar para os módulos</a><h1>${escapeHtml(module.title)}</h1><p>${escapeHtml(module.intro)}</p><div class="card">${sections}</div><div class="nav">${module.id > 1 ? `<a href="/app/modulo/${module.id - 1}">← Anterior</a>` : `<span></span>`}${module.id < MODULES.length ? `<a href="/app/modulo/${module.id + 1}">Próximo →</a>` : `<a href="/app">Concluir</a>`}</div><form method="post" action="/logout"><button>SAIR</button></form></main></body></html>`;
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
    return html("<!doctype html><meta charset='utf-8'><body style='font-family:Arial;padding:40px;background:#f5f1e8'><h2>Verifique seu e-mail</h2><p>Se houver uma compra aprovada vinculada a esse endereço, você receberÃ¡ um código.</p><a href='/login'>Voltar</a></body>");
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
      text: `Seu código de acesso Ã©: ${code}\n\nEle expira em ${OTP_MINUTES} minutos.`
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
  return [...bytes].map(b => b.toString(16).pad
