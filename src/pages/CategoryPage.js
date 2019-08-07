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

    this.onChangeNewValue = this.onChangeNewValue.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);

    this.state = {
      /** @type {String} */
      categoryValue: '',
    }
  }
  /** @override */
  render() {
    const {
      className,
    } = this.props;

    const {
      categoryValue,
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
          />
        </div>

        {/* new mentionable form */}
        <form
          className='flex-none flex-row adjacent-mar-t-3'
          onSubmit={this.onClickAdd}
        >
          <input
            className='fsize-3 bg-white borradius-l-2 flex-auto boxsizing-border pad-v-1 pad-h-2'
            placeholder='Add a Mentionable...'
            value={categoryValue}
            onChange={this.onChangeNewValue}
          />

          <ButtonComponent
            className='fsize-3 flex-none borradius-r-2 talign-center'
            disabled={categoryValue.length <= 0}
            onClick={this.onClickAdd}
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
   * @param {InputEvent} evt
   */
  onChangeNewValue(evt) {
    this.setState({categoryValue: evt.target.value});
  }
  /**
   *
   */
  onClickAdd() {
    const categoryModel = appState.get('currentCategoryModel');

    const {
      categoryValue,
    } = this.state;

    // add to list
    categoryModel.addItem({label: categoryValue});

    // reset value
    this.setState({categoryValue: ''});
  }
});
