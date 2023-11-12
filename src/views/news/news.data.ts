import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';

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
    title: '新闻标题',
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
    title: '省略图',
    dataIndex: 'omitPicture',
    width: 160,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'headline',
    label: '新闻标题',
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
    field: 'omitPicture',
    label: '省略图',
    component: 'Upload',
    required: true,
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
    },
  },
  {
    field: 'content',
    component: 'Input',
    label: '新闻内容',
    defaultValue: '',
    rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        showImageUpload: true,
        onChange: (value: string) => {
          model[field] = value;
        },
      });
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
