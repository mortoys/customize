import Vue from 'vue'
import Vuex from 'vuex'
// import {getPath, resolveRule, resolveTypes, valuateImportant, findActiveRuleOnCompo} from './utils'
import objectHash from 'object-hash'
import pick from 'lodash/pick'

Vue.use(Vuex)


import axios from 'axios'

const url = 'https://service-9btw6gzr-1258375096.bj.apigw.tencentcs.com/release'

const api = {
  getRule: url + '/rule/'+location.search.replace(/^.*?\=/, ''),
  postRule: url + '/rule'
}

export const store = new Vuex.Store({
    state: {
        rules: [],
        types: []
    },
    mutations: {
        addRule(state, config) {
            const now = +(new Date())
            const id = objectHash(
                pick(config, ['name','key','value','default'])
            )
            if(!state.rules.find(rule => rule.id == id)) {
                state.rules.push({
                    ... config,
                    add_time: now,
                    id: id,
                })
                console.log('addRule', state.rules)

                if(config.default)
                    store.commit('addType', config)
            }
        },
        editRule(state, config) {
            const index = state.rules.findIndex(rule => rule.id == config.id)
            if(!!~index) {
                state.rules.splice(index, 1, {
                    ... config,
                    // id: objectHash(
                    //     pick(config, ['name','key','value','default'])
                    // )
                })
                console.log('editRule', state.rules)
            }
        },
        addType(state, config) {
            state.types.push(config)
        }
    },

    actions: {
        getRuleFromNetwork(context) {
            axios.get(api.getRule)
            .then(function (response) {
                const rules = JSON.parse(response.data.data.json)
                console.log(rules)
                rules && rules.forEach(rule =>
                    context.commit('addRule', rule)
                )
            })
        },
        postLocalRulesToNetwork(context) {
            const rules = context.state.rules.filter(rule => !rule.default)

            axios.post(api.postRule, {
                json: JSON.stringify(rules)
            }, { withCredentials: true })
            .then(function (response) {
                const data = response.data.data
                console.log(data)
            })
        }
    }
})

store.dispatch('getRuleFromNetwork')

// setTimeout(() => store.dispatch('postLocalRulesToNetwork'), 5000)
// setTimeout(() => store.dispatch('getRuleFromNetwork'), 5000)