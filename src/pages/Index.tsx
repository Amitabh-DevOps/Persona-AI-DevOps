import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import ChatHeader from "@/components/ChatHeader";
import PersonaCard from "@/components/PersonaCard";
import MessageBubble from "@/components/MessageBubble";
import { personas, type Persona } from "@/data/personas";
import { generateAIResponse } from "@/utils/aiResponse";

const Index = () => {
  const [activePersonas, setActivePersonas] = useState<Persona[]>([]);
  const [messages, setMessages] = useState<{
    id: string;
    content: string;
    sender: string;
    timestamp: Date;
  }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSelectionView, setIsSelectionView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (content: string, sender: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content,
        sender,
        timestamp: new Date(),
      },
    ]);
  };

  const handlePersonaSelect = (persona: Persona) => {
    setActivePersonas(current => 
      current.find(p => p.id === persona.id)
        ? current.filter(p => p.id !== persona.id)
        : [...current, persona]
    );
  };

  const handleGroupSelect = () => {
    setActivePersonas(personas);
  };

  const handleStartChat = async () => {
    if (activePersonas.length === 0) return;
    
    setIsSelectionView(false);
    setIsLoading(true);
    
    try {
      if (activePersonas.length === 1) {
        const response = await generateAIResponse("Say hello and introduce yourself briefly", [activePersonas[0]]);
        addMessage(response as string, activePersonas[0].id);
      } else {
        // For group chat with randomized responses
        const responses = await generateAIResponse(
          "Say hello and introduce yourself briefly", 
          activePersonas
        ) as Record<string, string>;
        
        // Randomize the order of personas
        const shuffledPersonaIds = Object.keys(responses).sort(() => Math.random() - 0.5);
        
        // Add first persona response immediately
        const firstPersonaId = shuffledPersonaIds[0];
        addMessage(responses[firstPersonaId], firstPersonaId);
        
        // Add remaining persona responses with staggered delays
        for (let i = 1; i < shuffledPersonaIds.length; i++) {
          const personaId = shuffledPersonaIds[i];
          const randomDelay = 1000 + Math.random() * 2000; // 1-3 second delay
          
          setTimeout(() => {
            addMessage(responses[personaId], personaId);
          }, randomDelay);
        }
      }
    } catch (error) {
      console.error("Error getting welcome message:", error);
      addMessage(`Hello! How can I help you today?`, activePersonas[0]?.id || "system");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    addMessage(inputMessage, "user");
    const sentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);
    
    try {
      const response = await generateAIResponse(sentMessage, activePersonas);
      
      if (typeof response === "string") {
        // Single persona response
        addMessage(response, activePersonas[0].id);
      } else {
        // Multiple responses with random order and delays
        const personaIds = Object.keys(response).sort(() => Math.random() - 0.5);
        
        // Show first response immediately
        const firstPersonaId = personaIds[0];
        addMessage(response[firstPersonaId], firstPersonaId);
        
        // Show other responses with delays
        for (let i = 1; i < personaIds.length; i++) {
          const personaId = personaIds[i];
          const randomDelay = 1200 + Math.random() * 2200; // 0.8-3 second delay
          
          setTimeout(() => {
            addMessage(response[personaId], personaId);
          }, randomDelay);
        }
      }
    } catch (error) {
      console.error("Error generating response:", error);
      addMessage("Sorry, I couldn't process that message.", "system");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-500">
      <ChatHeader 
        activePersonas={activePersonas} 
        isSelectionView={isSelectionView}
        onBackClick={() => {
          setIsSelectionView(true);
          setMessages([]);
          setActivePersonas([]);
        }}
      />
      
      <main className="flex-1 p-4 mt-10 overflow-hidden">
        {isSelectionView ? (
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              ☕ Chai With AI Buddies
            </h1>
            <p className="text-muted-foreground mb-8">
              Select who you'd like to chat with today
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {personas.map((persona) => (
                <PersonaCard
                  key={persona.id}
                  persona={persona}
                  isSelected={activePersonas.some(p => p.id === persona.id)}
                  onClick={() => handlePersonaSelect(persona)}
                />
              ))}
            </div>
            
            <p className="text-muted-foreground mb-4">
              Chat with both Hitesh and Piyush at the same time! <span onClick={handleGroupSelect} className="underline cursor-pointer text-orange-500">Select both</span>
            </p>
            <Button
              size="lg"
              className="bg-orange-500 mt-4 hover:bg-orange-600"
              disabled={activePersonas.length === 0}
              onClick={handleStartChat}
            >
              {activePersonas.length >= 2 ? "Start Group Chat" : `Start Chat with ${activePersonas[0]?.name || ''}`}
            </Button>
          </div>
        ) : (
          <div className="container max-w-4xl mx-auto h-full flex flex-col">
            <ScrollArea className="flex-1 p-4 mb-4 rounded-lg glass-card">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    personas={personas}
                  />
                ))}
                {isLoading && (
                  <div className="ai-message animate-pulse flex space-x-2 items-center">
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                className="bg-dark-100 border-dark-50"
              />
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;