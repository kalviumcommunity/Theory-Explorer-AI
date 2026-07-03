import { useState } from 'react';
import { FlashcardUI } from './components/FlashcardUI';
import { QuizUI } from './components/QuizUI';
import { CodePlayground } from './components/CodePlayground';

export function PracticePage() {
  const [activeTab, setActiveTab] = useState('flashcards');

  // Hardcoded mock data for now, would fetch from /api/practice
  const mockCards = [
    { front: "What is an IDE?", back: "Integrated Development Environment" },
    { front: "What does SOLID stand for?", back: "Single Responsibility, Open-Closed, Liskov, Interface, Dependency" }
  ];

  const mockQuiz = [
    { question: "What is React?", options: ["Library", "Framework", "Language"], correctAnswer: "Library" }
  ];

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Practice Center</h1>
      
      <div className="flex gap-4 border-b mb-8">
        <button 
          className={`pb-2 ${activeTab === 'flashcards' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('flashcards')}
        >
          Flashcards
        </button>
        <button 
          className={`pb-2 ${activeTab === 'quiz' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
        <button 
          className={`pb-2 ${activeTab === 'code' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('code')}
        >
          Code Playground
        </button>
      </div>

      <div>
        {activeTab === 'flashcards' && <FlashcardUI cards={mockCards} />}
        {activeTab === 'quiz' && <QuizUI quiz={mockQuiz} onSubmit={(score) => console.log(score)} />}
        {activeTab === 'code' && <CodePlayground />}
      </div>
    </div>
  )
}
