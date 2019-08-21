import uuid from 'uuid/v4';

import storageController from 'data/storageController';

import Model from 'models/Model';

import * as mentionableUtils from 'utilities/mentionableUtils';

/**
 * data structure of a mentionable item
 *
 * @type {Object}
 */
const mentionableItemSchema = {
  id: undefined,
  initialIndex: -1,
  index: -1,
  label: '',
  mentions: 0,
  isComplete: false,
  isFocused: false,
  isHidden: false,
};
/**
 * manages list of Mentionables
 */
export default class CategoryModel extends Model {
  /** @override */
  constructor(newAttributes = {}) {
    super({
      /** @type {String} */
      name: '',
      /** @type {String} */
      id: uuid(),
      /** @type {Number} */
      index: -1,
      /** @type {Array} */
      list: [],
      /** @type {Object} */
      ...newAttributes,
    });

    const _this = this;
    this.extendObservable({
      /** @type {Boolean} */
      get isNew() {
        // categories with items are not new
        if (_this.get('list').length > 0) {
          return false;
        }

        // named categories are not new
        const currentName = _this.get('name');
        if (currentName !== '') {
          return false;
        }

        return true;
      },
    });

    this.updateIndices();
  }
  // -- list utility functions
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
      initialIndex: list.length,
      index: list.length,
      id: uuid(),
    });

    // update and save
    this.updateIndices();
    this.save();
  }
  /**
   * removes an a new item to the list
   *
   * @param {String} itemId
   */
  removeItem(itemId) {
    const list = this.get('list');
    const itemIdx = list.findIndex((listItem) => listItem.id === itemId);
    if (itemIdx === undefined) {
      return;
    }

    list.splice(itemIdx, 1);

    // update and save
    this.updateIndices();
    this.save();
  }
  /**
   * updates the `index` of each item in the list
   */
  updateIndices() {
    const list = this.get('list');
    const sortedList = mentionableUtils.getSortedList(list.slice());

    // use current list and update the index of our the items to matching sorted order
    list.forEach((item) => {
      const sortedIdx = sortedList.findIndex((sortedItem) => sortedItem.id === item.id);
      item.index = sortedIdx;
    });
  }
  /**
   * sorts the the current list with highest number of mentions at the top
   */
  reorganizeList() {
    const list = this.get('list');
    const sortedList = mentionableUtils.getSortedList(list.slice());
    sortedList.forEach((item, idx) => item.index = idx);
    list.replace(sortedList);
  }
  // -- item functions
  /**
   * @param {String} itemId
   * @param {Number} [amount]
   */
  updateItemMentions(itemId, amount = 1) {
    const item = this.getItem(itemId);
    item.mentions += amount;

    // update and save
    this.updateIndices();
    this.save();
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

    // update and save
    this.updateIndices();
    this.save();
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

    // update and save
    this.updateIndices();
    this.save();
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
  // -- storage utility functions
  /**
   * saves this category into storage
   */
  save() {
    const data = this.export();

    // extended attributes seem to be exporting on Safari
    delete data.isNew;

    storageController.setItem(this.get('id'), JSON.stringify(data));
    // console.log(JSON.stringify(data));
  }
}
