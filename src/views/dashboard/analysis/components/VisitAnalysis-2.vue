<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { basicProps } from './props';
</script>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import { useECharts } from '/@/hooks/web/useECharts';

defineProps({
  ...basicProps,
});
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

onMounted(() => {
  setOptions({
    title: {
      text: '猪舍日饮水统计'
    },
    xAxis: {
      type: 'category',
      data: ['2023-11-13', '2023-11-14', '2023-15', '2023-16', '2023-17', '2023-18', '2023-19'],
    },
    yAxis: {
      type: 'value',
      name: '饮水量',
        axisLabel: {
          formatter: '{value} 吨'
        }
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  });
});
</script>
