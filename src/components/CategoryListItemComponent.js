import React, { PureComponent } from 'react';
import { animated } from 'react-spring';

import SlideGestureComponent from 'common-components/SlideGestureComponent';

import combineClassNames from 'utilities/combineClassNames';

/**
 * Basic Mentionable List Item
 */
export default class CategoryListItemComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    itemClassName: 'width-full boxsizing-border flex-row aitems-center overflow-hidden fontfamily-secondary borradius-2 pad-2',
    /** @type {Number} */
    mentions: 0,
    /** @type {String} */
    id: undefined,
    /** @type {Number} */
    index: -1,
    /** @type {Boolean} */
    isComplete: false,
    /** @type {Boolean} */
    isFocused: false,
    /** @type {Boolean} */
    isHidden: false,
    /** @type {String} */
    label: '',
    /** @type {Function} */
    onClickPlus: () => {},
    /** @type {Function} */
    onComplete: () => {},
    /** @type {Function} */
    onUnComplete: () => {},
    /** @type {Function} */
    onHide: () => {},
    /** @type {Function} */
    onUnHide: () => {},
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onSlideRight = this.onSlideRight.bind(this);
    this.onSlideLeft = this.onSlideLeft.bind(this);
  }
  /** @override */
  render() {
    const {
      itemClassName,
      isComplete,
      isFocused,
      isHidden,
      mentions,
      label,
      style,
      onClickPlus,
    } = this.props;

    const shouldShowMinVersion = isComplete || isHidden;

    const leftLabel = isComplete ? 'Un-complete' : 'Complete';
    const rightLabel = isHidden ? 'Un-hide' : 'Hide';

    return (
      <animated.div
        className='position-absolute'
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          ...style,
        }}
      >
        <div className='position-relative width-full height-full'>
          <SlideGestureComponent
            className='position-absolute'
            style={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 2,
            }}
            // enabled={!isHidden && !isComplete}
            min={[-110, 0]}
            max={[110, 0]}
            onSlideXMin={this.onSlideLeft}
            onSlideXMax={this.onSlideRight}
          >
            <CategoryListItemBodyComponent
              className={itemClassName}
              isComplete={isComplete}
              isFocused={isFocused}
              isHidden={isHidden}
              label={label}
              mentions={mentions}
              onClickPlus={onClickPlus}

              shouldShowMinVersion={shouldShowMinVersion}
            />
          </SlideGestureComponent>

          <div className={combineClassNames(itemClassName, 'height-full color-white')}
            style={{
              background: 'linear-gradient(90deg, rgba(0,179,1,1) 0%, rgba(204,255,0,1) 25%, rgba(255,139,0,1) 75%, rgba(255,0,0,1) 100%)',
            }}
          >
            <div className='flex-auto talign-left'>{leftLabel}</div>
            <div className='flex-auto talign-right'>{rightLabel}</div>
          </div>
        </div>
      </animated.div>
    );
  }
  /**
   * @param {GestureEvent} gestureEvent
   */
  onSlideRight(gestureEvent) {
    const {
      id,
      isComplete,
      onComplete,
      onUnComplete,
    } = this.props;

    gestureEvent.cancel();
    if (isComplete) {
      onUnComplete(id, gestureEvent);
    } else {
      onComplete(id, gestureEvent);
    }
  }
  /**
   * @param {GestureEvent} gestureEvent
   */
  onSlideLeft(gestureEvent) {
    const {
      id,
      isHidden,
      onHide,
      onUnHide,
    } = this.props;

    gestureEvent.cancel();

    if (isHidden) {
      onUnHide(id, gestureEvent);
    } else {
      onHide(id, gestureEvent);
    }
  }
}
/**
 * body of a mentionable list item
 */
class CategoryListItemBodyComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
    /** @type {Boolean} */
    isComplete: false,
    /** @type {Boolean} */
    isFocused: false,
    /** @type {Boolean} */
    isHidden: false,
    /** @type {String} */
    label: '',
    /** @type {Number} */
    mentions: 0,
    /** @type {Function} */
    onClickPlus: () => {},
    //
    /** @type {Boolean} */
    shouldShowMinVersion: false,
  };
  /** @override */
  render() {
    const {
      className,
      isComplete,
      isFocused,
      isHidden,
      label,
      mentions,
      onClickPlus,
      shouldShowMinVersion,
    } = this.props;

    const borderClassName = (() => {
      if (isComplete) {
        return 'bor-2-green';
      }

      if (isFocused) {
        return 'bor-2-tertiary';
      }

      return 'bor-2-transparent';
    })();

    const hiddenClassName = isHidden ? 'color-grayest bg-gray' : 'color-grayest bg-white';

    return (
      <div
        className={combineClassNames(className, 'height-full color-grayest', borderClassName, hiddenClassName)}
      >
        <div className='flex-auto text-ellipsis fsize-4 adjacent-mar-l-3'>{label}</div>
        <div className='flex-none fsize-3 adjacent-mar-l-3'>{`${mentions} mentions`}</div>

        { !shouldShowMinVersion &&
          <button
            className='flex-none cursor-pointer fsize-4 pad-1 adjacent-mar-l-3'
            disabled={isHidden || isComplete}
            onClick={onClickPlus}
          >
            +
          </button>
        }
      </div>

    );
  }
}
