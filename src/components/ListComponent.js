import React, { Component } from 'react';

import ListItemComponent from './ListItemComponent';

export default class ListComponent extends Component {
  /** @override */
  static defaultProps = {
    /** @type {OrganizedListModel} */
    organizedListModel: [],
  };
  /** @override */
  render() {
    const {
      organizedListModel,
    } = this.props;

    const list = organizedListModel.get('list');

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
