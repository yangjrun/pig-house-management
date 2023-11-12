<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增单页 </a-button>
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
    <collectionModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import Icon from '@/components/Icon/Icon.vue';
  import { searchCollectionApi, deleteCollectionApi } from '/@/api/collection';
  import { CollectionSearchItem } from '/@/api/collection/collectionModel';

  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import collectionModal from './CollectionModal.vue';

  import { columns, getFormConfig } from './collection.data';

  export default defineComponent({
    name: 'collection-management',
    components: { BasicTable, collectionModal, TableAction, Icon, TableImg },
    setup() {
      const searchData = ref<CollectionSearchItem>({
        pageNum: 1,
        pageSize: 10,
        total: 0,
      });
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '单页列表',
        isTreeTable: true,
        api: () => {
          return new Promise(async (resolve) => {
            let res = await searchCollectionApi(searchData.value);
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
        await deleteCollectionApi({ id: record.id });
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
