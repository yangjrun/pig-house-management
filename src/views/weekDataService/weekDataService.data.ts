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
    title: '当年周数',
    dataIndex: 'weektime',
    width: 80,
    align: 'left',
  },
  {
    title: '用水数',
    dataIndex: 'waterUsage',
    width: 80,
    align: 'left',
  },
  {
    title: '采食量',
    dataIndex: 'feedWeight',
    width: 80,
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
  {
    title: '日期',
    dataIndex: 'date',
    width: 160,
    align: 'left',
  },
  {
    title: '星期',
    dataIndex: 'wday',
    width: 160,
    align: 'left',
    customRender: ({ record, value, text }) => {
      if (value) {
        return `周${['一', '二', '三', '四', '五', '六', '日'][value - 1]}`
      } else {
        return ''
      }
    }
  },
  {
    title: '每日采食量',
    dataIndex: 'dayFeedWeightUsage',
    width: 160,
    align: 'left',
  },
  {
    title: '每日用水量',
    dataIndex: 'dayWaterWeightUsage',
    width: 160,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '企业名称',
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isUpdate
      }
    }
  },
  {
    field: 'regionid',
    label: '相关区域',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: () => {
        return new Promise((resolve) => {
          getRegionListApi().then(resp => {
            resolve(resp['lev3'].map(item => {
              return {
                name: `${item.l1}${item.l2}${item.l3}`,
                id: item.id
              }
            }))
          })
        })
      },
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    }
  },
  {
    field: 'managerid',
    label: '管理员信息',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getManagerListApi,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    }
  },
  {
    field: 'isUpdate',
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
        field: 'weektime',
        component: 'WeekPicker',
        label: '设置起始时间',
        componentProps: {
          format: 'YYYY-wo'
        },
        colProps: {
          span: 12,
        },
      },
    ],
  };
}
