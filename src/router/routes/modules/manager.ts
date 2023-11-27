import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const news: AppRouteModule = {
  path: '/manager',
  name: 'manager',
  component: LAYOUT,
  redirect: '/manager/index',
  meta: {
    orderNo: 3,
    icon: 'material-symbols:newsmode-rounded',
    title: t('routes.manager.routesTitle'),
  },
  children: [
    {
      path: 'index',
      name: 'manager-index',
      component: () => import('/@/views/manager/index.vue'),
      meta: {
        title: t('routes.manager.routesTitle'),
        icon: 'material-symbols:newsmode-rounded',
      },
    },
    {
      path: 'staff-list',
      name: 'staff-index',
      component: () => import('/@/views/staff/index.vue'),
      meta: {
        title: t('routes.manager.staff'),
        icon: 'material-symbols:newsmode-rounded',
      },
    },
  ],
};

export default news;
