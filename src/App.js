import React, { Component } from 'react';
import { observer } from 'mobx-react';

import MentionsListPage from 'pages/MentionsListPage';

import FooterComponent from 'components/FooterComponent';
import LogoComponent from 'components/LogoComponent';

import MentionableListModel from 'models/MentionableListModel';

const mentionableListModel = new MentionableListModel({
  category: 'movies',
});
mentionableListModel.addItem({
  label: 'In the Mood for Love',
  mentions: 2,
})
mentionableListModel.addItem({
  label: 'YiYi',
  mentions: 3,
})
mentionableListModel.addItem({
  label: 'Once Upon a Time in Hollywood',
  mentions: 1,
})
mentionableListModel.updateIndices();

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

        <MentionsListPage mentionableListModel={mentionableListModel} />

        <FooterComponent />
      </div>
    );
  };
});
