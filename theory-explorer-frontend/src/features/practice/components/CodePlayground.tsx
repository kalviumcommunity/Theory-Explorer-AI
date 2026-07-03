import { useState } from 'react';

export function CodePlayground() {
  const [code, setCode] = useState(`function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}`);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = () => {
    setLoading(true);
    // Mock API call to /api/ai/code
    setTimeout(() => {
      setExplanation("This is a recursive function that calculates the Fibonacci sequence. It has exponential time complexity O(2^n).");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[600px]">
      <div className="w-full md:w-1/2 flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-gray-800">
        <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center text-gray-300 text-sm">
          <span>index.js</span>
          <button 
            className="px-3 py-1 bg-primary-600 hover:bg-primary-500 text-white rounded text-xs"
            onClick={handleExplain}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Explain Code (AI)'}
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-4 bg-transparent text-gray-100 font-mono text-sm resize-none focus:outline-none"
          spellCheck={false}
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col h-full bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <span>🤖</span> AI Code Tutor
        </h3>
        
        {explanation ? (
          <div className="prose prose-sm max-w-none text-gray-700">
            {explanation}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
            <p>Paste your code on the left and click "Explain Code"</p>
          </div>
        )}
      </div>
    </div>
  );
}
