// App.jsx
import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    // Add user message
    const userMsg = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      // ✅ Send full chat history
      const res = await axios.post("http://127.0.0.1:8000/ask", {
        messages: [...messages, userMsg],
      });

      const aiMsg = { role: "ai", text: res.data.answer || "⚠️ No response." };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg = { role: "ai", text: "⚠️ Error: Could not fetch answer." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setQuery("");
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">✨ Theory Explorer AI ✨</h1>

      {/* Chat Window */}
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <p className="loading">⏳ Thinking...</p>}
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about any theory..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Ask</button>
      </div>
    </div>
  );
}

export default App;
