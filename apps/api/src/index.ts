import { createApp } from "./app";

// Temporário, em memória, até existir persistência.
const links = new Map([["example", "https://google.com"]]);

const server = Bun.serve({
  fetch: createApp(links).fetch,
  // Porta fixa: o proxy aponta para api:8000. "::" cobre IPv4 e IPv6 (rede privada do Railway).
  port: 8000,
  hostname: "::",
});

// Encerra rápido nos redeploys em vez de esperar o timeout do container.
process.on("SIGTERM", () => server.stop().then(() => process.exit(0)));

console.log(`api listening on :${server.port}`);
