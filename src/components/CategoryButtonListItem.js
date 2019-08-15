import React, { PureComponent } from 'react';

import {
  faTrash,
 } from '@fortawesome/free-solid-svg-icons';

import ButtonComponent, {BUTTON_THEME} from 'common-components/ButtonComponent';
import IconButtonComponent from 'common-components/IconButtonComponent';

/**
 *
 */
export default class CategoryButtonListItem extends PureComponent {
  static defaultProps = {
    /** @type {CategoryModel} */
    categoryModel: undefined,
    /** @type {Function} */
    onClickRemove: () => {},
    /** @type {Function} */
    onClickSelect: () => {},
  };
  /** @override */
  render() {
    const {
      categoryModel,
      onClickRemove,
      onClickSelect,
    } = this.props;

    return (
      <div className='flex-row borradius-2 bor-1-gray adjacent-mar-t-1'>
        <IconButtonComponent
          className='flex-none pad-2 adjacent-mar-l-1 bor-r-1-gray'
          theme={BUTTON_THEME.TRANSPARENT_GRAY}
          icon={faTrash}
          onClick={onClickRemove}
        />

        <ButtonComponent
          className='flex-auto pad-2 adjacent-mar-l-1'
          theme={BUTTON_THEME.TRANSPARENT_GRAY}
          onClick={onClickSelect}
        >
          {categoryModel.get('name')}
        </ButtonComponent>
      </div>
    )
  }
}
