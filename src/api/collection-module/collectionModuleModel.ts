import { BasicPageParams } from '../model/baseModel';

/**
 * 模块数据实体类，新增，修改都用这个
 */
export interface CollectionModuleItem {
  id: 0;
  /**
   * 一级标题
   */
  headline: '';
  /**
   * 二级标题
   */
  subhead: '';
  /**
   * 背景文件
   */
  backgroundFile: '';
  /**
   * 文件类型
   */
  fileType: 0;
}

/**
 * 分页查询参数
 */
export interface CollectionModuleSearchItem extends BasicPageParams {
  name?: string;
}
