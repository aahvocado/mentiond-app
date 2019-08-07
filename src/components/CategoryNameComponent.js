import React, { PureComponent } from 'react';

import combineClassNames from 'utilities/combineClassNames';

export default class CategoryNameComponent extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
    /** @type {Function} */
    onChange: () => {},
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onChangeNewValue = this.onChangeNewValue.bind(this);

    this.state = {
      /** @type {String} */
      value: props.value,
    }
  }
  /** @override */
  render() {
    const {
      className,
      ...otherProps
    } = this.props;

    const {
      value,
    } = this.state;

    return (
      <input
        {...otherProps}
        className={combineClassNames('white-text-shadow text-ellipsis fsize-6 talign-center color-primary-darker fontfamily-primary flex-auto bor-2-transparent focus:borcolor-white', className)}
        placeholder='Category name...'
        value={value}
        onChange={this.onChangeNewValue}
      />
    );
  }
  /**
   * @param {InputEvent} evt
   */
  onChangeNewValue(evt) {
    const value = evt.target.value;

    this.setState({value: evt.target.value});

    this.props.onChange(value);
  }
};
