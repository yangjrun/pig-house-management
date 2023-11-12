// import { defHttp } from '/@/utils/http/axios';
import { defHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/region/getList',
  addUrl = '/region/add',
  modifyUrl = '/region/modify',
  deleteUrl = '/region/delete',

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





