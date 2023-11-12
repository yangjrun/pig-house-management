import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const news: AppRouteModule = {
  path: '/pigsty',
  name: 'pigsty',
  component: LAYOUT,
  redirect: '/pigsty/index',
  meta: {
    orderNo: 10,
    icon: 'material-symbols:newsmode-rounded',
    title: t('routes.pigsty.routesTitle'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'pigsty-index',
      component: () => import('/@/views/pigsty/index.vue'),
      meta: {
        title: t('routes.pigsty.routesTitle'),
        icon: 'material-symbols:newsmode-rounded',
        hideMenu: true,
      },
    },
  ],
};

export default news;
