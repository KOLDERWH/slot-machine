import { createRouter, createWebHistory } from 'vue-router'
import SlotMachine from "../views/Slot-Machine.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SlotMachine
    },
  ]
})

export default router
