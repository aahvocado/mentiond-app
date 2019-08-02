import React, { Component } from 'react';
import { observer } from 'mobx-react';

import MentionsListPage from 'pages/MentionsListPage';

import FooterComponent from 'components/FooterComponent';
import LogoComponent from 'components/LogoComponent';

import appState from 'state/appState';

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

        <MentionsListPage
          mentionableListModel={appState.get('currentListModel')}
        />

        <FooterComponent />
      </div>
    );
  };
});
