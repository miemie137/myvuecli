<template>
<div class="home">
  <div @click="goTo('line')">line</div>
  <div @click="goTo('Echarts')">Echarts</div>
  <div @click="goTo('atlas')">atlas</div>
</div>
</template>

<script>
export default {
  name: 'home3',
  data () {
    return {
     
    }
  },
  methods:{
    goTo(where) {
      this.$router.push({name:where})
    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    cursor:pointer;
  }
</style>
