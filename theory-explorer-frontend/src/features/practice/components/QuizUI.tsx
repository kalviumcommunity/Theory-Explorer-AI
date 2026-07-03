import { useState } from 'react';

export function QuizUI({ quiz, onSubmit }: { quiz: any[], onSubmit: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz || quiz.length === 0) return <div>No quiz available.</div>;

  const currentQ = quiz[currentIdx];

  const handleNext = () => {
    if (selectedOpt === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    if (currentIdx < quiz.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      setFinished(true);
      onSubmit(score + (selectedOpt === currentQ.correctAnswer ? 1 : 0));
    }
  };

  if (finished) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
        <p className="text-lg">You scored {score} out of {quiz.length}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-500">Question {currentIdx + 1} of {quiz.length}</span>
        <span className="text-sm font-medium text-primary-600">Score: {score}</span>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-6">{currentQ.question}</h3>
      
      <div className="space-y-3">
        {currentQ.options.map((opt: string, i: number) => (
          <div 
            key={i}
            onClick={() => setSelectedOpt(opt)}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedOpt === opt ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            {opt}
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleNext}
          disabled={!selectedOpt}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50"
        >
          {currentIdx === quiz.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
