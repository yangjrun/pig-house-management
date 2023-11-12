import { defHttp } from '/@/utils/http/axios';
import { ChildDirectoryItem, DirectoryItemSearchItem } from './directoryItemModel';
import { BasicFetchResult } from '../model/baseModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  baseRestfulUrl = '/directory-item',
  searchUrl = '/directory-item/page',
}

/**
 * 新增底部目录
 * @param params
 * @param mode
 * @returns
 */
export function addDirectoryItemApi(
  params: ChildDirectoryItem,
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
 * 根据id获取底部目录信息
 */
export function getDirectoryItemByIdApi(params: { id: Number }) {
  return defHttp.get({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 修改底部目录信息
 */
export function reviseDirectoryItemApi(params: ChildDirectoryItem) {
  return defHttp.put({
    url: `${Api.baseRestfulUrl}/${params.id}`,
    params,
  });
}

/**
 * 删除底部目录信息
 */
export function deleteDirectoryItemApi(params: { id: Number }) {
  return defHttp.delete({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 分页查询底部目录信息
 * @param params
 */
export function searchDirectoryItemApi(params: DirectoryItemSearchItem) {
  return defHttp.post<BasicFetchResult<ChildDirectoryItem>>({
    url: Api.searchUrl,
    params,
  });
}
