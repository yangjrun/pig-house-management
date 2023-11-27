import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil'
import { getManagerListApi } from '/@/api/manager'
import { getRegionListApi } from '/@/api/region'
import { getPigstyListApi } from '/@/api/pigsty'

export const searchFormSchema: FormSchema[] = [
  {
    field: 'condition',
    label: '企业名称',
    component: 'Input',
    colProps: { span: 8 },
  },
]

export const columns: BasicColumn[] = [
  {
    title: '猪舍信息',
    dataIndex: 'pigstyName',
    width: 160,
    align: 'left',
  },
  {
    title: '时间',
    dataIndex: 'datetime',
    width: 160,
    align: 'left',
  },
  {
    title: '用水数',
    dataIndex: 'waterUsage',
    width: 160,
    align: 'left',
  },
  {
    title: '采食量',
    dataIndex: 'feedWeight',
    width: 160,
    align: 'left',
  },
  {
    title: '平均猪重',
    dataIndex: 'pigAverageWeight',
    width: 160,
    align: 'left',
  },
  {
    title: '在栏数',
    dataIndex: 'pigHeadCount',
    width: 160,
    align: 'left',
  },
  {
    title: '周龄',
    dataIndex: 'curPigWeekAge',
    width: 160,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'feedWeight',
    label: '采食量',
    component: 'Input',
    required: true,
  },
  {
    field: 'pigAverageWeight',
    label: '平均猪重',
    component: 'Input',
    required: true,
  },
  {
    field: 'pigHeadCount',
    label: '在栏数',
    component: 'Input',
    required: true,
  },
  {
    field: 'curPigWeekAge',
    label: '周龄',
    component: 'Input',
    required: true,
  },
  {
    field: 'isUpdate',
    label: '',
    component: 'Switch',
    show: false
  },
  {
    field: 'datetime',
    label: '',
    component: 'Switch',
    show: false
  },
];


export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    autoSubmitOnEnter: true,
    schemas: [
      {
        field: `ids`,
        label: `选择猪舍`,
        component: 'ApiSelect',
        componentProps: ({ schema, formModel, tableAction, formActionType }) => {
          return {
            api: () => {
              return new Promise(async (resolve) => {
                let res = await getPigstyListApi({
                });
                resolve(res);
              });
            },
            labelField: 'name',
            valueField: 'id',
            mode: 'tags'
          };
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'starttimets',
        component: 'DatePicker',
        label: '设置起始时间',
        colProps: {
          span: 12,
        },
      },
    ],
  };
}
