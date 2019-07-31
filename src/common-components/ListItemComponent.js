import React, { PureComponent } from 'react';

export default class ListItemComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {Number} */
    count: 0,
    /** @type {Number} */
    index: -1,
    /** @type {String} */
    label: '',
  };
  /** @override */
  render() {
    const {
      count,
      label,
    } = this.props;

    return (
      <li className='flex-row aitems-center overflow-hidden fontfamily-primary color-grayest pad-2'>
        <div className='flex-auto text-ellipsis fsize-4 adjacent-mar-l-3'>{label}</div>
        <div className='flex-none fsize-3 adjacent-mar-l-3'>{`${count} mentions`}</div>
        <button className='flex-none cursor-pointer fsize-4 pad-1 adjacent-mar-l-3'>+</button>
      </li>
    );
  }
}
