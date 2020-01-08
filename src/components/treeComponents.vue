<template>
  <div @click.stop="clickCard($event,data)" v-if="data.cartoon" class="box-tree-child">
    <svg v-if="data.deep" :style="data.svg && data.svg.polyline && data.svg.polyline.position" class="svg-pst" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <!--v-if="data.deep"深度大于0开始画折线-->
      <polyline :points="data.svg && data.svg.polyline && data.svg.polyline.points" style="fill:none;stroke:#C9CFD9" :style="{'stroke-width':strokeWidth}"/>
    </svg>
    <div v-if="data.deep<=1" :style="{left: data.left+'px',top: data.top+'px'}" class="tree-components_container">
      <i v-if="data.children && data.children.length" @click.stop="clickAddSub($event,data)" class="btn-add-sub"
      :class="data.addSubFlag == 'add' ? 'el-icon-circle-plus' :'el-icon-remove'" data-flag="sub"></i>
      <div class="container_card">
        <div class="container_card_line">
          <span class="container_card_name">{{data.name}}</span>
        </div>
        <div class="container_card_line"><span class="container_card_count">{{data.count}}</span></div>
        <div class="container_card_line">
          <p><span class="container_card_text">{{data.rate}}</span></p>
        </div>
        <div class="container_card_per">
          <span class="bgc-box"><i class="bgc-per" :class="data.rate=='--'?'':(parseFloat(data.rate)>=100?'bgi-lan':'bgi-hone')"
            :style="{width:parseFloat(data.rate)<=100?data.rate:'100%'}"></i></span>
        </div>
      </div>
    </div>
    <div v-else :style="{left: data.left+'px',top: data.top+'px'}" class="tree-components_container card-long">
      <i v-if="data.children && data.children.length" @click.stop="clickAddSub($event,data)" class="btn-add-sub"
      :class="data.addSubFlag == 'add' ? 'el-icon-circle-plus' :'el-icon-remove'" data-flag="sub"></i>
      <div class="box-bgc" :style="{background: data.rate!=='--'?(parseFloat(data.rate)>=100?'#007CFF':'#E62E34'):''}"></div>
      <div class="container_card">
        <div class="box-left">
          <div class="container_card_line">
            <span class="container_card_name">{{data.name}}</span>
          </div>
          <div class="container_card_line"><span class="container_card_count">{{data.count}}</span></div>
        </div>
        <div class="box-right">
          <div class="container_card_line">
            <p><span class="container_card_text">{{data.rate}}</span></p>
          </div>
          <div class="container_card_per">
            <span class="bgc-box"><i class="bgc-per" :class="data.rate=='--'?'':(parseFloat(data.rate)>=100?'bgi-lan':'bgi-hone')"
              :style="{width:parseFloat(data.rate)<=100?data.rate:'100%'}"></i></span>
          </div>
        </div>
      </div>
    </div>
    <template v-if="data.children && data.children.length && data.addSubFlag!=='add'">
      <tree-components @click="clickCard" v-for="(item,i) in data.children" :obj="item" :key="i"></tree-components>
    </template>
  </div>
</template>

<script>
import {getExplore} from '@/util/util'
export default {
  name: 'tree-components',
  data () {
    return {
      data:{}
    }
  },
  props:{
    'obj':{
      default:()=>{
        return {};
      }
    }
  },
  computed: {
    isIEbrowser() {
      return getExplore().indexOf('IE')!==-1 ? true :false;
    },
    strokeWidth() {
      return getExplore().indexOf('IE')!==-1 ? 1 :2;
    }
  },
  watch: {
    'obj': {
      handler:function() {
        this.data = this.obj;
      },
      deep:true,
      immediate:true
    }
  },
  methods: {
    //点击卡片
    clickCard(event,data) {
      this.$emit('click',event,data);
    },
    //点击展开收起
    clickAddSub(event,data) {
      let flag = event.target.getAttribute('data-flag');
      let d = data;
      let changeFlag = flag === 'sub' ? 'add' : 'sub';//变换
      this.$set(d, 'addSubFlag', changeFlag);
      event.target.setAttribute('data-flag',changeFlag);
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-pst {
  position: absolute;
  left: -22px;
  top: 0;
  width: 10px;
  height: 100%;
}
.btn-add-sub {
  position: absolute;
  right: -17px;
  top: calc(50% - 6px);
  font-size: 14px;
  text-align: center;
  color: #007CFF;
  cursor: pointer;
}
.tree-components_container.card-long {
  box-sizing: border-box;
  width: 371px;
  .box-bgc {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 88;
    display: inline-block;
    width: 10px;
    height: 100%;
    background-color: #C9CFD9;
    border-radius: 4px 0 0 4px;
  }
  .box-left {
    float: left;
    vertical-align: top;
    width: 113px;
    overflow: hidden;
  }
  .box-right {
    display: inline-block;
    vertical-align: top;
    width: 212px;
    height: 48px;
    overflow: hidden;
  }
} 
  .container_card {
    border-left: none;
    &_per {
      margin-top: 4px;
      height: 4px;
    }
    &_line {
      .container_card_name {
        font-size: 14px;
        line-height: 20px;
      }
      .container_card_count {
        line-height: 28px;
      }
    }
    &_line:nth-of-type(2) {
      height: 28px;
      line-height: 28px;
      margin-bottom: 0;
    }
     &_line.card-long {
       border:none;
       margin-top: 4px;
     }
  }
  .tree-components_container {
    user-select: none;
    cursor: pointer;
    position: absolute;
    width: 247px;
    box-sizing: border-box;
    .container_card {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 16px 16px 16px 26px;
      overflow: hidden;
      box-shadow: 0 2px 4px 0 #F0F4F7;
      border-radius: 4px;
      background: #FFFFFF;
      border:1px solid #C9CFD9;
      &_line {
        box-sizing: border-box;
        font-size: 0;
        color: #333;
        span {
          display: inline-block;
        }
        .container_card_name {
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
        }
        .container_card_count {
          display: inline-block;
          max-width: 90%;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          vertical-align: middle;
        }
        .container_card_text {
          font-size: 12px;
          height: 18px;
          line-height: 18px;
          color: rgba(0,0,0,0.85);
          vertical-align: middle;
        }
      }
      &_line:nth-of-type(1) {
        margin-bottom: 0;
      }
      &_line:nth-of-type(2) {
        margin-bottom: 4px;
      }
      &_line:nth-of-type(3) {
        padding-bottom: 8px;
      }
      &_line:nth-of-type(4) {
        margin: 7px 0;
      }
      &_line:nth-of-type(5) {
        height: 6px;
      }
      &_per {
        line-height: 0;
        height: 6px;
        position: relative;
        .bgc-box {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          background: #ECECEC;
          border-radius: 3.5px;
          overflow: hidden;
          .bgc-per {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 0;
            height: 100%;
            border-radius: 3.5px;
            &.bgi-hone {
              background-image: linear-gradient(-270deg, #F53539 0%, #EA9295 100%);
            }
            &.bgi-lan {
              background-image: linear-gradient(-270deg, #007BFF 0%, #00B3FF 100%);
            }
          }
        }
      }
    }
  }
</style>
