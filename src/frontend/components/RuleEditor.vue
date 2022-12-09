<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item 
            :title="rule.name" 
            :name="rule.name" 
            :collapsed="false"
            active="true"
            v-for="rule in groupedRules" 
            :key="rule.name">
            <rule-input v-for="(r, index) in rule.rules" :key="index" :rule="r"/>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import RuleInput from './RuleInput'

export default {
    components: {
        RuleInput
    },
    props: ['state'],
    data() {
        return {
            activeNames: []
        }
    },
//     watch: {
//         groupedRules: {
//             deep: true,
//             handler() {
//                 const names  = this.groupedRules.map(_ => _.name)
// debugger
//                 this.activeNames = names
//             }
//         }
//         // () {
//             // this.activeNames = this.groupedRules.map(_ => _.name)
//         // }
//     },
    computed: {
        rules() {
            return this.state.state.find(item => item.key == '$rules').value
        },
        custom() {
            return this.state.state.find(item => item.key == '$custom').value
        },
        // types() {
        //     return this.state.state.find(item => item.key == '$types').value
        // },
        property() {
            return this.rules.map(item => item.key)
        },
        groupedRules() {
            const grouped = groupBy(this.rules, 'path')
            return sortBy(Object.keys(grouped).map(path => ({
                important: grouped[path][0].important,
                name: grouped[path][0].path.slice().reverse().join(' / '),
                path: grouped[path][0].path,
                rules: grouped[path]
            })), 'important').reverse()
        }
    },
    mounted() {
        // file: "src/demo/testVuex/C.vue"
        // id: "1:4"
        const rules = this.rules
        const custom = this.custom
        const groupedRules = this.groupedRules
        const property = this.property
        // const types = this.types
        // debugger
    }
}
</script>