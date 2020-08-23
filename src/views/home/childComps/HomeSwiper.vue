<template>
    <swiper>
        <swiper-item v-for ="item in banners">
          <a :href="item.link"></a>
            <img :src="item.image" alt="" @load="imageLoad">
        </swiper-item>
      </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: "HomeWiper",
  data() {
    return {
        isLoad:false
    }
  },
  props:{
    banners:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if(!this.isLoad){
         this.$emit('swiperImageLoad')
         this.isLoad=true
      }
     
    }
  },

}
</script>

<style>

</style>
