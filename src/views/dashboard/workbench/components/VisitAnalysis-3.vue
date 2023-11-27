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
      text: '每日饮水量变化图'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['一号猪舍', '二号猪舍', '三号猪舍', '四号猪舍', '五号猪舍']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2023-11-17', '2023-11-18', '2023-19', '2023-20', '2023-21', '2023-22', '2023-23'],
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '一号猪舍',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '二号猪舍',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '三号猪舍',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '四号猪舍',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '五号猪舍',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  });
});
</script>
