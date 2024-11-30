import { ChatRequest, ChatResponse, ErrorResponse } from '@/types';

class APIError extends Error {
  constructor(public response: ErrorResponse) {
    super(response.error);
    this.name = 'APIError';
  }
}

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(data as ErrorResponse);
    }

    return data as ChatResponse;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError({
      error: 'Failed to send message',
      details: error,
    });
  }
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(data as ErrorResponse);
    }

    return data.text;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError({
      error: 'Failed to transcribe audio',
      details: error,
    });
  }
}

export async function synthesizeSpeech(text: string): Promise<ArrayBuffer> {
  try {
    const response = await fetch('/api/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error as ErrorResponse);
    }

    return await response.arrayBuffer();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError({
      error: 'Failed to synthesize speech',
      details: error,
    });
  }
}
