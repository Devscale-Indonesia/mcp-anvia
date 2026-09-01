import { McpServer } from "@modelcontextprotocol/server";
import { Exa } from "exa-js";
import "dotenv/config";
import z from "zod";

const exa = new Exa(process.env.EXA_API_KEY || "");

export function createMcpServer() {
  const server = new McpServer(
    { name: "anvia-v1-mcp", version: "1.0.0" },
    { capabilities: { tools: {} } }
  )

  server.registerTool(
    "search_web",
    {
      title: "Search the web",
      description: "Search the web for information using Exa",
      inputSchema: z.object({
        query: z.string()
      }),
    },
    async ({ query }) => {
      const results = await exa.search(query)
      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      }
    }
  )

  return server
}
