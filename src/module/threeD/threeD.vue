<template>
<div>
  <div class="box">
    <div class="div">
      <div>
        <span>1</span>
        <div style="transform: rotateY(90deg)">
          <span>2</span>
          <div style="transform: rotateY(90deg)">
            <span>3</span>
            <div style="transform: rotateY(90deg)">
              <span>4</span>
              <div style="transform: rotateY(90deg) rotateX(-90deg) translateZ(50px) translateY(50px);">
                <span>5</span>
                <div style="transform: rotateY(180deg) translateZ(100px)">
                  <span>6</span>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mouse" ref="mouse"></div>
</div>
</template>

<script>
import {Drag} from '@/util/mouseDrag';

export default {
  name: 'threeD',
  data () {
    return {

    }
  },
  computed: {
  
  },
  mounted() {
    new Drag(this.$refs.mouse)
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@keyframes threeD {
  0% {
    transform: rotateY(0) rotateX(0);
  }
  50% { 
    transform: rotateY(0) rotateX(-180deg);
  }
  100% {
    transform: rotateY(180deg) rotateX(-180deg);
  }
}
.box {
  width: 100px;
  height: 100px;
  //border: 2px solid #000;
  padding: 50px;
  margin: 100px auto;
  perspective: 500px;
  .div {
    width: 100px;
    height: 100px;  
    transform-style: preserve-3d;
    position: relative;
    transition: 3s;
    transform-origin: center center -50px;
    animation: threeD 1s infinite ease-in-out;
    div {
      position: absolute;
      left: 100px;
      top: 0;
      width: 100px;
      transform-style: preserve-3d;
      transform-origin: left;
    }
    span {
      width: 98px;
      height: 98px;
      display: block;
      border: 1px solid #000;
      background: #ccc;
      font: 50px/98px "宋体";
      text-align: center;
    }
  }
  .div>div {
    left: 0;
    transform: rotateY(0)
  } 
}
// .box:hover .div {
//   transform: rotateY(-360deg)
// }
.mouse {
  position: absolute;
  width:100px;
  height: 100px;
  background: rgb(44, 44, 187);
}
</style>
