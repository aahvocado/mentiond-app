import Model from 'models/Model';

export default class OrganizedListModel extends Model {
  /** @override */
  constructor(newAttributes = {}) {
    super({
      /** @type {String} */
      type: '',
      /** @type {Array} */
      list: [],
      /** @type {Object} */
      ...newAttributes,
    });

    this.sortList();
  }
  /**
   *
   */
  sortList() {
    const list = this.get('list');

    // sort by mention count
    const sortedList = list.slice().sort((itemOne, itemTwo) => {
      return itemTwo.mentions - itemOne.mentions;
    });

    list.replace(sortedList);
  }
}
