import testData from 'data/testData.json';

import CategoryModel from 'models/CategoryModel';

/**
 * @returns {Array}
 */
export async function fetchData() {
  return await testData;
}
/**
 *
 * @param {Object} data
 * @returns {CategoryModel}
 */
export function parseData(data) {
  const {
    list,
    ...attributes
  } = data;

  // create a model with the attributes
  const newMentionableModel = new CategoryModel(attributes);

  // add each item individually
  list.forEach((item) => {
    newMentionableModel.addItem(item);
  });

  // updateIndices() to sort
  newMentionableModel.updateIndices();
  return newMentionableModel;
}
/**
 *
 * @param {Array<Object>} dataList
 * @returns {Array<CategoryModel>}
 */
export function parseAllData(dataList) {
  return dataList.map((data) => parseData(data));
}
