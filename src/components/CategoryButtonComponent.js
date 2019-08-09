import React, { PureComponent } from 'react';

import ButtonComponent from 'common-components/ButtonComponent';
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
        className='borradius-2 bor-1-gray pad-3 adjacent-mar-t-2'
        {...otherProps}
      >
        {categoryModel.get('name')}
      </ButtonComponent>
    )
  }
}
