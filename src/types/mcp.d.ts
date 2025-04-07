declare module "@modelcontextprotocol/sdk" {
  export class McpServer {
    constructor(config: {
      name: string;
      version: string;
      capabilities: {
        resources: Record<string, any>;
        tools: Record<
          string,
          {
            description: string;
            parameters: any;
            handler: (params: any) => Promise<any>;
          }
        >;
      };
    });
    connect(transport: StdioServerTransport): void;
  }

  export class StdioServerTransport {
    constructor();
  }
}
