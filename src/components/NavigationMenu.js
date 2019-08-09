import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import ButtonComponent, { BUTTON_THEME } from 'common-components/ButtonComponent';
import IconButtonComponent from 'common-components/IconButtonComponent';
import FixedMenuComponent from 'common-components/FixedMenuComponent';

import CategoryButtonComponent from 'components/CategoryButtonComponent';

// import CategoryListComponent from 'components/CategoryListComponent';
import appState from 'state/appState';

export default observer(
class NavigationMenu extends Component {
  /** @override */
  constructor(props) {
    super(props);

    this.onClickCategory = this.onClickCategory.bind(this);
  }
  /** @override */
  render() {
    const isActive = appState.get('isOpenNavMenu');
    const categoryCollection = appState.get('categoryCollection').filter((categoryModel) => !categoryModel.get('isNew'));

    return (
      <Fragment>
        <IconButtonComponent
          className='pad-2'
          style={{
            top: 0,
            left: 0,
          }}
          theme={BUTTON_THEME.TRANSPARENT_PRIMARY}
          icon={faBars}
          onClick={() => appState.set({isOpenNavMenu: true})}
        >
          Menu
        </IconButtonComponent>

        <FixedMenuComponent
          className='bg-white overflow-auto boxsizing-border flex-col aitems-center height-full talign-center'
          style={{
            boxShadow: '5px 0 3px 0 rgba(0, 0, 0, 0.4)',
            width: '250px',
          }}
          active={isActive}
          direction='right'
          location='left'
          shouldUseOverlay={true}
          onClickOverlay={() => appState.set({isOpenNavMenu: false})}
        >
          <ButtonComponent
            className='width-full'
            onClick={() => appState.set({isOpenNavMenu: false})}
          >
            Close
          </ButtonComponent>

          Navigation Menu

          <div className='flex-col mar-t-3 width-full'>
            { categoryCollection.map((categoryModel) => (
              <CategoryButtonComponent
                key={`category-item-${categoryModel.get('id')}-key`}
                categoryModel={categoryModel}
                onClick={() => this.onClickCategory(categoryModel.get('id'))}
              />
            ))}
          </div>
        </FixedMenuComponent>
      </Fragment>
    );
  }
  /**
   * @param {CategoryId} categoryId
   */
  onClickCategory(categoryId) {
    appState.switchCategory(categoryId);
    appState.set({isOpenNavMenu: false});
  }
});
