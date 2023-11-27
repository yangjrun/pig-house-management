import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil'

import { searchEnterpriseApi } from '/@/api/enterprise'

export const searchFormSchema: FormSchema[] = [
  {
    field: 'condition',
    label: '地域名称',
    component: 'Input',
    colProps: { span: 8 },
  },
]

export const columns: BasicColumn[] = [
  {
    title: '一级区域',
    dataIndex: 'area_lev_1',
    width: 160,
    align: 'left',
  },
  {
    title: '二级区域',
    dataIndex: 'area_lev_2',
    width: 160,
    align: 'left',
  },
  {
    title: '三级区域',
    dataIndex: 'area_lev_3',
    width: 160,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTS',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return formatToDateTime(new Date(record.lastTS * 1000))
    }
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'area_lev_1',
    label: '一级区域',
    component: 'Input',
    required: true,
  },
  {
    field: 'area_lev_2',
    label: '二级区域',
    component: 'Input',
    required: true,
  },
  {
    field: 'area_lev_3',
    label: '三级区域',
    component: 'Input',
    required: true,
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    autoSubmitOnEnter: true,
    schemas: [],
  };
}
