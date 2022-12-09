
<template>
    <div>
        <B v-for="i in yy" :key="'index:'+i" :prop1="i+1"/> 
    </div>
</template>

<script>
import Vue from 'vue'

import B from './B'
// import { mapState, mapGetters, mapActions } from 'vuex'
// import store from '@src/plugin/store'

export default Vue.extend({
    name: 'A',
    data() {
        return {
            yy: [1,2,3],
        }
    },
    mounted() {
        setTimeout(() => {
            this.yy.push(55)
        }, 1000)
    },
    // computed: {
    //     rules() {
    //         return store.state.rules
    //     }
    // },
    components: { B }
})
</script>