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
      <div className='flex-row adjacent-mar-t-1'>
        <IconButtonComponent
          className='flex-none adjacent-mar-l-1'
          theme={BUTTON_THEME.WHITE}
          icon={faTrash}
          onClick={onClickRemove}
        />

        <ButtonComponent
          className='flex-auto adjacent-mar-l-1'
          theme={BUTTON_THEME.WHITE}
          onClick={onClickSelect}
        >
          {categoryModel.get('name')}
        </ButtonComponent>
      </div>
    )
  }
}
