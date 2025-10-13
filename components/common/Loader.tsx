
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        <style>{`
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-8px);
              }
            }
        `}</style>
    </div>
  );
};

export default Loader;
