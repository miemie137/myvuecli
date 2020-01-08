import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import home from '@/module/home'
import svg from '@/module/svg/view/index'
import echarts from '@/module/echarts/view/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/line',
      name: 'line',
      component: svg.line
    },
    {
      path: '/Echarts',
      name: 'Echarts',
      component: echarts.echarts
    },
    {
      path: '/atlas',
      name: 'atlas',
      component: svg.atlas
    }
  ]
})
