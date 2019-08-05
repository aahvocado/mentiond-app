import React, { PureComponent } from 'react';
import { animated } from 'react-spring';

import {HorizontalSlideGestureComponent} from 'common-components/SlideGestureComponent';

import combineClassNames from 'utilities/combineClassNames';

/**
 * Basic Mentionable List Item
 */
export default class CategoryListItemComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    itemClassName: 'width-full boxsizing-border flex-row aitems-center overflow-hidden fontfamily-primary borradius-2 pad-2',
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
    onHide: () => {},
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onSlideComplete = this.onSlideComplete.bind(this);
    this.onSlideHide = this.onSlideHide.bind(this);
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
          <HorizontalSlideGestureComponent
            className='position-absolute'
            style={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 2,
            }}
            enabled={!isHidden && !isComplete}
            min={-110}
            max={110}
            onSlideMin={this.onSlideHide}
            onSlideMax={this.onSlideComplete}
          >
            <CategoryListItemBodyComponent
              className={itemClassName}
              isComplete={isComplete}
              isFocused={isFocused}
              isHidden={isHidden}
              label={label}
              mentions={mentions}
              onClick={onClickPlus}

              shouldShowMinVersion={shouldShowMinVersion}
            />
          </HorizontalSlideGestureComponent>

          <div className={combineClassNames(itemClassName, 'position-absolute text-stroke color-white')}
            style={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 1,
              background: 'linear-gradient(90deg, rgba(0,255,1,1) 0%, rgba(204,255,0,1) 25%, rgba(255,139,0,1) 75%, rgba(255,0,0,1) 100%)',
            }}
          >
            <div className='flex-auto talign-left'>Complete</div>
            <div className='flex-auto talign-right'>Hide</div>
          </div>
        </div>
      </animated.div>
    );
  }
  /**
   * @param {GestureEvent} gestureEvent
   */
  onSlideComplete(gestureEvent) {
    const {
      id,
      onComplete,
    } = this.props;

    gestureEvent.cancel();
    onComplete(id, gestureEvent);
  }
  /**
   * @param {GestureEvent} gestureEvent
   */
  onSlideHide(gestureEvent) {
    const {
      id,
      onHide,
    } = this.props;

    gestureEvent.cancel();
    onHide(id, gestureEvent);
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
