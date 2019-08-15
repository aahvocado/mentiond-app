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
        className='flex-auto'
        theme={BUTTON_THEME.WHITE}
        {...otherProps}
      >
        {categoryModel.get('name')}
      </ButtonComponent>
    )
  }
}
