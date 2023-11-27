<template>
  <BasicModal v-bind="$attrs" @register="registerModal" width="1200px" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"> </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
import { formSchema } from './dayDataService.data';
import { useMessage } from '/@/hooks/web/useMessage';

import { modifypigstyinfoUrlApi } from '/@/api/dataservice';

export default defineComponent({
  name: 'pigsty-modal',
  components: { BasicModal, BasicForm, ApiSelect },
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

        setFieldsValue(
          Object.assign(
            {
              ...data.record,
            },
            {
              isUpdate
            }),
        );
        id.value = data.record.id;
      }
    });

    const getTitle = '编辑猪舍日数据';

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        values.id = unref(id);
        await modifypigstyinfoUrlApi(values);
        createMessage.success(!unref(isUpdate) ? '新增成功' : '修改成功');
        closeModal();
        emit('success');
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return {
      registerModal,
      registerForm,
      getTitle,
      handleSubmit,
    };
  },
})
</script>
