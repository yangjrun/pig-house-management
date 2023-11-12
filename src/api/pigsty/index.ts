// import { defHttp } from '/@/utils/http/axios';
import { defHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/pigsty/getList',
  addUrl = '/pigsty/add',
  modifyUrl = '/pigsty/modify',
  deleteUrl = '/pigsty/delete',

}

/**
 * 分页查询猪舍列表
 * @param params
 */
export function searchPigstyApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.searchUrl,
    params,
  });
}


/**
 * 添加猪舍账户
 * @param params 
 */
export function addPigstyApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.addUrl,
    params,
  });
}

/**
 * 修改猪舍账户
 */
export function modifyPigstyApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.modifyUrl,
    params,
  });
}

/**
 * 删除猪舍
 * @param params 
 */
export function deletePigstyApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.deleteUrl,
    params,
  });
}





