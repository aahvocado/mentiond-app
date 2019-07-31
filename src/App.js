import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from 'common-components/ButtonComponent';

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
    return (
      <div
        className="App fontfamily-primary height-full boxsizing-border flex-col mar-h-auto pad-3"
        style={{
          maxWidth: 640,
        }}
      >
        <LogoComponent />

        <div className='flex-auto'>
          <ButtonComponent
            className='fsize-3 width-full talign-center flex-none mar-b-3'
          >
            Add New Mentionable
          </ButtonComponent>

          <ListComponent
            organizedListModel={organizedListModel}
          />
        </div>

        <FooterComponent />
      </div>
    );
  };
});
