import { defHttp } from '/@/utils/http/axios';
import { CollectionItem, CollectionSearchItem } from './collectionModel';
import { BasicFetchResult } from '../model/baseModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  baseRestfulUrl = '/collection',
  searchUrl = '/collection/page',
}

/**
 * 新增单个页面
 * @param params
 * @param mode
 * @returns
 */
export function addCollectionApi(
  params: CollectionItem,
  mode: ErrorMessageMode = 'modal',
) {
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
 * 根据id获取单个页面信息
 */
export function getCollectionByIdApi(params: { id: Number }) {
  return defHttp.get({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 修改单个页面信息
 */
export function reviseCollectionApi(params: CollectionItem) {
  return defHttp.put({
    url: `${Api.baseRestfulUrl}/${params.id}`,
    params,
  });
}

/**
 * 删除单个页面信息
 */
export function deleteCollectionApi(params: { id: Number }) {
  return defHttp.delete({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 分页查询单个页面信息
 * @param params
 */
export function searchCollectionApi(params: CollectionSearchItem) {
  return defHttp.post<BasicFetchResult<CollectionItem>>({
    url: Api.searchUrl,
    params,
  });
}
