import { defHttp } from '/@/utils/http/axios';
import { BannerItem, BannerSearchItem } from './bannerModel';
import { BasicFetchResult } from '../model/baseModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  baseRestfulUrl = '/banner',
  searchUrl = '/banner/page',
  getAllUrl = '/banner/getAllList',
}

/**
 * 新增单个页面
 * @param params
 * @param mode
 * @returns
 */
export function addBannerApi(params: BannerItem, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.baseRestfulUrl,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * 根据id获取单个banner
 */
export function getBannerByIdApi(params: { id: Number }) {
  return defHttp.get({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 修改单个banner
 */
export function reviseBannerApi(params: BannerItem) {
  return defHttp.put({
    url: `${Api.baseRestfulUrl}/${params.id}`,
    params,
  });
}

/**
 * 删除单个banner
 */
export function deleteBannerApi(params: { id: Number }) {
  return defHttp.delete({
    url: `${Api.baseRestfulUrl}/${params.id}`,
  });
}

/**
 * 分页查询单个banner
 * @param params
 */
export function searchBannerApi(params: BannerSearchItem) {
  return defHttp.post<BasicFetchResult<BannerItem>>({
    url: Api.searchUrl,
    params,
  });
}

/**
 * 获取所有banner
 */
export function getAllApi() {
  return defHttp.post({
    url: Api.getAllUrl,
  });
}
