import testData from 'data/testData.json';

import MentionableListModel from 'models/MentionableListModel';

/**
 * @returns {Array}
 */
export function fetchData() {
  return testData;
}
/**
 *
 * @param {Object} data
 * @returns {MentionableListModel}
 */
export function parseData(data) {
  const {
    list,
    ...attributes
  } = data;

  // create a model with the attributes
  const newMentionableModel = new MentionableListModel(attributes);

  // add each item individually
  list.forEach((item) => {
    newMentionableModel.addItem(item);
  });

  // updateIndices() to sort
  newMentionableModel.updateIndices();
  return newMentionableModel;
}
