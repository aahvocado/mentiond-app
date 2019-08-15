import React, { Component } from 'react';
import { observer } from 'mobx-react';

// import ButtonComponent from 'common-components/ButtonComponent';

import CategoryListComponent from 'components/CategoryListComponent';
import CategoryNameComponent from 'components/CategoryNameComponent';

import appState from 'state/appState';

import combineClassNames from 'utilities/combineClassNames';

export default observer(
class CategoryPage extends Component {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
  }
  /** @override */
  render() {
    const {
      className,
    } = this.props;

    const categoryModel = appState.get('currentCategoryModel');
    if (categoryModel === undefined) {
      return <div>Loading</div>
    }

    return (
      <div
        className={combineClassNames('flex-auto flex-col', className)}
      >
        {/* header bar */}
        <div className='flex-none flex-row-center width-full adjacent-mar-t-3'>
          <CategoryNameComponent
            value={categoryModel.get('name')}
            onBlur={this.onChangeCategoryName}
          />
        </div>


        {/* the list */}
        <CategoryListComponent
          className='flex-auto adjacent-mar-t-3'
          categoryModel={categoryModel}
        />
      </div>
    );
  }
  /**
   * @param {Event} evt
   */
  onChangeCategoryName(evt) {
    const categoryModel = appState.get('currentCategoryModel');
    if (categoryModel === undefined) {
      return;
    }

    categoryModel.set({name: evt.target.value});
  }
});
