import { useState } from 'react';

export const useSwipe = (threshold = 100, onSwipe) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e) => {
    const offsetX = e.touches[0].clientX - dragStart.x;
    setDragOffset({ x: offsetX, y: 0 });
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragOffset.x) > threshold) {
      onSwipe(dragOffset.x < 0);
    }
    setDragOffset({ x: 0, y: 0 });
  };

  return {
    dragOffset,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};