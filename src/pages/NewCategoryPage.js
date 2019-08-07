import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from 'common-components/ButtonComponent';

import CategoryNameComponent from 'components/CategoryNameComponent';

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
      <div
        className={combineClassNames('flex-auto flex-col', className)}
      >
        {/* header bar */}
        <div className='flex-none flex-row-center width-full adjacent-mar-t-3'>
          <CategoryNameComponent
            value={categoryValue}
          />
        </div>

        <ButtonComponent
          className='flex-none borradius-2 adjacent-mar-t-3'
        >
          Create!
        </ButtonComponent>
      </div>
    );
  }
  /**
   * @param {InputEvent} evt
   */
  onChangeNewValue(evt) {
    this.setState({categoryValue: evt.target.value});
  }
});
