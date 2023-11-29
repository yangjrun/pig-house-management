<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #bodyCell="data">
        <template v-if="data.column.key === 'action'">
          <TableAction :actions="[
            // {
            //   icon: 'clarity:note-edit-line',
            //   label: '每日数据',
            //   onClick: handleDataService.bind(null, record),
            // },
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, data),
            },
          ]" />
        </template>
      </template>
    </BasicTable>
    <WeekDataServiceModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useModal } from '/@/components/Modal';

import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getWeekPigstyInfoApi } from '/@/api/dataservice';
import WeekDataServiceModal from './weekDataServiceModal.vue'

import { columns, getFormConfig, searchFormSchema } from './weekDataService.data';

export default defineComponent({
  name: 'week-dataService-management',
  components: { BasicTable, TableAction, WeekDataServiceModal },
  setup() {
    const tableData: any = ref()
    const id: any = ref()
    const [registerModal, { openModal }] = useModal();
    const [registerTable, { reload }] = useTable({
      title: '每周猪舍数据',
      isTreeTable: true,
      childrenColumnName: 'dayList',
      api: (params) => {
        let _params = Object.assign({}, params)
        id.value = _params.id
        return new Promise(async (resolve) => {
          let res: any = await getWeekPigstyInfoApi(_params);
          if (res instanceof Array) {
            res.forEach(item => {
              if (item.dayList) {
                item.dayList = item.dayList.map((dayItem) => {
                  return Object.assign({}, dayItem, {
                    id: id.value,
                    weektime: item.weektime,
                    totalWeekFeedUsage: item.totalWeekFeedUsage,
                    totalWeekWaterUsage: item.totalWeekWaterUsage,
                    pigHeadCount: item.pigHeadCount,
                    pigAverageWeight: item.pigAverageWeight,
                    curPigWeekAge: item.curPigWeekAge
                  })
                })
              }
            })
            tableData.value = res
            console.log('tableData.value', tableData.value)
          }
          resolve({
            items: res instanceof Array ? res : []
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

    function handleEdit(data: any) {
      // let record = tableData.value[0].dayList[data.index]
      console.log('tableData.value[0].dayList', tableData.value[0].dayList)
      console.log('tableData.value[0].dayList', data.index)
      openModal(true, {
        record: tableData.value[0].dayList[data.index],
        isUpdate: true,
      });
    }

    async function beforeEditSubmit({ record, index, key, value }) { }

    return {
      registerTable,
      handleSuccess,
      beforeEditSubmit,
      registerModal,
      handleEdit
    };
  },
});
</script>
