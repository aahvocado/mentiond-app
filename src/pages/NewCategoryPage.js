import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from 'common-components/ButtonComponent';

import CategoryNameComponent from 'components/CategoryNameComponent';

import CategoryModel from 'models/CategoryModel';

import appState from 'state/appState';

import combineClassNames from 'utilities/combineClassNames';

export default observer(
class NewCategoryPage extends Component {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onChangeNewValue = this.onChangeNewValue.bind(this);
    this.onClickCreate = this.onClickCreate.bind(this);

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

    return (
      <form
        className={combineClassNames('flex-auto flex-col', className)}
        onClick={this.onClickCreate}
      >
        {/* form */}
        <div className='flex-none flex-row-center width-full adjacent-mar-t-3'>
          <CategoryNameComponent
            value={categoryValue}
            onChange={(newValue) => this.setState({categoryValue: newValue})}
          />
        </div>

        <ButtonComponent
          className='flex-none borradius-2 adjacent-mar-t-3'
          disabled={categoryValue.length <= 0}
          onClick={this.onClickCreate}
        >
          Create!
        </ButtonComponent>
      </form>
    );
  }
  /**
   * @param {InputEvent} evt
   */
  onChangeNewValue(evt) {
    this.setState({categoryValue: evt.target.value});
  }
  /**
   * creates the new category
   *
   * @param {Event} evt
   */
  onClickCreate(evt) {
    evt.preventDefault();

    const { categoryValue } = this.state;
    if (categoryValue.length <= 0) {
      return;
    }

    const categoryModel = new CategoryModel({
      name: categoryValue,
    });

    const mentionableCollection = appState.get('mentionableCollection');
    mentionableCollection.push(categoryModel);
  }
});
