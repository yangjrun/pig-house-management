import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const news: AppRouteModule = {
  path: '/enterprise',
  name: 'enterprise',
  component: LAYOUT,
  redirect: '/enterprise/index',
  meta: {
    orderNo: 2,
    icon: 'material-symbols:newsmode-rounded',
    title: t('routes.enterprise.routesTitle'),
  },
  children: [
    {
      path: 'index',
      name: 'enterprise-index',
      component: () => import('/@/views/enterprise/index.vue'),
      meta: {
        title: t('routes.enterprise.enterpriseList'),
        icon: 'material-symbols:newsmode-rounded',
      },
    },
    {
      path: 'region-list',
      name: 'region-index',
      component: () => import('/@/views/region/index.vue'),
      meta: {
        title: t('routes.enterprise.region'),
        icon: 'material-symbols:newsmode-rounded',
      },
    },
  ],
};

export default news;
