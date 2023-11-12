<template>
  <BasicModal v-bind="$attrs" @register="registerModal" width="1200px" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"> </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
import { updateFormSchema } from './staff.data';
import { useMessage } from '/@/hooks/web/useMessage';

import { addStaffApi, modifyStaffApi } from '/@/api/staff';

export default defineComponent({
  name: 'staff-update-modal',
  components: { BasicModal, BasicForm, ApiSelect },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const id = ref('');
    const { createMessage } = useMessage();

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 100,
      baseColProps: { span: 24 },
      schemas: updateFormSchema,
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
              isUpdate: isUpdate.value
            }
          ),
        );
        id.value = data.record.id;
      }
    });

    const getTitle = computed(() => (unref(isUpdate) ? '编辑员工' : '新增员工'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        if (unref(isUpdate)) {
          values.id = unref(id);
          values.association = {
            managerid: values.managerid,
            enterprise_id: values.enterprise_id,
            regionid: values.regionid
          }
          await modifyStaffApi(values);
        } else {
          values.association = {
            managerid: values.managerid,
            enterprise_id: values.enterprise_id,
            regionid: values.regionid
          }
          await addStaffApi(values);
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
