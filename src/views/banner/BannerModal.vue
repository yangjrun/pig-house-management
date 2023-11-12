<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"> </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { formSchema } from './banner.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
  import { InputNumber } from 'ant-design-vue';

  import { addBannerApi, reviseBannerApi } from '/@/api/banner';

  export default defineComponent({
    name: 'banner-modal',
    components: {
      BasicModal,
      BasicForm,
      ApiSelect,
      PlusOutlined,
      MinusOutlined,
      [InputNumber.name]: InputNumber,
    },
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
              {},
            ),
          );
          id.value = data.record.id;
        }
      });

      const getTitle = computed(() => (unref(isUpdate) ? '编辑单页' : '新增单页'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          console.log('values', values);
          if (unref(isUpdate)) {
            values.id = unref(id);
            await reviseBannerApi(values);
          } else {
            await addBannerApi(values);
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

<style lang="scss" scoped>
  .add-box {
    margin-left: 12px;
  }
</style>
