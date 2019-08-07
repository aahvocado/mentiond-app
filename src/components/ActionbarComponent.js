import React, { PureComponent } from 'react';

import ButtonComponent, {BUTTON_THEME} from 'common-components/ButtonComponent';

import combineClassNames from 'utilities/combineClassNames';

export default class ActionbarComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
  };
  /** @override */
  render() {
    const {
      className,
    } = this.props;

    return (
      <div
        className={combineClassNames('flex-row bor-t-1-primary-darker', className)}
      >
        <ButtonComponent
          className='pad-2'
          theme={BUTTON_THEME.TRANSPARENT_PRIMARY}
        >
          Add Category
        </ButtonComponent>
      </div>
    );
  }
}
