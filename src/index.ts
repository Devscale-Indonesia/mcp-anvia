import { Agent } from "@anvia/core";
import { McpClient, McpClientGroup } from "@anvia/mcp";
import { getOpenAIModel } from "./models.js";

const mcp = await McpClientGroup.connect({
  clients: [
    new McpClient({
      name: "anvia-v1-mcp",
      transport: {
        type: "stdio",
        command: "./node_modules/.bin/tsx",
        args: ["src/mcp-stdio.ts"],
      },
    }),
  ],
})

const agent = new Agent({
  id: "anvia-v1-mcp",
  model: getOpenAIModel(),
  instructions: "You are an AI assistant that helps users with various tasks",
  mcpServers: mcp.servers,
})

try {
  const response = await agent.generate({
    prompt: "Search the web for the latest MCP protocol revision and tell me the version identifier."
  })

  console.log(response.text)
  console.log(response.usage)
  console.log(response.contextUsage)
} finally {
  await mcp.close()
}
