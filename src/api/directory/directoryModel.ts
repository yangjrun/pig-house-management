import { BasicPageParams } from '../model/baseModel';

/**
 * 底部目录实体类，新增，修改都用这个
 */
export interface DirectoryItem {
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
export interface DirectorySearchItem extends BasicPageParams {}
