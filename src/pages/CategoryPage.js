import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from 'common-components/ButtonComponent';
import SlideGestureComponent from 'common-components/SlideGestureComponent';

import CategoryListComponent from 'components/CategoryListComponent';

import combineClassNames from 'utilities/combineClassNames';

export default observer(
class CategoryPage extends Component {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
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
      className,
      categoryModel,
    } = this.props;

    const {
      newValue,
    } = this.state;

    if (categoryModel === undefined) {
      return <div>Loading</div>
    }

    return (
      <div
        className={combineClassNames('flex-col', className)}
      >
        {/* header bar */}
        <div className='flex-none flex-row-center width-full adjacent-mar-t-3'>
          <h2 className='fsize-6 color-secondary-darker fontfamily-secondary flex-auto'>
            {categoryModel.get('category')}
          </h2>
        </div>

        {/* new mentionable form */}
        <form
          className='flex-none flex-row adjacent-mar-t-3'
          onSubmit={this.onClickAdd}
        >
          <input
            className='fsize-3 bg-white borradius-l-2 flex-auto boxsizing-border pad-v-1 pad-h-2'
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
