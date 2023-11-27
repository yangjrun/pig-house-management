import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';

import { getEnterpriseListApi } from '/@/api/enterprise'

export const columns: BasicColumn[] = [
  {
    title: '账号id',
    dataIndex: 'id',
    width: 160,
    align: 'left',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '公司信息',
    dataIndex: 'enterprise',
    width: 160,
    align: 'left',
  },
  {
    title: '联系方式',
    dataIndex: 'id',
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
    label: '账号id',
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isUpdate
      }
    }
  },
  {
    field: 'passwd',
    label: '密码',
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isUpdate
      }
    },
    ifShow: ({ values }) => {
      return !values.isUpdate
    },
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'enterprise_id',
    label: '公司信息',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res = await getEnterpriseListApi({

            });
            console.log('res', res)
            resolve(res);
          });
        },
        labelField: 'name',
        valueField: 'id',
      };
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    required: true,
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
        field: 'condition',
        label: '账号查询',
        component: 'Input',
        colProps: { span: 8 },
      },
    ],
  };
}
