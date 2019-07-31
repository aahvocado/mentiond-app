import Model from 'models/Model';

const itemSchema = {
  id: undefined,
  label: '',
  mentions: 0,
};

export default class OrganizedListModel extends Model {
  /** @override */
  constructor(newAttributes = {}) {
    super({
      /** @type {String} */
      category: '',
      /** @type {Array} */
      list: [],
      /** @type {Object} */
      ...newAttributes,
    });

    this.sortList();
  }
  /**
   * adds a new item to the list
   *
   * @param {Object} [newData] - any data to prepopulate the `itemSchema`
   */
  addNew(newData = {}) {
    const list = this.get('list');
    list.push({
      ...itemSchema,
      ...newData,
    });
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
