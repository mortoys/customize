
import Vue from 'vue'
import plugin from '@src/plugin'

Vue.use(plugin)

import App from './App'

const app = new Vue({
    render: h => h(App)
}).$mount('#app')