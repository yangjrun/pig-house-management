import { defHttp } from '/@/utils/http/axios';
import { CollectionModuleItem, CollectionModuleSearchItem } from './collectionModuleModel';
import { BasicFetchResult } from '../model/baseModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  baseRestfulUrl = '/collection-module',
  searchUrl = '/collection-module/page',
}

/**
 * 新增模块
 * @param params
 * @param mode
 * @returns
 */
export function addCollectionModuleApi(
  params: CollectionModuleItem,
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
 * 根据id获取模块信息
 */
export function getCollectionModuleByIdApi(params: { id: Number }) {
  return defHttp.get({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 修改模块信息
 */
export function reviseCollectionModuleApi(params: CollectionModuleItem) {
  return defHttp.put({
    url: `${Api.baseRestfulUrl}/${params.id}`,
    params,
  });
}

/**
 * 删除模块信息
 */
export function deleteCollectionModuleApi(params: { id: Number }) {
  return defHttp.delete({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 分页查询模块信息
 * @param params
 */
export function searchCollectionModuleApi(params: CollectionModuleSearchItem) {
  return defHttp.post<BasicFetchResult<CollectionModuleItem>>({
    url: Api.searchUrl,
    params,
  });
}
