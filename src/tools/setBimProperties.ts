import { z } from "zod";
import net from "net";

export const setBimProperties = {
  description: "Set properties for a BIM element",
  parameters: z.object({
    elementName: z.string().describe("Name of the element to modify"),
    properties: z.record(z.any()).describe("Dictionary of properties to set"),
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
};
