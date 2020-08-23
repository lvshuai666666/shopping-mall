<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button :is-checked="isselectall" class="check-button" @click.native="checkclick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计:{{totalprice}}
        </div>
        <div class="calculate">
            去结算({{checkeLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton.vue'
import { mapGetters } from 'vuex'
export default {
  name: "CartButtonBar",
  data() {
    return {

    }
  },
  computed: {
      ...mapGetters(['cartList']),
      totalprice(){
          return '￥'+ this.$store.state.cartList.filter(item => {
                return item.checked
                }).reduce((preValue, item) =>{
                return preValue + item.price * item.count
                }, 0).toFixed(2)
      },
      checkeLength(){
          return this.$store.state.cartList.filter(item => item.checked).length
      },
      isselectall(){
          if (this.cartList.length === 0) return false
          return !(this.cartList.filter(item => !item.checked).length)
        //   return ! this. cartList. find(item => Iitem. checked)
      }
  },
  methods: {
      checkclick(){
          if (this.isselectAll) {//全部选中
          this.cartList.forEach(item => item.checked = false)
          } else {
              //部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
       }
    }
  },
  components: {
      CheckButton 
  }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    background-color: #eee;
    position:relative;
    line-height: 40px;
    /* bottom: 40px; */
    display: flex;
    font-size: 14px; 
}
.check-content{
    display: flex;
    align-items: center;
    width: 60px;
}
.check-button {
    width: 21px;
    height: 21px;
    line-height:21px;
}
.price{
    margin-left: 30px;
    flex: 1;
}
.calculate{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
}

</style>
