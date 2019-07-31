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

    this.onClickAdd = this.onClickAdd.bind(this);
  }
  /** @override */
  render() {
    const {
      organizedListModel,
    } = this.props;

    return (
      <div className='flex-auto'>
        <ButtonComponent
          className='fsize-3 width-full talign-center flex-none mar-b-3'
          onClick={this.onClickAdd}
        >
          Add New Mentionable
        </ButtonComponent>

        <ListComponent
          organizedListModel={organizedListModel}
        />
      </div>
    );
  }
  /**
   *
   */
  onClickAdd() {
    const {
      organizedListModel,
    } = this.props;

    organizedListModel.addNew();
  }
});
