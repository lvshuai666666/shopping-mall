<template>
    <div class="car-list">
            <cart-list-item
            v-for="(item,index) in cartList" 
            :key="index" 
            :item-info="item">
            </cart-list-item>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from 'views/cart/CartListItem.vue'

export default {
  name: "CartList",
  data() {
    return {

    }
  },
   computed: {
    ...mapGetters(['cartList'])
  },
  components: {
      CartListItem
  },
  
}
</script>

<style scoped>
/* .cart-list {
    
} */

</style>
