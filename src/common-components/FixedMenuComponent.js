import React, { PureComponent } from 'react';

import combineClassNames from 'utilities/combineClassNames';

/**
 *
 */
export default class FixedMenuComponent extends PureComponent {
  static defaultProps = {
    /** @type {String} */
    baseClassName: 'boxsizing-border pad-2',
    /** @type {String} */
    className: '',
    /** @type {String} */
    containerClassName: '',
    /** @type {Object} */
    containerStyle: {},

    /** @type {Boolean} */
    active: false,
    /** @type {String} */
    direction: 'left', // or 'right', 'up', 'down',
    /** @type {String} */
    location: 'left', // or 'right', 'top', 'bottom',

    /** @type {Boolean} */
    shouldUseOverlay: true,
    /** @type {Function} */
    onClickOverlay: () => {},
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onClickContent = this.onClickContent.bind(this);
    this.onClickOverlay = this.onClickOverlay.bind(this);

    this.state = {
      /** @type {Boolean} */
      isDisabled: props.active === undefined ? false : !props.active,
    }
  };
  /** @override */
  componentDidUpdate() {
    // if we were disabled, but now we are active, we can not worry about being disabled anymore
    if (this.state.isDisabled && this.props.active) {
      this.setState({ isDisabled: false });
    }
  };
  /** @override */
  render() {
    const {
      active,
      baseClassName,
      className,
      containerClassName,
      containerStyle,
      direction,
      location,
      shouldUseOverlay,
      style,
    } = this.props;

    const { isDisabled } = this.state;

    const isHorizontal = direction === 'left' || direction === 'right';

    const activeTransformStyle = isHorizontal ? 'translateX(0px)' : 'translateY(0px)';
    const hiddenTransformStyle = isHorizontal ?
      `translateX(${direction === 'right' ? '-100%' : '100%'})` :
      `translateY(${direction === 'bottom' ? '-100%' : '100%'})`;

    return (
      <div
        className={combineClassNames('position-fixed height-full width-full zindex-9 pointer-cursor', containerClassName)}
        style={{
          top: 0,
          left: 0,
          transition: isDisabled ? 'none' : 'opacity 500ms',
          backgroundColor: shouldUseOverlay ? 'rgba(0, 0, 0, .33)' : '',
          opacity: (isDisabled || !active) ? 0 : 1,
          pointerEvents: (!active || (active && !shouldUseOverlay)) ? 'none' : 'initial',
          ...containerStyle,
        }}
        onClick={this.onClickOverlay}
      >
        <div
          className={combineClassNames('position-fixed zindex-10', baseClassName, className)}
          style={{
            left: location === 'left' ? '0px' : undefined,
            right: location === 'right' ? '0px' : undefined,
            top: location === 'top' ? '0px' : undefined,
            bottom: location === 'bottom' ? '0px' : undefined,
            pointerEvents: 'initial',
            transition: 'transform 300ms ease-out',
            transform: active ? activeTransformStyle : hiddenTransformStyle,
            ...style,
          }}
          onClick={this.onClickContent}
        >
          {this.props.children}
        </div>
      </div>
    )
  };
  /**
   *
   * @param {Event} evt
   */
  onClickOverlay(evt) {
    const {shouldUseOverlay} = this.props;
    if (!shouldUseOverlay) {
      evt.stopPropagation();
      return;
    }

    this.props.onClickOverlay();
  }
  /**
   * catches the clicking inside to prevent it from triggering `onClickOverlay()`
   * @param {Event} evt
   */
  onClickContent(evt) {
    evt.stopPropagation();
  }
}
