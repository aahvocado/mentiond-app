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
      <ul>
        { list.map((itemData, idx) => {
          return (
            <ListItemComponent
              key={`list-item-${idx}-${itemData.id}-key`}
              {...itemData}
            />
          )
        })}
      </ul>
    );
  }
}
