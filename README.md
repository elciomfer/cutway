# Cutway

Encurtador de links servido sob um único domínio. Um proxy Caddy na borda roteia:

| Caminho   | Destino                         |
| --------- | ------------------------------- |
| `/web/*`  | `web` (prefixo `/web` removido) |
| `/api/*`  | `api`                           |
| `/<slug>` | `api` em `/redirect/<slug>`     |

```
apps/web     UI estática (Caddy, porta 3000)
apps/api     API Bun + Hono (porta 8000)
infra/proxy  Caddy de borda (porta $PORT, padrão 80)
```

## Rodar localmente

```bash
docker compose -f infra/compose.yml up --build
```

Acesse http://localhost:8080.

## Testes

```bash
cd apps/api && bun install && bun test
```

O CI (`.github/workflows/ci.yml`) roda os testes em todo PR e push para `main`.

## Deploy no Railway

Três serviços no mesmo projeto, todos a partir deste repositório:

| Serviço | Root Directory | Domínio público | Variáveis                                                                            |
| ------- | -------------- | --------------- | ------------------------------------------------------------------------------------ |
| `web`   | `apps/web`     | não             | —                                                                                    |
| `api`   | `apps/api`     | não             | —                                                                                    |
| `proxy` | `infra/proxy`  | sim             | `WEB_UPSTREAM=web.railway.internal:3000`<br>`API_UPSTREAM=api.railway.internal:8000` |

Os nomes `web` e `api` precisam ser exatamente esses, pois definem o host na rede privada.
