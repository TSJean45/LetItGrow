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
            fontSize: '50px',
            fontFamily: 'baloo',
          }}
        >
          {children}
        </RoughNotation>
  );
};

export default DashboardTitle;
