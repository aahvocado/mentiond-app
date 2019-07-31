import React, { Component } from 'react';

import ListItemComponent from './ListItemComponent';

export default class ListComponent extends Component {
  /** @override */
  static defaultProps = {
    /** @type {Array} */
    list: [],
  };
  /** @override */
  render() {
    const {
      list,
    } = this.props;

    return (
      <ul
        className='borradius-3 bg-white'
        style={{
          boxShadow: '0 3px #a2a2a2',
        }}
      >
        { list.map((itemData, idx) => {
          return (
            <ListItemComponent
              key={`list-item-${idx}-${itemData.id}-key`}
              index={idx}
              {...itemData}
            />
          )
        })}
      </ul>
    );
  }
}
