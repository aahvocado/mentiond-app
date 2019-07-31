import React from 'react';

import ListComponent from 'common-components/ListComponent';

const demoList = [
  {
    children: 'a',
    id: 'a',
  }, {
    children: 'b',
    id: 'b',
  }
]

function App() {
  return (
    <div
      className="App mar-h-auto"
      style={{
        maxWidth: 780,
      }}
    >
      <h1
        className='fsize-8 fontfamily-secondary talign-center pad-2 color-secondary-darker'
        style={{
          textShadow: 'white 3px 3px',
        }}
      >
        Mentiond
      </h1>
      <ListComponent list={demoList} />
    </div>
  );
}

export default App;
