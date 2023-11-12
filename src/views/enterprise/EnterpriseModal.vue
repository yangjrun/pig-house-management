<template>
  <BasicModal v-bind="$attrs" @register="registerModal" width="500px" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"> </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
import { formSchema } from './enterprise.data';
import { useMessage } from '/@/hooks/web/useMessage';

import { addEnterpriseApi, modifyEnterpriseApi } from '/@/api/enterprise';

export default defineComponent({
  name: 'enterprise-modal',
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
      isUpdate.value = data?.isUpdate;

      if (unref(isUpdate)) {
        setFieldsValue(
          data.record,
        );
        id.value = data.record.id;
      }
    });

    const getTitle = computed(() => (unref(isUpdate) ? '编辑企业' : '新增企业'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        if (unref(isUpdate)) {
          values.id = unref(id);
          values.association = {
            managerid: '15800001235',
            regionid: '5bm/5Lic55yBX+W5v+W3nuW4gl/otornp4DljLo='
          }
          await modifyEnterpriseApi(values);
        } else {
          await addEnterpriseApi(values);
        }

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
});
</script>
