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
    /** @type {Number} */
    index: -1,
    /** @type {Boolean} */
    isFocused: false,
    /** @type {String} */
    label: '',
    /** @type {Function} */
    onClickPlus: () => {},
  };
  /** @override */
  render() {
    const {
      baseClassName,
      isFocused,
      mentions,
      label,
      onClickPlus,
    } = this.props;

    const modifierClassName = isFocused ? 'bor-2-tertiary' : 'bor-2-transparent';

    return (
      <li
        className='position-relative adjacent-mar-t-2'
        style={{
          height: 60,
        }}
      >
        <HorizontalSlideGestureComponent
          className=''
          min={-110}
          max={110}
        >
          <div
            className={combineClassNames(baseClassName, 'position-absolute color-grayest bg-white', modifierClassName)}
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
          <div className='flex-auto talign-left'>Left</div>
          <div className='flex-auto talign-right'>Right</div>
        </div>
      </li>
    );
  }
}
