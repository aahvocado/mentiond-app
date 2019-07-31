import React, { PureComponent } from 'react';

export default class ListItemComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {Number} */
    index: -1,
  };
  /** @override */
  render() {
    const {
      children,
    } = this.props;

    return (
      <li className='fontfamily-primary color-grayest fsize-4 pad-2'>
        {children}
      </li>
    );
  }
}
