import { defHttp } from '/@/utils/http/axios';
import { defHttp as otherDefHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/region/query',
  addUrl = '/region/add',
  modifyUrl = '/region/modify',
  deleteUrl = '/region/delete',
  listUrl = '/region/getList'
}

/**
 * 分页查询区域列表
 * @param params
 */
export function searchRegionApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.searchUrl,
    params,
  });
}


/**
 * 添加区域账户
 * @param params 
 */
export function addRegionApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.addUrl,
    params,
  });
}

/**
 * 修改区域账户
 */
export function modifyRegionApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.modifyUrl,
    params,
  });
}

/**
 * 删除区域
 * @param params 
 */
export function deleteRegionApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.deleteUrl,
    params,
  });
}

/**
 * 获取全部区域列表
 * @param params 
 * @returns 
 */
export function getRegionListApi() {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.listUrl,
  });
}
