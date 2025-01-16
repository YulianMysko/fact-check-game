import React from 'react';

const Card = ({ news, dragOffset, rotationDeg, handlers }) => {
  return (
    <div 
      className="absolute inset-x-0 top-4 p-6 bg-white shadow-xl rounded-xl"
      style={{
        transform: `translateX(${dragOffset.x}px) rotate(${rotationDeg}deg)`,
        transition: dragOffset.x ? 'none' : 'transform 0.3s ease'
      }}
      {...handlers}
    >
      <h2 className="text-xl font-medium mb-4">{news.title}</h2>
      <p className="text-gray-600">
        Свайпніть вліво якщо це фейк, або вправо якщо це правда
      </p>
    </div>
  );
};

export default Card;