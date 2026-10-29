# anvia-v1-mcp

An MCP server exposing a `search_web` tool (powered by [Exa](https://exa.ai)), plus an [Anvia](https://www.npmjs.com/org/anvia) agent that consumes it.

## Setup

Requires Node.js and pnpm.

```sh
pnpm install
cp .env.example .env
```

Fill in `.env`:

| Variable          | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `OPENAI_API_KEY`  | API key for the agent's model                            |
| `OPENAI_BASE_URL` | OpenAI-compatible endpoint (default `https://api.openai.com/v1`) |
| `EXA_API_KEY`     | Exa API key used by `search_web`                         |
| `PORT`            | Port for the HTTP MCP server (default `3000`)            |

## Scripts

| Command               | What it does                                                        |
| --------------------- | ------------------------------------------------------------------- |
| `pnpm start:mcp`      | Run the MCP server over stdio                                       |
| `pnpm start:mcp:http` | Run the MCP server over HTTP at `http://localhost:3000/mcp`         |
| `pnpm start:agent`    | Run the agent, which spawns the stdio MCP server and calls its tool |
| `pnpm check`          | Type-check with `tsc --noEmit`                                      |

## Project layout

- `src/server.ts` – MCP server definition and the `search_web` tool
- `src/mcp-stdio.ts` / `src/mcp-http.ts` – stdio and HTTP transports
- `src/index.ts` – example agent using the MCP server
- `src/models.ts` – OpenAI model setup
- `src/tools.ts` – the same search tool as a native Anvia tool
