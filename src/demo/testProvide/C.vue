
<template>
    <!-- <div> C[color] {{C.color}} </div> -->
    <!-- <div>CCC {{$config.C.color}}</div> -->
    <div>CCC {{color}} {{path}}</div>
    <!-- <div>CCC</div> -->
</template>

<script>
import Vue from 'vue'

export default {
    name: 'C',
    inject: {
        'color': {
            type: 'Color',
            default: 'pick'
        }
    }
}
</script>