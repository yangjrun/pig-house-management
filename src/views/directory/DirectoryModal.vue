<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #remoteSearch="{ model, field }">
        <ApiSelect
          :api="handleSearchDirectoryModule"
          showSearch
          v-model:value="model[field]"
          mode="multiple"
          :filterOption="false"
          resultField="records"
          labelField="name"
          valueField="id"
          @search="handleSearchDirectoryModuleChange"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { formSchema } from './directory.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDebounceFn } from '@vueuse/core';

  import { addDirectoryApi, reviseDirectoryApi } from '/@/api/directory';
  import { searchDirectoryItemApi } from '/@/api/directory-item';

  import { DirectoryItemSearchItem } from '/@/api/directory-item/directoryItemModel';

  export default defineComponent({
    name: 'directory-modal',
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
              {},
            ),
          );
          id.value = data.record.id;
        }
      });

      const getTitle = computed(() => (unref(isUpdate) ? '编辑底部目录' : '新增底部目录'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            values.id = unref(id);
            await reviseDirectoryApi(values);
          } else {
            await addDirectoryApi(values);
          }
          createMessage.success(!unref(isUpdate) ? '新增成功' : '修改成功');
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      const searchDirectoryModuleParams = ref<DirectoryItemSearchItem>({
        name: '',
        pageNum: 1,
        pageSize: 50,
      });

      const handleSearchDirectoryModuleChange = (value: string) => {
        searchDirectoryModuleParams.value.name = value;
      };

      const handleSearchDirectoryModule = async () => {
        let { records } = await searchDirectoryItemApi(searchDirectoryModuleParams.value);
        return records;
      };

      return {
        handleSearchDirectoryModule: handleSearchDirectoryModule,
        handleSearchDirectoryModuleChange: useDebounceFn(handleSearchDirectoryModuleChange, 300),
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
