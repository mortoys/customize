
<template>
    <!-- <div> <C key="CC"/> </div> -->
    <div> BB {{prop2}}</div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'B',
    props: {
        prop1: {
            validator: String,
            default: '#000000'
        },
        prop2: {
            validator: String,
            default: '#000001'
        }
    },
    mounted() {
        console.log(this.prop2)
    },
}
</script>