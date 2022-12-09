
<template>
    <div> <B v-for="i in [1,2,3]" :key="'index:'+i" :prop1="i"/> </div>
</template>

<script>
import Vue from 'vue'

import B from './B'

export default Vue.extend({
    name: 'A',
    data() {
        return {
            yy: [1,2,3],
        }
    },
    mounted() {
        setTimeout(() => {
            // this.$data.$config.B.C.color = 'yellow'
            // console.log(this.$config.C.color)
        }, 1000)
    },
    components: { B }
})
</script>