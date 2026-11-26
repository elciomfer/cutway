import { Hono } from "hono";

export function createApp(links: Map<string, string>) {
  const app = new Hono();

  app.get("/api/health", (c) => c.json({ status: "ok" }));

  // O proxy reescreve /<slug> para /redirect/<slug> (formato já validado lá).
  app.get("/redirect/:slug", (c) => {
    const target = links.get(c.req.param("slug"));
    return target ? c.redirect(target, 302) : c.notFound();
  });

  return app;
}
