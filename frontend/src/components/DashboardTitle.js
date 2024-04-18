import React from 'react';
import { RoughNotation } from "react-rough-notation";

const DashboardTitle = ({ children }) => {
  return (
    <RoughNotation
          type="highlight"
          show={true}
          color="#DFEFCD"
          animationDelay="10"
          animationDuration="2000"
          padding="0"
          strokeWidth="0"
          style={{
            fontSize: window.innerWidth <= 640 ? '30px' : '50px',
            fontFamily: 'baloo',
          }}
        >
          {children}
    </RoughNotation>
  );
};

export default DashboardTitle;
