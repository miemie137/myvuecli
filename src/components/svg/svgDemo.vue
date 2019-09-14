<template>
<div @click="goLine">
  line
</div>
</template>

<script>
export default {
  name: 'svgDemo',
  data () {
    return {
     
    }
  },
  methods:{
    goLine() {
      this.$router.push({name:'line'})
    }
  }
}
</script>

<style scoped>

</style>
