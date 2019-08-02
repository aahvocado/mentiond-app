/**
 * the order is a little unintuitive since -1 means earlier in the array,
 * so this rank should help keep it consistent
 *
 * @typedef {Number} ComparisonNumber
 */
const RANK = {
  HIGHER: -1,
  LOWER: 1,
  EQUAL: 0,
}
/**
 * simple comparison of which item has more `mentions`
 *
 * @param {MentionableItem} itemOne
 * @param {MentionableItem} itemTwo
 * @returns {ComparisonNumber}
 */
export function compareByMentions(itemOne, itemTwo) {
  if (itemOne.mentions > itemTwo.mentions) {
    return RANK.HIGHER;
  }

  if (itemOne.mentions < itemTwo.mentions) {
    return RANK.LOWER;
  }

  return RANK.EQUAL;
}
/**
 * `hidden` item will be the lowest in the list
 *
 * @param {MentionableItem} itemOne
 * @param {MentionableItem} itemTwo
 * @returns {ComparisonNumber}
 */
export function compareByHidden(itemOne, itemTwo) {
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
/**
 * `complete` item will be lower than incomplete, but higher than `hidden`
 *
 * @param {MentionableItem} itemOne
 * @param {MentionableItem} itemTwo
 * @returns {ComparisonNumber}
 */
export function compareByComplete(itemOne, itemTwo) {
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
/**
 * gets the sorted array of a list of Mentionables
 *
 * @param {Array<MentionableItem>} list
 * @returns {Array<MentionableItem>}
 */
export function getSortedList(list) {
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
