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
        className={combineClassNames('fsize-4 fontfamily-primary talign-left color-primary-darker flex-none', className)}
      >
        mentiond
      </h1>
    );
  }
}
