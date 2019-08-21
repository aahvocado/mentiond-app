import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {
  BrowserRouter,
  Route,
  // withRouter,
} from 'react-router-dom';

import ActionbarComponent from 'components/ActionbarComponent';
import LogoComponent from 'components/LogoComponent';
import NavigationMenu from 'components/NavigationMenu';

import CategoryPage from 'pages/CategoryPage';

import appState from 'state/appState';

export default observer(
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div
          className="App overflow-auto position-relative bg-primary fontfamily-secondary boxsizing-border flex-col mar-h-auto"
          style={{
            maxWidth: 640,
            height: '100vh',
            boxShadow: '0 0 10px 2px #b3c1c5',
          }}
        >
          {/* header */}
          <div
            id='app-header'
            className='zindex-2 flex-row aitems-center pad-h-3 pad-v-2 boxsizing-border'
            style={{
              height: 55,
              boxShadow:'rgba(212, 227, 232, 1) 0 1px 10px 0',
            }}
          >
            <NavigationMenu />

            <LogoComponent className='flex-auto' />
          </div>

          {/* body */}
          <div
            id='app-body'
            className='position-relative overflow-auto pad-h-3 flex-col flex-auto adjacent-mar-t-2'
          >
            <Route exact path="/" component={CategoryPage} />
          </div>

          {/* footer */}
          <div
            id='app-header'
            className='zindex-1 flex-none'
          >
            <ActionbarComponent
              className='pad-h-3 pad-v-1'
              isInputDisabled={appState.get('isViewingNewCategory')}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  };
});
