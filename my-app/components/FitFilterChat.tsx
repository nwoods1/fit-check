"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface FitFilterChatProps {
  onFilter: (query: string) => void;
}

export function FitFilterChat({ onFilter }: FitFilterChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Tell me what you're looking for! Try: 'only black pants' or 'no hats'",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Apply filter
    onFilter(input);

    // Add response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Filtering fits based on: "${input}"`,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-sm">Narrow Down Fits</h3>
      </div>

      {/* Messages */}
      <div className="max-h-32 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`text-sm p-2 rounded-lg ${
              msg.isUser
                ? "bg-primary text-primary-foreground ml-8"
                : "bg-muted text-muted-foreground mr-8"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., 'only fits with black pants'"
          className="flex-1 bg-background/50"
        />
        <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
