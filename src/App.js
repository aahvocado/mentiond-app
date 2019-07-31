import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ListComponent from 'components/ListComponent';
import FooterComponent from 'components/FooterComponent';
import LogoComponent from 'components/LogoComponent';

import OrganizedListModel from 'models/OrganizedListModel';

const demoList = [
  {
    label: 'In the Mood for Love',
    id: 'a',
    mentions: 2,
  }, {
    label: 'YiYi',
    id: 'b',
    mentions: 3,
  }, {
    label: 'Once Upon a Time in Hollywood',
    id: 'c',
    mentions: 1,
  }
]
const organizedListModel = new OrganizedListModel({
  list: demoList,
});

export default observer(
class App extends Component {
  render() {
    const list = organizedListModel.get('list');

    return (
      <div
        className="App height-full boxsizing-border flex-col mar-h-auto pad-3"
        style={{
          maxWidth: 640,
        }}
      >
        <LogoComponent />

        <div className='flex-auto'>
          <ListComponent
            list={list}
            organizedListModel={organizedListModel}
          />
        </div>

        <FooterComponent />
      </div>
    );
  };
});
