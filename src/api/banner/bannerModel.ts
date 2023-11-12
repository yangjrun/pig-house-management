import { BasicPageParams } from '../model/baseModel';

/**
 * banner数据实体类，新增，修改都用这个
 */
export interface BannerItem {
  id?: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 页面对应的banner id合集
   */
  moduleIds?: Array<BannerModuleMergeItem>;
}

export interface BannerModuleMergeItem {
  collectionId?: number;
  collectionModuleId?: number;
  sort?: number;
}

/**
 * 分页查询参数
 */
export interface BannerSearchItem extends BasicPageParams {}
