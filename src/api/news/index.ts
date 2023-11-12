import { defHttp } from '/@/utils/http/axios';
import { NewsItem, NewsSearchItem } from './newsModel';
import { BasicFetchResult } from '../model/baseModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  baseRestfulUrl = '/news',
  searchUrl = '/news/page',
}

/**
 * 新增单个新闻
 * @param params
 * @param mode
 * @returns
 */
export function addNewsApi(params: NewsItem, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.baseRestfulUrl,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * 根据id获取单个新闻信息
 */
export function getNewsByIdApi(params: { id: Number }) {
  return defHttp.get({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 修改单个新闻信息
 */
export function reviseNewsApi(params: NewsItem) {
  return defHttp.put({
    url: `${Api.baseRestfulUrl}/${params.id}`,
    params,
  });
}

/**
 * 删除单个新闻信息
 */
export function deleteNewsApi(params: { id: Number }) {
  return defHttp.delete({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 分页查询单个新闻信息
 * @param params
 */
export function searchNewsApi(params: NewsSearchItem) {
  return defHttp.post<BasicFetchResult<NewsItem>>({
    url: Api.searchUrl,
    params,
  });
}
