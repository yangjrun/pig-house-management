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
      text: '猪舍周统计表'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['采食量', '饮水量', '平均体重']
    },
    xAxis: [
      {
        type: 'category',
        data: ['2023-11-40', '2023-11-41', '2023-42', '2023-43', '2023-44', '2023-45', '2023-46'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '采食量',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} 吨'
        }
      },
      {
        type: 'value',
        name: '饮水量',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} 吨'
        }
      }
    ],
    series: [
      {
        name: '采食量',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: '饮水量',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: '平均体重',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C';
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  });
});
</script>
