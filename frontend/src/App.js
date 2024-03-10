import React from 'react';
import { Header,
          MainContainer } from './components';

const App = () => {
  return (
    <div>
      <Header />
      <MainContainer>
        <div style={{ background: 'lightblue', padding: '20px', marginBottom: '20px' }}>
          <h2>Section 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non feugiat lorem.</p>
        </div>
        <div style={{ background: 'lightgreen', padding: '20px', marginBottom: '20px' }}>
          <h2>Section 2</h2>
          <p>Phasellus non lacus sit amet metus viverra iaculis. Nulla facilisi.</p>
        </div>
        <div style={{ background: 'lightcoral', padding: '20px', marginBottom: '20px' }}>
          <h2>Section 3</h2>
          <p>Etiam ultrices, urna nec vehicula ultricies, massa felis hendrerit nunc, id placerat urna libero id odio.</p>
        </div>
        {/* Add more sections as needed */}
      </MainContainer>
    </div>
  );
};

export default App;
