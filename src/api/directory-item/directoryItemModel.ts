import { BasicPageParams } from '../model/baseModel';

/**
 * 底部子目录实体类，新增，修改都用这个
 */
export interface ChildDirectoryItem {
  id: number;
  /**
   * 名称
   */
  name: string;

  /**
   * 排序
   */
  sort: number;
}

/**
 * 分页查询参数
 */
export interface DirectoryItemSearchItem extends BasicPageParams {
  name: string;
}
