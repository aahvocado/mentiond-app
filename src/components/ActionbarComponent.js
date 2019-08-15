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

    return (
      <div
        className={combineClassNames('flex-row bg-primary-darker', className)}
        style={{
          boxShadow:'0 -5px 10px rgba(212, 227, 232, 1)',
        }}
      >
        {/* new mentionable form */}
        <form
          className='flex-auto flex-row adjacent-mar-t-3'
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
}
