<template>
<div> {{rule.key}}:  {{rule.default ? '(default)' : ''}}
    <el-input 
        v-if="rule.type == 'String'" 
        size='mini' 
        v-model="input" 
        :label="rule.key" 
        @input="onChange" 
        :disabled="rule.default"
    ></el-input>
    <el-color-picker 
        v-if="rule.type == 'Color'" 
        v-model="input" 
        size="mini" 
        @change="onChange" 
        :disabled="rule.default"
    ></el-color-picker>
</div>
</template>

<script>
// default: "pink"
// important: 10
// key: "color"
// name: "C"
// path: ["C"]
// type: "Color"
// value: "pink"
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    props: ['rule'],
    data() {
        return {
            input: this.rule.value
        }
    },
    methods: {
        ...mapActions('vuex', [
            'commitMutation',
        ]),
        onChange(color) {
            debugger
            this.commitMutation({
                type: 'editRule',
                payload: {
                    path: this.rule.path,
                    key: this.rule.key,
                    value: color,
                    id: this.rule.id || +(new Date()),
                }
            })
        }
    }
}
</script>

<style>
.el-input {
    /* width: 130px; */
}
.el-color-picker {
    vertical-align: middle;
}
</style>
