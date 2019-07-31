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
    <div className="App bg-light-blue">
      <ListComponent list={demoList} />
    </div>
  );
}

export default App;
