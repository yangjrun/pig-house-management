import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';

import { searchEnterpriseApi } from '/@/api/enterprise'

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
    field: 'id',
    label: '登录账号',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '用户名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'passwd',
    label: '密码',
    component: 'Input',
    required: true,
  },
  {
    field: 'enterprise_id',
    label: '所属企业',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res = await searchEnterpriseApi({

            });
            resolve(res);
          });
        },
        labelField: 'name',
        valueField: 'id',
      };
    },
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    autoSubmitOnEnter: true,
    schemas: [],
  };
}
