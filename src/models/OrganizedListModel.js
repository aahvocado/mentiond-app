import Model from 'models/Model';

export default class OrganizedListModel extends Model {
  /** @override */
  constructor(newAttributes = {}) {
    super({
      /** @type {String} */
      type: '',
      /** @type {Array} */
      list: [],
      /** @type {Object} */
      ...newAttributes,
    });
  }
}
