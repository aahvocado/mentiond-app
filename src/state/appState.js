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

        return currentCategoryModel.get('isNew');
      },
    });

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
    const categoryCollection = this.get('categoryCollection');

    const newCategoryModel = new CategoryModel({
      ...newAttributes,
      index: categoryCollection.length,
    });

    categoryCollection.push(newCategoryModel);

    this.save();

    return newCategoryModel;
  }
  /**
   * @param {String} categoryId
   */
  deleteCategory(categoryId) {
    const collection = this.get('categoryCollection');
    const categoryIdx = collection.findIndex((model) => model.get('id') === categoryId);
    if (categoryIdx === undefined) {
      return;
    }

    collection.splice(categoryIdx, 1);

    // if we just deleted the category we are looking at,
    //  create a new category
    if (this.get('currentCategoryModel').get('id') === categoryId) {
      const newCategoryModel = this.createCategory();
      this.switchCategory(newCategoryModel.get('id'));
      return;
    }

    this.save();
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

    this.set({currentCategoryModel: categoryModel});
    storageController.setItem('currentCategoryId', categoryId);

    this.save();
  }
  // -- storage functions
  /**
   * saves the collection and category into storage
   */
  save() {
    const collection = this.get('categoryCollection');
    const cleanCollection = collection.filter((categoryModel) => !categoryModel.get('isNew'));

    // first save a list of categories
    const mentionableIdList = cleanCollection.map((categoryModel) => categoryModel.get('id'));
    storageController.setItem('categoryCollection', JSON.stringify(mentionableIdList));

    // save each category
    cleanCollection.forEach((categoryModel) => categoryModel.save());
  }
};
/**
 * instantiate and export state singleton
 *
 * @type {AppState}
 */
const appState = new AppState();
export default appState;
