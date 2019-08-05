import React, { Component } from 'react';
import { observer } from 'mobx-react';

// import ButtonComponent from 'common-components/ButtonComponent';
import FixedMenuComponent from 'common-components/FixedMenuComponent';

// import CategoryListComponent from 'components/CategoryListComponent';

export default observer(
class NavigationMenu extends Component {
  /** @override */
  static defaultProps = {
    /** @type {Boolean} */
    isActive: false,
  };
  /** @override */
  constructor(props) {
    super(props);
  }
  /** @override */
  render() {
    const {
      isActive,
    } = this.props;

    return (
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
      >
        Navigation Menu
      </FixedMenuComponent>
    );
  }
});
