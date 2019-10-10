import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import svg from '@/components/svg/view/index'
import echarts from '@/components/echarts/view/index'

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
    }
  ]
})
