import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';

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
    title: '编号',
    dataIndex: 'id',
    width: 160,
    align: 'left',
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '手机',
    dataIndex: 'phone',
    width: 160,
    align: 'left',
  },
  {
    title: '所属企业',
    dataIndex: 'enterprise',
    width: 160,
    align: 'left',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
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
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    autoSubmitOnEnter: true,
    schemas: [],
  };
}
