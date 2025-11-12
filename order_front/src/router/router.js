import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/:pathMatch(.*)*', component: NotFound } // 404 頁面
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router