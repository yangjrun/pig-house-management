import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const news: AppRouteModule = {
  path: '/staff',
  name: 'staff',
  component: LAYOUT,
  redirect: '/staff/index',
  meta: {
    orderNo: 10,
    icon: 'material-symbols:newsmode-rounded',
    title: t('routes.staff.routesTitle'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'staff-index',
      component: () => import('/@/views/staff/index.vue'),
      meta: {
        title: t('routes.staff.routesTitle'),
        icon: 'material-symbols:newsmode-rounded',
        hideMenu: true,
      },
    },
  ],
};

export default news;
