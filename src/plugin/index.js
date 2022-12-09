import {
  createGlobalMixin
} from './props'

function install(Vue, options) {
  Vue.mixin(createGlobalMixin(options))
}

export default {
  install
}
