import React, { PureComponent } from 'react';

import {HorizontalSlideGestureComponent} from 'common-components/SlideGestureComponent';

import combineClassNames from 'utilities/combineClassNames';

export default class ListItemComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    baseClassName: 'width-full boxsizing-border flex-row aitems-center overflow-hidden fontfamily-primary borradius-2 pad-2',
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
      baseClassName,
      isComplete,
      isFocused,
      isHidden,
      mentions,
      label,
      onClickPlus,
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
      <li
        className='position-relative adjacent-mar-t-2'
        style={{
          height: 60,
        }}
      >
        <HorizontalSlideGestureComponent
          className=''
          enabled={!isHidden && !isComplete}
          min={-110}
          max={110}
          onSlideMin={this.onSlideHide}
          onSlideMax={this.onSlideComplete}
        >
          <div
            className={combineClassNames(baseClassName, 'position-absolute color-grayest', borderClassName, hiddenClassName)}
            style={{
              height: 60,
            }}
          >
            <div className='flex-auto text-ellipsis fsize-4 adjacent-mar-l-3'>{label}</div>
            <div className='flex-none fsize-3 adjacent-mar-l-3'>{`${mentions} mentions`}</div>
            <button
              className='flex-none cursor-pointer fsize-4 pad-1 adjacent-mar-l-3'
              onClick={onClickPlus}
            >
              +
            </button>
          </div>
        </HorizontalSlideGestureComponent>

        <div className={combineClassNames(baseClassName, 'height-full color-white')}
          style={{
            background: 'linear-gradient(90deg, rgba(0,255,1,1) 0%, rgba(204,255,0,1) 25%, rgba(255,139,0,1) 75%, rgba(255,0,0,1) 100%)',
          }}
        >
          <div className='flex-auto talign-left'>Complete</div>
          <div className='flex-auto talign-right'>Hide</div>
        </div>
      </li>
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
