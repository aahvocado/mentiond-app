import React, { PureComponent } from 'react';

import ButtonComponent, {BUTTON_THEME} from 'common-components/ButtonComponent';
/**
 *
 */
export default class CategoryButtonComponent extends PureComponent {
  static defaultProps = {
    /** @type {CategoryModel} */
    categoryModel: undefined,

  };
  /** @override */
  render() {
    const {
      categoryModel,
      ...otherProps
    } = this.props;

    return (
      <ButtonComponent
        className='flex-auto borradius-2 bor-1-gray pad-2'
        theme={BUTTON_THEME.NONE}
        {...otherProps}
      >
        {categoryModel.get('name')}
      </ButtonComponent>
    )
  }
}
