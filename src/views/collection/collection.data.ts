import { BasicColumn, FormSchema, FormProps } from '/@/components/Table';
import { getAllApi } from '/@/api/banner';

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 160,
    align: 'left',
  },
  {
    title: '单页名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: 'banner名称',
    dataIndex: 'bannerName',
    width: 160,
    align: 'left',
  },
  {
    title: '一级标题',
    dataIndex: 'headline',
    width: 160,
    align: 'left',
  },
  {
    title: '二级标题',
    dataIndex: 'subhead',
    width: 160,
    align: 'left',
  },
  {
    title: '背景文件',
    dataIndex: 'backgroundFile',
    width: 160,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 160,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '单页名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'bannerId',
    label: '对应的banner页面',
    component: 'ApiSelect',
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res = await getAllApi();
            resolve(res);
          });
        },
        labelField: 'name',
        valueField: 'id',
      };
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: '0_moduleId',
    component: 'Input',
    label: '模块',
    helpMessage: ['页面子模块', '将关键词发送到接口进行远程搜索'],
    slot: 'remoteSearch',
  },
  {
    field: '0_sort',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: '0',
    component: 'Input',
    label: '',
    slot: 'add',
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    autoSubmitOnEnter: true,
    schemas: [],
  };
}
