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
    itemClassName: 'fontfamily-secondary borradius-2 width-full height-full',
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
    onClickItem: () => {},
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
      onClickItem,
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
              onClickItem={onClickItem}
              onClickPlus={onClickPlus}

              shouldShowMinVersion={shouldShowMinVersion}
            />
          </SlideGestureComponent>

          <div className={combineClassNames(itemClassName, 'flex-row aitems-center pad-2 boxsizing-border height-full color-white')}
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
    onClickItem: () => {},
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
      onClickItem,
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
        className={combineClassNames('boxsizing-border flex-row aitems-center overflow-hidden', className, borderClassName, hiddenClassName)}
      >
        {/* left container */}
        <div
          className='flex-row-center height-full flex-auto boxsizing-border pad-2 adjacent-mar-l-3'
          onClick={onClickItem}
        >
          <div className='flex-auto text-ellipsis fsize-4 adjacent-mar-l-3'>{label}</div>
          <div className='flex-none fsize-3 adjacent-mar-l-3'>{`${mentions} mentions`}</div>
        </div>

        {/* right container - actions */}
        { !shouldShowMinVersion &&
          <button
            className='flex-none cursor-pointer fsize-4 pad-3 adjacent-mar-l-3'
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
