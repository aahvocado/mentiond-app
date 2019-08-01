import React, { PureComponent } from 'react';

import {HorizontalSlideGestureComponent} from 'common-components/SlideGestureComponent';

export default class ListItemComponent extends PureComponent {
  /** @override */
  static defaultProps = {
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
      isFocused,
      mentions,
      label,
      onClickPlus,
    } = this.props;

    const modifierClassName = isFocused ? 'bor-2-tertiary' : 'bor-2-transparent';

    return (
      <HorizontalSlideGestureComponent
        className='adjacent-mar-t-2'
      >
        <li className={`flex-row aitems-center overflow-hidden fontfamily-primary color-grayest boxszing-content bg-white borradius-2 pad-2 ${modifierClassName}`}>
            <div className='flex-auto text-ellipsis fsize-4 adjacent-mar-l-3'>{label}</div>
            <div className='flex-none fsize-3 adjacent-mar-l-3'>{`${mentions} mentions`}</div>
            <button
              className='flex-none cursor-pointer fsize-4 pad-1 adjacent-mar-l-3'
              onClick={onClickPlus}
            >
              +
            </button>
        </li>
      </HorizontalSlideGestureComponent>
    );
  }
}
