import React from 'react';

const Button = ({ href, onClick, text, bgColor, hoverBg, textColor, hoverText }) => {
  return (
    <div className="text-center">
      <a
        className={`${bgColor} hover:${hoverBg} my-5 ${textColor} hover:${hoverText} font-bold py-2 px-4 rounded inline-block`}
        onClick={onClick}
        href={href}
      >
        {text}
      </a>
    </div>
  );
};

export default Button;
