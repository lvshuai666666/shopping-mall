<template>
    <div class="tab-bar-item" @click="itemClick">
       <div v-if="!isActive"><slot name="item-icon"></slot></div>
       <div v-else><slot name="item-icon-active"></slot></div>
       <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
        // isactive:true,
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  //路由管理views视图组件，tabbar的点击事件关联路由，这里把tabbar和路由联系起来了！！！！
  methods: {
    itemClick(){
      this.$router.replace(this.path)
    }
  },
}
</script>

<style scoped>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
      height: 24px;
      width: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;
  }

</style>
