import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const news: AppRouteModule = {
  path: '/enterprise',
  name: 'enterprise',
  component: LAYOUT,
  redirect: '/enterprise/index',
  meta: {
    orderNo: 10,
    icon: 'material-symbols:newsmode-rounded',
    title: t('routes.enterprise.routesTitle'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'enterprise-index',
      component: () => import('/@/views/enterprise/index.vue'),
      meta: {
        title: t('routes.enterprise.routesTitle'),
        icon: 'material-symbols:newsmode-rounded',
        hideMenu: true,
      },
    },
  ],
};

export default news;
