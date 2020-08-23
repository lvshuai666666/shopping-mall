<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      
      <tab-control  ref="tabControl1"
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      v-show="isTabFixed"
      ></tab-control>

      <scroll class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contertScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recomend-view :recommends="recommends"></home-recomend-view>
      <feature-view></feature-view>

      <tab-control ref="tabControl2" 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ></tab-control>

      <goods-list :goods="showGoods"></goods-list>
      </scroll>
     <back-top @click.native="backClick" v-show="isshowBackTop"></back-top>
    </div>
    
</template>

<script>
import NavBar from  'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {debounce} from "@/common/utilts.js"
import{itemListenerMixin} from '@/common/mixin.js'

import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecomendView from 'views/home/childComps/HomeRecomendView.vue'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from "network/home.js"




export default {
  name: "Home",
  mixins: [itemListenerMixin],
  data() {
    return {
      banners:[],
      recommends:[],
      currentType: 'pop',
      // result=null
      isshowBackTop:false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0,
      // homeitemlistener:null,
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      }
    }
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    HomeRecomendView,
    FeatureView,
   
  },
  created() {
    this.getHomeMultidata1()
    this.getHomeGoods1('pop')
    this.getHomeGoods1('new')
    this.getHomeGoods1('sell')

//     // 3，监听item中图片加载完成
//     this.$bus.$on('itemImageLoad',() =>{
    
//     this.$refs.scroll.refresh()
// })
  },
  mounted() {
    console.log('我是混入目标')
  //   // 3，监听item中图片加载完成
  //   const refresh = debounce(this.$refs.scroll.refresh,500)
  //   //对监听进行保存方便取消
  //   this.homeitemlistener = () =>{
  //     refresh()
  // } 
  //   this.$bus.$on('itemImageLoad',this.homeitemlistener)  
},
  activated() {
    // this.$refs.scroll.scrollTo(0,this.saveY,0)这里的scrollTo()不要传时间，0也别传
    this.$refs.scroll.scrollTo(0,this.saveY)
    //  console.log(this.saveY)
    // this.$refs.scroll.refresh()
  },
  deactivated() {
    //1.保存Y值
    this.saveY = this.$refs.scroll.getscrollY()
    // console.log(this.saveY)
    //离开时取消全局事件监听
    this.$bus.$off ('itemImgLoad',this.homeitemlistener)
},

  computed: {
    showGoods() {
      return this.goods[this.currentType].list
}
  },

    methods: {
      tabClick(index){
        switch (index) {
        case 0:
        this.currentType = 'pop'
        break
        case 1:
        this.currentType = 'new'
        break
        case 2:
        this.currentType = 'sell'
        break
        }
     this.$refs.tabControl1.currentindex=index;
     this.$refs.tabControl2.currentindex=index;
      },
      backClick(){
      this.$refs.scroll.scrollTo(0,0)
      },
      contertScroll(position) {
      this.isshowBackTop = (-position.y) > 1000

      this.isTabFixed=(-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods1(this.currentType)
      },
      //网络请求相关函数
      getHomeMultidata1(){
         getHomeMultidata().then(res=>{
      // console.log(res)
      // this.result=res
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
      },
      getHomeGoods1(type){
        const page = this.goods[type].page + 1
          getHomeGoods(type,page).then(res=>{
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page += 1

           this.$refs.scroll.finishPullUp()
      })
    },

    swiperImageLoad() {
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
          // console.log(this.$refs.tabControl2.$el.offsetTop)
          }
  },
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
}

.home-nav{
  background-color:var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 betterscroll里不需要这个也没事*/
  /* 后来发现不对老师这个fixed能去掉我的不能去 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/* 原生实现吸顶效果 */
.tab-control{

  /* 原生实现吸顶效果 */
  /* position: sticky;
  top: 44px;
  z-index:9; */
  position: relative;
  z-index:9;

}

.content {
  /* height: 300px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;

/* .content {
  /* height: 300px; */
  /* height: calc(100% - 93px); */
  /* overflow: hidden; */
  /* margin-top: 44px; */
}

/* .fixed {
  position: fixed;
  left:0;
  right:0;
  top: 44px;
} */
</style>
