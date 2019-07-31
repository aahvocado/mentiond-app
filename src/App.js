import React from 'react';

import ListComponent from 'common-components/ListComponent';

import FooterComponent from 'components/FooterComponent';
import LogoComponent from 'components/LogoComponent';

const demoList = [
  {
    children: 'First Item',
    id: 'a',
  }, {
    children: 'Second Item',
    id: 'b',
  }
]

function App() {
  return (
    <div
      className="App height-full boxsizing-border flex-col mar-h-auto pad-3"
      style={{
        maxWidth: 640,
      }}
    >
      <LogoComponent />

      <div className='flex-auto'>
        <ListComponent list={demoList} />
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;
