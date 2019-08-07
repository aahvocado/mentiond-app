import React, { PureComponent } from 'react';

import ButtonComponent, {BUTTON_THEME} from 'common-components/ButtonComponent';

import combineClassNames from 'utilities/combineClassNames';

export default class FooterComponent extends PureComponent {
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
        className={combineClassNames('flex-row width-full bor-t-2-primary-darker', className)}
        style={{
          bottom: 0,
        }}
      >
        <ButtonComponent
          theme={BUTTON_THEME.TRANSPARENT_SECONDARY}
        >
          Add Category
        </ButtonComponent>
      </div>
    );
  }
}
