import { BasicPageParams } from '../model/baseModel';

/**
 * 模块数据实体类，新增，修改都用这个
 */
export interface CollectionItem {
  id?: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 页面对应的模块id合集
   */
  moduleIds?: Array<CollectionModuleMergeItem>;
}

export interface CollectionModuleMergeItem {
  collectionId?: number;
  collectionModuleId?: number;
  sort?: number;
}

/**
 * 分页查询参数
 */
export interface CollectionSearchItem extends BasicPageParams {}
