<template>
  <BasicModal v-bind="$attrs" @register="registerModal" width="1200px" :title="getTitle" @ok="handleSubmit">
    <a-row :gutter="16">
      <a-col :span="18">
        <InfoList class="enter-y" />
      </a-col>
      <a-col :span="6">
        <div class="">
          <div class="flex border px-2">
            <div class="w-3/5 border-r py-2">猪舍平均用水量</div>
            <div class="py-2 px-1">1000立方</div>
          </div>
          <div class="flex border px-2">
            <div class="w-3/5 border-r py-2">猪舍最高用水时间段</div>
            <div class="py-2 px-1">10</div>
          </div>
          <div class="flex border px-2">
            <div class="w-3/5 border-r py-2">猪舍最低用水时间段</div>
            <div class="py-2 px-1">1</div>
          </div>
          <div class="flex border px-2">
            <div class="w-3/5 border-r py-2">每头猪当日平均用水量</div>
            <div class="py-2 px-1">50立方</div>
          </div>
          <div class="flex border px-2">
            <div class="w-3/5 border-r py-2">每头猪当日最低用水量</div>
            <div class="py-2 px-1">0.2立方</div>
          </div>
          <div class="flex border px-2">
            <div class="w-3/5 border-r py-2">每头猪当日最高用水量</div>
            <div class="py-2 px-1">0.4立方</div>
          </div>
        </div>
      </a-col>
    </a-row>
  </BasicModal>
</template>
<script lang="ts">

import { defineComponent, computed } from 'vue';
import { Row, Col } from 'ant-design-vue'
import { BasicModal, useModalInner } from '/@/components/Modal';
import InfoList from './InfoList.vue';

export default defineComponent({
  name: 'info-list-modal',
  components: {
    BasicModal,
    InfoList,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const [registerModal, { setModalProps }] = useModalInner(async (data) => {
      setModalProps({ confirmLoading: false });

    });

    const getTitle = computed(() => '数据报表');

    async function handleSubmit() {
    }

    return {
      registerModal,
      getTitle,
      handleSubmit,
    };
  },
});
</script>
