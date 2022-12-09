import Vue from 'vue'
import Vuex from 'vuex'
import {getPath, resolveRule, resolveTypes, valuateImportant, findActiveRuleOnCompo} from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        rules: [],
        types: {}
    },
    mutations: {
        addRule(state, config) {
            let name = config['path'][0]
            state.rules.push({
                ...config,
                name,
                type: state.types[name][config['key']] || (typeof config['value']),
                important: valuateImportant(config.path)
            })
        },
        editRule(state, config) {
            let name = config['path'][0]
            const index = state.rules.findIndex(rule => rule.id == config.id)
            state.rules.splice(index, 1, {
                ...config,
                name,
                type: state.types[name][config['key']] || (typeof config['value']),
                important: valuateImportant(config.path)
            })
        },
        addType(state, typeconfig) {
            if(typeconfig['name'] in state.types) {
                state.types[typeconfig['name']][typeconfig['key']] = typeconfig['type']
            } else {
                state.types[typeconfig['name']] = {
                    [typeconfig['key']]: typeconfig['type']
                }
            }
        }
    },
})

const testRules = [{
    path: ['C'],
    key: 'color',
    value: '#55ee00',
    id: +(new Date()) + 1
}, {
    path: ['C', 'B'],
    key: 'color',
    value: '#77eeee',
    id: +(new Date()) + 2
}, {
    path: ['C', 'B#index:1'],
    key: 'color',
    value: '#dd11ff',
    id: +(new Date()) + 3
}, {
    path: ['C', 'B#index:2'],
    key: 'name',
    value: 'name 2',
    id: +(new Date()) + 4
}]

setTimeout(()=>testRules.forEach(rule => store.commit('addRule', rule)), 1500)

const {
    provide: mergeProvide,
    computed: mergeComputed,
    inject: mergeInject,
    data: mergeData,
    props: mergeProps,
  } = Vue.config.optionMergeStrategies

let nameTmp = ''
Vue.config.optionMergeStrategies.name = function (parentVal, childVal) {
    nameTmp = childVal === undefined
    ? parentVal
    : childVal
    return nameTmp
}



Vue.config.optionMergeStrategies.custom = function (parentVal, childVal) {
    const options = parentVal || childVal
    if(!options) return;
    Object.keys(options).forEach(key => store.commit('addType', {
        name: nameTmp,
        key: key,
        value: options[key].default,
        type: options[key].type || (typeof options[key]),
    }))
    Object.keys(options).forEach(key => store.commit('addRule', {
        name: nameTmp,
        path: [nameTmp],
        default: true,
        important: 0,
        key: key,
        value: options[key].default,
        ... options[key]
    }))
}

export const createGlobalMixin = () => ({
    beforeCreate() {

        if(this.$root == this) {
            this.$options.store = store
        } 
        else {
            const path = getPath(this)

            const computed = {
                $custom() {
                    return resolveRule(store.state.rules, path)
                },
                $rules() {
                    return findActiveRuleOnCompo(store.state.rules, path)
                },
                // $types() {
                //     return resolveTypes(store.state.types, path)
                // }
            }

            this.$options.computed = mergeComputed(
                this.$options.computed,
                computed,
                this,
                'computed'
            )
        }
    }
})