import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import svgDemo from '@/components/svg/svgDemo'
import svg from '@/components/svg/view/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'svg',
      component: svgDemo
    },
    {
      path: '/line',
      name: 'line',
      component: svg.line
    }
  ]
})
