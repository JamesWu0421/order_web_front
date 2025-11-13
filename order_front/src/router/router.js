import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import OrderList from '@/views/OrderList.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/:pathMatch(.*)*', component: NotFound }, // 404 頁面
    { path: '/orders', component: OrderList }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router