import React from 'react';

const Button = ({ onClick, text, bgColor, hoverBg, textColor, hoverText }) => {
  return (
    <div className="text-center">
      <button
        className={`${bgColor} hover:${hoverBg} my-5 ${textColor} hover:${hoverText} font-bold py-2 px-4 rounded inline-block`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
