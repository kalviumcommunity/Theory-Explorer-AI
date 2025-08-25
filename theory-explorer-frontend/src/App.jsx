// App.jsx
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await axios.post("http://localhost:5000/ask", { query });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("⚠️ Error: Could not fetch answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Theory Explorer AI 🌌</h1>
      <div className="input-section">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a concept (e.g., String Theory)"
        />
        <button onClick={handleSearch}>Ask</button>
      </div>

      {loading && <p>⏳ Thinking...</p>}

      {answer && (
        <div
          className="answer-box"
          dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, "<br/>") }}
        />
      )}
    </div>
  );
}

export default App;
