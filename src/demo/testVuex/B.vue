
<template>
    <div> <C key="CC"/> </div>
</template>

<script>
import Vue from 'vue'

import C from './C'
const Color = () => true

export default {
    name: 'B',
    props: {
        prop1: {
            validator: Color,
            default: '#000000'
        }
    },
    computed: {
        prop1() {
            return 1111
        }
    },
    mounted() {
        console.log(this.prop1)
    },
    components: { C }
}
</script>