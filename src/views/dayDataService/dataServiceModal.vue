<template>
  <BasicModal v-bind="$attrs" @register="registerModal" width="1200px" :height="400" :title="getTitle">
    <div class="datetime-btn-box">
      <a-button class="mr-2" @click="handleUpDay">上一天</a-button>
      <a-button @click="handleNextDay">下一天</a-button>
    </div>
    <HourPigstyInfoAnalysis v-if="loading" :id="id" :datetime="datetime"></HourPigstyInfoAnalysis>
    <div class="datetime-box">
      {{ datetimeStr }}
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, ApiSelect } from '/@/components/Form/index';

import HourPigstyInfoAnalysis from './hourPigstyInfoAnalysis.vue'

import { formatToDateTime } from '/@/utils/dateUtil'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'pigsty-data-service-modal',
  components: { BasicModal, BasicForm, ApiSelect, HourPigstyInfoAnalysis },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const id = ref('');
    const loading = ref(false)
    const datetime = ref(new Date())
    const datetimeStr = computed(() => {
      return formatToDateTime(datetime.value, 'YYYY-MM-DD')
    })
    const [registerModal, { setModalProps }] = useModalInner(async (data) => {
      setModalProps({
        confirmLoading: false, afterClose: () => {
          loading.value = false
        }
      });
      isUpdate.value = !!data?.isUpdate;
      datetime.value = data.record.datetime
      id.value = data.record.id;
      setTimeout(() => {
        loading.value = true
      }, 200);
    });

    const getTitle = computed(() => ('猪舍数据统计'));

    function handleUpDay() {
      console.log()
      datetime.value = dayjs(datetime.value).add(-1, 'day').toDate()
    }
    function handleNextDay() {
      datetime.value = dayjs(datetime.value).add(1, 'day').toDate()
    }

    return {
      registerModal,
      getTitle,
      id,
      loading,
      datetimeStr,
      datetime,
      handleUpDay,
      handleNextDay
    };
  },
});
</script>
<style lang="scss" scoped>
.datetime-box {
  font-size: 20px;
  text-align: center;
}

.datetime-btn-box {
  display: flex;
  justify-content: flex-end;
}
</style>