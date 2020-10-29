import { createRouter, createWebHashHistory } from 'vue-router'

//导入子路由
import Main from '@/views/Main'

const routes = [
  {
    path:'/',
    component:Main
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
