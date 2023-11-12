import { BasicColumn, FormSchema, FormProps } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 160,
    align: 'left',
  },
  {
    title: '子目录名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '链接',
    dataIndex: 'url',
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
    label: '子目录名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'url',
    label: '链接地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
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
