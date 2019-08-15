import React, { Component } from 'react';
import { useTransition } from 'react-spring';

import CategoryListViewItem from 'components/CategoryListViewItem';

import combineClassNames from 'utilities/combineClassNames';

const ITEM_PADDING = 10;
const ITEM_HEIGHT = 30;
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
      leave: {},
      enter: (item) => ({ y: item.index * ITEM_WRAPPER_HEIGHT }),
      update: (item) => ({ y: item.index * ITEM_WRAPPER_HEIGHT }),
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
          <CategoryListViewItem
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

export default class CategoryListView extends Component {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    baseClassName: 'position-relative flex-col adjacent-mar-t-2',
    /** @type {String} */
    className: '',
    /** @type {Array<CategoryModel>} */
    list: [],
  };
  /** @override */
  constructor(props) {
    super(props);

    // this.onClickItem = this.onClickItem.bind(this);
    // this.onClickPlusItem = this.onClickPlusItem.bind(this);
    // this.onCompleteItem = this.onCompleteItem.bind(this);
    // this.onUnCompleteItem = this.onUnCompleteItem.bind(this);
    // this.onHideItem = this.onHideItem.bind(this);
    // this.onUnHideItem = this.onUnHideItem.bind(this);
  }
  /** @override */
  render() {
    const {
      baseClassName,
      className,
      list,
    } = this.props;

    const boundList = list.map((categoryModel) => ({
      categoryModel: categoryModel,
      id: categoryModel.get('id'),
      index: categoryModel.get('index'),
      // onClickItem: (clickEvt) => this.onClickItem(item, clickEvt),
      // onClickPlus: (clickEvt) => this.onClickPlusItem(item, clickEvt),
      // onComplete: (gestureEvent) => this.onCompleteItem(item, gestureEvent),
      // onUnComplete: (gestureEvent) => this.onUnCompleteItem(item, gestureEvent),
      // onHide: (gestureEvent) => this.onHideItem(item, gestureEvent),
      // onUnHide: (gestureEvent) => this.onUnHideItem(item, gestureEvent),
    }));

    return (
      <AnimatedList
        className={combineClassNames(baseClassName, className)}
        list={boundList}
      />
    );
  }
};
