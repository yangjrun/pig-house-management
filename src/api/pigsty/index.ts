import { defHttp } from '/@/utils/http/axios';
import { defHttp as otherDefHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/pigsty/query',
  addUrl = '/pigsty/add',
  modifyUrl = '/pigsty/modify',
  deleteUrl = '/pigsty/delete',
  listUrl = '/pigsty/getList',
  assignStaffUrl = '/pigsty/assignStaff',
  getdaypigstyinfoUrl = '/dataservice/getdaypigstyinfo',
  findByNamesUrl = '/pigsty/findbynames'
  
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

/**
 * 获取全部猪舍列表
 * @param params 
 */
export function getPigstyListApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.listUrl,
    params,
  });
}

/**
 * 给猪舍分配员工
 * @param params 
 */
export function assignStaffApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.assignStaffUrl,
    params,
  });
}

/**
 * 获取每天的猪舍数据
 * @param params 
 * @returns 
 */
export function getDayPigstyInfoApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.getdaypigstyinfoUrl,
    params,
  });
}

/**
 * 猪舍名字索引关联
 * @param params 
 * @returns 
 */
export function findPigstyByNamesApi(params: any){
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.findByNamesUrl,
    params,
  });
}



