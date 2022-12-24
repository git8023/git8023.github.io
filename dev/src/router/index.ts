import Layout from '@/components/layout/Layout.vue';
import OpenApiTransfer from '@/views/online-tools/api-transfer/OpenApiTransfer.vue';
import OnlineTools from '@/views/online-tools/OnlineTools.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/online-tools',
    component: Layout,
    children: [
      {
        path: '',
        component: OnlineTools,
        children: [
          { path: '', component: OpenApiTransfer },
        ],
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
