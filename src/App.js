import React from 'react';
import './App.css';

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
    <div className="App">
      <ListComponent list={demoList} />
    </div>
  );
}

export default App;
