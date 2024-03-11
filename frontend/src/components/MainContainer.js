import React from 'react';

const MainContainer = ({ children, bgColor }) => {
  return (
    <div className={`h-screen py-28 ${bgColor ? bgColor : ''}`}>
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-1 md:px-2">
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
