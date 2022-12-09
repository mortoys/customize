
<template>
    <div> C[color] {{C.color}} </div>
</template>

<script>
import Vue from 'vue'

export default {
    inject: {
        C: {
            default: () => {}
        }
    }
}
</script>