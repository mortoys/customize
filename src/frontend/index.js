import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { createStore } from './store'
import SharedData, {
  init as initSharedData,
  destroy as destroySharedData
} from '@utils/shared-data'
import { init as initStorage } from '@utils/storage'
import VuexResolve from '@front/views/vuex/resolve'
import { parse } from '@utils/util'
import { isChrome, initEnv } from '@utils/env'
import App from './App.vue'

Vue.config.silent = true

let panelShown = !isChrome
let pendingAction = null

/**
 * Create the main devtools app. Expects to be called with a shell interface
 * which implements a connect method.
 *
 * @param {Object} shell
 *        - connect(bridge => {})
 *        - onReload(reloadFn)
 */

export function initDevTools(shell) {
  initStorage().then(() => {
    initApp(shell)
    shell.onReload(() => {
      if (app) {
        app.$el.classList.add('disconnected')
        app.$destroy()
      }
      bridge.removeAllListeners()
      initApp(shell)
    })
  })
}

/**
 * Connect then init the app. We need to reconnect on every reload, because a
 * new backend will be injected.
 *
 * @param {Object} shell
 */

function initApp(shell) {
  shell.connect(bridge => {
    window.bridge = bridge

    if (Vue.prototype.hasOwnProperty('$shared')) {
      destroySharedData()
    } else {
      Object.defineProperty(Vue.prototype, '$shared', {
        get: () => SharedData
      })
    }

    initSharedData({
      bridge,
      Vue,
      persist: true
    }).then(() => {
      if (SharedData.logDetected) {
        bridge.send('log-detected-vue')
      }

      const store = createStore()

      bridge.once('ready', version => {
        store.commit(
          'SHOW_MESSAGE',
          'Ready. Detected Vue ' + version + '.'
        )
        // bridge.send('events:toggle-recording', store.state.events.enabled)

        if (isChrome) {
          chrome.runtime.sendMessage('vue-panel-load')
        }
      })

      bridge.once('proxy-fail', () => {
        store.commit(
          'SHOW_MESSAGE',
          'Proxy injection failed.'
        )
      })

      // -------- 组件树 ----------

      bridge.on('flush', payload => {
        // console.warn('flush', payload)
        store.commit('components/FLUSH', parse(payload))
      })

      bridge.on('instance-details', details => {
        store.commit('components/RECEIVE_INSTANCE_DETAILS', parse(details))
      })

      bridge.on('toggle-instance', payload => {
        store.commit('components/TOGGLE_INSTANCE', parse(payload))
      })

      bridge.on('inspect-instance', id => {
        ensurePaneShown(() => {
          bridge.send('select-instance', id)
          // router.push({
          //   name: 'components'
          // })
          const instance = store.state.components.instancesMap[id]
          instance && store.dispatch('components/toggleInstance', {
            instance,
            expanded: true,
            parent: true
          })
        })
      })

      // -------- Vuex ----------

      bridge.on('vuex:init', () => {
        store.commit('vuex/INIT')
      })

      bridge.on('vuex:mutation', payload => {
        console.warn('vuex:mutation', payload)
        store.dispatch('vuex/receiveMutation', payload)
      })

      bridge.on('vuex:inspected-state', ({
        index,
        snapshot
      }) => {
        console.warn('vuex/RECEIVE_STATE', index, snapshot)
        store.commit('vuex/RECEIVE_STATE', {
          index,
          snapshot
        })

        if (index === -1) {
          console.warn('vuex/UPDATE_BASE_STATE', snapshot)
          store.commit('vuex/UPDATE_BASE_STATE', snapshot)
        } else if (store.getters['vuex/absoluteInspectedIndex'] === index) {
          console.warn('vuex/UPDATE_INSPECTED_STATE', snapshot)
          store.commit('vuex/UPDATE_INSPECTED_STATE', snapshot)
        } else {
          console.log('vuex:inspected-state wrong index', index, 'expected:', store.getters['vuex/absoluteInspectedIndex'])
        }

        if (VuexResolve.travel) {
          VuexResolve.travel(snapshot)
        }

        requestAnimationFrame(() => {
          SharedData.snapshotLoading = false
        })
      })

      // -------- 路由 ----------

      // bridge.on('router:init', payload => {
      //   store.commit('router/INIT', parse(payload))
      // })

      // bridge.on('router:changed', payload => {
      //   store.commit('router/CHANGED', parse(payload))
      // })

      bridge.on('routes:init', payload => {
        store.commit('routes/INIT', parse(payload))
      })

      bridge.on('routes:changed', payload => {
        store.commit('routes/CHANGED', parse(payload))
      })

      // -------- 事件 ----------

      // bridge.on('event:triggered', payload => {
      //   store.commit('events/RECEIVE_EVENT', parse(payload))
      //   if (router.currentRoute.name !== 'events') {
      //     store.commit('events/INCREASE_NEW_EVENT_COUNT')
      //   }
      // })

      // bridge.on('events:reset', () => {
      //   store.commit('events/RESET')
      // })

      // -------- 性能 ----------
      
      // bridge.on('perf:add-metric', data => {
      //   store.commit('perf/ADD_METRIC', data)
      // })

      // bridge.on('perf:upsert-metric', ({
      //   type,
      //   data
      // }) => {
      //   store.commit('perf/UPSERT_METRIC', {
      //     type,
      //     data
      //   })
      // })

      initEnv(Vue)

      const app = new Vue({
        extends: App,
        //   router,
        store,
      }).$mount('#app')
    })
  })
}

// Pane visibility management

function ensurePaneShown(cb) {
  if (panelShown) {
    cb()
  } else {
    pendingAction = cb
  }
}
