import React, { PureComponent } from 'react';

import combineClassNames from 'utilities/combineClassNames';

export const BUTTON_THEME = {
  BASE: {
    base: 'boxszing-content bg-white borradius-2 pad-2',
    enabled: 'color-grayest hover:color-fourth focus:color-fourth',
    disabled: 'color-grayer bg-light-gray',
  },
}

/**
 *
 */
export default class ButtonComponent extends PureComponent {
  static defaultProps = {
    /** @type {String} */
    baseClassName: 'borwidth-1 talign-center pad-2',
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
      baseClassName,
      className,
      disabled,
      theme,
      ...otherProps
    } = this.props;

    const cursorClassName = disabled ? null : 'cursor-pointer';
    const themeClassName = disabled ? theme.disabled : theme.enabled;

    return (
      <button
        className={combineClassNames(baseClassName, className, cursorClassName, theme.base, themeClassName)}
        disabled={disabled}
        {...otherProps}
      />
    )
  }
}
