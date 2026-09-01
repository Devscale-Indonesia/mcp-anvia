import { serve } from "@hono/node-server";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { Hono } from "hono";
import { createMcpServer } from "./server.js";

const port = Number(process.env.PORT || 3000)

const handler = createMcpHandler(() => createMcpServer())

const app = new Hono()

app.all("/mcp", (c) => handler.fetch(c.req.raw))

const httpServer = serve({ fetch: app.fetch, port }, (info) => {
  console.log(`MCP HTTP server listening on http://localhost:${info.port}/mcp`)
})

process.on("SIGINT", async () => {
  await handler.close()
  httpServer.close()
  process.exit(0)
})
