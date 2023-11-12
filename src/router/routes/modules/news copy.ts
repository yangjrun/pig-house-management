import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const news: AppRouteModule = {
  path: '/news',
  name: 'news',
  component: LAYOUT,
  redirect: '/news/index',
  meta: {
    orderNo: 10,
    icon: 'material-symbols:newsmode-rounded',
    title: t('routes.news.routesTitle'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'news-index',
      component: () => import('/@/views/news/index.vue'),
      meta: {
        title: t('routes.news.routesTitle'),
        icon: 'material-symbols:newsmode-rounded',
        hideMenu: true,
      },
    },
  ],
};

export default news;
