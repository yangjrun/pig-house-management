<template>
  <div>
    <div v-show="hasData" ref="chartRef" :style="{ height, width }"></div>
    <div v-show="!hasData" class="no-data-box" >暂无数据</div>
  </div>
</template>
<script lang="ts">
import { basicProps } from './props';
</script>
<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { onMounted, ref, Ref, PropType, watch } from 'vue';
import { useECharts } from '/@/hooks/web/useECharts';

import { formatToDateTime } from '/@/utils/dateUtil'

import { getHourPigstyInfoApi } from '/@/api/dataservice'

const props = defineProps({
  ...basicProps,
  id: {
    type: String as PropType<string>,
  },
  datetime: {
    type: Date as PropType<Date>,
  },
});
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
const hasData = ref(true)

function initAnalysis() {
  let params = {
    "id": props.id,
    "datetime": formatToDateTime(props.datetime, 'YYYY-MM-DD')
  }
  const xAxisData: any = ref([])
  const series: any = ref([])
  getHourPigstyInfoApi(params).then((resp: any) => {
    if (resp && resp.length > 0) {
      resp.forEach(item => {
        if (item.hourList && item.hourList.length > 0) {
          hasData.value = true
          item.hourList.forEach(hourItem => {
            xAxisData.value.push(hourItem.houridx)
            series.value.push(hourItem.waterUsage)
          });
          const option: EChartsOption = {
            title: {
              text: '猪舍小时统计表'
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
                myTool1: {
                  show: true,
                  title: "还原",
                  icon:
                    "path://M512 981.333333c-209.866667 0-396.693333-126.026667-466.293333-314.08a35.52 35.52 0 0 1 23.626666-44.426666 38.613333 38.613333 0 0 1 48 20.693333c58.666667 158.933333 217.013333 265.493333 394.666667 265.6s336-106.666667 394.666667-266.133333a37.6 37.6 0 0 1 28.853333-23.626667 38.986667 38.986667 0 0 1 35.786667 11.946667 34.773333 34.773333 0 0 1 7.146666 35.36c-69.386667 188.373333-256.48 314.666667-466.453333 314.666666z m431.36-574.08a37.92 37.92 0 0 1-35.946667-24.266666C849.386667 222.56 690.613333 114.88 512 114.72S174.72 222.346667 116.746667 382.773333A38.72 38.72 0 0 1 69.333333 403.733333a35.786667 35.786667 0 0 1-24.106666-44.373333C113.333333 169.866667 301.013333 42.666667 512 42.666667s398.666667 127.306667 467.146667 316.96a34.56 34.56 0 0 1-4.906667 32.64 38.933333 38.933333 0 0 1-30.88 14.986666z",
                  onclick: function () {
                    setOptions(option, true)
                    console.log('click');
                  },
                },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: ['饮水量']
            },
            xAxis: [
              {
                type: 'category',
                data: xAxisData.value,
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
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
                name: '饮水量',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 吨';
                  }
                },
                data: series.value
              },
            ]
          }
          setOptions(
            option, true);
        } else {
          hasData.value = false
        }
      });
    }
  })
}

watch(() => props.datetime, () => {
  initAnalysis()
})

onMounted(() => {
  initAnalysis()
});

</script>
<style lang="scss" scoped>
.no-data-box {
  font-size: 22px;
  text-align: center;
}
</style>
