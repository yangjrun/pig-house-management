<template>
  <BasicModal v-bind="$attrs" @register="registerModal" width="1200px" :title="getTitle" @ok="handleSubmit"
    @cancel="handleCancel" :okText="isUpdate ? '审核' : '确定'" :cancelText="isUpdate ? '不通过' : '取消'">
    <BasicForm @register="registerForm"> </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref, h } from 'vue';
import { Button } from "ant-design-vue"

import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
import { formSchema } from './task.data';
import { useMessage } from '/@/hooks/web/useMessage';

import { addTaskApi, modifyTaskApi, approveUrlApi } from '/@/api/task';

export default defineComponent({
  name: 'task-modal',
  components: { BasicModal, BasicForm, ApiSelect, Button },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const id = ref('');
    const { createMessage } = useMessage();

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 100,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        let basicData = data.record.eventbody[0]
        let dataSource = {}
        console.log('basicData.type', basicData.type)
        switch (data.record.type) {
          case 1:
            dataSource['pigHeadCount'] = basicData.pigHeadCount
            dataSource['pigWeekAge'] = basicData.pigWeekAge
            dataSource['pigAverageWeight'] = basicData.pigAverageWeight
            break;
          case 2:
            dataSource['pigChangeNum'] = basicData.pigChangeNum
            break;
          case 3:
            dataSource['feedWeight'] = basicData.feedWeight
            dataSource['pigAverageWeight'] = basicData.pigAverageWeight
            break;
          default:
            break;
        }
        setFieldsValue(
          Object.assign(
            {
              ...data.record,
            },
            {
              isUpdate: isUpdate.value,
              reqtype: data.record.type,
              pigstyid: data.record.id,
              staffid: data.record.eventbody[0].staffid,
              tasktype: data.record.eventbody[0].type,
            },
            dataSource
          ),
        );
        id.value = data.record.id;
      }
    });

    const getTitle = computed(() => (unref(isUpdate) ? '编辑任务' : '新增任务'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        if (values.reqtype == 3) {
          values.tasktype = 1
        }
        if (unref(isUpdate)) {
          values.id = unref(id);
          values.managerid = '15812340001'
          // 10 为同意
          values.tasktype = 10
          await approveUrlApi(values);
        } else {
          await addTaskApi(values);
        }
        createMessage.success(!unref(isUpdate) ? '新增成功' : '修改成功');
        closeModal();
        emit('success');
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    async function handleCancel() {
      try {
        if (unref(isUpdate)) {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          values.id = unref(id);
          values.managerid = '15812340001'
          // 10 为同意
          values.tasktype = 11
          await approveUrlApi(values);
          createMessage.success(!unref(isUpdate) ? '新增成功' : '修改成功');
          closeModal();
          emit('success');
        }
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return {
      registerModal,
      registerForm,
      getTitle,
      handleSubmit,
      handleCancel,
      isUpdate
    };
  },
});
</script>
