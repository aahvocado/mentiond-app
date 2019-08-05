import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent, {BUTTON_THEME} from 'common-components/ButtonComponent';

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
        {/* header bar */}
        <div className='flex-row-center width-full adjacent-mar-t-3'>
          <ButtonComponent
            className='fsize-6 pad-h-2 pad-v-1'
            theme={BUTTON_THEME.TRANSPARENT_SECONDARY}
          >
            =
          </ButtonComponent>

          <h2 className='fsize-6 color-secondary-darker fontfamily-secondary flex-auto talign-center'>
            {categoryModel.get('category')}
          </h2>
        </div>

        <form
          className='flex-row adjacent-mar-t-3'
          onSubmit={this.onClickAdd}
        >
          <input
            className='fsize-3 bg-white borradius-l-2 flex-auto boxsizing-border talign-center pad-1'
            placeholder='Add a Mentionable...'
            value={newValue}
            onChange={this.onChangeNewValue}
          />

          <ButtonComponent
            className='fsize-3 flex-none borradius-r-2 talign-center'
            disabled={newValue.length <= 0}
            onClick={this.onClickAdd}
          >
            Add
          </ButtonComponent>
        </form>

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
