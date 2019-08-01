import uuid from 'uuid/v4';
import Model from 'models/Model';

/**
 * data structure of a mentionable item
 *
 * @type {Object}
 */
const mentionableItemSchema = {
  id: undefined,
  index: -1,
  label: '',
  mentions: 0,
  isComplete: false,
  isFocused: false,
  isHidden: false,
};
/**
 * the order is a little unintuitive since -1 means earlier in the array,
 * so this rank should help keep it consistent
 *
 * @typedef {Number} Rank
 */
const RANK = {
  HIGHER: -1,
  LOWER: 1,
  EQUAL: 0,
}

// simple comparison of which item has more mentions
function compareByMentions(itemOne, itemTwo) {
  if (itemOne.mentions > itemTwo.mentions) {
    return RANK.HIGHER;
  }

  if (itemOne.mentions < itemTwo.mentions) {
    return RANK.LOWER;
  }

  return RANK.EQUAL;
}
// hidden item will be the lowest in the list
function compareByHidden(itemOne, itemTwo) {
  if (itemOne.isHidden && itemTwo.isHidden) {
    return compareByMentions(itemOne, itemTwo);
  }

  if (itemOne.isHidden && !itemTwo.isHidden) {
    return RANK.LOWER;
  }

  if (!itemOne.isHidden && itemTwo.isHidden) {
    return RANK.HIGHER;
  }

  return compareByMentions(itemOne, itemTwo);
}
// complete item will be lower than incomplete, but higher than hidden
function compareByComplete(itemOne, itemTwo) {
  if (itemOne.isComplete && !itemOne.isHidden && !itemOne.isComplete && itemOne.isHidden) {
    return RANK.HIGHER;
  }

  if (itemOne.isComplete && itemTwo.isComplete) {
    return compareByMentions(itemOne, itemTwo);
  }

  if (itemOne.isComplete && !itemTwo.isComplete) {
    return RANK.LOWER;
  }

  if (!itemOne.isComplete && itemTwo.isComplete) {
    return RANK.HIGHER;
  }

  return compareByMentions(itemOne, itemTwo);
}
// gets the sorted array
function getSortedList(list) {
  return list.sort((itemOne, itemTwo) => {
    // both items are hidden and complete
    if (itemOne.isComplete && itemOne.isHidden && itemOne.isComplete && itemOne.isHidden) {
      return compareByMentions(itemOne, itemTwo);
    }

    // hidden
    if (itemOne.isHidden || itemTwo.isHidden) {
      return compareByHidden(itemOne, itemTwo);
    }

    // complete
    if (itemOne.isComplete || itemTwo.isComplete) {
      return compareByComplete(itemOne, itemTwo);
    }

    return compareByMentions(itemOne, itemTwo);
  })
}
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

    this.updateIndices();
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
      index: list.length,
      id: uuid(),
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
   * updates the `index` of each item in the list
   */
  updateIndices() {
    const list = this.get('list');
    const sortedList = getSortedList(list.slice());

    // use current list and update the index of our the items to matching sorted order
    list.forEach((item) => {
      const sortedIdx = sortedList.findIndex((sortedItem) => sortedItem.id === item.id);
      item.index = sortedIdx;
    });
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
  reorganizeList() {
    const list = this.get('list');
    const sortedList = getSortedList(list.slice());
    sortedList.forEach((item, idx) => item.index = idx);
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
