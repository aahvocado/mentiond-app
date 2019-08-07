import React, { PureComponent } from 'react';

import ButtonComponent from 'common-components/ButtonComponent';

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
        className={combineClassNames('flex-row width-full', className)}
        style={{
          bottom: 0,
        }}
      >
        <ButtonComponent>
          Add Category
        </ButtonComponent>
      </div>
    );
  }
}
