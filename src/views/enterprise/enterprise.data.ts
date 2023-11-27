import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil'
import { getManagerListApi } from '/@/api/manager'
import { getRegionListApi } from '/@/api/region'

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
    ifShow: false,
  },
  {
    title: '企业名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '管理员姓名',
    dataIndex: 'managername',
    width: 160,
    align: 'left',
  },
  {
    title: '联系电话',
    dataIndex: 'managerphone',
    width: 160,
    align: 'left',
  },
  {
    title: '邮箱',
    dataIndex: 'manageremail',
    width: 160,
    align: 'left',
  },
  {
    title: '区域信息',
    dataIndex: 'regionid',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return `${record.regionname_lev_1}${record.regionname_lev_2}${record.regionname_lev_3}`
    }
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
    schemas: [],
  };
}
