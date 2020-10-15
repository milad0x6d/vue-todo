import Vue from 'vue'
import Todo from './components/Todo'

Vue.config.productionTip = false

new Vue({
  render: h => h(Todo),
}).$mount('#app')
