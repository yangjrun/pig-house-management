<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <!-- <SiteAnalysis class="!my-4 enter-y" :loading="loading" /> -->
    <div class="bg-white px-4 py-4 mt-4">
      <div class="text-2xl mb-6">猪舍名称：猪舍1号</div>
      <div class="info-list-box">
        <div>存栏数：300头</div>
        <div>当日采食量：400公斤</div>
        <div>当日饮水量：500公斤</div>
        <div>猪均重：56公斤</div>
        <div>猪周龄：8周</div>
      </div>
    </div>
    <div class="md:flex enter-y bg-white mt-10">
      <VisitAnalysis1 class="md:w-1/2 w-full"></VisitAnalysis1>
      <VisitAnalysis2 class="md:w-1/2 w-full"></VisitAnalysis2>
      <!-- <VisitRadar class="md:w-1/3 w-full" :loading="loading" /> -->
      <!-- <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" /> -->
      <!-- <SalesProductPie class="md:w-1/3 w-full" :loading="loading" /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import GrowCard from './components/GrowCard.vue';
import SiteAnalysis from './components/SiteAnalysis.vue';
import VisitSource from './components/VisitSource.vue';
import VisitRadar from './components/VisitRadar.vue';
import SalesProductPie from './components/SalesProductPie.vue';

import VisitAnalysis1 from './components/VisitAnalysis-1.vue';

import VisitAnalysis2 from './components/VisitAnalysis-2.vue';


const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
<style lang="scss" scoped>
.info-list-box {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}
</style>
