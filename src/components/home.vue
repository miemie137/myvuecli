<template>
<div class="home">
  <div @click="goTo('line')">line1</div>
  <div @click="goTo('Echarts')">Echarts2</div>
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
