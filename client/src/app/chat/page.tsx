'use client'

import React, { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Loader2, Send, User } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

interface ChatSession {
  success: boolean;
  status: number;
  message: string;
  sessionId: string;
}

interface ChatResponse {
  success: boolean;
  status: number;
  message: string;
  response: string;
}

const AiCareerChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: "Hello! I'm your AI career assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Initialize chat session
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // const response = await fetch(process.env.NEXT_PUBLIC_API_URL +'/chat/chatSession', {
        //   method: 'POST',
        //   headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token"),
        //     'Content-Type': 'application/json',
        //   },
        // });

        // if (!response.ok) {
        //   throw new Error('Failed to initialize chat session');
        // }

        // const data: ChatSession = await response.json();
        // if (data.success) {
        //   setSessionId(data.sessionId);
        // } else {
        //   throw new Error(data.message);
        // }

        if (typeof window !== 'undefined') {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/chat/chatSession', {
              method: 'POST',
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json',
              },
            });
  
            if (!response.ok) {
              throw new Error('Failed to initialize chat session');
            }
  
            const data: ChatSession = await response.json();
            if (data.success) {
              setSessionId(data.sessionId);
            } else {
              throw new Error(data.message);
            }
          }
      } catch (err) {
        setError('Failed to initialize chat. Please try again later.');
        console.error('Session initialization error:', err);
      }
    };

    initializeSession();
  }, []);

  const formatMessage = (content: string) => {
    // Replace **text** with <strong>text</strong>
    return content.replace(/\*\*(.*?)\*\*/g, '<strong><span className="text-emerald-500">$1</span></strong>');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !sessionId) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user'
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://brainwaveapi.techpi.me/chat/chatQuery', {
        method: 'POST',
        headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          query: inputMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data: ChatResponse = await response.json();
      
      if (data.success) {
        const formattedContent = formatMessage(data.response);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: formattedContent,
          sender: 'ai'
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('Chat query error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-20">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">AI Career Assistant</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <ScrollArea className="h-[60vh] pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8 mr-2">
                      {message.sender === 'user' ? (
                        <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <AvatarImage src="/ai-avatar.png" alt="AI" />
                      )}
                      <AvatarFallback>{message.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 max-w-md ${
                        message.sender === 'user'
                          ? 'bg-emerald-600 text-white ml-2'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 mr-2'
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: message.content }} />
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="mt-4 flex items-center">
              <Input
                type="text"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow mr-2"
                disabled={!sessionId || isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !inputMessage.trim() || !sessionId}
                className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default AiCareerChat

