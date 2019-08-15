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
  componentDidUpdate(prevProps, prevState) {
    // if received a new default value
    if (prevProps.value !== this.props.value) {
      this.setState({value: this.props.value});
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
        className={combineClassNames('white-text-shadow text-ellipsis fsize-6 talign-center color-secondary fontfamily-primary flex-auto bor-2-transparent focus:borcolor-white focus:bg-white', className)}
        placeholder='new category name...'
        value={value}
        onChange={this.onChangeNewValue}
      />
    );
  }
  /**
   * @param {InputEvent} evt
   */
  onChangeNewValue(evt) {
    this.setState({value: evt.target.value});

    this.props.onChange(evt);
  }
};
