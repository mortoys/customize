
<template>
    <div> <router-view/> </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: 'A',
    data() {
        return {
        }
    },
    mounted() {
        setTimeout(() => {
            // this.$data.$config.B.C.color = 'yellow'
            // console.log(this.$config.C.color)
        }, 1000)
    },
})
</script>