import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CommitteesView from '../views/CommitteesView.vue'
import ContactView from '../views/ContactView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import MemberRegistration from '@/views/MemberRegistration.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'resources',
    component: ResourcesView
  },
  {
    path: '/',
    name: 'committees',
    component: CommitteesView
  },
  {
    path: '/',
    name: 'contact-us',
    component: ContactView
  },
  {
    path: '/register',
    name: 'member-registration',
    component: MemberRegistration
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
