import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const news: AppRouteModule = {
  path: '/manager',
  name: 'manager',
  component: LAYOUT,
  redirect: '/manager/index',
  meta: {
    orderNo: 10,
    icon: 'material-symbols:newsmode-rounded',
    title: t('routes.manager.routesTitle'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'manager-index',
      component: () => import('/@/views/manager/index.vue'),
      meta: {
        title: t('routes.manager.routesTitle'),
        icon: 'material-symbols:newsmode-rounded',
        hideMenu: true,
      },
    },
  ],
};

export default news;
