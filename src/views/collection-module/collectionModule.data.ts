import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn, FormProps, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 160,
    align: 'left',
  },
  {
    title: '模块名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '一级标题',
    dataIndex: 'headline',
    width: 160,
    align: 'left',
  },
  {
    title: '二级标题',
    dataIndex: 'subhead',
    width: 160,
    align: 'left',
  },
  {
    title: '显示文件',
    dataIndex: 'backgroundFile',
    width: 160,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模块名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'headline',
    label: '一级标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'subhead',
    label: '二级标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'fileType',
    label: '文件类型',
    component: 'RadioGroup',
    required: true,
    componentProps: {
      options: [
        {
          label: '图片',
          value: 1,
        },
        {
          label: '视频',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'backgroundFile',
    label: '背景文件',
    component: 'Upload',
    required: true,
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
      maxNumber: 5,
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
