/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 *
 * @param {String} type
 * @returns {Boolean}
 */
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}
/**
 * this is kind of a pointless singleton wrapper right now,
 *  but I anticipate that I will have to use other storage solutions so this prepares it
 */
class StorageController {
  /** @default */
  constructor() {
    const isLocalStorageAvailable = storageAvailable('localStorage');

    this.localStorage = isLocalStorageAvailable ? window.localStorage : undefined;
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear
   */
  clear() {
    this.localStorage.clear();
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
   *
   * @param {DOMString} keyName
   */
  getItem(keyName) {
    try {
      this.localStorage.getItem(keyName);
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
   *
   * @param {Number} index
   */
  key(index) {
    this.localStorage.key(index);
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
   *
   * @param {DOMString} keyName
   */
  removeItem(keyName) {
    this.localStorage.removeItem(keyName);
  }
  /**
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
   *
   * @param {DOMString} keyName
   * @param {DOMString} keyValue
   */
  setItem(keyName, keyValue) {
    try {
      this.localStorage.setItem(keyName, keyValue);
    } catch (e) {
      console.error(e);
    }
  }
}
/**
 * instantiate and export singleton
 *
 * @type {StorageController}
 */
const storageController = new StorageController();
export default storageController;
