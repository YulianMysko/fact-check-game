import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { newsItems } from '../data/newsItems';
import { useSwipe } from '../hooks/useSwipe';
import Card from './Card';
import Results from './Results';

const FactCheckGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (isFake) => {
    const isCorrect = newsItems[currentIndex].isFake === isFake;
    setAnswers([...answers, { 
      id: newsItems[currentIndex].id,
      isCorrect,
      userAnswer: isFake
    }]);

    if (currentIndex + 1 >= newsItems.length) {
      setShowResults(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const { dragOffset, handlers } = useSwipe(100, handleAnswer);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showResults) return;
      if (e.key === 'ArrowLeft') {
        handleAnswer(true); // Fake
      } else if (e.key === 'ArrowRight') {
        handleAnswer(false); // True
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, showResults]);

  const resetGame = () => {
    setCurrentIndex(0);
    setShowResults(false);
    setAnswers([]);
  };

  if (showResults) {
    return <Results 
      newsItems={newsItems} 
      answers={answers} 
      onReset={resetGame} 
    />;
  }

  const currentNews = newsItems[currentIndex];
  const rotationDeg = (dragOffset.x / 100) * 10;
  
  return (
    <div className="relative h-96 max-w-md mx-auto">
      <Card 
        news={currentNews}
        dragOffset={dragOffset}
        rotationDeg={rotationDeg}
        handlers={handlers}
      />
      
      <div className="absolute bottom-4 inset-x-0 space-y-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5 mr-2" /> ФЕЙК
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            ПРАВДА <Check className="w-5 h-5 ml-2" />
          </button>
        </div>
        
        <div className="flex justify-center space-x-1">
          {newsItems.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FactCheckGame;