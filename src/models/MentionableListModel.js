import Model from 'models/Model';

/**
 * data structure of a mentionable item
 *
 * @type {Object}
 */
const mentionableItemSchema = {
  id: undefined,
  label: '',
  mentions: 0,
  isComplete: false,
  isHidden: false,
};
/**
 * manages list of Mentionables
 */
export default class MentionableListModel extends Model {
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
   * finds an item by its `itemId`
   *
   * @param {String} itemId
   */
  getItem(itemId) {
    const list = this.get('list');
    return list.find((item) => item.id === itemId);
  }
  /**
   * adds a new item to the list
   *
   * @param {Object} [newData] - any data to prepopulate the `mentionableItemSchema`
   */
  addItem(newData = {}) {
    const list = this.get('list');
    list.push({
      ...mentionableItemSchema,
      ...newData,
    });
  }
  /**
   * removes an a new item to the list
   *
   * @param {String} itemId
   */
  removeItem(itemId) {
    const list = this.get('list');
    const itemIdx = list.findIndex((item) => item.id === itemId);
    if (itemIdx === undefined) {
      return;
    }

    list.splice(itemIdx, 1);
  }
  /**
   * changes the state of completion of an item
   *
   * @param {String} itemId
   * @param {Boolean} [willBeComplete]
   */
  toggleItemComplete(itemId, willBeComplete) {
    const item = this.getItem(itemId);
    if (item === undefined) {
      return;
    }

    if (willBeComplete !== undefined) {
      item.isComplete = Boolean(willBeComplete);
    } else {
      item.isComplete = !item.isComplete;
    }
  }
  /**
   * changes the state of completion of an item
   *
   * @param {String} itemId
   * @param {Boolean} [willBeHidden]
   */
  toggleItemHidden(itemId, willBeHidden) {
    const item = this.getItem(itemId);
    if (item === undefined) {
      return;
    }

    if (willBeHidden !== undefined) {
      item.isHidden = Boolean(willBeHidden);
    } else {
      item.isHidden = !item.isHidden;
    }
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
