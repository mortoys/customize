<template>
  <el-form ref="form" :model="form" label-width="80px" class="compos-options" label-position="top">
    <el-button type="primary" class="btn-submit" @click="onSubmit">提交</el-button>
    <OptionItem 
        v-for="option in filterByName" :key="option.id"
        :option="option" :value="option.value" :type="typesFilterByName[option.key]" 
        @change="onChange"
    />
  </el-form>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import OptionItem from './CompoOptionsItem'

import axios from 'axios'

const url = 'https://service-9btw6gzr-1258375096.bj.apigw.tencentcs.com/release'

const api = {
  getRule: url + '/rule/c37e96e8-e201-11ea-b4cb-6c92bf628436',
  postRule: url + '/rule'
}

export default {
    components: { OptionItem },
    name: 'ComposOptions',
    data() {
        return {
            form: {},
            value: ''
        }
    },
    mounted() {
        this.inspect(this.filteredHistory.length)
    },
    methods: {
        ...mapActions('vuex', [
            'commitMutation',
            'inspect',
            'editState'
        ]),
        onChange() {
            setTimeout(() => this.inspect(this.filteredHistory.length), 1000)
        },
        onSubmit() {
            // console.log(JSON.stringify(this.rules))
            // store.dispatch('postLocalRulesToNetwork')
            const rules = this.rules.filter(rule => !rule.default)

            axios.post(api.postRule, {
                json: JSON.stringify(rules)
            }, { withCredentials: true })
            .then(function (response) {
                const id = response.data.data
                window.open("/target.html?="+id, "_blank")
            })
        }
    },
    // watch: {
    //     types() {
    //         console.log('types', this.types)
    //         window.TT = this.types
    //     }
    // },
    computed: {
        state() {
            return this.inspectedLastState.state
        },
        types() {
            return this.state ? this.state.types : []
        },
        rules() {
            return this.state ? this.state.rules : []
        },
        typesFilterByName() {
            return this.types.filter(rule=>rule.name == this.inspectedInstance.name).reduce((ret, item)=>(ret[item['key']]=item['type'], ret), {})
        },
        filterByName() {
            return this.rules.filter(rule => rule.name == this.inspectedInstance.name)
        },
        ...mapState('components', [
            'instances',
            'inspectedInstance',
        ]),
        ...mapGetters('vuex', [
            'inspectedLastState',
            'filteredHistory'
        ]),
  },
}
</script>

<style lang="stylus" scoped>
.compos-options {
    display: flex;
    flex-direction: column;

    padding: 0px 4px;
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;

    .btn-submit {
        margin: 0 0 30px;
        width: 100%;
    }
}
</style>

<style>
.el-form-item__label {
    line-height: 14px;
}
</style>