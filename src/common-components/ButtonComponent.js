import React, { PureComponent } from 'react';

import combineClassNames from 'utilities/combineClassNames';

export const BUTTON_THEME = {
  NONE: {
    base: '',
    enabled: '',
    disabled: '',
  },
  BASE: {
    base: 'borwidth-1 talign-center bg-white pad-2',
    enabled: 'color-grayest hover:color-grayer focus:color-grayer',
    disabled: 'color-gray bg-light-gray',
  },
  TRANSPARENT_PRIMARY: {
    base: 'bg-transparent',
    enabled: 'color-primary-darker hover:bor-2-primary focus:bor-2-primary',
    disabled: 'color-grayer',
  },
  TRANSPARENT_SECONDARY: {
    base: 'bg-transparent',
    enabled: 'color-secondary hover:bor-2-secondary focus:bor-2-secondary',
    disabled: 'color-secondary-lighter',
  },
  TRANSPARENT_SECONDARY_DARKER: {
    base: 'bg-transparent',
    enabled: 'color-secondary-darker hover:bor-2-secondary focus:bor-2-secondary',
    disabled: 'color-secondary',
  },
  TRANSPARENT_WHITE: {
    base: 'bg-transparent',
    enabled: 'color-white hover:color-white focus:color-white',
    disabled: 'color-grayest bor-3-grayest',
  },
}

/**
 *
 */
export default class ButtonComponent extends PureComponent {
  static defaultProps = {
    /** @type {String} */
    className: '',
    /** @type {Boolean} */
    disabled: false,
    /** @type {Function} */
    onClick: () => {},

    /** @type {Object} */
    theme: BUTTON_THEME.BASE,
  }
  /** @override */
  render() {
    const {
      className,
      disabled,
      theme,
      ...otherProps
    } = this.props;

    const cursorClassName = disabled ? null : 'cursor-pointer';
    const themeClassName = disabled ? theme.disabled : theme.enabled;

    return (
      <button
        className={combineClassNames(className, cursorClassName, theme.base, themeClassName)}
        disabled={disabled}
        {...otherProps}
      />
    )
  }
}
