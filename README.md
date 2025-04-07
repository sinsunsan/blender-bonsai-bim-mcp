# Blender Bonsai BIM MCP

A Node.js implementation of the Model Context Protocol (MCP) server for Blender Bonsai BIM integration. This server allows Claude AI to interact with Blender for creating and manipulating BIM elements and floor plans.

## Prerequisites

- Node.js 18 or newer
- Blender 3.0 or newer
- BlenderBIM Addon installed and enabled
- Claude for Desktop

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Configuration

1. Make sure the Blender Bonsai BIM addon is running and listening on port 9876
2. Configure Claude for Desktop to use this MCP server by adding the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "blender-bonsai-bim": {
      "command": "node",
      "args": ["build/index.js"]
    }
  }
}
```

## Features

- Create BIM elements from natural language prompts
- Generate floor plans from natural language descriptions
- Set and modify properties for BIM elements
- Socket-based communication with Blender

## Usage

Once configured, you can use Claude to interact with Blender through natural language commands like:

- "Create a wall 5 meters long and 3 meters high"
- "Generate a floor plan with a living room and two bedrooms"
- "Set the material of the wall to concrete"

## Development

The project is written in TypeScript and uses:

- `@modelcontextprotocol/sdk` for MCP server implementation
- `zod` for runtime type validation
- Node.js `net` module for socket communication with Blender

## License

MIT
