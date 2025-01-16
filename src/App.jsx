import React from 'react';
import FactCheckGame from './components/FactCheckGame';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Fact Check Game</h1>
        <p className="text-gray-600">
          Перевірте свої навички розпізнавання фейків
        </p>
      </div>
      <FactCheckGame />
    </div>
  );
};

export default App;