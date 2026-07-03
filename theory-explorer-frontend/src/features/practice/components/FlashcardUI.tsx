import { useState } from 'react';

export function FlashcardUI({ cards }: { cards: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) {
    return <div className="text-center p-8 text-gray-500">No flashcards available right now.</div>;
  }

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className="w-full max-w-md h-64 bg-white rounded-xl shadow-lg border p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="text-sm text-gray-400 absolute top-4 right-4">
          {currentIndex + 1} / {cards.length}
        </div>
        
        <h3 className="text-xl text-center font-medium text-gray-800">
          {isFlipped ? currentCard.back : currentCard.front}
        </h3>
        
        <div className="absolute bottom-4 text-xs text-gray-400">
          Click to flip
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          onClick={handleNext}
        >
          Hard (1)
        </button>
        <button 
          className="px-6 py-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200"
          onClick={handleNext}
        >
          Good (3)
        </button>
        <button 
          className="px-6 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
          onClick={handleNext}
        >
          Easy (5)
        </button>
      </div>
    </div>
  );
}
