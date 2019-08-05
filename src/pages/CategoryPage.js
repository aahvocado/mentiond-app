import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from 'common-components/ButtonComponent';

import CategoryListComponent from 'components/CategoryListComponent';

export default observer(
class CategoryPage extends Component {
  /** @override */
  static defaultProps = {
    /** @type {CategoryModel} */
    categoryModel: undefined,
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onChangeNewValue = this.onChangeNewValue.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);

    this.state = {
      /** @type {String} */
      newValue: '',
    }
  }
  /** @override */
  render() {
    const {
      categoryModel,
    } = this.props;

    const {
      newValue,
    } = this.state;

    if (categoryModel === undefined) {
      return <div>Loading</div>
    }

    return (
      <div className='flex-auto'>
        <h2 className='fsize-6 color-secondary-darker fontfamily-secondary flex-none talign-center adjacent-mar-t-3'>
          {categoryModel.get('category')}
        </h2>

        <div className='flex-col bg-white borradius-2 adjacent-mar-t-3'>
          <input
            className='fsize-4 width-full boxsizing-border talign-center pad-2 flex-none'
            placeholder='new mentionable name'
            value={newValue}
            onChange={this.onChangeNewValue}
          />

          <ButtonComponent
            className='fsize-3 width-full talign-center'
            disabled={newValue.length <= 0}
            onClick={this.onClickAdd}
          >
            Add New Mentionable
          </ButtonComponent>
        </div>

        <CategoryListComponent
          className='adjacent-mar-t-3'
          categoryModel={categoryModel}
        />
      </div>
    );
  }
  /**
   * @param {InputEvent} evt
   */
  onChangeNewValue(evt) {
    this.setState({newValue: evt.target.value});
  }
  /**
   *
   */
  onClickAdd() {
    const {
      categoryModel,
    } = this.props;

    const {
      newValue,
    } = this.state;

    // add to list
    categoryModel.addItem({label: newValue});

    // reset value
    this.setState({newValue: ''});
  }
});
