import { defHttp } from '/@/utils/http/axios';
import { DirectoryItem, DirectorySearchItem } from './directoryModel';
import { BasicFetchResult } from '../model/baseModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  baseRestfulUrl = '/directory',
  searchUrl = '/directory/page',
}

/**
 * 新增底部目录
 * @param params
 * @param mode
 * @returns
 */
export function addDirectoryApi(
  params: DirectoryItem,
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
export function getDirectoryByIdApi(params: { id: Number }) {
  return defHttp.get({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 修改底部目录信息
 */
export function reviseDirectoryApi(params: DirectoryItem) {
  return defHttp.put({
    url: `${Api.baseRestfulUrl}/${params.id}`,
    params,
  });
}

/**
 * 删除底部目录信息
 */
export function deleteDirectoryApi(params: { id: Number }) {
  return defHttp.delete({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 分页查询底部目录信息
 * @param params
 */
export function searchDirectoryApi(params: DirectorySearchItem) {
  return defHttp.post<BasicFetchResult<DirectoryItem>>({
    url: Api.searchUrl,
    params,
  });
}
