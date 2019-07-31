import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ListItemComponent from './ListItemComponent';

export default observer(
class ListComponent extends Component {
  /** @override */
  static defaultProps = {
    /** @type {OrganizedListModel} */
    organizedListModel: [],
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onClickPlusItem = this.onClickPlusItem.bind(this);
  }
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
              key={`list-item-${itemData.id}-key`}
              index={idx}
              onClickPlus={() => this.onClickPlusItem(itemData.id)}
              {...itemData}
            />
          )
        })}
      </ul>
    );
  }
  /**
   *
   */
  onClickPlusItem(itemId) {
    const {organizedListModel} = this.props;
    const list = organizedListModel.get('list');

    // update the mentions count
    const foundItem = list.find((item) => item.id === itemId);
    foundItem.mentions += 1;

    // then resort
    organizedListModel.sortList();
  }
});
