import React, { PureComponent } from 'react';

import ButtonComponent, { BUTTON_THEME } from 'common-components/ButtonComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ICON_BUTTON_THEME = BUTTON_THEME;

/**
 *
 */
export default class IconButtonComponent extends PureComponent {
  static defaultProps = {
    /** @type {@fortawesome/Icon} */
    icon: undefined,
  };
  /** @override */
  render() {
    const {
      icon,
      ...otherProps
    } = this.props;

    return (
      <ButtonComponent
        {...otherProps}
      >
        <FontAwesomeIcon style={{padding: '2px'}} icon={icon} />
      </ButtonComponent>
    )
  }
}
