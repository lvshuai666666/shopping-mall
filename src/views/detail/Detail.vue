<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleclick="titleclick" ref="nav"></detail-nav-bar>
      <scroll class="content"
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentscroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
      </scroll>
      <detail-bottom-bar @addCart="addtoCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isshowBackTop"></back-top>
      <!-- <toast :message="message" :show="show"></toast> -->
    </div>
</template>

<script>
import DetailNavBar from'views/detail/detail/childcomps/DetailNavBar.vue'
import DetailSwiper from 'views/detail/detail/childcomps/DetailSwiper.vue'
import DetailBaseInfo from 'views/detail/detail/childcomps/DetailBaseInfo.vue'
import DetailShopInfo from 'views/detail/detail/childcomps/DetailShopInfo.vue'
import DetailGoodsInfo from 'views/detail/detail/childcomps/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/detail/childcomps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/detail/childcomps/DetailCommentInfo'
import DetailBottomBar from 'views/detail/detail/childcomps/DetailBottomBar.vue'

// import Toast from 'components/common/toast/Toast.vue'


import {debounce} from '@/common/utilts.js'
import{itemListenerMixin,backTopMixin} from '@/common/mixin.js'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList'
// import BackTop from 'components/content/backTop/BackTop.vue'

import {getdetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
export default {
  name: "Detail",
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        // homeitemlistener:null,
        currentindex:0,
        // isshowBackTop:false,
        // show:false,
        // message:''
    }
  },
  created() {
    this.iid=this.$route.params.iid
    //请求详情数据
    getdetail(this.iid).then(res=>{
      console.log(res)
      const data=res.result
      //获取轮播图
      this.topImages =data.itemInfo.topImages
      //价格运费信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //商品的详情数据
      this.detailInfo = data.detailInfo
      //获取参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //评论信息
       if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
    })
    //请求推荐数据
      getRecommend().then(res => {
        const data=res.result
        this.recommends = res.data.list
      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      })
},
   mounted() {
    // console.log('我是混入目标')
},
   destroyed() {
    this.$bus.$off ('itemImgLoad',this.homeitemlistener)
},
methods: {
  imageLoad(){
    this.refresh()
    //this.$refs. scroll. refresh()
  //image加载完调用总可以保证offset值正确了吧，不用nexttick也行了
    this.getThemeTopY()
  },
  titleclick(index){
   this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
  },
  contentscroll(position){
    //获取Y的值
    const positionY = -position.y 
    let length = this.themeTopYs.length
    for(let i=0;i<length-1;i++){
      if(this.currentindex !==i && (positionY>= this.themeTopYs[i]&& positionY< this.themeTopYs[i+1])){
        this.currentindex = i
        this.$refs.nav.currentindex = this.currentindex
      }
    }
    //是否显示回到底部
    this.isshowBackTop = (-position.y) > 1000
  },
  //  backClick(){
  //     this.$refs.scroll.scrollTo(0,0)
  //     },
  addtoCart(){
    const product = {}
    product.image = this.topImages[0];
    product.title = this.goods.title;
    product.desc = this.goods.desc;
    product.price = this.goods.nowPrice;
    product.iid = this.iid;

    // this.$store.commit('addcart',product)
    this.$store.dispatch('addCart',product).then(res=>{
    //     this.show = true;
    //     this.message = res
    //     setTimeout(() => {
    //     this.show = false;
    //     this.message =''
    //     }, 1500)
    // })

    this.$toast.show(res, 2000)
    })
  }

},
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // BackTop
      // Toast
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}

</style>
