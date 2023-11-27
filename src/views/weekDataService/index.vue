<template>
  <div>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit">
      <template #bodyCell="{ column, record }">
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getWeekPigstyInfoApi } from '/@/api/dataservice';

import { columns, getFormConfig, searchFormSchema } from './weekDataService.data';

export default defineComponent({
  name: 'week-dataService-management',
  components: { BasicTable, TableAction },
  setup() {
    const [registerTable, { reload }] = useTable({
      title: '每周猪舍数据',
      isTreeTable: true,
      childrenColumnName: 'dayList',
      api: (params) => {
        let _params = Object.assign({}, params)
        if (_params.ids) {
          _params.ids = _params.ids.join(';')
        }
        return new Promise(async (resolve) => {
          let res = await getWeekPigstyInfoApi(_params);
          resolve({
            items: res
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
    });

    function handleSuccess() {
      reload();
    }

    async function beforeEditSubmit({ record, index, key, value }) { }

    return {
      registerTable,
      handleSuccess,
      beforeEditSubmit,
    };
  },
});
</script>
