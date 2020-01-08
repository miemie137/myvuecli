<template>
<div id="div1">
  <svg id="svg1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" @mousedown="svgMousedown" @mousemove="svgMousemove" @contextmenu="svgContextmenu">
  <!-- <polyline points="50,50,200,300,230,300,250,200" fill="none" stroke="black" stroke-width="5"></polyline> -->
  </svg>
</div>
</template>

<script>
import svg from '@/util/svgMethods'

export default {
  name: 'line',
  data () {
    return {
      oPolyLine: null,
      pointsNum: ''
    }
  },
  computed: {
    oParent:function() {
      return document.getElementById('div1')
    },
    oSvg:function() {
      return document.getElementById('svg1')
    }
  },
  mounted() {
    svg.createTag()
  },
  methods: {
    svgMousedown(ev) {
      let event = ev || window.event;
      if(!this.oPolyLine) {
        this.oPolyLine = svg.createTag('polyline',{'fill':'none','stroke':'red','stroke-width':'2'});
        this.oSvg.appendChild(this.oPolyLine);
      }     
      let x = event.clientX - this.oParent.offsetLeft;
      let y = event.clientY - this.oParent.offsetTop;
      if(!this.pointsNum) {
        this.pointsNum = `${x},${y}`
      }else {
        this.pointsNum += `,${x},${y}`
      }
      this.oPolyLine.setAttribute('points',this.pointsNum);
      let oCircle = svg.createTag('circle',{'cx' :x,'cy':y,'r':5,'fill':'#f4f4f4','stroke':'red','stroke-width':3});
      this.oSvg.appendChild(oCircle);
    },
    svgMousemove(ev) {
      let event = ev || window.event;
      if(this.oPolyLine) {
        let x = event.clientX - this.oParent.offsetLeft;
        let y = event.clientY - this.oParent.offsetTop;
        this.oPolyLine.setAttribute('points',`${this.pointsNum},${x},${y}`)
      }
    },
    svgContextmenu() {
      // this.oSvg.onmousemove = null;
      // return false;
    }
  }
}
</script>

<style lang="scss" scoped>
#div1{
  width: 400px;
  height: 400px;
  background: #f4f4f4
}
</style>
