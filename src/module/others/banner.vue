<template>
  <div class="banner" @mouseover="clear" @mouseout="run">
    <transition :name="transitionName">
      <img v-if="isShow" :src="bannerList[nowIndex]" alt="" class="banner-now">
    </transition>
    <transition :name="transitionName + '-old'">
      <img v-if="!isShow" :src="bannerList[nowIndex]" alt="">
    </transition>
    <ul class="banner-circle">
      <li :class="{'selected':nowIndex===index}" v-for="(item,index) in bannerList" :key="index" @click="goto(index)"></li>
    </ul>
    <div class="banner-button">
      <div class="banner-button__prev" @click="goto(preIndex)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="banner-button__next" @click="goto(nextIndex)">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'banner',
  data () {
    return {
      transitionName:'fade',
      bannerList:[
        require('../../assets/img/others/1.jpg'),   
        require('../../assets/img/others/2.jpeg'),
        require('../../assets/img/others/3.jpeg'),
        require('../../assets/img/others/4.jpeg'),
        require('../../assets/img/others/5.jpeg'),   
      ],
      nowIndex:0,
      isShow:true
    }
  },
  computed: {
    preIndex() {
      this.transitionName = 'fade-prev';
      if(this.nowIndex === 0) {
        return this.bannerList.length - 1;
      }
      return this.nowIndex - 1;
    },
    nextIndex() {
      this.transitionName = 'fade';
      if(this.nowIndex === this.bannerList.length - 1) {
        return 0;
      }
      return this.nowIndex + 1;
    }
  },
  mounted() {
    this.run()
  },
  methods: {
    goto(index) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
      },20)      
    },
    run() {
      this.intercal = setInterval(() => {
        this.transitionName = 'fade';
        this.goto(this.nextIndex)      
      }, 5000);
    },
    clear() {
      clearInterval(this.intercal);
    },
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 500px;
  position: relative;
  overflow: hidden;
  .fade-enter-active {
    transition: all .5s linear;
  }
  .fade-enter {
    transform: translateX(100%);
  }
  .fade-old-leave-active {
    transition: all .5s linear;
    transform: translateX(-100%);
  }
  .fade-prev-enter-active {
    transition: all .5s linear;
  }
  .fade-prev-enter {
    transform: translateX(-100%);
  }
  .fade-prev-old-leave-active {
    transition: all .5s linear;
    transform: translateX(100%);
  }
  img {
    width:100%;
    height: 500px;
  }
  &-now {
    position: absolute;
    top: 0;
    right: 0;
  }
  &-circle {
    display: inline-block;
    position: absolute;
    bottom: 10px;
    right: 50px;
    list-style: none;
    li {
      float: left;
      width:15px;
      height: 15px;
      margin-right:6px;
      background:#FFF;
      border-radius: 50%;
      opacity: .5;
      cursor: pointer;
    }
    .selected {
      width: 27px;
      border-radius: 40%;
      opacity: 1;
    }
  }
  &-button {   
    &__prev,&__next {
      position: absolute;
      top:50%;
      i {
        font-size: 50px;
        font-weight: bold;
        color: rgba(255,255,255,.5);
        cursor: pointer;
      } 
      i:hover {
        color: rgba(255,255,255,1);;
      } 
    }
    &__prev {
      left: 20px;
    }
    &__next {
      right: 20px;
    }
  }
}
</style>
