import React, { PureComponent } from 'react';

export default class LogoComponent extends PureComponent {
  /** @override */
  render() {
    return (
      <div
        className='flex-none fsize-3 color-grayer'
      >
        created by Daniel Xiao
      </div>
    );
  }
}
