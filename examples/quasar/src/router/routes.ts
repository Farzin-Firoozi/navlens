import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/IndexPage.vue'),
  },
  {
    path: '/products',
    component: () => import('../pages/ProductsPage.vue'),
  },
  {
    path: '/products/:id',
    component: () => import('../pages/ProductDetailPage.vue'),
  },
]

export default routes
