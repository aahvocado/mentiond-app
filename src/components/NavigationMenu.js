import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from 'common-components/ButtonComponent';
import FixedMenuComponent from 'common-components/FixedMenuComponent';

// import CategoryListComponent from 'components/CategoryListComponent';
import appState from 'state/appState';

export default observer(
class NavigationMenu extends Component {
  /** @override */
  static defaultProps = {
    /** @type {Boolean} */
    // isActive: false,
  };
  /** @override */
  constructor(props) {
    super(props);

    // this.onClickOverlay = this.onClickOverlay.bind(this);
  }
  /** @override */
  render() {
    const {
      // isActive,
    } = this.props;

    const isActive = appState.get('isOpenNavMenu');

    return (
      <Fragment>
        <ButtonComponent
          className='position-absolute mar-3'
          style={{
            top: 0,
            left: 0,
          }}
          onClick={() => appState.set({isOpenNavMenu: true})}
        >
          Menu
        </ButtonComponent>

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
        </FixedMenuComponent>
      </Fragment>
    );
  }

});
