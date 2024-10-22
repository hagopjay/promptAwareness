'use client';

import { useState } from 'react';
//import { Button } from "@/components/ui/button"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Settings,
  Youtube,
} from 'lucide-react';

export default function WebChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today? 😊' },
    {
      role: 'user',
      content: 'Hi there! Can you tell me about the weather? 🌤️',
    },
    {
      role: 'assistant',
      content:
        "Of course! To provide accurate weather information, I'll need to know your location. Could you please tell me which city you're interested in? 🌍",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isYoutubeOpen, setIsYoutubeOpen] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { role: 'user', content: inputMessage }]);
      setInputMessage('');
      // Here you would typically call your LLM API to get a response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "I'm processing your request. Give me a moment... 🤔",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Chat Settings</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="dark-mode" className="text-sm font-medium">
                Dark Mode
              </label>
              <Switch id="dark-mode" />
            </div>
            <div className="space-y-2">
              <label htmlFor="temperature" className="text-sm font-medium">
                Temperature
              </label>
              <Slider
                id="temperature"
                max={1}
                step={0.1}
                defaultValue={[0.7]}
                className="w-full"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Settings className="h-6 w-6" />
              <span className="sr-only">Open settings</span>
            </Button>
          </SheetTrigger>
          <h1 className="text-xl font-bold">WebChat UI</h1>
          <div className="w-6" /> {/* Spacer for alignment */}
        </header>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[70%] ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <footer className="bg-white shadow-sm p-4">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-4 right-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={() => setIsYoutubeOpen(!isYoutubeOpen)}
            >
              <Youtube className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[300px]">
            <SheetHeader>
              <SheetTitle>YouTube Video</SheetTitle>
            </SheetHeader>
            <div className="mt-4 h-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
