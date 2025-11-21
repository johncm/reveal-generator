import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-t-4 border-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
      <p className="text-neutral-400 animate-pulse font-medium">Dreaming up slides...</p>
    </div>
  );
};