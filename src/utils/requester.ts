import fetch from 'unfetch';
import queryString from 'query-string';
import { cryptoUtil, timerUtil } from 'web-base';
import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);

//缓存整站数据，缓存限制一周
const saveCache = (key: string, data: any) => {
  const oneMonthMs = timerUtil.countMillisecond(7, 'day');
  store.set(key, data, Date.now() + oneMonthMs);
};

export default (url: string, data = '', method = 'GET') => {
  // 请求参数设置
  let options = {
    headers: {
      Authorization: store.get('access_token') || '',
    },
  };
  let body = '';

  if (method.toUpperCase() === 'GET') {
    let o = {
      method,
    };
    if (data) url = `${url}?${queryString.stringify(data)}`;
    Object.assign(options, o);
  }

  if (method.toUpperCase() === 'POST') {
    if (typeof data === 'string') {
      body = data;
    } else {
      body = JSON.stringify(data);
    }
    let o = {
      method,
      body,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    };
    Object.assign(options, o);
  }

  // 缓存请求过的地址与参数，如果一样则直接返回缓存
  const fingerprint = cryptoUtil.md5(
    `${url}${body ? JSON.stringify(body) : ''}`,
  );
  // if (store.get(fingerprint)) return store.get(fingerprint);

  // 发起请求
  return new Promise((resolve, reject) => {
    console.log(`fetch ${url}${body ? JSON.stringify(body) : ''}`);
    fetch(url, options)
      .then(async (res: any) => {
        let json = await res.json();
        saveCache(fingerprint, json);
        resolve(json);
      })
      .catch((e: any) => {
        reject(e.message);
      });
  });
};
