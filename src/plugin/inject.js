// inspired by https://github.com/LinusBorg/vue-reactive-provide

import Vue from 'vue'

export const createReactiveObject = data => Vue.observable(data)

const {
  provide: mergeProvide,
  computed: mergeComputed,
  inject: mergeInject,
  data: mergeData
} = Vue.config.optionMergeStrategies

export const createGlobalMixin = () => ({
  beforeCreate() {
    const name = this.$options.name
    const key = this.$vnode && this.$vnode.key
    const isRoot = this.$root == this
    // console.log(name, isRoot, key, this.$options, this)

    if(isRoot) {
      const config = createReactiveObject({
        'C': {
          color: 'red'
        },
        'B': {
          path: 'B',
            C: {
              color: 'blue'
            },
        },
        'B#index:2': {
            path: 'B#index:2',
            C: {
              color: 'green'
            },
        },
      })

      // this.$set(this, '$config', config)
      const configData = {
        '$config': config
      }

      this.$options.data = mergeData(
        this.$options.data,
        configData,
        this,
        'data'
      )

      this.$options.provide = mergeProvide(
        this.$options.provide,
        configData,
        this,
        'provide'
      )
    } else {
      const defaultInjectOptions = this.$options.inject || {}

      const watchKeys = Object.keys(defaultInjectOptions)

      this.$options.data = mergeData(
        this.$options.data,
        {...defaultInjectOptions},
        this,
        'data'
      )

      this.$once('hook:created', () => {
        const unwatch = this.$watch(
          '$config',
          function ($config = {}) {
            const data = this.$data
            const injectData = $config[this.$options.name]
            watchKeys.forEach(key => {
              if (data.hasOwnProperty(key)) {
                debugger
                data[key] = injectData[key]
              } else {
                Vue.set(data, key, injectData[key])
              }
            })
          },
          {
            immediate: true,
            deep: true
          }
        )
        this.$on('hook:beforeDestroy', unwatch)
      })

      this.$options.inject = mergeInject(
        // this.$options.inject,
        undefined,
        {
          '$config': {
            from: '$config',
            default: () => {}
          }
        },
        this,
        'inject'
      )


      function flattenSelfCompo(name, key, config) {
        // console.log(config[name+'#'+key])
        return {
          ... config,
          ... (config[name] ? config[name] : {}),
          ... (config[name+'#'+key] ? config[name+'#'+key] : {})
        }
      }


      this.$options.provide = mergeProvide(
        this.$options.provide,
        function () {
          return {
            '$config': flattenSelfCompo(this.$options.name, this.$vnode.key, this.$config)
          }
        },
        this,
        'provide'
      )

    }
  }
})