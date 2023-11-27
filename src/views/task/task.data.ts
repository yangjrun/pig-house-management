import { h, ref } from 'vue';

import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil'

import { getStaffListApi,findStaffByNamesUrl } from '/@/api/staff'
import { getPigstyListApi } from '/@/api/pigsty'

const staffList = ref()
const getStaffList = () => {
  getStaffListApi({}).then(resp => {
    console.log('getStaffList', resp)
    staffList.value = resp
  })
}
getStaffList()

export const searchFormSchema: FormSchema[] = [
  {
    field: 'sortmode',
    label: '排序',
    component: 'Select',
    componentProps: () => {
      return {
        options: [
          {
            label: '正序',
            value: 1,
            key: '1',
          },
          {
            label: '倒序',
            value: 2,
            key: '2',
          },
        ],
      }
    },
    colProps: { span: 4 },
  },
]

const reqType = [
  {
    label: '猪舍盘点',
    value: 1,
  },
  {
    label: '病死淘转',
    value: 2,
  },
  {
    label: '采食上报',
    value: 3,
  }
]

const taskType1 = [
  {
    label: '进猪申请',
    value: 1
  },
  {
    label: '出猪申请',
    value: 2
  },
]

const taskType2 = [
  {
    label: '病猪转出',
    value: 1
  },
  {
    label: '死猪转出',
    value: 2
  },
  {
    label: '转出猪',
    value: 3
  },
  {
    label: '转入猪',
    value: 4
  },
]

const taskType3 = [
  {
    label: '采集上报',
    value: 1
  },
]


export const columns: BasicColumn[] = [
  {
    title: '任务时间',
    dataIndex: 'createData',
    width: 160,
    align: 'left',
  },
  {
    title: '猪舍信息',
    dataIndex: 'pigstyname',
    width: 160,
    align: 'left',
  },
  {
    title: '任务类型',
    dataIndex: 'typedescribe',
    width: 160,
    align: 'left',
  },
  {
    title: '员工名',
    dataIndex: 'typedescribe',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      let name = ''
      if (record.eventbody && record.eventbody.length > 0 && staffList.value && staffList.value.length > 0) {
        staffList.value.forEach(staffItem => {
          if (staffItem.id == record.eventbody[0].staffid) {
            name = staffItem.name
          }
        });
      }
      return name
    }
  },
  {
    title: '请求状态',
    dataIndex: 'typedescribe',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (record.eventbody && record.eventbody.length > 0) {
        const item = record.eventbody[0]
        let reqtype = record.type
        let tasktype = item.type
        switch (reqtype) {
          case 1:
            return `${formatToDateTime(item.reportTS * 1000, 'YYYY-MM-DD')}：${item.pigHeadCount}头；${item.pigWeekAge}周；${item.pigAverageWeight}；公斤`;
          case 2:
            switch (tasktype) {
              case 1:
                return `病猪转出；${item.pigChangeNum}头`
              case 2:
                return `死猪转出；${item.pigChangeNum}头`
              case 3:
                return `转出猪；${item.pigChangeNum}头`
              case 4:
                return `转入猪；${item.pigChangeNum}头`
            }
          case 3:
            return `${formatToDateTime(item.reportTS * 1000, 'YYYY-MM-DD')}：${item.feedWeight}公斤；${item.pigAverageWeight}公斤`;;
        }
      } else {
        return ''
      }
    }
  },
  {
    title: '审批状态',
    dataIndex: 'typedescribe',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (record.eventbody && record.eventbody.length > 1) {
        const item = record.eventbody[1]
        let reqtype = record.type
        let tasktype = item.type
        if (tasktype == 11) {
          return `${formatToDateTime(item.reportTS * 1000, 'YYYY-MM-DD')}：${item.desc}；`;
        } else {
          switch (reqtype) {
            case 1:
              return `${formatToDateTime(item.reportTS * 1000, 'YYYY-MM-DD')}：${item.desc}；${item.pigHeadCount}头；${item.pigWeekAge}周；${item.pigAverageWeight}；公斤`;
            case 2:
              return `${formatToDateTime(item.reportTS * 1000, 'YYYY-MM-DD')}：${item.desc}；`;
            case 3:
              return `${formatToDateTime(item.reportTS * 1000, 'YYYY-MM-DD')}：${item.desc}；`;
          }
        }
      } else {
        return ''
      }
    }
  },
];

let _taskType = ref()

export const formSchema: FormSchema[] = [
  {
    field: 'reqtype',
    label: '任务类型',
    component: 'Select',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        disabled: formModel.isUpdate,
        options: reqType,
        onChange: (reqtype) => {
          switch (reqtype) {
            case 1:
              _taskType.value = taskType1
              break;
            case 2:
              _taskType.value = taskType2
              break;
            case 3:
              _taskType.value = taskType3
              break;
          }
        }
      }
    }
  },
  {
    field: 'pigstyid',
    label: '猪舍编号',
    required: true,
    component: 'ApiSelect',
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        api: () => {
          return new Promise(async (resolve) => {
            let res = await getPigstyListApi({

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
    field: 'staffid',
    label: '员工',
    required: true,
    component: 'ApiSelect',
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      console.log('formModel', formModel)
      return {
        disabled: formModel.isUpdate,
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
  {
    field: 'tasktype',
    label: '任务名称',
    component: 'Select',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        disabled: formModel.isUpdate,
        options: _taskType,
      }
    },
    ifShow: ({ values }) => {
      return values.reqtype != 3
    },
  },
  {
    field: 'pigHeadCount',
    label: '猪数量',
    component: 'InputNumber',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        addonAfter: '头',
      }
    },
    ifShow: ({ values }) => {
      console.log('reqtype', values)
      return values.reqtype == 1
    },
  },
  {
    field: 'pigWeekAge',
    label: '猪周龄',
    component: 'InputNumber',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        addonAfter: '周',
      }
    },
    ifShow: ({ values }) => {
      return values.reqtype == 1
    },
  },
  {
    field: 'pigAverageWeight',
    label: '猪均重',
    component: 'InputNumber',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        addonAfter: '公斤',
      }
    },
    ifShow: ({ values }) => {
      return values.reqtype == 1
    },
  },
  {
    field: 'pigChangeNum',
    label: '调整猪数',
    component: 'InputNumber',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        addonAfter: '头',
      }
    },
    ifShow: ({ values }) => {
      return values.reqtype == 2
    },
  },
  {
    field: 'feedWeight',
    label: '当日饲料量',
    component: 'InputNumber',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        addonAfter: '公斤',
      }
    },
    ifShow: ({ values }) => {
      return values.reqtype == 3
    },
  },
  {
    field: 'pigAverageWeight',
    label: '调整猪均重',
    component: 'InputNumber',
    required: true,
    componentProps: ({ schema, formModel, tableAction, formActionType }) => {
      return {
        addonAfter: '公斤',
      }
    },
    ifShow: ({ values }) => {
      return values.reqtype == 3
    },
  },
  {
    field: 'isUpdate',
    label: '',
    component: 'Switch',
    show: false
  },
  {
    field: 'createTS',
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
