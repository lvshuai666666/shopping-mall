<template>
    <div class="cart">
      <nav-bar class="navbar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <scroll class="content" ref="scroll">
      <cart-list></cart-list>
      </scroll>
      <cart-button-bar></cart-button-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'
import CartList from 'views/cart/CartList.vue'
import CartButtonBar from 'views/cart/CartButtonBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  name: "Cart",
  data() {
    return {

    }
  },
  components: {
    NavBar,
    CartList,
    CartButtonBar,
    Scroll
  },
  activated() {
    //   console.log('滚')
      this.$refs.scroll.refresh()
      },
  computed: {
    ...mapGetters(['cartLength', 'cartList'])

//     mapGetters({
//         length: 'cartLength'
//         list: 'cartList'
// })

  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.navbar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.content{
    height:calc(100% - 44px - 49px  - 40px);
    /* margin-top: 44px; */
    /* height: 100%; */
    overflow: hidden;
}
</style>
