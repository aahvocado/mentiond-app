import React, { PureComponent } from 'react';

import ButtonComponent, {BUTTON_THEME} from 'common-components/ButtonComponent';

import appState from 'state/appState';

import combineClassNames from 'utilities/combineClassNames';

export default class ActionbarComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
    /** @type {Boolean} */
    canAddNewCategory: false,
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
      canAddNewCategory,
    } = this.props;

    return (
      <div
        className={combineClassNames('flex-row jcontent-end bg-primary-darker', className)}
        style={{
          boxShadow:'0 -5px 10px rgba(212, 227, 232, 1)',
        }}
      >
        <ButtonComponent
          className='pad-2'
          theme={BUTTON_THEME.TRANSPARENT_SECONDARY_DARKER}
          disabled={!canAddNewCategory}
          onClick={this.onClickAddCategory}
        >
          New Category
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
