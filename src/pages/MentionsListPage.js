import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from 'common-components/ButtonComponent';

import ListComponent from 'components/ListComponent';

export default observer(
class MentionsListPage extends Component {
  /** @override */
  static defaultProps = {
    /** @type {OrganizedListModel} */
    organizedListModel: [],
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onChangeNewValue = this.onChangeNewValue.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);

    this.state = {
      /** @type {String} */
      newValue: '',
    }
  }
  /** @override */
  render() {
    const {
      organizedListModel,
    } = this.props;

    const {
      newValue,
    } = this.state;

    return (
      <div className='flex-auto'>

        <div className='flex-col bg-white borradius-2 flex-none mar-b-3'>
          <input
            className='fsize-4 width-full boxsizing-border talign-center pad-2 flex-none'
            placeholder='name for a new mentionable'
            value={newValue}
            onChange={this.onChangeNewValue}
          />
          <ButtonComponent
            className='fsize-3 width-full talign-center'
            disabled={newValue.length <= 0}
            onClick={this.onClickAdd}
          >
            Add New Mentionable
          </ButtonComponent>
        </div>

        <ListComponent
          organizedListModel={organizedListModel}
        />
      </div>
    );
  }
  /**
   * @param {InputEvent} evt
   */
  onChangeNewValue(evt) {
    this.setState({newValue: evt.target.value});
  }
  /**
   *
   */
  onClickAdd() {
    const {
      organizedListModel,
    } = this.props;

    const {
      newValue,
    } = this.state;

    // add to list
    organizedListModel.addNew({label: newValue});

    // reset value
    this.setState({newValue: ''});
  }
});
