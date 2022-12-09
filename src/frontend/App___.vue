<template>
  <div id="app" class="app">
    <ComponentsTab/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import { SPECIAL_TOKENS } from '@utils/util'
// import { get, set } from '@utils/storage'
import '@front/plugins'

import ComponentsTab from './views/components/ComponentsTab.vue'

export default {
  name: 'App',

  components: {
    ComponentsTab
  },

  mixins: [],

  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      message: state => state.message,
      newEventCount: state => state.events.newEventCount,
      view: state => state.view
    }),

    ...mapGetters('components', {
      totalComponentCount: 'totalCount'
    }),
  },

  methods: {
    refresh () {
      const refreshIcon = this.$refs.refresh.$el.querySelector('.vue-ui-icon')
      refreshIcon.style.animation = 'none'

      bridge.send('refresh')
      bridge.once('flush', () => {
        refreshIcon.style.animation = 'rotate 1s'
      })
    }
  }
}
</script>

<style lang="stylus" src="@front/style/global.styl"></style>