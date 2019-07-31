import React from 'react';

import ListComponent from 'components/ListComponent';
import FooterComponent from 'components/FooterComponent';
import LogoComponent from 'components/LogoComponent';

const demoList = [
  {
    label: 'In the Mood for Love',
    id: 'a',
  }, {
    label: 'YiYi',
    id: 'b',
  }, {
    label: 'Once Upon a Time in Hollywood',
    id: 'c',
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
