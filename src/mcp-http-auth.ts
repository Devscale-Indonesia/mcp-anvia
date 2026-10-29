import { serve } from "@hono/node-server";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import "dotenv/config";
import { createMcpServer } from "./server.js";

const port = Number(process.env.PORT || 3000)
const token = process.env.MCP_AUTH_TOKEN

if (!token) {
  console.error("MCP_AUTH_TOKEN is required to start the authenticated MCP HTTP server")
  process.exit(1)
}

const handler = createMcpHandler(() => createMcpServer())

const app = new Hono()

app.use("/mcp", bearerAuth({ token }))
app.all("/mcp", (c) => handler.fetch(c.req.raw))

const httpServer = serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Authenticated MCP HTTP server listening on http://localhost:${info.port}/mcp`)
})

process.on("SIGINT", async () => {
  await handler.close()
  httpServer.close()
  process.exit(0)
})
