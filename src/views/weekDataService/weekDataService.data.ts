import { h, ref } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil'
import { getManagerListApi } from '/@/api/manager'
import { getRegionListApi } from '/@/api/region'
import { getPigstyListApi, findPigstyByNamesApi } from '/@/api/pigsty'

import { useDebounceFn } from '@vueuse/core';


export const searchFormSchema: FormSchema[] = [
  {
    field: 'condition',
    label: '猪场名称',
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
    width: 80,
    align: 'left',
  },
  {
    title: '在栏数',
    dataIndex: 'pigHeadCount',
    width: 80,
    align: 'left',
  },
  {
    title: '周龄',
    dataIndex: 'curPigWeekAge',
    width: 80,
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
    width: 80,
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
    width: 80,
    align: 'left',
  },
  {
    title: '每日用水量',
    dataIndex: 'dayWaterWeightUsage',
    width: 80,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'totalWeekFeedUsage',
    label: '周采食量',
    component: 'Input',
    required: true,
  },
  {
    field: 'totalWeekWaterUsage',
    label: '周用水量',
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
    field: 'pigAverageWeight',
    label: '平均猪重',
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
    field: 'weektime',
    label: '',
    component: 'Switch',
    show: false
  },
];

const options: any = ref([])

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    autoSubmitOnEnter: true,
    schemas: [
      {
        field: `id`,
        label: `选择猪舍`,
        component: 'Select',
        componentProps: ({ schema, formModel, tableAction, formActionType }) => {
          return {
            api: () => {
              return new Promise(async (resolve) => {
                let res = await findPigstyByNamesApi({
                });
                resolve(res);
              });
            },
            options: options.value,
            showSearch: true,
            filterOption: false,
            params: {
              names: ''
            },
            onSearch: (value: string) => {
              return new Promise(async (resolve) => {
                let res: any = await findPigstyByNamesApi({
                  names: value
                });
                const list = res.map(item => {
                  return {
                    label: item.name,
                    value: item.id
                  }
                })
                options.value = list
              });
            }
          };
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'weektimeStr',
        component: 'WeekPicker',
        label: '设置起始时间',
        componentProps: ({ formModel }) => {
          return {
            format: 'YYYY-wo',
            showNow: true,
            onChange: (value, dateString) => {
              console.log('onChange', value)
              console.log('onChange', dateString)
              formModel.weektime = dateString.replace('周', '')
            }
          }
        },
        colProps: {
          span: 12,
        },
      },
    ],
  };
}
