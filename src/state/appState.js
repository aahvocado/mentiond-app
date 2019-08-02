import storageController from 'data/storageController';
import * as dataUtils from 'data/dataUtils';

import MentionableListModel from 'models/MentionableListModel';
import Model from 'models/Model';

const data = dataUtils.fetchData();
const firstMentionable = dataUtils.parseData(data[0]);

// storageController.clear();
// storageController.setItem('currentCategory', 'movies');

/**
 * holds the highest level information of the state
 */
export class AppState extends Model {
  /** @override */
  constructor(newAttributes = {}) {
    super({
      /** @type {String} */
      currentCategory: storageController.getItem('currentCategory'),
      /** @type {MentionableListModel} */
      currentListModel: firstMentionable,
      /** @type {Object} */
      ...newAttributes,
    });
  }
};
/**
 * instantiate and export state singleton
 *
 * @type {AppState}
 */
const appState = new AppState();
export default appState;
