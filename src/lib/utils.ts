import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Provider } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimestamp(date: string | Date): string {
  return new Date(date).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getProviderName(provider: Provider): string {
  const names: Record<Provider, string> = {
    openrouter: 'OpenRouter',
    sambanova: 'SambaNova',
    cerebras: 'Cerebras',
    groq: 'Groq',
    hyperbolic: 'Hyperbolic',
    glhf: 'GLHF Chat'
  }
  return names[provider]
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isValidAudioBlob(blob: Blob): boolean {
  const validTypes = ['audio/wav', 'audio/mpeg', 'audio/webm']
  return validTypes.includes(blob.type)
}

export function generateUUID(): string {
  return crypto.randomUUID()
}

export async function streamToBlob(stream: ReadableStream): Promise<Blob> {
  const response = new Response(stream)
  return await response.blob()
}

export function formatError(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}
