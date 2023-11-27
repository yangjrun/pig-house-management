<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增区域 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'omitPicture'">
          <TableImg :size="60" :simpleShow="true" :imgList="[record.omitPicture]" />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction :actions="[
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]" />
        </template>
      </template>
    </BasicTable>
    <RegionModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
import Icon from '@/components/Icon/Icon.vue';
import { searchRegionApi, deleteRegionApi } from '/@/api/region';

import { useModal } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';
import RegionModal from './RegionModal.vue';

import { columns, getFormConfig, searchFormSchema } from './region.data';

export default defineComponent({
  name: 'region-management',
  components: { BasicTable, RegionModal, TableAction, Icon, TableImg },
  setup() {
    const searchData = ref<any>({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    });
    const [registerModal, { openModal }] = useModal();
    const [registerTable, { reload }] = useTable({
      title: '账号管理',
      isTreeTable: true,
      api: (params) => {
        return new Promise(async (resolve) => {
          let res = await searchRegionApi(Object.assign(searchData.value, {
            webpageinfo: `${params.page};${params.pageSize}`
          }));
          resolve({
            items: res.data,
            total: res.number
          })
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
      formConfig: {
        abelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
      },
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
      await deleteRegionApi({ id: record.id });
      createMessage.success('删除成功');
      reload();
    }

    function handleSuccess() {
      reload();
    }

    async function beforeEditSubmit({ record, index, key, value }) { }

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
