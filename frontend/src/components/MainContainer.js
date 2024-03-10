import React from 'react';

const MainContainer = ({ children }) => {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 sm:px-1 md:px-2">
      {children}
    </div>
  );
};

export default MainContainer;
