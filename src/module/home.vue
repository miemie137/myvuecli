<template>
<div class="home">
  <div @click="goTo('line')">line</div>
  <div @click="goTo('Echarts')">Echarts</div>
  <div @click="goTo('atlas')">atlas</div>
  <div @click="goTo('threeD')">threeD</div>
  <div @click="goTo('banner')">banner</div>
</div>
</template>

<script>
export default {
  name: 'home3',
  data () {
    return {
     
    }
  },
  mounted() {
    //this.aa()
  },
  methods:{
    goTo(where) {
      this.$router.push({name:where})
    },
    // bb(n) {
    //   setTimeout(() => {
    //     setTimeout(() => {
    //       console.log(n)
    //     },n*1000)
    //   }, Math.floor(Math.random() * 1000));
    // },
    // aa() {
    //     for (var i = 0; i < 6; i++) {
    //     this.bb(i)     
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
  .home {
    cursor:pointer;
  }
</style>
