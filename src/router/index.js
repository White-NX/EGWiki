import Vue from 'vue'
import VueRouter from 'vue-router'

import WikiHomeView from '../views/WikiHomeView.vue'
import WikiView from '../views/WikiView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/codedit/:content',
    name: 'edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/CodeEditView.vue'),
    key: 'edit'
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchView.vue')
  }, {
    path: '/edit/*',
    name: 'wikiedit',
    component: () => import(/* webpackChunkName: "wikiedit" */ '../views/WikiEditView.vue')
  }, {
    path: '/*',
    name: 'wiki',
    component: WikiView
  }

]

const router = new VueRouter({
  routes
})

export default router