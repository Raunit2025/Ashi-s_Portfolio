import React from 'react';

const BackButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 z-20"
    >
      {text}
    </button>
  );
};

export default BackButton;