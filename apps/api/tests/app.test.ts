import { describe, expect, test } from "bun:test";
import { createApp } from "../src/app";

const app = createApp(new Map([["abc123", "https://example.com/page"]]));

describe("GET /api/health", () => {
  test("responde ok", async () => {
    const res = await app.request("/api/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok" });
  });
});

describe("GET /redirect/:slug", () => {
  test("redireciona slug existente", async () => {
    const res = await app.request("/redirect/abc123");
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://example.com/page");
  });

  test("retorna 404 para slug inexistente", async () => {
    const res = await app.request("/redirect/nope");
    expect(res.status).toBe(404);
  });

  test("diferencia maiúsculas e minúsculas", async () => {
    const res = await app.request("/redirect/ABC123");
    expect(res.status).toBe(404);
  });
});

describe("rotas desconhecidas", () => {
  test("retornam 404", async () => {
    expect((await app.request("/api/nope")).status).toBe(404);
    expect((await app.request("/abc123")).status).toBe(404);
  });

  test("redirect só aceita GET", async () => {
    const res = await app.request("/redirect/abc123", { method: "POST" });
    expect(res.status).toBe(404);
  });
});
