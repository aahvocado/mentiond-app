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
   * sorts the the current list with highest number of mentions at the top
   */
  sortList() {
    const list = this.get('list');

    // sort by mention count
    const sortedList = list.slice().sort((itemOne, itemTwo) => {
      return itemTwo.mentions - itemOne.mentions;
    });

    list.replace(sortedList);
  }
  /**
   * @param {String} itemId
   */
  focusItem(itemId) {
    const list = this.get('list');
    list.forEach((item) => {
      const willBeFocused = item.id === itemId;
      if (willBeFocused) {
        item.isFocused = true;
      } else {
        item.isFocused = false;
      };
    })
  }
}
