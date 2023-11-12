<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './collectionModule.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { addCollectionModuleApi, reviseCollectionModuleApi } from '/@/api/collection-module';
  export default defineComponent({
    name: 'collectionModule-modal',
    components: { BasicModal, BasicForm },
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
                backgroundFile: data.record.backgroundFile?.split(','),
              },
            ),
          );
          id.value = data.record.id;
        }
      });

      const getTitle = computed(() => (unref(isUpdate) ? '编辑模块' : '新增模块'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          values.backgroundFile = values.backgroundFile?.join(',');
          if (unref(isUpdate)) {
            values.id = unref(id);
            await reviseCollectionModuleApi(values);
          } else {
            await addCollectionModuleApi(values);
          }

          createMessage.success(!unref(isUpdate) ? '新增成功' : '修改成功');
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
