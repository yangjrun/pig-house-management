import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';

import { searchEnterpriseApi } from '/@/api/enterprise'
import { searchManagerApi } from '/@/api/manager'
import { searchRegionApi } from '/@/api/region'


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

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '登录账号',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '员工名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'phone',
    label: '手机号码',
    component: 'Input',
    required: true,
  },
  {
    field: 'managerid',
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
  {
    field: 'enterprise_id',
    label: '所属管理员',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res = await searchManagerApi({

            });
            resolve(res);
          });
        },
        labelField: 'name',
        valueField: 'id',
      };
    },
  },
  {
    field: 'regionid',
    label: '所属企业',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res: any = await searchRegionApi({

            });
            if (res.lev3) {
              resolve(res.lev3.map(item => {
                return {
                  id: item.id,
                  name: `${item.l1}${item.l2}${item.l3}`
                }
              }))
            } else {
              resolve([]);
            }
          });
        },
        labelField: 'name',
        valueField: 'id',
      };
    },
  },
];


export const updateFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '登录账号',
    component: 'Input',
    required: true,
  },
  {
    field: 'managerid',
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
  {
    field: 'enterprise_id',
    label: '所属管理员',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res = await searchManagerApi({

            });
            resolve(res);
          });
        },
        labelField: 'name',
        valueField: 'id',
      };
    },
  },
  {
    field: 'regionid',
    label: '所属企业',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res: any = await searchRegionApi({

            });
            if (res.lev3) {
              resolve(res.lev3.map(item => {
                return {
                  id: item.id,
                  name: `${item.l1}${item.l2}${item.l3}`
                }
              }))
            } else {
              resolve([]);
            }
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
