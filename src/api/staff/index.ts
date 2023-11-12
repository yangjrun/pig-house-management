// import { defHttp } from '/@/utils/http/axios';
import { defHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/staff/getList',
  addUrl = '/staff/add',
  modifyUrl = '/staff/modify',
  deleteUrl = '/staff/delete',

}

/**
 * 分页查询员工列表
 * @param params
 */
export function searchStaffApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.searchUrl,
    params,
  });
}


/**
 * 添加员工账户
 * @param params 
 */
export function addStaffApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.addUrl,
    params,
  });
}

/**
 * 修改员工账户
 */
export function modifyStaffApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.modifyUrl,
    params,
  });
}

/**
 * 删除员工
 * @param params 
 */
export function deleteStaffApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.deleteUrl,
    params,
  });
}





