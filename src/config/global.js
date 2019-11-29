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

export { setStore, getStore, remove };
