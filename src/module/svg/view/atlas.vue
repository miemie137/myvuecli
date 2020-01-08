<template>
  <div class="atlas">
    <div @mousewheel="mousewheelEvent($event)" @touchstart="touchEvent($event)" @touchmove="touchEvent($event)" @touchend="touchEvent($event)" 
    @mousedown="touchEvent($event)" @mousemove="touchEvent($event)" @mouseup="touchEvent($event)" class="tree-components scroll-tree-components"> 
      <div class="big-small-box">
        <span>缩放图谱：</span>
        <div class="contro">
          <span @click="btnBigSmall('+')" class="contro_btn">+</span>
          <span @click="selectPer" class="contro_per">{{mousewheel.scale.x}}%</span>
          <span @click="btnBigSmall('-')" class="contro_btn">-</span>
          <div v-show="showSelectPer" class="select-per-box">
            <a @click="selectPer(val)" href="javascript:void(0)" v-for="(val,i) in [150,100,75,50]" :key="i">{{val}}%</a>
          </div>
        </div>
      </div>
      <div ref="treeBox" class="tree-components_box">
        <treeComponents @click="clickCard" :obj="obj"></treeComponents>
      </div>
    </div>
  </div>
</template>

<script>
import extendVue from '@/util/extendVue';
import treeComponents from '@/components/treeComponents';

export default {
  name: 'atlas',
  data () {
    return {
      showSelectPer: false,
      obj: {},
      option: { width:247, widthMarginBottom:36, height:155, heightMarginBottom:0, left:0, top:0, deep:0, childHeight:0},
      touch: {x:null, y:null, scrollLeft:null, scrollTop:null, flag:null, stopDefault:false},
      mousewheel:{
        scale:{
          x:100,
          y:100
        }
      }
    }
  },
  components:{
    treeComponents
  },
  created() {
    document.addEventListener('mouseup',(event)=>{
      this.touch.x = null;
      this.touch.y = null;
      this.touch.flag = null;
      event.target.className !== 'contro_per' && (this.showSelectPer = false);
    })
  },
  beforeDestroy() {
     document.addEventListener('mouseup',()=>{
      this.touch.x = null;
      this.touch.y = null;
      this.touch.flag = null;
      event.target.className !== 'contro_per'==-1 && (this.showSelectPer = false);
    })
  },
  mounted() {
    document.querySelector('.tree-components').style.height = document.documentElement.clientHeight + 'px';
    let obj = {
      'cartoon':"duolaAmeng", 'name':'哆啦a梦','count':'43563.7','rate':'69.48%',
      'children':[
        {
          'cartoon':"haizeiwang", 'name':'海贼王','count':'9563.7','rate':'150.3%',
          'children':[
            {
              'cartoon':"alalei", 'name':'阿拉蕾','count':'0.04','rate':'--','children':[]
            }, {
              'cartoon':"kenan", 'name':'柯南','count':'839402.4','rate':'495.92%','children':[]
            }, {
              'cartoon':"labixiaoxin", 'name':'蜡笔小新','count':'53859.23','rate':'19.46%','children':[]
            }           
          ]
        },{
          'cartoon':"qilongzhu", 'name':'七龙珠','count':'83973.48','rate':'93.63%',
          'children':[
            {
              'cartoon':"laofuzi", 'name':'老夫子','count':'74856','rate':'--','children':[]
            }, {
              'cartoon':"xiaowanzi", 'name':'小丸子','count':'4894566.3','rate':'127.58%','children':[]
            }           
          ]
        }
      ]
    };
    this.treeRander(obj);
  },
  methods: {
   //生成渲染数据
   treeRander(obj) {
     obj = this.getLoopDatas(obj,this.option);
     this.getSvgDatas(obj);
     this.obj = obj;
   },
   //选择固定缩放比例
   selectPer(val) {
     if(val>0) {
       let wheel = this.mousewheel;
       let obj = document.querySelector('.tree-components_box');
       wheel.scale.y = wheel.scale.x = val;
       obj.style.transform = `scale(${wheel.scale.x/100},${wheel.scale.y/100})`;
       obj.style.transformOrigin = '0 0';
       this.showSelectPer = false;
     }else {
       this.showSelectPer = !this.showSelectPer;
     }
   },
   //放大缩小点击事件
   btnBigSmall(type) {
     let deltaY = type == '+' ? 10 : -10;
     let wheel = this.mousewheel;
     let obj = document.querySelector('.tree-components_box');
     let temp = wheel.scale.x + deltaY;
     if(temp >= 10 && temp <=150) {
      wheel.scale.y = wheel.scale.x = wheel.scale.x + deltaY;
      obj.style.transform = `scale(${wheel.scale.x/100},${wheel.scale.y/100})`;
      obj.style.transformOrigin = '0 0';
     }else if(temp < 10) {
      wheel.scale.y = wheel.scale.x = 10;
      obj.style.transform =  `scale('0.1,0.1')`;
      obj.style.transformOrigin = '0 0';
     }else {
      wheel.scale.y = wheel.scale.x = 150;
      obj.style.transform = `scale('1.5,1.5')`;
      obj.style.transformOrigin = '0 0';
     }
   },
   //放大缩小方法
   mousewheelEvent(event) {
     let deltaY = event.deltaY || event.wheelDela;
     let wheel = this.mousewheel;
     let obj = document.querySelector('.tree-components_box');
     let temp = wheel.scale.x + (deltaY > 0 ? 2 : -2);
      if(temp >= 10 && temp <=150) {
        wheel.scale.y = wheel.scale.x = wheel.scale.x + (deltaY > 0 ? 2 : -2);
        obj.style.transform =  `scale(${wheel.scale.x/100},${wheel.scale.y/100})`;
        obj.style.transformOrigin = '0 0';
      }else if(temp < 10) {
        wheel.scale.y = wheel.scale.x = 10;
        obj.style.transform = `scale('0.1,0.1')`;
        obj.style.transformOrigin = '0 0';
      }else {
        wheel.scale.y = wheel.scale.x = 150;
        obj.style.transform = `scale('1.5,1.5')`;
        obj.style.transformOrigin = '0 0';
      }
    },
    //点击卡片
    clickCard(event,data) {
      if(!this.touch.stopDefault) {
        console.log(event)
      }
    },
    //连线递归数据处理
    getSvgDatas(data,rootSvg={}) {
      let obj = data || {};
      let svg = {};
      svg.xLeft = obj.left - 4;
      svg.yLeft = obj.top + obj.height/2;
      svg.xRight = obj.left + obj.width + 20;
      svg.yRight = obj.top + obj.height/2;
      if(obj.deep) {
        svg.polyline = this.getSvgPolyline(rootSvg.xRight, rootSvg.yRight, svg.xLeft, svg.yLeft)
      }
      if(obj.children && obj.children.length) {//递归
        let i = 0;
        for(; i<obj.children.length; i++) {
          let item = obj.children[i];
          this.getSvgDatas(item,svg);
        }
      }
      this.$set(obj,'svg',svg);
      return obj;
    },
    getSvgPolyline(...args) {
      if(args.length<4) {
        return false;
      }
      let x1 = args[0], y1 = args[1], x2 = args[2], y2 = args[3];
      let obj = {};
      let points = '',position = {};
      position.top = y1<y2 ? y1 : y2;
      position.left = x1<x2 ? x1 : x2;
      position.width = Math.abs(x2-x1);
      position.height = Math.abs(y2-y1) || 1;//如果高度为0，则设置为1px
      if(y1 === y2) {
        points += `0,0 ${position.width},0`
      }else if(y1>=y2) {
        points += `0,${position.height} 0,0 ${position.width},0`
      }else {
        points += `0,0 0,${position.height} ${position.width},${position.height}`
      }
      position.top += 'px';
      position.left += 'px';
      position.width += 'px';
      position.height += 'px';
      obj.position = position;
      obj.points = points;
      return obj;
    },
    //图谱递归数据处理
    getLoopDatas(data,option={}) {
      let obj = data || {};
      let opt = extendVue({}, option);
      opt.deep >1 && (opt.width = 361);
      this.$set(obj, 'width', obj.width || opt.width);
      this.$set(obj, 'height', obj.height || opt.height);
      this.$set(obj, 'left', obj.left || opt.left);
      this.$set(obj, 'top', obj.top || opt.top);
      this.$set(obj, 'deep', opt.deep);
      this.$set(obj, 'widthMarginBottom', opt.widthMarginBottom);
      this.$set(obj, 'heightMarginBottom', opt.heightMarginBottom);
      if(!obj.children || !obj.children.length) {
        this.$set(obj, 'childHeight', obj.height + opt.heightMarginBottom);
      }else if(obj.children && obj.children.length) {//递归
        let childHeight = 0;
        let width = opt.width;
        let height = opt.height;
        let heightMarginBottom = opt.heightMarginBottom;
        let offsetTop = 0;
        let childFirstTop = 0;
        let i = 0;
        for(; i<obj.children.length; i++) {
          let item = obj.children[i];
          if(obj.deep+1<=1) {
            this.getLoopDatas(item,extendVue({},opt,{deep:opt.deep+1, top:childHeight+opt.top, left:opt.left+opt.width+opt.widthMarginBottom}));
          }else {
            height = 82;
            heightMarginBottom = 26;
            this.getLoopDatas(item,extendVue({},opt,{deep:opt.deep+1, top:childHeight+opt.top, left:opt.left+opt.width+opt.widthMarginBottom,
            height:height, heightMarginBottom:heightMarginBottom}));
          }
          if(parseInt(i) === obj.children.length-1) {
            childFirstTop = obj.children[0].top;
            offsetTop = (obj.children[i].top-obj.children[0].top+height - obj.height)/2//相对于childFirstTop偏移
          }
          childHeight += item.childHeight;
        }
        childHeight = childHeight>opt.height ? childHeight : opt.height;
        this.$set(obj, 'top',offsetTop + childFirstTop);
        this.$set(obj, 'childHeight', childHeight);
      }
      return obj;
    },
    touchEvent(event) {
      let type = event.type;
      let touch = (event.changedTouches && event.changedTouches[0]) || event;
      if(type === 'touchmove' || type === 'mousemove') {
        if(this.touch.x === null || this.touch.x == touch.pageX) {
          return false;
        }
        let xSub = touch.pageX - this.touch.x;
        let ySub = touch.pageY - this.touch.y;
        this.$refs.treeBox.style.left = this.touch.left + xSub + 'px';
        this.$refs.treeBox.style.top = this.touch.top + ySub + 'px';
        this.touch.stopDefault = true;
      }else if(type === 'touchstart' || type === 'mousedown') {
        this.touch.x = touch.pageX;
        this.touch.y = touch.pageY;
        this.touch.left = this.$refs.treeBox.offsetLeft;
        this.touch.top = this.$refs.treeBox.offsetTop;
      }else if(type === 'touchend' || type === 'mouseup') {
        this.touch.x = null;
        this.touch.y = null;
        this.touch.flag = null;
        setTimeout(()=>{
          this.touch.stopDefault = false;//拖拽不触发点击卡片事件
        },60) 
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.big-small-box {
  z-index: 199;
  .select-per-box {
    display: block;
    width: 122px;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    border: 1px solid #E4E7ED;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
    color: #606266;
    overflow: hidden;
    text-align: center;
    padding: 8px 0;
    a{
      display: inline-block;
      width: 100%;
      height: 38px;
      line-height: 38px;
      background: #fff;
      &:hover {
        font-weight: 800;
        background: #F7F9FC;
        color: #3377FF;
      }
    }
  }
  user-select: none;
  position: absolute;
  top: 24px;
  left: 24px;
  .contro {
    position: relative;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 8px;
    background: #FFFFFF;
    border: 1px solid rgba(221,224,230,0.7);
    border-radius: 4px;
    vertical-align: middle;
    font-size: 0;
    &_btn {
      display: inline-block;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      line-height: 12px;
      border: 1px solid #DDE0E6;
      border-radius: 3px;
      color: #909399;
      text-align: center;
      vertical-align: middle;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
    }
    &_per {
      position: relative;
      display: inline-block;
      width: 66px;
      text-align: center;
      font-size: 12px;
      color: #595959;
      line-height: 18px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}
.el-icon-arrow-down {
  transition: all 0.5s;
  font-size: 14px;
  line-height: 30px;
  &.is-reverse {
    color: #158FEE;
    transform: rotateZ(-180deg);
  }
}
.atlas{
  &_select {
    padding: 24px 0;
    background-color: #fff;
    margin-bottom: 10px;
    border-top: 1px solid #f2f2f2;
  }
  &_inline {
    padding-left: 24px;
  }
}
.tree-components {
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  //父容器
  &_box {
    position: relative;
    left: 47px;
    top: 58px;
  }
}
</style>
