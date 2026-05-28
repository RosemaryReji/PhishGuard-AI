"use client";

import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";

export function Chatbot() {
  const { getToken } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am PhishGuard AI. How can I help you stay safe online today?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userText = input;
    setInput("");
    
    // Add user message
    const newMsg = { id: Date.now(), text: userText, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);
    setIsLoading(true);
    
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userText,
          history: messages.map(m => ({ role: m.sender === 'ai' ? 'assistant' : 'user', content: m.text }))
        })
      });

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: data.response, sender: "ai" }
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Sorry, I am having trouble connecting to the network.", sender: "ai" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto glass rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      {/* Header */}
      <div className="bg-background/80 p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-white">PhishGuard Assistant</h3>
          <p className="text-xs text-primary">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-accent/20" : "bg-primary/20"}`}>
              {msg.sender === "user" ? <User className="w-4 h-4 text-accent" /> : <Bot className="w-4 h-4 text-primary" />}
            </div>
            <div className={`p-3 rounded-2xl ${msg.sender === "user" ? "bg-accent text-white rounded-tr-sm" : "bg-white/10 text-white rounded-tl-sm"}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] self-start">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/20">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="p-3 rounded-2xl bg-white/10 text-white rounded-tl-sm flex items-center">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background/50 border-t border-white/10 flex gap-2">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about cybersecurity..." 
          className="bg-black/20 border-white/10 focus-visible:ring-primary text-white"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading} size="icon" className="bg-primary hover:bg-primary/80 text-background shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
