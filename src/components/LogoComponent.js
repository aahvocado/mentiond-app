import React, { PureComponent } from 'react';

import combineClassNames from 'utilities/combineClassNames';

export default class LogoComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
  };
  /** @override */
  render() {
    const {
      className,
    } = this.props;

    return (
      <h1
        className={combineClassNames('fsize-4 fontfamily-secondary talign-left color-secondary-darker flex-none', className)}
        style={{
          textShadow: 'white 3px 3px',
        }}
      >
        mentiond
      </h1>
    );
  }
}
