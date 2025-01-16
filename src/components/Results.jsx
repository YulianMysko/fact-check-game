import React from 'react';
import { RotateCcw } from 'lucide-react';

const Results = ({ newsItems, answers, onReset }) => {
  const correctCount = answers.filter(a => a.isCorrect).length;
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Результати</h2>
      <p className="mb-4">Правильних відповідей: {correctCount} з {newsItems.length}</p>
      
      <div className="space-y-4">
        {newsItems.map((item) => {
          const answer = answers.find(a => a.id === item.id);
          return (
            <div 
              key={item.id} 
              className={`p-4 rounded-lg ${
                answer?.isCorrect 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}
            >
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.explanation}</p>
              {answer && !answer.isCorrect && (
                <p className="text-sm text-red-600 mt-2">
                  Ви обрали: {answer.userAnswer ? 'Фейк' : 'Правда'}
                </p>
              )}
            </div>
          );
        })}
      </div>
      
      <button
        onClick={onReset}
        className="mt-6 flex items-center justify-center w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Спробувати ще раз
      </button>
    </div>
  );
};

export default Results;