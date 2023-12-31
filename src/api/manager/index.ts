import { defHttp } from '/@/utils/http/axios';
import { defHttp as otherDefHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/manager/query',
  addUrl = '/manager/add',
  modifyUrl = '/manager/modify',
  deleteUrl = '/manager/delete',
  listUrl = '/manager/getList'

}

/**
 * 分页查询管理员列表
 * @param params
 */
export function searchManagerApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.searchUrl,
    params,
  });
}


/**
 * 添加管理员账户
 * @param params 
 */
export function addManagerApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.addUrl,
    params,
  });
}

/**
 * 修改管理员账户
 */
export function modifyManagerApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.modifyUrl,
    params,
  });
}

/**
 * 删除管理员
 * @param params 
 */
export function deleteManagerApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.deleteUrl,
    params,
  });
}

/**
 * 获取全部管理员列表
 */
export function getManagerListApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.listUrl,
    params,
  });
}





