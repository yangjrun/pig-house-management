import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const news: AppRouteModule = {
  path: '/pigsty',
  name: 'pigsty',
  component: LAYOUT,
  redirect: '/pigsty/index',
  meta: {
    orderNo: 1,
    icon: 'material-symbols:newsmode-rounded',
    title: t('routes.pigsty.routesTitle'),
  },
  children: [
    {
      path: 'index',
      name: 'pigsty-index',
      component: () => import('/@/views/pigsty/index.vue'),
      meta: {
        title: t('routes.pigsty.routesTitle'),
        icon: 'material-symbols:newsmode-rounded',
      },
    },
    {
      path: 'task',
      name: 'task',
      component: () => import('/@/views/task/index.vue'),
      meta: {
        title: t('routes.pigsty.task'),
        icon: 'material-symbols:newsmode-rounded',
      },
    },
    {
      path: 'day-dataService',
      name: 'day-dataService',
      component: () => import('/@/views/dayDataService/index.vue'),
      meta: {
        title: t('routes.pigsty.dayDataService'),
        icon: 'material-symbols:newsmode-rounded',
      },
    },

    {
      path: 'week-dataService',
      name: 'week-dataService',
      component: () => import('/@/views/weekDataService/index.vue'),
      meta: {
        title: t('routes.pigsty.weekDataService'),
        icon: 'material-symbols:newsmode-rounded',
      },
    },

    
    // {
    //   path: 'pigsty-data-analysis',
    //   name: 'pigsty-data-analysis',
    //   component: () => import('/@/views/pigsty/index.vue'),
    //   meta: {
    //     title: t('routes.pigsty.pigstyDataAnalysis'),
    //     icon: 'material-symbols:newsmode-rounded',
    //   },
    // },
  ],
};

export default news;
