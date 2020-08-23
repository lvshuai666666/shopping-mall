import { debounce } from '@/common/utilts.js'
import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixin = {

    data() {
        return {
            homeitemlistener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 500)
        this.homeitemlistener = () => {
            this.refresh()
        }
        this.$bus.$on('itemImageLoad', this.homeitemlistener)
        console.log('我是混入内容')
    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isshowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        },
    },
}