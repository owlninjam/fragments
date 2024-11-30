const requiredEnvVars = [
  'OPENROUTER_API_KEY',
  'SAMBANOVA_API_KEY',
  'CEREBRAS_API_KEY',
  'GROQ_API_KEY',
  'HYPERBOTIC_API_KEY',
  'GLHF_API_KEY',
  'DEEPGRAM_API_KEY',
  'WELLSAID_API_KEY',
] as const;

export function validateConfig() {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }
}

export function getConfig<T extends typeof requiredEnvVars[number]>(
  key: T
): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
