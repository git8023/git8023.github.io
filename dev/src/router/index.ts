import Layout from '@/components/layout/Layout.vue';
import Laboratories from '@/views/laboratories/Laboratories.vue';
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
          { path: '', redirect: '/online-tools/knife4jApiTransfer' },
          { path: 'knife4jApiTransfer', component: OpenApiTransfer },
        ],
      },
    ],
  },
  {
    path: '/laboratory',
    component: Layout,
    children: [
      {
        path: '',
        component: Laboratories,
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
