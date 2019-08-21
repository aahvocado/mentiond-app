import React, { PureComponent } from 'react';

import ButtonComponent from 'common-components/ButtonComponent';

import appState from 'state/appState';

import combineClassNames from 'utilities/combineClassNames';

export default class ActionbarComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onClickAddItem = this.onClickAddItem.bind(this);

    this.state = {
      /** @type {String} */
      searchValue: '',
      /** @type {Boolean} */
      isInputDisabled: false,
    }
  }
  /** @override */
  render() {
    const {
      className,
      isInputDisabled,
    } = this.props;

    const {
      searchValue,
    } = this.state;

    return (
      <form
        className={combineClassNames('flex-auto flex-row adjacent-mar-t-3', className)}
        onSubmit={this.onClickAddItem}
      >
        <input
          className={combineClassNames('bg-white borradius-l-2 flex-auto boxsizing-border pad-v-1 pad-h-2', isInputDisabled ? 'bg-light-gray' : '')}
          style={{fontSize: 18}}
          placeholder='Add a Mentionable...'
          value={searchValue}
          disabled={isInputDisabled}
          onChange={(evt) => this.setState({searchValue: evt.target.value})}
        />

        <ButtonComponent
          className='fsize-3 flex-none borradius-r-2 talign-center'
          disabled={searchValue.length <= 0 || isInputDisabled}
          onClick={this.onClickAddItem}
        >
          Add
        </ButtonComponent>
      </form>
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
}
