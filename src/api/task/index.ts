import { defHttp } from '/@/utils/http/axios';
import { defHttp as otherDefHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/task/query',
  addUrl = '/task/add',
  modifyUrl = '/task/modify',
  approveUrl = '/task/approve',
  deleteUrl = '/task/delete',
  listUrl = '/task/getList',
  infolistUrl = '/task/infolist'
}

/**
 * 分页查询任务列表
 * @param params
 */
export function searchTaskApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.searchUrl,
    params,
  });
}


/**
 * 添加任务
 * @param params 
 */
export function addTaskApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.addUrl,
    params,
  });
}

/**
 * 修改任务
 */
export function modifyTaskApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.modifyUrl,
    params,
  });
}

/**
 * 删除任务
 * @param params 
 */
export function deleteTaskApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.deleteUrl,
    params,
  });
}

/**
 * 获取全部任务列表
 * @param params 
 * @returns 
 */
export function getTaskListApi() {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.listUrl,
  });
}

/**
 * 查询每个猪舍的信息列表
 * @returns 
 */
export function getInfolistApi() {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.infolistUrl,
  });
}

/**
 * 审核任务
 */
export function approveUrlApi(params) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.approveUrl,
    params,
  });
}
