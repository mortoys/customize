<template>
    <el-form-item class="option-item" :label="option.key">
        <el-switch
            v-if="type=='Boolean'"
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onChange">
        </el-switch>

        <el-input v-if="type=='String'" v-model="value" placeholder="请输入内容" @input="onChange"/>

        <el-color-picker v-if="type=='Color'" :value="value" @change="onChange"/>

        <el-date-picker
            v-if="type=='Date'"
            v-model="value"
            type="date"
            @change="onChange"
            placeholder="选择日期"/>

        <el-date-picker
            v-if="type==''"
            v-model="value"
            type="datetime"
            placeholder="选择日期时间"/>

        <el-time-select
            v-if="type==''"
            v-model="value"
            :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
            }"
            placeholder="选择时间"/>

        <el-input-number 
            v-if="type=='Number'"
            :min="1" :max="10" label="描述文字"
            @change="onChange"/>

        <el-select 
            v-if="type==''"
            v-model="value" placeholder="请选择">
            <el-option
            v-for="item in [{value: 1}, {value: 2}]"
            :key="item.value"
            :label="item.value"
            :value="item.value">
            </el-option>
        </el-select>

         <!-- <el-upload
            class="upload-demo">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->

        <span class="value-test">{{inspectedState}}</span>
    </el-form-item>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
    name: 'ComposOptions',
    props: ['type', 'value', 'option', 'inspectedState'],
    data() {
        return {
            form: {},
            value: ''
        }
    },
    methods: {
        ...mapActions('vuex', [
            'commitMutation',
            'inspect',
            'editState'
        ]),
        onChange(value) {
            this.commitMutation({
                type: 'editRule',
                payload: {
                    name: this.option.name,
                    key: this.option.key,
                    value: value,
                    id: this.option.id || +(new Date()),
                    default: false
                }
            })
            this.$emit('change')
        }
    },
    computed: {
        ...mapGetters('vuex', [
        'inspectedLastState',
        // 'inspectedState',
        'filteredHistory'
        ]),
    }
}
</script>

<style lang="stylus" scoped>
.compos-options {
    padding: 10px 20px;

    .value-test {
        position: relative;
        top: -14px;
        color: #aaa;
    }
}
</style>
