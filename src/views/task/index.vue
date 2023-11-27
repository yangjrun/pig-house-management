<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleInfoList"> 报表 </a-button> -->
        <a-button type="primary" @click="handleCreate"> 新增任务 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'omitPicture'">
          <TableImg :size="60" :simpleShow="true" :imgList="[record.omitPicture]" />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction :actions="[
            record.eventbody.length == 1 ? {
              icon: 'clarity:note-edit-line',
              label: '审批',
              onClick: handleEdit.bind(null, record),
            } : {},
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
    <TaskModal @register="registerModal" @success="handleSuccess" />
    <InfoListModal @register="registerInfoListModal" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';

import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
import Icon from '@/components/Icon/Icon.vue';
import { searchTaskApi, deleteTaskApi } from '/@/api/task';

import { useModal } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';
import TaskModal from './TaskModal.vue';
import InfoListModal from './InfoListModal.vue'

import { columns, searchFormSchema } from './task.data';

export default defineComponent({
  name: 'pigstymgtTask-management',
  components: { BasicTable, TaskModal, InfoListModal, TableAction, Icon, TableImg },
  setup() {
    const searchData = ref<any>({
      total: 0,
    });
    const [registerModal, { openModal }] = useModal();
    const [registerInfoListModal, infoListModal] = useModal();
    const [registerTable, { reload }] = useTable({
      title: '任务管理',
      isTreeTable: false,
      api: (params) => {
        return new Promise(async (resolve) => {
          let res = await searchTaskApi(Object.assign(searchData.value, {
            webpageinfo: `${params.page};${params.pageSize}`,
            sortmode: params.sortmode
          }));
          console.log('res', res)
          resolve({
            items: res.data,
            total: res.number
          });
        });
      },
      columns,
      pagination: {
        pageSize: 10
      },
      striped: false,
      useSearchForm: true,
      formConfig: {
        labelWidth: 120,
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

    function handleInfoList() {
      infoListModal.openModal(true)
    }

    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true,
      });
    }

    async function handleDelete(record: Recordable) {
      await deleteTaskApi({ id: record.id });
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
      registerInfoListModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleInfoList,
      beforeEditSubmit,
    };
  },
});
</script>
