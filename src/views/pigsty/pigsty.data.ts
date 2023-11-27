import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil'

import { getEnterpriseListApi } from '/@/api/enterprise'
import { getManagerListApi } from '/@/api/manager'
import { getRegionListApi } from '/@/api/region'
import { getStaffListApi } from '/@/api/staff'
import { getPigstyListApi } from '/@/api/pigsty'

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
    title: '所属企业',
    dataIndex: 'enterprise',
    width: 160,
    align: 'left',
  },
  {
    title: '员工名称',
    dataIndex: 'staffname',
    width: 160,
    align: 'left',
  },
  {
    title: '员工电话',
    dataIndex: 'staffid',
    width: 160,
    align: 'left',
  },
  {
    title: '区域信息',
    dataIndex: 'email',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return `${record.regionname_lev_1}${record.regionname_lev_2}${record.regionname_lev_3}`
    }
  },
  {
    title: '更新时间',
    dataIndex: 'email',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return formatToDateTime(new Date(record.lastTS * 1000))
    }
  },
];

export const dataServiceColumns: BasicColumn[] = [
  {
    title: '猪舍信息',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '时间',
    dataIndex: 'lastTS',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (record.dayList && record.dayList.length > 0) {
        return formatToDateTime(new Date(record.dayList[0].checkinTS * 1000), 'YYYY-MM-DD')
      } else {
        return ''
      }
    }
  },
  {
    title: '用水数',
    dataIndex: 'id',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (record.dayList && record.dayList.length > 0) {
        return formatToDateTime(new Date(record.dayList[0].checkinTS * 1000), 'YYYY-MM-DD')
      } else {
        return ''
      }
    }
  },
  {
    title: '采食量',
    dataIndex: 'feedWeight',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (record.dayList && record.dayList.length > 0) {
        return formatToDateTime(new Date(record.dayList[0].checkinTS * 1000), 'YYYY-MM-DD')
      } else {
        return ''
      }
    }
  },
  {
    title: '平均猪重',
    dataIndex: 'pigAverageWeight',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (record.dayList && record.dayList.length > 0) {
        return formatToDateTime(new Date(record.dayList[0].checkinTS * 1000), 'YYYY-MM-DD')
      } else {
        return ''
      }
    }
  },
  {
    title: '在栏数',
    dataIndex: 'pigHeadCount',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (record.dayList && record.dayList.length > 0) {
        return formatToDateTime(new Date(record.dayList[0].checkinTS * 1000), 'YYYY-MM-DD')
      } else {
        return ''
      }
    }
  },
  {
    title: '周龄',
    dataIndex: 'pigWeekAge',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (record.dayList && record.dayList.length > 0) {
        return formatToDateTime(new Date(record.dayList[0].checkinTS * 1000), 'YYYY-MM-DD')
      } else {
        return ''
      }
    }
  },
]

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '猪舍名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'enterprise_id',
    label: '所属企业',
    component: 'ApiSelect',
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
];

export const assignStaffFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '编号',
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        disabled: true
      }
    }
  },
  {
    field: 'staffid',
    label: '所属员工',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res = await getStaffListApi({

            });
            resolve(res);
          });
        },
        labelField: 'name',
        valueField: 'id',
      };
    },
  },
]

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    autoSubmitOnEnter: true,
    schemas: [],
  };
}

export function getDataServiceFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    autoSubmitOnEnter: true,
    schemas: [
      {
        field: 'starttimets',
        component: 'DatePicker',
        label: '设置起始时间',
        colProps: {
          span: 8,
        },
      },
    ],
  };
}
