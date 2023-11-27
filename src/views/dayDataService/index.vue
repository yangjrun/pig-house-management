<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="[
            {
              icon: 'clarity:note-edit-line',
              label: '每日数据',
              onClick: handleDataService.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
          ]" />
        </template>
      </template>
    </BasicTable>
    <DayDataServiceModal @register="registerModal" @success="handleSuccess" />
    <DataServiceModal @register="registerDataServiceModal"></DataServiceModal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useModal } from '/@/components/Modal';

import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
import { getDayPigstyInfoApi } from '/@/api/dataservice';

import DayDataServiceModal from './dayDataServiceModal.vue'
import DataServiceModal from './dataServiceModal.vue'

import { columns, getFormConfig, searchFormSchema } from './dayDataService.data';

export default defineComponent({
  name: 'dataservice-management',
  components: { BasicTable, TableAction, TableImg, DayDataServiceModal, DataServiceModal },
  setup() {
    const [registerModal, { openModal }] = useModal();
    const [registerDataServiceModal, dataServiceModal] = useModal()
    const [registerTable, { reload }] = useTable({
      title: '每日猪舍数据',
      isTreeTable: true,
      api: (params) => {
        let _params = Object.assign({}, params)
        if (_params.starttimets) {
          _params.starttimets = Number((new Date(_params.starttimets).getTime() / 1000).toFixed())
        }
        _params.ids = _params.ids.join(';')
        return new Promise(async (resolve) => {
          let res: any = await getDayPigstyInfoApi(_params);
          let dataList: any = []
          if (res && res.length > 0) {
            res.forEach(item => {
              if (item.dayList && item.dayList.length > 0) {
                item.dayList.forEach(dayItem => {
                  dataList.push(Object.assign({}, item, dayItem))
                })
              }
            });
          }
          resolve({
            items: dataList
          })
        });
      },
      columns,
      pagination: false,
      striped: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      autoCreateKey: true,
      formConfig: getFormConfig(),
      actionColumn: {
        width: 360,
        title: '操作',
        dataIndex: 'action',
      },
    });

    function handleSuccess() {
      reload();
    }

    async function beforeEditSubmit({ record, index, key, value }) { }

    function handleEdit(record: Recordable) {
      console.log('handleEdit', record)
      openModal(true, {
        record,
        isUpdate: true,
      });
    }

    function handleDataService(record: Recordable) {
      dataServiceModal.openModal(true, {
        record
      })
    }

    return {
      registerTable,
      handleSuccess,
      beforeEditSubmit,
      handleEdit,
      registerModal,
      registerDataServiceModal,
      handleDataService
    };
  },
});
</script>
