import { defHttp as otherDefHttp } from '/@/utils/http/axios/otherRequest'
import { BasicFetchResult } from '../model/baseModel';

enum Api {
  getdaypigstyinfoUrl = '/dataservice/getdaypigstyinfo',
  getweekpigstyinfoUrl = '/dataservice/getweekpigstyinfo',
  modifypigstyinfoUrl = '/dataservice/modifypigstyinfo',
  gethourpigstyinfoUrl = '/dataservice/gethourpigstyinfo',
  modifyweekpigstyinfoUrl = '/dataservice/modifyweekpigstyinfo'
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
 * 获取每周的猪舍数据
 * @param params 
 * @returns 
 */
export function getWeekPigstyInfoApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.getweekpigstyinfoUrl,
    params,
  });
}

/**
 * 修改单个猪舍某一天的数据
 * @param params 
 * @returns 
 */
export function modifypigstyinfoUrlApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.modifypigstyinfoUrl,
    params,
  });
}

/**
 * 获取分时的某天猪舍的数据
 * @param params 
 * @returns 
 */
export function getHourPigstyInfoApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.gethourpigstyinfoUrl,
    params,
  });
}

/**
 * 修改周数据
 * @param params 
 * @returns 
 */
export function modifyweekpigstyinfoApi(params: any) {
  return otherDefHttp.post<BasicFetchResult<any>>({
    url: Api.modifyweekpigstyinfoUrl,
    params,
  });
}



