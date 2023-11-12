import { BasicPageParams } from '../model/baseModel';

/**
 * 新闻数据实体类，新增，修改都用这个
 */
export interface NewsItem {
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 页面对应的模块id合集
   */
  moduleIds: Array<String>;
}

/**
 * 分页查询参数
 */
export interface NewsSearchItem extends BasicPageParams {}
