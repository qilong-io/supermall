import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


// 事件总线
// this.$bus.$emit('aaaa')
// this.$bus.$on('aaaa',()=>{
//    需要做的事情
// })
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
