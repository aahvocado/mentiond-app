import React, { Component } from 'react';
import { useTransition } from 'react-spring';
import { observer } from 'mobx-react';

import CategoryListViewItem from 'components/CategoryListViewItem';

import appState from 'state/appState';

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

export default observer(
class CategoryListView extends Component {
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

    this.onClickRemoveCategory = this.onClickRemoveCategory.bind(this);
    this.onClickSelectCategory = this.onClickSelectCategory.bind(this);
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
      onClickRemove: (clickEvt) => this.onClickRemoveCategory(categoryModel.get('id'), clickEvt),
      onClickSelect: (clickEvt) => this.onClickSelectCategory(categoryModel.get('id'), clickEvt),
    }));

    return (
      <AnimatedList
        className={combineClassNames(baseClassName, className)}
        list={boundList}
      />
    );
  }
  /**
   * @param {CategoryId} categoryId
   */
  onClickRemoveCategory(categoryId) {
    appState.deleteCategory(categoryId);
  }
  /**
   * @param {CategoryId} categoryId
   */
  onClickSelectCategory(categoryId) {
    appState.switchCategory(categoryId);
    appState.set({isOpenNavMenu: false});
  }
});
