import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import keycodes from 'constants/keycodes';

import 'data/storageController';

import appState from 'state/appState';

import './styles/css-reset.css';
import './build/app.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/**
 * keydown listener for hotkeys
 */
window.addEventListener('keydown', (evt) => {
  // don't use the hotkeys if trying to type
  if (evt.srcElement.type === 'text' || evt.srcElement.type === 'textarea' || evt.srcElement.type === 'number') {
    return;
  }

  // only devs get super cool hotkeys
  if (!appState.get('isDevMode')) {
    return;
  }

  // backquote
  if (evt.keyCode === keycodes.backquote) {
    appState.set({isDebugMode: !appState.get('isDebugMode')});
  }
});
