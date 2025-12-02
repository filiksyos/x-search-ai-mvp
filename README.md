# X Search AI - MVP

🔍 AI-powered X/Twitter search application using Vercel AI SDK with Grok model and real-time streaming responses.

## Features

✅ **Twitter/X Search with AI** - Search for tweets using natural language
✅ **Real-time Streaming Responses** - Get instant results with streaming AI responses
✅ **Modern Chat UI** - Beautiful, responsive chat interface
✅ **AI Tool System** - Extensible tool calling with Grok model

## Tech Stack

- **Next.js 14.2.5** - React framework with App Router
- **Vercel AI SDK 3.3.4** - AI streaming and tool calling
- **@ai-sdk/xai 0.0.14** - X AI (Grok) integration
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zod** - Schema validation for tools

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/filiksyos/x-search-ai-mvp.git
cd x-search-ai-mvp
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your xAI API key:

```
XAI_API_KEY=your_xai_api_key_here
```

**Get your xAI API key:**
1. Go to https://console.x.ai/
2. Sign up or log in
3. Generate an API key

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **User Input** - Enter a search query in natural language
2. **AI Processing** - Grok model processes the query and decides which tools to use
3. **Tool Execution** - The `searchTwitter` tool executes the search
4. **Streaming Response** - Results stream back in real-time to the UI
5. **Display** - Results are beautifully displayed in a chat interface

## Available Tools

### `searchTwitter`
Searches for tweets based on a query.

**Parameters:**
- `query` (string) - The search query
- `maxResults` (number, optional) - Maximum results to return (default: 10)

### `analyzeTrends`
Analyzes trending topics and patterns.

**Parameters:**
- `topic` (string) - The topic to analyze

## Project Structure

```
x-search-ai-mvp/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat API endpoint with tool calling
│   ├── components/
│   │   └── SearchInterface.tsx   # Main chat UI component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── .env.example                  # Environment variables template
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

## Current Implementation

⚠️ **Note:** This MVP uses **simulated Twitter data** for demonstration. The tool system is fully functional with Grok, but returns mock tweet data.

### To Add Real Twitter Integration:

1. Get Twitter API credentials from https://developer.twitter.com/
2. Install Twitter API client:
   ```bash
   npm install twitter-api-v2
   ```
3. Update `app/api/chat/route.ts` to use real Twitter API calls
4. Add Twitter credentials to `.env`

## Customization

### Add More Tools

Edit `app/api/chat/route.ts` and add new tools to the `tools` object:

```typescript
yourNewTool: tool({
  description: 'What your tool does',
  parameters: z.object({
    param: z.string().describe('Parameter description'),
  }),
  execute: async ({ param }) => {
    // Your tool logic
    return { result: 'data' };
  },
})
```

### Styling

Modify `app/components/SearchInterface.tsx` and `app/globals.css` to customize the UI.

## Deploy

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/filiksyos/x-search-ai-mvp)

Don't forget to add your `XAI_API_KEY` environment variable in Vercel dashboard.

## License

MIT

## Credits

Based on [anysearch](https://github.com/filiksyos/anysearch) - Simplified MVP version

Built with [Vercel AI SDK](https://github.com/vercel/ai)
