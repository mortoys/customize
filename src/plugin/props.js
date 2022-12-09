
import {store} from './store'
import Vue from 'vue'
import difference from 'lodash/difference'
import omit from 'lodash/omit'

const {
    computed: mergeComputed,
    props: mergeProps,
  } = Vue.config.optionMergeStrategies

function getType (fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ''
}
export const createGlobalMixin = () => ({
    beforeCreate() {
        if(this.$root == this) {
            this.$options.store = store
        }
        else {
            const name = this.$options.name
            const propsData = this.$options.propsData
            const props = this.$options.props
            const diff = difference(Object.keys(props), Object.keys(propsData))

            console.log('diff', diff)
            
            this.$options.props = omit(props, diff)

            diff.forEach(key => store.commit('addRule', {
                ... props[key],
                type: typeof props[key]['type'] == 'function' ? getType(props[key]['type']) : props[key]['type'],
                name,
                key,
                value: props[key]['default'],
                default: true
            }))

            const computed = {}

            diff.forEach(key => {
                computed[key] = function () {
                    const rule = store.state.rules.slice().reverse().find(r => r.name == name && r.key == key)
                    return rule ? rule.value : undefined
                }
                Object.defineProperty(this, key, {
                    get() {
                        return this._computedWatchers[key].getter()
                    }
                })
            })

            this.$options.computed = mergeComputed(
                this.$options.computed,
                computed,
                this,
                'computed'
            )
        }
    }
})

// setTimeout(()=>store.commit('editRule', {
//     "id": "cb155c70cd84d64c88a60e4c3a044bc1cdab8fb2",
//     "name": "B",
//     "key": "prop2",
//     "value": "12312"
// }), 1500)