<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card size="small" :loading="loading" :title="item.title" class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }">
        <!-- <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template> -->

        <div class="py-2 px-4 flex justify-between items-center">
          <div class="text-2xl">
            {{ item.label1 }}：
          </div>
          <CountTo :startVal="1" :endVal="item.value1" :suffix="item.unit" class="text-2xl" />
          <!-- <Icon :icon="item.icon" :size="40" /> -->
        </div>
        <div class="py-2 px-4 flex justify-between items-center">
          <div class="text-2xl">
            {{ item.label2 }}：
          </div>
          <CountTo :startVal="1" :endVal="item.value2" :suffix="item.unit" class="text-2xl" />
          
        </div>

        <!-- <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="$" :startVal="1" :endVal="item.total" />
        </div> -->
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { CountTo } from '/@/components/CountTo/index';
import Icon from '@/components/Icon/Icon.vue';
import { Tag, Card } from 'ant-design-vue';
import { growCardList } from '../data';

defineProps({
  loading: {
    type: Boolean,
  },
});
</script>
