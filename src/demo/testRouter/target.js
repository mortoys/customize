
import Vue from 'vue'
import Router from 'vue-router'
import plugin from '@src/plugin'

Vue.use(Router)
Vue.use(plugin)

import App from './A'
// import B from './B'
// import C from './C'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const router = new Router({
    mode: 'hash',
    routes: [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ]
})

const app = new App({
    router
}).$mount('#app')