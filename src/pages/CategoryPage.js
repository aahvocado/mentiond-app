import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from 'common-components/ButtonComponent';

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

    this.onClickAddItem = this.onClickAddItem.bind(this);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);

    this.state = {
      /** @type {String} */
      searchValue: '',
    }
  }
  /** @override */
  render() {
    const {
      className,
    } = this.props;

    const {
      searchValue,
    } = this.state;

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

        {/* new mentionable form */}
        <form
          className='flex-none flex-row adjacent-mar-t-3'
          onSubmit={this.onClickAddItem}
        >
          <input
            className='fsize-3 bg-white borradius-l-2 flex-auto boxsizing-border pad-v-1 pad-h-2'
            placeholder='Add a Mentionable...'
            value={searchValue}
            onChange={(evt) => this.setState({searchValue: evt.target.value})}
          />

          <ButtonComponent
            className='fsize-3 flex-none borradius-r-2 talign-center'
            disabled={searchValue.length <= 0}
            onClick={this.onClickAddItem}
          >
            Add
          </ButtonComponent>
        </form>

        {/* the list */}
        <CategoryListComponent
          className='flex-auto adjacent-mar-t-3'
          categoryModel={categoryModel}
        />
      </div>
    );
  }
  /**
   *
   */
  onClickAddItem() {
    const {
      searchValue,
    } = this.state;

    // add to list
    const categoryModel = appState.get('currentCategoryModel');
    categoryModel.addItem({label: searchValue});

    // reset value
    this.setState({searchValue: ''});
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
