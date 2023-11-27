import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { formatToDateTime } from '/@/utils/dateUtil'
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';

import { getEnterpriseListApi } from '/@/api/enterprise'
import { getManagerListApi } from '/@/api/manager'
import { getRegionListApi } from '/@/api/region'


export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: 160,
    align: 'left',
  },
  {
    title: '企业信息',
    dataIndex: 'enterprise',
    width: 160,
    align: 'left',
  },
  {
    title: '管理的猪舍数量',
    dataIndex: '',
    width: 160,
    align: 'left',
  },
  {
    title: '更新时间',
    dataIndex: 'lastTS',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return formatToDateTime(new Date(record.lastTS * 1000))
    }
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '登录账号',
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isUpdate
      }
    }
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
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isUpdate
      }
    }
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
            let res = await getEnterpriseListApi({

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
    field: 'managerid',
    label: '所属管理员',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res = await getManagerListApi({

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
    label: '所属区域',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res: any = await getRegionListApi();
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
    schemas: [],
  };
}
