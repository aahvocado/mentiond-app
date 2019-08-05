import storageController from 'data/storageController';
import * as dataUtils from 'data/dataUtils';

import Model from 'models/Model';

// storageController.clear();
// storageController.setItem('currentCategoryId', 'test-category-id');

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
      /** @type {Boolean} */
      isOpenNavMenu: true,
      /** @type {CategoryModel} */
      currentListModel: undefined,

      // -- cache attributes
      /** @type {Array<CategoryModel>} */
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

    // cache fetched data
    this.set({
      mentionableCollection: mentionableCollection,
      isLoading: false,
    });

    // if a category was previously being viewed, we can set it
    const currentCategoryId = storageController.getItem('currentCategoryId');
    if (currentCategoryId !== undefined && currentCategoryId !== null) {
      this.switchCategory(currentCategoryId);
      return;
    }

    // otherwise it can just be the first item in the list
    if (mentionableCollection.length > 0) {
      const firstCategoryModel = mentionableCollection[0];
      this.switchCategory(firstCategoryModel.get('id'));
      return;
    }
  }
  // -- utility functions
  /**
   * change currently viewed category
   *
   * @param {String} categoryId
   */
  switchCategory(categoryId) {
    const collection = this.get('mentionableCollection');
    const categoryModel = collection.find((model) => model.get('id') === categoryId);
    if (categoryModel === undefined) {
      return;
    }

    this.set({
      currentListModel: categoryModel,
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
