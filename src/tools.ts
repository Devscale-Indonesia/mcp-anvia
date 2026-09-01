import { createTool } from "@anvia/core";
import { Exa } from "exa-js";
import z from "zod";

const exa = new Exa(process.env.EXA_API_KEY || "");

export const searchWeb = createTool({
  name: "Search the web",
  description: "Search the web for information",
  inputSchema: z.object({
    query: z.string()
  }),
  execute: async (args) => {
    return await exa.search(args.query);
  }
});
