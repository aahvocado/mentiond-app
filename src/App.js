import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
  BrowserRouter,
  Route,
  // withRouter,
} from 'react-router-dom';

import IconButtonComponent, { ICON_BUTTON_THEME } from 'common-components/IconButtonComponent';

import ActionbarComponent from 'components/ActionbarComponent';
import LogoComponent from 'components/LogoComponent';
// import NavigationMenu from 'components/NavigationMenu';
//
import storageController from 'data/storageController';

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
          <div id='app-header'
            className='zindex-1 flex-row aitems-center pad-h-3 pad-v-2 boxsizing-border'
            style={{
              height: 55,
              boxShadow:'rgba(212, 227, 232, 1) 0 1px 10px 0',
            }}
          >
            <LogoComponent className='flex-auto' />

            { appState.get('isDebugMode') &&
              <IconButtonComponent
                className='pad-1 flex-none'
                icon={faTrashAlt}
                theme={ICON_BUTTON_THEME.TRANSPARENT_PRIMARY}
                onClick={() => storageController.clear()}
              />
            }
          </div>

          {/* body */}
          <div
            id='app-body'
            className='overflow-auto pad-h-3 flex-col flex-auto adjacent-mar-t-2'
          >
            <Route exact path="/" component={CategoryPage} />
          </div>

          {/* footer */}
          <ActionbarComponent
            className='zindex-1 pad-h-3 pad-v-1 flex-none'
            canAddNewCategory={!appState.get('isViewingNewCategory')}
          />
        </div>
      </BrowserRouter>
    );
  };
});
