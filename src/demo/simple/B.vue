
<template>
    <div> <C key="CC"/> </div>
</template>

<script>
import Vue from 'vue'

import C from './C'
export default {
    inject: {
        B: {
            from: 'B#BB',
            defalut: () => {}
        },
    },
    provide() {
        return {
            ... this.B
        }
    },
    beforeCreate() {
        const key = this.$vnode.key
        // debugger
    },
    components: { C }
}
</script>

<style scoped>
/* * {
    font-size: 10px;
} */
</style>