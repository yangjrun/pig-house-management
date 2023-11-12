<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增员工 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'omitPicture'">
          <TableImg :size="60" :simpleShow="true" :imgList="[record.omitPicture]" />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction :actions="[
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
          ]" />
        </template>
      </template>
    </BasicTable>
    <StaffAddModal @register="registerAddModal" @success="handleSuccess" />
    <StaffUpdateModal @register="registerUpdateModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
import Icon from '@/components/Icon/Icon.vue';
import { searchStaffApi, deleteStaffApi } from '/@/api/staff';
import { NewsSearchItem } from '/@/api/staff/newsModel';

import { useModal } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';
import StaffAddModal from './StaffAddModal.vue';
import StaffUpdateModal from './StaffUpdateModal.vue';


import { columns, getFormConfig } from './staff.data';

export default defineComponent({
  name: 'staff-management',
  components: { BasicTable, StaffAddModal, StaffUpdateModal, TableAction, Icon, TableImg },
  setup() {
    const searchData = ref<NewsSearchItem>({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    });
    const [registerAddModal, addModal] = useModal();
    const [registerUpdateModal, updateModal] = useModal();
    const [registerTable, { reload }] = useTable({
      title: '账号管理',
      isTreeTable: true,
      api: () => {
        return new Promise(async (resolve) => {
          let res = await searchStaffApi(searchData.value);
          resolve(res);
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
      addModal.openModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: Recordable) {
      updateModal.openModal(true, {
        record,
        isUpdate: true,
      });
    }

    async function handleDelete(record: Recordable) {
      await deleteStaffApi({ id: record.id });
      createMessage.success('删除成功');
      reload();
    }

    function handleSuccess() {
      reload();
    }

    async function beforeEditSubmit({ record, index, key, value }) { }

    return {
      registerTable,
      registerAddModal,
      registerUpdateModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      beforeEditSubmit,
    };
  },
});
</script>
