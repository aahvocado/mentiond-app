import React, { Component, useRef } from 'react';
import { useSprings, useTransition, animated } from 'react-spring';
import { observer } from 'mobx-react';

import MentionableListItemComponent from 'components/MentionableListItemComponent';

import combineClassNames from 'utilities/combineClassNames';

const ITEM_Y = 70;
function AnimatedList(props) {
  const {
    list,
  } = props;

  const animatedItems = useTransition(
    list,
    item => item.id,
    {
      from: (item) => ({ y: item.index * ITEM_Y }),
      leave: { y: 0 },
      enter: (item) => ({ y: item.index * ITEM_Y }),
      update: (item) => ({ y: item.index * ITEM_Y }),
    }
  );

  return (
    <div className=''>
      { animatedItems.map(({item, props}) => {
        return (
          <animated.div
            key={`animated-item-${item.id}-key`}
            style={{
              transform: props.y.interpolate(y => `translateY(${y}px)`),
            }}
          >
            <MentionableListItemComponent
              key={`list-item-${item.id}-key`}
              {...item}
            />
          </animated.div>
        )
      })}
    </div>
  );
}

export default observer(
class MentionableListComponent extends Component {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    baseClassName: 'position-relative',
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
    const boundList = list.map((item) => ({
      ...item,
      onClickPlus: () => this.onClickPlusItem(item.id),
      onComplete: this.onCompleteItem,
      onHide: this.onHideItem,
    }));

    return (
      <div className={combineClassNames(baseClassName, className)}>
        <AnimatedList
          list={boundList}
        />
      </div>
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
    mentionableListModel.updateIndices();
  }
  /**
   * @param {String} itemId
   * @param {GestureEvent} gestureEvent
   */
  onCompleteItem(itemId, gestureEvent) {
    const {mentionableListModel} = this.props;
    mentionableListModel.toggleItemComplete(itemId, true);

    // then resort
    mentionableListModel.updateIndices();
  }
  /**
   * @param {String} itemId
   * @param {GestureEvent} gestureEvent
   */
  onHideItem(itemId, gestureEvent) {
    const {mentionableListModel} = this.props;
    mentionableListModel.toggleItemHidden(itemId, true);

    // then resort
    mentionableListModel.updateIndices();
  }
});
