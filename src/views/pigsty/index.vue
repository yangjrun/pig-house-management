<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增猪舍 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'omitPicture'">
          <TableImg :size="60" :simpleShow="true" :imgList="[record.omitPicture]" />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction :actions="[
            {
              icon: 'clarity:note-edit-line',
              label: '分配员工',
              onClick: handleAssignStaff.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              label: '每日数据',
              onClick: handleDataService.bind(null, record),
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
    <PigstyModal @register="registerModal" @success="handleSuccess" />
    <AssignStaffModal @register="registerAssignStaffModal" @success="handleSuccess" />
    <DataServiceModal @register="registerDataServiceModal"></DataServiceModal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
import Icon from '@/components/Icon/Icon.vue';
import { searchPigstyApi, deletePigstyApi } from '/@/api/pigsty';

import { useModal } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';
import PigstyModal from './pigstyModal.vue';
import AssignStaffModal from './assignStaffModal.vue'
import DataServiceModal from './dataServiceModal.vue'

import { columns, getFormConfig } from './pigsty.data';

export default defineComponent({
  name: 'pigsty-management',
  components: { BasicTable, PigstyModal, AssignStaffModal, DataServiceModal, TableAction, Icon, TableImg },
  setup() {
    const searchData = ref<any>({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    });
    const [registerModal, { openModal }] = useModal();
    const [registerAssignStaffModal, assignStaffModal] = useModal()
    const [registerDataServiceModal, dataServiceModal] = useModal()
    const [registerTable, { reload }] = useTable({
      title: '账号管理',
      isTreeTable: true,
      api: (params) => {
        return new Promise(async (resolve) => {
          let res = await searchPigstyApi(Object.assign(searchData.value, {
            webpageinfo: `${params.page};${params.pageSize}`
          }));
          resolve({
            items: res.data,
            total: res.number
          });
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
        width: 360,
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
      await deletePigstyApi({ id: record.id });
      createMessage.success('删除成功');
      reload();
    }

    function handleSuccess() {
      reload();
    }

    async function beforeEditSubmit({ record, index, key, value }) { }

    function handleAssignStaff(record: Recordable) {
      assignStaffModal.openModal(true, {
        record,
      })
    }

    function handleDataService(record: Recordable) {
      dataServiceModal.openModal(true, {
        record
      })
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      beforeEditSubmit,
      handleAssignStaff,
      registerAssignStaffModal,
      handleDataService,
      registerDataServiceModal
    };
  },
});
</script>
