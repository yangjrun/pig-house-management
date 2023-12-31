<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增模块 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'backgroundFile'">
          <TableImg :size="60" :simpleShow="true" :imgList="[record.backgroundFile]" />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <collectionModuleModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import Icon from '@/components/Icon/Icon.vue';
  import { searchCollectionModuleApi, deleteCollectionModuleApi } from '/@/api/collection-module';
  import { CollectionModuleSearchItem } from '/@/api/collection-module/collectionModuleModel';

  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import collectionModuleModal from './CollectionModuleModal.vue';

  import { columns, getFormConfig } from './collectionModule.data';

  export default defineComponent({
    name: 'collectionModule-management',
    components: { BasicTable, collectionModuleModal, TableAction, Icon, TableImg },
    setup() {
      const searchData = ref<CollectionModuleSearchItem>({
        pageNum: 1,
        pageSize: 10,
        total: 0,
      });
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '模块列表',
        api: () => {
          return new Promise(async (resolve) => {
            let res = await searchCollectionModuleApi(searchData.value);
            resolve(res.records);
          });
        },
        columns,
        pagination: true,
        striped: false,
        useSearchForm: true,
        handleSearchInfoFn(info) {
          searchData.value = info;
          if (!searchData.value.pageNum) {
            searchData.value.pageNum = 1;
          }
          if (!searchData.value.pageSize) {
            searchData.value.pageSize = 10;
          }
          return info;
        },
        formConfig: getFormConfig(),
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
        },
      });

      const { createMessage } = useMessage();

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteCollectionModuleApi({ id: record.id });
        createMessage.success('删除成功');
        reload();
      }

      function handleSuccess() {
        reload();
      }

      async function beforeEditSubmit({ record, index, key, value }) {}

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        beforeEditSubmit,
      };
    },
  });
</script>
./collection-module.data
