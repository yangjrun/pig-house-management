// import { defHttp } from '/@/utils/http/axios';
import { defHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  searchUrl = '/enterprise/getList',
  addUrl = '/enterprise/add',
  modifyUrl = '/enterprise/modify',
  deleteUrl = '/enterprise/delete',

}

/**
 * 分页查询企业列表
 * @param params
 */
export function searchEnterpriseApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.searchUrl,
    params,
  });
}


/**
 * 添加企业账户
 * @param params 
 */
export function addEnterpriseApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.addUrl,
    params,
  });
}

/**
 * 修改企业账户
 */
export function modifyEnterpriseApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.modifyUrl,
    params,
  });
}

/**
 * 删除企业
 * @param params 
 */
export function deleteEnterpriseApi(params: any) {
  return defHttp.post<BasicFetchResult<any>>({
    url: Api.deleteUrl,
    params,
  });
}





