import React from 'react';

const Button = ({ onClick, text }) => {
  return (
    <div className="text-center">
      <button
        className="bg-darkGreen hover:bg-mediumGreen my-5 text-white hover:text-darkGreen font-bold py-2 px-4 rounded inline-block"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
