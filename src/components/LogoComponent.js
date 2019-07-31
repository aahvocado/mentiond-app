import React, { PureComponent } from 'react';

export default class LogoComponent extends PureComponent {
  /** @override */
  render() {
    return (
      <h1
        className='fsize-8 fontfamily-secondary talign-center pad-2 color-secondary-darker'
        style={{
          textShadow: 'white 3px 3px',
        }}
      >
        Mentiond
      </h1>
    );
  }
}