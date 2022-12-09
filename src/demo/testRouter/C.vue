
<template>
    <!-- <div> C[color] {{C.color}} </div> -->
    <div :style="'color: '+$custom.color">{{$custom.name}} {{$custom.color}}</div>
    <!-- <div>CCC {{color}} {{path}}</div> -->
    <!-- <div>CCC</div> -->
</template>

<script>
import Vue from 'vue'

export default {
    name: 'C',
    custom: {
        name: {
            type: 'String',
            default: 'default name'
        },
        color: {
            type: 'Color',
            default: '#ddee00'
        }
    }
}
</script>