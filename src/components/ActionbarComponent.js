import React, { PureComponent } from 'react';

import ButtonComponent, {BUTTON_THEME} from 'common-components/ButtonComponent';

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

    this.onClickAddCategory = this.onClickAddCategory.bind(this);
  }
  /** @override */
  render() {
    const {
      className,
    } = this.props;

    return (
      <div
        className={combineClassNames('flex-row bg-primary-darker', className)}
        style={{
          boxShadow:'0 -1px 10px #80959c',
        }}
      >
        <ButtonComponent
          className='pad-2'
          theme={BUTTON_THEME.TRANSPARENT_SECONDARY_DARKER}
          disabled={appState.get('isViewingNewCategory')}
          onClick={this.onClickAddCategory}
        >
          Add Category
        </ButtonComponent>
      </div>
    );
  }
  /**
   *
   */
  onClickAddCategory() {
    const newCategoryModel = appState.createCategory();
    appState.switchCategory(newCategoryModel.get('id'));
  }
}
