import { McpServer } from "@modelcontextprotocol/sdk";
import { StdioServerTransport } from "@modelcontextprotocol/sdk";

import { createBimElement, createFloorPlan, setBimProperties } from "./tools";

// Create server instance
const server = new McpServer({
  name: "blender-bonsai-bim-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {
      createBimElement,
      createFloorPlan,
      setBimProperties,
    },
  },
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
