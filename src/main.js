import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import toast from 'components/common/toast'

import Fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

//解决移动端300ms延迟
Fastclick.attach(document.body)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')