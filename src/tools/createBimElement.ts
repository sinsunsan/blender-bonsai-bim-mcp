import { z } from "zod";
import net from "net";

export const createBimElement = {
  description: "Create a BIM element from a natural language prompt",
  parameters: z.object({
    prompt: z
      .string()
      .describe("Natural language description of the desired BIM element"),
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
};
