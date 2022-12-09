
<template>
    <div> <B v-for="i in [1,2,3]" :key="'index:'+i"/> </div>
</template>

<script>
import Vue from 'vue'

import B from './B'

export default Vue.extend({
    provide() {return {
        'C': this.C,
        'B#BB': {
            path: 'B#BB',
            C: this.C,
        },
    }},
    data() {
        return {
            yy: [1,2,3],
            C: {
                color: 'green'
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.C.color = 'yellow'
            console.log(this.C.color)
        }, 1000)
    },
    components: { B }
})
</script>