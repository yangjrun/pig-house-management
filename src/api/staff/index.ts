import { defHttp } from '/@/utils/http/axios';
import { defHttp as otherDefHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/staff/query',
  addUrl = '/staff/add',
  modifyUrl = '/staff/modify',
  deleteUrl = '/staff/delete',
  listUrl = '/staff/getList',
  getPigstyInfo = '/staff/getPigstyInfo',
  findByNamesUrl = '/staff/findbynames'
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


/**
 * 获取全部员工列表
 * @param params 
 */
export function getStaffListApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.listUrl,
    params,
  });
}

/**
 * 获取员工管理的猪舍信息
 * @param params 
 */
export function getPigstyInfoApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.getPigstyInfo,
    params,
  });
}

/**
 * 根据名称获取员工列表
 * @param params 
 * @returns 
 */
export function findStaffByNamesUrl(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.findByNamesUrl,
    params,
  });
}






