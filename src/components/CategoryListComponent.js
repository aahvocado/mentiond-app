import React, { Component } from 'react';
import { useTransition } from 'react-spring';
import { observer } from 'mobx-react';

import CategoryListItemComponent from 'components/CategoryListItemComponent';

import combineClassNames from 'utilities/combineClassNames';

const CONTAINER_HEIGHT = '60vh';
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
      from: (item) => ({ y: item.index * ITEM_WRAPPER_HEIGHT }),
      leave: { y: 0 },
      enter: (item) => ({ y: item.index * ITEM_WRAPPER_HEIGHT }),
      update: (item) => ({ y: item.index * ITEM_WRAPPER_HEIGHT }),
    }
  );

  return (
    <div
      className={combineClassNames('overflow-auto', className)}
      style={{
        height: CONTAINER_HEIGHT,
      }}
    >
      { animatedItems.map(({item, props}) => {
        return (
          <CategoryListItemComponent
            key={`list-item-${item.id}-key`}
            style={{
              height: ITEM_HEIGHT,
              transform: props.y.interpolate(y => `translateY(${y}px)`),
            }}
            {...item}
          />
        )
      })}
    </div>
  );
}

export default observer(
class CategoryListComponent extends Component {
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

    this.onClickPlusItem = this.onClickPlusItem.bind(this);
    this.onCompleteItem = this.onCompleteItem.bind(this);
    this.onHideItem = this.onHideItem.bind(this);
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
      onClickPlus: () => this.onClickPlusItem(item.id),
      onComplete: this.onCompleteItem,
      onHide: this.onHideItem,
    }));

    return (
      <AnimatedList
        className={combineClassNames(baseClassName, className)}
        list={boundList}
      />
    );
  }
  /**
   * @param {String} itemId
   */
  onClickPlusItem(itemId) {
    const {categoryModel} = this.props;
    const list = categoryModel.get('list');

    // mark the item as the focused one
    categoryModel.focusItem(itemId);

    // update the mentions count
    const foundItem = list.find((item) => item.id === itemId);
    foundItem.mentions += 1;

    // then resort
    categoryModel.updateIndices();
  }
  /**
   * @param {String} itemId
   * @param {GestureEvent} gestureEvent
   */
  onCompleteItem(itemId, gestureEvent) {
    const {categoryModel} = this.props;
    categoryModel.toggleItemComplete(itemId, true);

    // then resort
    categoryModel.updateIndices();
  }
  /**
   * @param {String} itemId
   * @param {GestureEvent} gestureEvent
   */
  onHideItem(itemId, gestureEvent) {
    const {categoryModel} = this.props;
    categoryModel.toggleItemHidden(itemId, true);

    // then resort
    categoryModel.updateIndices();
  }
});
