<template>
    <div class="recommend">
        <div v-for="item in recommends" class="recommend-item">
            <a :href="item.link"></a>
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "HomeRecomendView",
  props:{
      recommends:{
          type:Array,
          defult(){
              return[]
          }
      }
  },
  data() {
    return {

    }
  },
  components: {
  }
}
</script>

<style>
.recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
}

.recommend-item{
    flex: 1;

}

.recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>