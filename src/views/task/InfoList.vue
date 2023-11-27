<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script lang="ts">
import type { Ref } from 'vue';

import { defineComponent, ref, watch, onMounted } from 'vue';
import { Card } from 'ant-design-vue';
import { useECharts } from '/@/hooks/web/useECharts';

import { formatToDateTime } from '/@/utils/dateUtil'

import { getInfolistApi } from '/@/api/task'

export default defineComponent({
  components: { Card },
  props: {
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '400px',
    },
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

    const loading = ref(true)

    const infoListData = ref()
    const xAxisData = ref()
    const seriesData = ref()

    onMounted(() => {
      console.log('onMounted 初始化了')
      getInfolistApi().then(resp => {
        loading.value = false
        infoListData.value = resp
        xAxisData.value = infoListData.value.map(item => {
          return formatToDateTime(new Date(item.lastTS * 1000))
        })
        seriesData.value = infoListData.value.map(item => {
          return item.pigAverageWeight
        })
      })
    })

    watch(
      () => loading.value,
      () => {
        if (loading.value) {
          return;
        }
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          xAxis: {
            type: 'category',
            data: xAxisData.value,
          },
          yAxis: {
            type: 'value',
            max: 8000,
            splitNumber: 4,
          },
          series: [
            {
              name: '猪均重',
              data: seriesData.value,
              type: 'line',
              smooth: true,
            },
          ],
        });
      },
      { immediate: true },
    );
    return { chartRef };
  },
});
</script>
