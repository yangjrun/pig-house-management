<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    width="1200px"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #remoteSearch="{ model, field }">
        <ApiSelect
          class="select"
          :api="handleSearchCollectionModule"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          resultField="records"
          labelField="headline"
          valueField="id"
          @search="handleSearchCollectionModuleChange"
        />
      </template>
      <template #add="{ field }">
        <Button class="add-box" v-if="Number(field) === 0" @click="handleAddSchema">+</Button>
        <Button class="add-box" v-if="field > 0" @click="handleDeleteSchema(field)">-</Button>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { formSchema } from './collection.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDebounceFn } from '@vueuse/core';
  import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
  import { InputNumber } from 'ant-design-vue';

  import { addCollectionApi, reviseCollectionApi } from '/@/api/collection';
  import { searchCollectionModuleApi } from '/@/api/collection-module';

  import { CollectionModuleSearchItem } from '/@/api/collection-module/collectionModuleModel';
  import { CollectionModuleMergeItem } from '/@/api/collection/collectionModel';

  export default defineComponent({
    name: 'collection-modal',
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
      const schemaSerialNumber = ref(1);

      const [
        registerForm,
        { resetFields, setFieldsValue, validate, appendSchemaByField, removeSchemaByField },
      ] = useForm({
        labelWidth: 100,
        baseColProps: { span: 8 },
        actionColOptions: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const copyValue = Object.assign({}, data.record);
          if (data.record.children && data.record.children.length > 0) {
            data.record.children.forEach((item, index) => {
              copyValue[`${index}_moduleId`] = item.id;
              copyValue[`${index}_sort`] = item.sort;
              if (index != 0) {
                handleAddSchema();
              }
            });
          }
          setFieldsValue(
            Object.assign(
              {
                ...data.record,
              },
              {
                ...copyValue,
              },
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
          const moduleMerges: Array<CollectionModuleMergeItem> = [];
          for (let index = 0; index < schemaSerialNumber.value; index++) {
            moduleMerges.push({
              collectionModuleId: values[`${index}_moduleId`],
              sort: values[`${index}_sort`],
            });
          }
          const data = {
            name: values.name,
            moduleMerges,
            bannerId: values.bannerId,
          };

          if (unref(isUpdate)) {
            data.id = id.value;
            await reviseCollectionApi(data);
          } else {
            await addCollectionApi(data);
          }

          createMessage.success(!unref(isUpdate) ? '新增成功' : '修改成功');
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      const searchCollectionModuleParams = ref<CollectionModuleSearchItem>({
        name: '',
        pageNum: 1,
        pageSize: 50,
      });

      const handleSearchCollectionModuleChange = (value: string) => {
        searchCollectionModuleParams.value.name = value;
      };

      const handleSearchCollectionModule = async () => {
        let { records } = await searchCollectionModuleApi(searchCollectionModuleParams.value);
        return records;
      };

      function handleAddSchema() {
        appendSchemaByField(
          {
            field: `${schemaSerialNumber.value}_moduleId`,
            component: 'Input',
            label: '模块' + schemaSerialNumber.value,
            slot: 'remoteSearch',
          },
          '',
        );
        appendSchemaByField(
          {
            field: `${schemaSerialNumber.value}_sort`,
            component: 'InputNumber',
            label: '排序' + schemaSerialNumber.value,
          },
          '',
        );

        appendSchemaByField(
          {
            field: `${schemaSerialNumber.value}`,
            component: 'Input',
            label: ' ',
            slot: 'add',
          },
          '',
        );
        schemaSerialNumber.value++;
      }

      function handleDeleteSchema(field) {
        removeSchemaByField([`${field}_moduleId`, `${field}_sort`, `${field}`]);
        schemaSerialNumber.value--;
      }

      return {
        handleSearchCollectionModule: handleSearchCollectionModule,
        handleSearchCollectionModuleChange: useDebounceFn(handleSearchCollectionModuleChange, 300),
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        handleAddSchema,
        handleDeleteSchema,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .add-box {
    margin-left: 12px;
  }
</style>
