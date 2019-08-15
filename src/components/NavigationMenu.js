import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';

import {
  faBars,
  faCode,
  faCodeBranch,
  faEnvelope,
  faTrashAlt,
 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ButtonComponent, { BUTTON_THEME } from 'common-components/ButtonComponent';
import IconButtonComponent from 'common-components/IconButtonComponent';
import FixedMenuComponent from 'common-components/FixedMenuComponent';

import CategoryListView from 'components/CategoryListView';

import storageController from 'data/storageController';

// import CategoryView from 'components/CategoryView';
import appState from 'state/appState';

export default observer(
class NavigationMenu extends Component {
  /** @override */
  constructor(props) {
    super(props);

    this.onClickAddCategory = this.onClickAddCategory.bind(this);
    this.onClickRemoveCategory = this.onClickRemoveCategory.bind(this);
    this.onClickSelectCategory = this.onClickSelectCategory.bind(this);

    this.state = {
      /** @type {Boolean} */
      isShowingEmail: false,
    }
  }
  /** @override */
  render() {
    const {
      isShowingEmail,
    } = this.state;

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
          {/* primary menu */}
          <div className='flex-auto width-full adjacent-mar-t-2'>
            <ButtonComponent
              className='talign-left borradius-2 width-full fsize-3 pad-2 adjacent-mar-t-2'
              onClick={() => appState.set({isOpenNavMenu: false})}
            >
              <FontAwesomeIcon className='mar-r-2' icon={faBars} /> Close
            </ButtonComponent>

            <h3 className='color-grayer adjacent-mar-t-2'>
              Categories
            </h3>

            <ButtonComponent
              className='width-full pad-2 borradius-2 flex-none adjacent-mar-t-2'
              theme={BUTTON_THEME.WHITE}
              disabled={appState.get('isViewingNewCategory')}
              onClick={this.onClickAddCategory}
            >
              New Category
            </ButtonComponent>

            {/*<CategoryListView
              list={categoryCollection}
            />*/}

            {/*<div className='flex-col overflow-auto mar-t-3 width-full adjacent-mar-t-2'>
              { categoryCollection.map((categoryModel) => (
                <CategoryListViewItem
                  key={`category-item-${categoryModel.get('id')}-key`}
                  categoryModel={categoryModel}
                  onClickRemove={() => this.onClickRemoveCategory(categoryModel.get('id'))}
                  onClickSelect={() => this.onClickSelectCategory(categoryModel.get('id'))}
                />
              ))}
            </div>*/}
          </div>

          {/* info section */}
          <div className='flex-none width-full adjacent-mar-t-2'>
            <div className='fsize-3 adjacent-mar-t-1'>
              Daniel Xiao made this
            </div>

            { isShowingEmail &&
              <div className='fsize-3 adjacent-mar-t-1'
              >
                daniel.b.xiao@gmail.com
              </div>
            }

            <div className='flex-row-center adjacent-mar-t-1'>
              <IconButtonComponent
                className='adjacent-mar-l-2'
                icon={faCodeBranch}
                onClick={() => {
                  window.open('https://github.com/aahvocado/mentiond-app', '_blank');
                }}
              />

              <IconButtonComponent
                className='adjacent-mar-l-2'
                icon={faCode}
                onClick={() => {
                  window.open('http://elementten.com/', '_blank');
                }}
              />

              <IconButtonComponent
                className='adjacent-mar-l-2'
                icon={faEnvelope}
                onClick={() => this.setState({isShowingEmail: !isShowingEmail})}
              />
            </div>
          </div>

          {/* secret menu options */}
          { appState.get('isDebugMode') &&
            <div className='flex-none width-full adjacent-mar-t-2'>
              <IconButtonComponent
                className='pad-1 flex-none'
                icon={faTrashAlt}
                onClick={() => storageController.clear()}
              />
            </div>
          }
        </FixedMenuComponent>
      </Fragment>
    );
  }
  /**
   * @param {CategoryId} categoryId
   */
  onClickRemoveCategory(categoryId) {
    appState.deleteCategory(categoryId);
  }
  /**
   * @param {CategoryId} categoryId
   */
  onClickSelectCategory(categoryId) {
    appState.switchCategory(categoryId);
    appState.set({isOpenNavMenu: false});
  }
  /**
   *
   */
  onClickAddCategory() {
    const newCategoryModel = appState.createCategory();
    appState.switchCategory(newCategoryModel.get('id'));
    appState.set({isOpenNavMenu: false});
  }
});
