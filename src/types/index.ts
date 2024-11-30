export type Provider = 
  | 'openrouter'
  | 'sambanova'
  | 'cerebras'
  | 'groq'
  | 'hyperbolic'
  | 'glhf';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export type ChatRequest = {
  message: string;
  provider?: Provider;
  conversationId?: string;
  parentMessageId?: string;
};

export type ChatResponse = {
  role: 'assistant';
  content: string;
  timestamp: string;
  provider?: Provider;
};

export type VoiceState = {
  isRecording: boolean;
  isTTSEnabled: boolean;
  isProcessing: boolean;
};

export type ErrorResponse = {
  error: string;
  code?: string;
  details?: unknown;
};
