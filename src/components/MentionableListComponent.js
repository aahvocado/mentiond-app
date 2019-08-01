import React, { Component } from 'react';
import { observer } from 'mobx-react';

import MentionableListItemComponent from 'components/MentionableListItemComponent';

import combineClassNames from 'utilities/combineClassNames';

export default observer(
class MentionableListComponent extends Component {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    baseClassName: '',
    /** @type {String} */
    className: '',
    /** @type {MentionableListModel} */
    mentionableListModel: [],
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onClickPlusItem = this.onClickPlusItem.bind(this);
    this.onCompleteItem = this.onCompleteItem.bind(this);
    this.onHideItem = this.onHideItem.bind(this);
  }
  /** @override */
  render() {
    const {
      baseClassName,
      className,
      mentionableListModel,
    } = this.props;

    const list = mentionableListModel.get('list');

    return (
      <ul className={combineClassNames(baseClassName, className)}>
        { list.map((itemData, idx) => {
          return (
            <MentionableListItemComponent
              key={`list-item-${itemData.id}-key`}
              index={idx}
              onClickPlus={() => this.onClickPlusItem(itemData.id)}
              onComplete={this.onCompleteItem}
              onHide={this.onHideItem}
              {...itemData}
            />
          )
        })}
      </ul>
    );
  }
  /**
   * @param {String} itemId
   */
  onClickPlusItem(itemId) {
    const {mentionableListModel} = this.props;
    const list = mentionableListModel.get('list');

    // mark the item as the focused one
    mentionableListModel.focusItem(itemId);

    // update the mentions count
    const foundItem = list.find((item) => item.id === itemId);
    foundItem.mentions += 1;

    // then resort
    mentionableListModel.sortList();
  }
  /**
   * @param {String} itemId
   * @param {GestureEvent} gestureEvent
   */
  onCompleteItem(itemId, gestureEvent) {
    const {mentionableListModel} = this.props;
    mentionableListModel.toggleItemComplete(itemId, true);

    // then resort
    mentionableListModel.sortList();
  }
  /**
   * @param {String} itemId
   * @param {GestureEvent} gestureEvent
   */
  onHideItem(itemId, gestureEvent) {
    const {mentionableListModel} = this.props;
    mentionableListModel.toggleItemHidden(itemId, true);

    // then resort
    mentionableListModel.sortList();
  }
});
