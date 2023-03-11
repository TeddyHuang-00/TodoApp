import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskDetailView from '../views/TaskDetailView.vue'
import UploadView from '../views/UploadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/:uuid',
      name: 'task-detail',
      component: TaskDetailView
    }
  ]
})

export default router
