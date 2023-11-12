import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from './_util';

const domainList = () => {
  const result: any[] = [];
  result.push({
    id: 8,
    name: '刘大江',
    is_on: 0,
    seo_title: '刘大江',
    seo_desc: '刘大江',
    seo_keyword: '刘大江',
  });
  result.push({
    id: 9,
    name: '刘大江',
    is_on: 0,
    seo_title: '刘大江',
    seo_desc: '刘大江',
    seo_keyword: '刘大江',
  });

  result.push({
    id: 10,
    name: 'www.cgfgf3gf.com',
    is_on: 0,
    seo_title: '刘大江',
    seo_desc: '刘大江',
    seo_keyword: '刘大江',
  });
  return result;
};

export default [
  // mock user logi
  // {
  //   url: '/basic-api/domain/domain_save',
  //   method: 'post',
  //   response: () => {
  //     return resultSuccess({
  //       id: '',
  //     });
  //   },
  // },
  // {
  //   url: '/basic-api/domain/domain_list',
  //   timeout: 100,
  //   method: 'get',
  //   response: () => {
  //     return resultSuccess(domainList);
  //   },
  // },
] as MockMethod[];
