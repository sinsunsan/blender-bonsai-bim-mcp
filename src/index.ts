import { McpServer } from "@modelcontextprotocol/sdk";
import { StdioServerTransport } from "@modelcontextprotocol/sdk";
import { z } from "zod";
import net from "net";

// Create server instance
const server = new McpServer({
  name: "blender-bonsai-bim-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {
      createBimElement: {
        description: "Create a BIM element from a natural language prompt",
        parameters: z.object({
          prompt: z
            .string()
            .describe(
              "Natural language description of the desired BIM element"
            ),
        }),
        handler: async ({ prompt }: { prompt: string }) => {
          try {
            // Connect to Blender socket server
            const client = new net.Socket();
            await new Promise<void>((resolve, reject) => {
              client.connect(9876, "localhost", () => {
                resolve();
              });
              client.on("error", reject);
            });

            // Send command to Blender
            const command = {
              type: "create_bim_element",
              prompt: prompt,
            };

            const response = await new Promise<string>((resolve, reject) => {
              let data = "";
              client.on("data", (chunk) => {
                data += chunk.toString();
              });
              client.on("end", () => {
                resolve(data);
              });
              client.on("error", reject);
              client.write(JSON.stringify(command));
            });

            client.destroy();
            return response;
          } catch (error) {
            return `Error creating BIM element: ${error}`;
          }
        },
      },
      createFloorPlan: {
        description: "Create a floor plan from a natural language prompt",
        parameters: z.object({
          prompt: z
            .string()
            .describe("Natural language description of the desired floor plan"),
        }),
        handler: async ({ prompt }: { prompt: string }) => {
          try {
            // Connect to Blender socket server
            const client = new net.Socket();
            await new Promise<void>((resolve, reject) => {
              client.connect(9876, "localhost", () => {
                resolve();
              });
              client.on("error", reject);
            });

            // Send command to Blender
            const command = {
              type: "create_floor_plan",
              prompt: prompt,
            };

            const response = await new Promise<string>((resolve, reject) => {
              let data = "";
              client.on("data", (chunk) => {
                data += chunk.toString();
              });
              client.on("end", () => {
                resolve(data);
              });
              client.on("error", reject);
              client.write(JSON.stringify(command));
            });

            client.destroy();
            return response;
          } catch (error) {
            return `Error creating floor plan: ${error}`;
          }
        },
      },
      setBimProperties: {
        description: "Set properties for a BIM element",
        parameters: z.object({
          elementName: z.string().describe("Name of the element to modify"),
          properties: z
            .record(z.any())
            .describe("Dictionary of properties to set"),
        }),
        handler: async ({
          elementName,
          properties,
        }: {
          elementName: string;
          properties: Record<string, any>;
        }) => {
          try {
            // Connect to Blender socket server
            const client = new net.Socket();
            await new Promise<void>((resolve, reject) => {
              client.connect(9876, "localhost", () => {
                resolve();
              });
              client.on("error", reject);
            });

            // Send command to Blender
            const command = {
              type: "set_bim_properties",
              elementName: elementName,
              properties: properties,
            };

            const response = await new Promise<string>((resolve, reject) => {
              let data = "";
              client.on("data", (chunk) => {
                data += chunk.toString();
              });
              client.on("end", () => {
                resolve(data);
              });
              client.on("error", reject);
              client.write(JSON.stringify(command));
            });

            client.destroy();
            return response;
          } catch (error) {
            return `Error setting BIM properties: ${error}`;
          }
        },
      },
    },
  },
});

// Create and connect the transport
const transport = new StdioServerTransport();
server.connect(transport);
