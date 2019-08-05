import storageController from 'data/storageController';
import * as dataUtils from 'data/dataUtils';

import Model from 'models/Model';

// storageController.clear();
// storageController.setItem('currentCategory', 'movies');

/**
 * holds the highest level information of the state
 */
export class AppState extends Model {
  /** @override */
  constructor(newAttributes = {}) {
    super({
      // -- state attributes
      /** @type {Boolean} */
      isLoading: true,

      // -- list attributes
      /** @type {String} */
      currentCategory: storageController.getItem('currentCategory'),
      /** @type {MentionableListModel} */
      currentListModel: undefined,

      // -- cache attributes
      /** @type {Array<MentionableListModel>} */
      mentionableCollection: [],
      /** @type {Object} */
      ...newAttributes,
    });

    this.onInitialized();
  }
  /**
   * state has initialized, now need to set up data
   */
  async onInitialized() {
    this.set({isLoading: true});

    const dataList = await dataUtils.fetchData();
    const mentionableCollection = dataUtils.parseAllData(dataList);

    this.set({
      mentionableCollection: mentionableCollection,
      currentListModel: mentionableCollection[0],
      isLoading: false,
    })
  }
};
/**
 * instantiate and export state singleton
 *
 * @type {AppState}
 */
const appState = new AppState();
export default appState;
