<template>
  <div>
    <!-- <split-pane> -->
      <component-tree
        v-if="defer(2)"
        class="component-tree"
        :instances="instances"
      />
      <component-inspector
        v-if="defer(3)"
        class="component-inspector"
        :target="inspectedInstance"
        :loading="loading"
      />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Defer from '@front/mixins/defer'

import SplitPane from '@front/components/SplitPane.vue'
import ComponentTree from './ComponentTree.vue'
import ComponentInspector from './ComponentInspector.vue'

const superDef = {
  data () {
    return {
      foo: 'bar'
    }
  }
}

export default {
  components: {
    ComponentTree,
    ComponentInspector,
    SplitPane
  },

  extends: superDef,

  mixins: [
    Defer()
  ],

  computed: mapState('components', [
    'instances',
    'inspectedInstance',
    'loading'
  ])
}
</script>

<style lang="stylus" scoped>
.component-inspector
    width: 300px;
    position: absolute;
    right: 0;
    top: 0;
</style>