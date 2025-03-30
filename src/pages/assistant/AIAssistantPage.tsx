
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Send, Trash, Bot } from "lucide-react";
import { queryGemini } from "@/services/geminiService";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIAssistantPage() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI career assistant. How can I help you today? You can ask me about resume writing, interview tips, career advice, or any job-related questions.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if no user
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);
    
    try {
      // Prepare context for the AI
      const recentMessages = messages
        .slice(-4)
        .map((msg) => `${msg.isUser ? "User" : "Assistant"}: ${msg.content}`)
        .join("\n\n");
      
      const prompt = `
        You are a helpful career assistant. Your job is to provide guidance on career development, 
        job applications, resume writing, interview preparation, and professional growth.
        Keep your answers focused on professional and career topics.
        
        Recent conversation:
        ${recentMessages}
        
        User's latest question: ${newMessage.trim()}
        
        Provide a helpful, concise, and professional response:
      `;
      
      const response = await queryGemini(prompt);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.text,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error querying AI:", error);
      toast.error("Failed to get a response. Please try again.");
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearConversation = () => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm your AI career assistant. How can I help you today? You can ask me about resume writing, interview tips, career advice, or any job-related questions.",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    toast.success("Conversation cleared");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Career Assistant</h1>
          <p className="text-muted-foreground">
            Get personalized career advice, resume tips, and interview preparation
          </p>
        </div>
        
        <Card className="h-[75vh] flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <CardTitle>Career Assistant</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={clearConversation}>
                <Trash className="h-4 w-4 mr-2" />
                Clear Chat
              </Button>
            </div>
            <CardDescription>
              Powered by Gemini AI
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto pb-0">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={`text-xs mt-1 ${
                        message.isUser ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !newMessage.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
