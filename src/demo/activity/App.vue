<template>
<div class="app">
    <Background/>
    <Logo/>

    <Board/>

    <el-button>默认按钮</el-button>
</div>
</template>

<script>
import Background from './compos/background'
// import Avatar from './compos/avatar'
// import Cal from './compos/cal'
import Logo from './compos/logo'
// import Star from './compos/star'
import Board from './compos/Board'
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default {
    components: {
        Background, Logo, Board
        // Avatar, Cal, Logo, Star
    },
    name: 'Page',
    props: {
        'A': String
    }
}
</script>