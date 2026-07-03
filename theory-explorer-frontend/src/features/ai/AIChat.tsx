import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles } from "lucide-react";
import { streamChat } from "@/lib/ai";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

export function AIChat() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string, citations?: any[]}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }, { role: 'ai', content: "" }]);
    setLoading(true);

    try {
      const metadata = await streamChat(userMsg, (chunk) => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content += chunk;
          return newMessages;
        });
      });
      
      if (metadata && metadata.citations) {
         setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].citations = metadata.citations;
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = "Failed to get response. Please try again.";
          return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="bg-primary-50 p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-700 font-semibold">
          <Sparkles className="h-5 w-5" /> AI Knowledge Assistant
        </div>
        <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full font-medium">Concept Atlas AI</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <Bot className="h-12 w-12 mx-auto text-primary-300 mb-4" />
            Ask me anything about the concepts you're learning! I'll search the knowledge base.
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-gray-50 border text-gray-800 rounded-tl-none'}`}>
              <div className={msg.role === 'ai' ? 'prose prose-sm prose-primary max-w-none' : ''}>
                {msg.role === 'ai' ? (
                  <ReactMarkdown>{msg.content || (loading && i === messages.length - 1 ? '...' : '')}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
              
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
                  <span className="font-semibold block mb-2 text-gray-600">Referenced Concepts:</span>
                  <div className="flex gap-2 flex-wrap">
                    {msg.citations.map((c: any) => (
                      <Link key={c.id} to={`/knowledge/${c.slug}`} className="bg-white px-3 py-1.5 rounded-lg border hover:border-primary-300 hover:text-primary-700 transition-colors shadow-sm font-medium">
                        {c.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Actions (AI Tutor) */}
      <div className="flex gap-2 p-4 border-t bg-gray-50 overflow-x-auto">
        <button 
          onClick={() => handleSend("Explain this simpler")}
          className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Explain Simpler
        </button>
        <button 
          onClick={() => handleSend("Go deeper into this topic")}
          className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Go Deeper
        </button>
        <button 
          onClick={() => handleSend("Give me a real-world example")}
          className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Give Example
        </button>
        <button 
          onClick={() => handleSend("Start Interview Mode for this topic")}
          className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Interview Mode
        </button>
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI anything..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-4 py-2 border"
            disabled={loading}
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
