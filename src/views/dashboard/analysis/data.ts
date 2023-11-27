export interface GrowCardItem {
  title: string;
  label1: string,
  label2: string,
  value1: number,
  value2: number,
  unit: string
}

export const growCardList: GrowCardItem[] = [
  {
    title: '猪舍概览',
    label1: '注册',
    label2: '在线',
    value1: 20,
    value2: 19,
    unit: '栏'
  },
  {
    title: '用水量概览',
    label1: '昨日用水量',
    label2: '今日用水量',
    value1: 20,
    value2: 19,
    unit: '吨'
  },
  {
    title: '在栏数概览',
    label1: '昨日在栏数',
    label2: '今日在栏数',
    value1: 20,
    value2: 19,
    unit: '头'
  },
  {
    title: '任务概览',
    label1: '当日任务',
    label2: '当日代办',
    value1: 20,
    value2: 19,
    unit: '吨'
  },
];
