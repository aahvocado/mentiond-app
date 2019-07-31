import React, { PureComponent } from 'react';

export default class ListItemComponent extends PureComponent {
  /** @override */
  static defaultProps = {
  };
  /** @override */
  render() {
    const {
      children,
    } = this.props;

    return (
      <li>
        {children}
      </li>
    );
  }
}
