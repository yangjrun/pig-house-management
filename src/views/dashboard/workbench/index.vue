<template>
  <PageWrapper class="bg-white">
    <template #headerContent>
      <WorkbenchHeader />
    </template>
    <div class="flex flex-col">
      <div class="pigsty-list-box">
        <div v-for="(item, index) in pigstyList" :key="index" class="pigsty-item-box">
          <Checkbox>
            <span class="text-lg">{{ index + 1 }}号位置：{{ item.name }}</span>
          </Checkbox>
        </div>
      </div>
      <div class="mt-10">
        <VisitAnalysis1 />
      </div>
      <div class="mt-10">
        <VisitAnalysis2 />
      </div>
      <div class="mt-10">
        <VisitAnalysis3 />
      </div>
    </div>
    <!-- <template #headerContent> <WorkbenchHeader /> </template> -->
    <!-- <div class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ProjectCard :loading="loading" class="enter-y" />
        <DynamicInfo :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="lg:w-3/10 w-full enter-y">
        <QuickNav :loading="loading" class="enter-y" />

        <Card class="!my-4 enter-y" :loading="loading">
          <img class="xl:h-50 h-30 mx-auto" src="../../../assets/svg/illustration.svg" />
        </Card>

        <SaleRadar :loading="loading" class="enter-y" />
      </div>
    </div> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Checkbox } from 'ant-design-vue';
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox';

import { PageWrapper } from '/@/components/Page';
import WorkbenchHeader from './components/WorkbenchHeader.vue';
import ProjectCard from './components/ProjectCard.vue';
import QuickNav from './components/QuickNav.vue';
import DynamicInfo from './components/DynamicInfo.vue';
import SaleRadar from './components/SaleRadar.vue';

import VisitAnalysis1 from './components/VisitAnalysis-1.vue';
import VisitAnalysis2 from './components/VisitAnalysis-2.vue';
import VisitAnalysis3 from './components/VisitAnalysis-3.vue';


import { getPigstyListApi } from '/@/api/pigsty'

const pigstyList: any = ref([])
function handleGetPigstyList() {
  getPigstyListApi({}).then(resp => {
    pigstyList.value = resp
  })
}

onMounted(() => {
  handleGetPigstyList()
})


const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>


<style lang="scss" scoped>
.pigsty-list-box {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}
</style>
