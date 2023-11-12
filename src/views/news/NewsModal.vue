<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    width="1200px"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm"> </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { formSchema } from './news.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { addNewsApi, reviseNewsApi } from '/@/api/news';

  export default defineComponent({
    name: 'news-modal',
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
                omitPicture: [data.record.omitPicture],
              },
            ),
          );
          id.value = data.record.id;
        }
      });

      const getTitle = computed(() => (unref(isUpdate) ? '编辑新闻' : '新增新闻'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          values.omitPicture = values.omitPicture[0];
          if (unref(isUpdate)) {
            values.id = unref(id);
            await reviseNewsApi(values);
          } else {
            await addNewsApi(values);
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
