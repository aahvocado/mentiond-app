import React, { Component } from 'react';
import { observer } from 'mobx-react';

import CategoryPage from 'pages/CategoryPage';

import FooterComponent from 'components/FooterComponent';
import LogoComponent from 'components/LogoComponent';
// import NavigationMenu from 'components/NavigationMenu';

import appState from 'state/appState';

export default observer(
class App extends Component {
  render() {
    return (
      <div
        className="App position-relative bg-secondary fontfamily-primary height-full boxsizing-border flex-col mar-h-auto pad-3"
        style={{
          maxWidth: 640,
          boxShadow: '0 0 10px 2px #b3c1c5',
        }}
      >
        <LogoComponent />

        <CategoryPage
          categoryModel={appState.get('currentCategoryModel')}
        />

        <FooterComponent />
      </div>
    );
  };
});
