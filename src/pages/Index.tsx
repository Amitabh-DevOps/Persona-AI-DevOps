import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Slider
} from "@/components/ui/slider";
import ChatHeader from "@/components/ChatHeader";
import PersonaCard from "@/components/PersonaCard";
import MessageBubble from "@/components/MessageBubble";
import { personas, type Persona } from "@/data/personas";
import { generateAIResponse } from "@/utils/aiResponse";

type PersonalityTone = "default" | "funny" | "advice" | "educational";

const Index = () => {
  const [activePersonas, setActivePersonas] = useState<Persona[]>([]);
  const [messages, setMessages] = useState<
    {
      id: string;
      content: string;
      sender: string;
      timestamp: Date;
    }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSelectionView, setIsSelectionView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [personalityTone, setPersonalityTone] = useState<PersonalityTone>("default");

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
    setActivePersonas((current) =>
      current.find((p) => p.id === persona.id)
        ? current.filter((p) => p.id !== persona.id)
        : [...current, persona]
    );
  };

  const handleGroupSelect = () => {
    setActivePersonas(personas);
  };

  // start chat section
  const handleStartChat = async () => {
    if (activePersonas.length === 0) return;

    setIsSelectionView(false);
    setIsLoading(true);

    try {
      if (activePersonas.length === 1) {
        const response = await generateAIResponse(
          "Say hello and introduce yourself briefly",
          [activePersonas[0]],
          temperature,
          personalityTone
        );
        addMessage(response as string, activePersonas[0].id);
      } else {
        const responses = (await generateAIResponse(
          "Say hello and introduce yourself briefly",
          activePersonas,
          temperature,
          personalityTone
        )) as Record<string, string>;

        const shuffledPersonaIds = Object.keys(responses).sort(
          () => Math.random() - 0.5
        );

        const firstPersonaId = shuffledPersonaIds[0];
        addMessage(responses[firstPersonaId], firstPersonaId);

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
      addMessage(
        `Hello! How can I help you today?`,
        activePersonas[0]?.id || "system"
      );
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
      const response = await generateAIResponse(
        sentMessage, 
        activePersonas,
        temperature,
        personalityTone
      );

      if (typeof response === "string") {
        // we directly get single string in the single persona case
        addMessage(response, activePersonas[0].id);
      } else {
        // we get an object of string for grp with key value eg. {"hitesh": "hello, I am Hitesh"}

        const personaIds = Object.keys(response).sort(
          () => Math.random() - 0.5
        );

        const firstPersonaId = personaIds[0];
        addMessage(response[firstPersonaId], firstPersonaId);

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
          <div className="md:max-w-[1500px] max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              ☕ <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Chai With AI Buddies</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Select who you'd like to chat with today
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {personas.map((persona) => (
                <PersonaCard
                  key={persona.id}
                  persona={persona}
                  isSelected={activePersonas.some((p) => p.id === persona.id)}
                  onClick={() => handlePersonaSelect(persona)}
                />
              ))}
            </div>

            <p className="text-muted-foreground mb-4">
              Chat with both Hitesh, Piyush and Mannu at the same time!{" "}
              <span
                onClick={handleGroupSelect}
                className="underline cursor-pointer text-orange-500"
              >
                Select All
              </span>
            </p>
            <Button
              size="lg"
              className="bg-orange-500 mt-4 hover:bg-orange-600"
              disabled={activePersonas.length === 0}
              onClick={handleStartChat}
            >
              {activePersonas.length >= 2
                ? "Start Group Chat"
                : `Start Chat with ${activePersonas[0]?.name || ""}`}
            </Button>
          </div>
        ) : (
          <div className="md:container max-w-4xl mx-auto h-full flex flex-col">
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
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
                className="bg-dark-100 border-dark-50"
              />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="bg-dark-100 border-dark-50 hover:bg-orange-500/20"
                  >
                    <Settings className="h-4 w-4 text-orange-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-dark-100 border-dark-50">
                  <div className="space-y-4">
                    <h3 className="font-medium text-orange-500">AI Settings</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Temperature: {temperature.toFixed(1)}</span>
                      </div>
                      <Slider
                        defaultValue={[temperature]}
                        max={1}
                        min={0}
                        step={0.1}
                        onValueChange={(value) => setTemperature(value[0])}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground">
                        Lower for consistent, higher for creative responses
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm">Personality Tone</span>
                      <div className="grid grid-cols-2 gap-2">
                        {(["default", "funny", "advice", "educational"] as const).map((tone) => (
                          <Button
                            key={tone}
                            variant={personalityTone === tone ? "default" : "outline"}
                            className={personalityTone === tone 
                              ? "bg-orange-500 hover:bg-orange-600" 
                              : "bg-dark-100 hover:bg-orange-500/20 border border-orange-600"
                            }
                            onClick={() => setPersonalityTone(tone)}
                          >
                            {tone.charAt(0).toUpperCase() + tone.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
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