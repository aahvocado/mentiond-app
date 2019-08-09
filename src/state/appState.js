import storageController from 'data/storageController';
import * as dataUtils from 'data/dataUtils';

import Model from 'models/Model';
import CategoryModel from 'models/CategoryModel';

/**
 * holds the highest level information of the state
 */
export class AppState extends Model {
  /** @override */
  constructor(newAttributes = {}) {
    super({
      /** @type {Boolean} */
      isDevMode: true,
      /** @type {Boolean} */
      isDebugMode: true,
      // -- state attributes
      /** @type {Boolean} */
      isLoading: true,
      /** @type {Boolean} */
      isOpenNavMenu: false,
      /** @type {CategoryModel} */
      currentCategoryModel: undefined,

      // -- cache attributes
      /** @type {Array<CategoryModel>} */
      categoryCollection: [],

      /** @type {Object} */
      ...newAttributes,
    });

    const _this = this;
    this.extendObservable({
      /** @type {Boolean} */
      get isViewingNewCategory() {
        const currentCategoryModel = _this.get('currentCategoryModel');
        if (currentCategoryModel === undefined) {
          return false;
        }

        // categories with items are not new
        if (currentCategoryModel.get('list').length > 0) {
          return false;
        }

        // named categories are not new
        const currentName = currentCategoryModel.get('name');
        if (currentName !== '') {
          return false;
        }

        return true;
      },
    })

    this.onInitialized();
  }
  /**
   * state has initialized, now need to set up data
   */
  async onInitialized() {
    this.set({isLoading: true});

    const dataList = await dataUtils.fetchData();
    const categoryCollection = dataUtils.parseAllData(dataList);

    // cache fetched data
    this.set({
      categoryCollection: categoryCollection,
      isLoading: false,
    });

    // if a category was previously being viewed, we can set it
    const currentCategoryId = storageController.getItem('currentCategoryId');
    if (currentCategoryId !== undefined && currentCategoryId !== null) {
      this.switchCategory(currentCategoryId);
      return;
    }

    // otherwise it can just be the first item in the list
    if (categoryCollection.length > 0) {
      const firstCategoryModel = categoryCollection[0];
      this.switchCategory(firstCategoryModel.get('id'));
      return;
    }
  }
  // -- category functions
  /**
   * @param {Object} [newAttributes]
   * @returns {CategoryModel}
   */
  createCategory(newAttributes = {}) {
    const newCategoryModel = new CategoryModel(newAttributes);
    this.get('categoryCollection').push(newCategoryModel);

    this.save();

    return newCategoryModel;
  }
  /**
   * change currently viewed category
   *
   * @param {String} categoryId
   */
  switchCategory(categoryId) {
    const collection = this.get('categoryCollection');
    const categoryModel = collection.find((model) => model.get('id') === categoryId);
    if (categoryModel === undefined) {
      return;
    }

    this.set({
      currentCategoryModel: categoryModel,
    });

    this.save();
  }
  // -- storage functions
  /**
   * saves the collection and category into storage
   */
  save() {
    const collection = this.get('categoryCollection');

    // first save a list of categories
    const mentionableIdList = collection.map((categoryModel) => categoryModel.get('id'));
    storageController.setItem('categoryCollection', JSON.stringify(mentionableIdList));

    // save each category
    collection.forEach((categoryModel) => categoryModel.save());
  }
};
/**
 * instantiate and export state singleton
 *
 * @type {AppState}
 */
const appState = new AppState();
export default appState;
