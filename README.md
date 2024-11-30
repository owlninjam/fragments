# Fragments - Multi-Provider AI Chatbot Platform

A modern, extensible AI chatbot platform that integrates multiple language models and speech technologies.

## Features

- 🤖 Multiple AI Model Providers
  - OpenRouter
  - SambaNova
  - Cerebras
  - Groq
  - Hyperbolic
  - glhf Chat
- 🎙️ Voice Interaction
  - Speech-to-Text (Deepgram)
  - Text-to-Speech (WellSaid Labs)
- 🎨 Modern UI/UX
  - Dark/Light Theme
  - Glass Morphism Design
  - Responsive Layout
- ⚡ Built with Modern Tech
  - Next.js 14
  - TypeScript
  - Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/owlninjam/fragments.git
cd fragments
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file with your API keys
```env
OPENROUTER_API_KEY=your_key_here
SAMBANOVA_API_KEY=your_key_here
CEREBRAS_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
HYPERBOTIC_API_KEY=your_key_here
GLHF_API_KEY=your_key_here
DEEPGRAM_API_KEY=your_key_here
WELLSAID_API_KEY=your_key_here
```

4. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3333` to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

- `OPENROUTER_API_KEY`: API key for OpenRouter
- `SAMBANOVA_API_KEY`: API key for SambaNova
- `CEREBRAS_API_KEY`: API key for Cerebras
- `GROQ_API_KEY`: API key for Groq
- `HYPERBOTIC_API_KEY`: API key for Hyperbotic
- `GLHF_API_KEY`: API key for GLHF Chat
- `DEEPGRAM_API_KEY`: API key for Deepgram STT
- `WELLSAID_API_KEY`: API key for WellSaid Labs TTS

## Project Structure

```
fragments/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── chat/
│   │   │   └── chat-interface.tsx
│   │   ├── ui/
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   └── separator.tsx
│   │   └── theme-provider.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── .env.local
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
