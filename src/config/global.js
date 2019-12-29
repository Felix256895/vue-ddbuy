const store = window.localStorage;

/**
 * 本地存储
 * @param {*} key
 * @param {*} val
 */
function setStore(key, val) {
  if (!key) return false;
  if (val === undefined) return remove(key);
  if (typeof val !== "string") val = JSON.stringify(val);
  store.setItem(key, val);
}

/**
 * 获取本地存储
 * @param {*} key
 */
function getStore(key) {
  if (!key) return false;
  return store.getItem(key);
}

/**
 * 删除本地存储
 * @param {*} key
 */
function remove(key) {
  if (!key) return false;
  store.removeItem(key);
}

/**
 * 处理电话号码
 * @param {*} value
 */
function phone(value) {
  const mobile = String(value);
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return mobile.replace(reg, "$1****$2");
}

/**
 * 版本号
 */
const VERSION = `1.0.0`;

export { setStore, getStore, remove, VERSION, phone };
