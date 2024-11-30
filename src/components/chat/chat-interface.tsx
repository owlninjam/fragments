'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/error-boundary';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX,
  Settings,
  MessageSquare,
  Image as ImageIcon,
  Paperclip,
  MoreVertical,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, Provider, VoiceState } from '@/types';
import { sendChatMessage, transcribeAudio, synthesizeSpeech } from '@/lib/api-client';
import { cn, formatTimestamp, formatError, isValidAudioBlob } from '@/lib/utils';

interface ChatInterfaceProps {
  initialProvider?: Provider;
}

export function ChatInterface({ initialProvider = 'openrouter' }: ChatInterfaceProps) {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<Provider>(initialProvider);
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isRecording: false,
    isTTSEnabled: false,
    isProcessing: false
  });

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      const userMessage: Message = {
        role: 'user',
        content: text,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      const response = await sendChatMessage({
        message: text,
        provider
      });

      setMessages(prev => [...prev, response]);

      if (voiceState.isTTSEnabled) {
        try {
          setVoiceState(prev => ({ ...prev, isProcessing: true }));
          const audioBuffer = await synthesizeSpeech(response.content);
          const audioContext = new AudioContext();
          const audioSource = audioContext.createBufferSource();
          audioSource.buffer = await audioContext.decodeAudioData(audioBuffer);
          audioSource.connect(audioContext.destination);
          audioSource.start();
        } catch (error) {
          console.error('TTS Error:', error);
        } finally {
          setVoiceState(prev => ({ ...prev, isProcessing: false }));
        }
      }
    } catch (error) {
      setError(formatError(error));
      console.error('Send Message Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        if (isValidAudioBlob(audioBlob)) {
          try {
            setVoiceState(prev => ({ ...prev, isProcessing: true }));
            const transcription = await transcribeAudio(audioBlob);
            if (transcription) {
              setInputMessage(transcription);
              await handleSendMessage(transcription);
            }
          } catch (error) {
            setError(formatError(error));
            console.error('Transcription Error:', error);
          } finally {
            setVoiceState(prev => ({ ...prev, isProcessing: false }));
          }
        }
      };

      mediaRecorder.start();
      setVoiceState(prev => ({ ...prev, isRecording: true }));
    } catch (error) {
      setError(formatError(error));
      console.error('Recording Error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && voiceState.isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setVoiceState(prev => ({ ...prev, isRecording: false }));
    }
  };

  const toggleTTS = () => {
    setVoiceState(prev => ({ ...prev, isTTSEnabled: !prev.isTTSEnabled }));
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen flex-col bg-background p-4">
        {/* Chat Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  'flex items-start gap-3 rounded-lg p-4',
                  message.role === 'user' ? 'bg-primary/10' : 'bg-muted/50'
                )}
              >
                <Avatar>
                  <AvatarImage
                    src={message.role === 'user' ? '/user-avatar.png' : '/ai-avatar.png'}
                    alt={message.role}
                  />
                  <AvatarFallback>
                    {message.role === 'user' ? 'U' : 'AI'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-destructive hover:text-destructive/80"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="mt-4">
          <Separator className="my-4" />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={voiceState.isRecording ? stopRecording : startRecording}
              disabled={isLoading || voiceState.isProcessing}
            >
              {voiceState.isRecording ? (
                <MicOff className="h-5 w-5 text-destructive" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTTS}
              disabled={isLoading}
            >
              {voiceState.isTTSEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-lg bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading || voiceState.isProcessing}
            />
            <Button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isLoading || voiceState.isProcessing}
            >
              {isLoading || voiceState.isProcessing ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
