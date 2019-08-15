import React, { Component } from 'react';
import { useTransition } from 'react-spring';
import { observer } from 'mobx-react';

import CategoryViewItem from 'components/CategoryViewItem';

import combineClassNames from 'utilities/combineClassNames';

const ITEM_PADDING = 10;
const ITEM_HEIGHT = 60;
const ITEM_WRAPPER_HEIGHT = ITEM_HEIGHT + ITEM_PADDING;

function AnimatedList(props) {
  const {
    className,
    list,
  } = props;

  const animatedItems = useTransition(
    list,
    item => item.id,
    {
      from: (item) => ({ y: item.index * ITEM_WRAPPER_HEIGHT, opacity: 0}),
      leave: { opacity: 0 },
      enter: (item) => ({ y: item.index * ITEM_WRAPPER_HEIGHT, opacity: 1 }),
      update: (item) => ({ y: item.index * ITEM_WRAPPER_HEIGHT, opacity: 1 }),
    }
  );

  return (
    <div
      className={combineClassNames('', className)}
      style={{
        height: list.length * ITEM_WRAPPER_HEIGHT,
      }}
    >
      { animatedItems.map(({item, props}) => {
        return (
          <CategoryViewItem
            key={`list-item-${item.id}-key`}
            style={{
              height: ITEM_HEIGHT,
              transform: props.y.interpolate(y => `translateY(${y}px)`),
              opacity: props.opacity,
            }}
            {...item}
          />
        )
      })}
    </div>
  );
}

export default observer(
class CategoryView extends Component {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    baseClassName: 'position-relative flex-col',
    /** @type {String} */
    className: '',
    /** @type {CategoryModel} */
    categoryModel: [],
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onClickItem = this.onClickItem.bind(this);
    this.onClickPlusItem = this.onClickPlusItem.bind(this);
    this.onCompleteItem = this.onCompleteItem.bind(this);
    this.onUnCompleteItem = this.onUnCompleteItem.bind(this);
    this.onHideItem = this.onHideItem.bind(this);
    this.onUnHideItem = this.onUnHideItem.bind(this);
  }
  /** @override */
  render() {
    const {
      baseClassName,
      className,
      categoryModel,
    } = this.props;

    const list = categoryModel.get('list');
    const boundList = list.map((item) => ({
      ...item,
      onClickItem: (clickEvt) => this.onClickItem(item, clickEvt),
      onClickPlus: (clickEvt) => this.onClickPlusItem(item, clickEvt),
      onComplete: (gestureEvent) => this.onCompleteItem(item, gestureEvent),
      onUnComplete: (gestureEvent) => this.onUnCompleteItem(item, gestureEvent),
      onHide: (gestureEvent) => this.onHideItem(item, gestureEvent),
      onUnHide: (gestureEvent) => this.onUnHideItem(item, gestureEvent),
    }));

    return (
      <AnimatedList
        className={combineClassNames(baseClassName, className)}
        list={boundList}
      />
    );
  }
  /**
   * @param {Object} item
   */
  onClickItem(item) {
    const {categoryModel} = this.props;

    // mark the item as the focused if not
    if (!item.isFocused) {
      categoryModel.focusItem(item.id);
      return;
    }
  }
  /**
   * @param {Object} item
   */
  onClickPlusItem(item) {
    const {categoryModel} = this.props;

    // update the mentions count and then focus on it
    categoryModel.updateItemMentions(item.id, 1);
    categoryModel.focusItem(item.id);
  }
  /**
   * @param {Object} item
   * @param {GestureEvent} gestureEvent
   */
  onCompleteItem(item, gestureEvent) {
    const {categoryModel} = this.props;
    categoryModel.toggleItemComplete(item.id, true);
  }
  /**
   * @param {Object} item
   * @param {GestureEvent} gestureEvent
   */
  onUnCompleteItem(item, gestureEvent) {
    const {categoryModel} = this.props;
    categoryModel.toggleItemComplete(item.id, false);
  }
  /**
   * @param {Object} item
   * @param {GestureEvent} gestureEvent
   */
  onHideItem(item, gestureEvent) {
    const {categoryModel} = this.props;
    categoryModel.toggleItemHidden(item.id, true);
  }
  /**
   * @param {Object} item
   * @param {GestureEvent} gestureEvent
   */
  onUnHideItem(item, gestureEvent) {
    const {categoryModel} = this.props;
    categoryModel.toggleItemHidden(item.id, false);
  }
});
