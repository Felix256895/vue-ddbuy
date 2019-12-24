import axios from "axios";
const IP = `47.98.157.152`;

function randomCode(length) {
  let charts = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let result = "";
  for (let i = 0; i < length; i++) {
    let index = Math.ceil(Math.random() * 9);
    result += charts[index];
  }
  return result;
}

export default function request(url = "", params = {}, type = "GET") {
  let promise;
  return new Promise((resolve, reject) => {
    if (type.toUpperCase() === "GET") {
      let paramsStr = "";
      Object.keys(params).forEach(key => {
        paramsStr += `${key}=${params}&`;
      });
      if (paramsStr) {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf("&"));
        if (url.indexOf(IP) === -1) {
          url += `?${paramsStr}&geek166=${randomCode(20)}`;
        } else {
          url += `?${paramsStr}`;
        }
      } else {
        if (url.indexOf(IP) === -1) {
          url += `?geek166=${randomCode(20)}`;
        }
      }
      promise = axios.get(url);
    } else if (type.toUpperCase() === "POST") {
      promise = axios.post(url, params);
    }
    promise
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
