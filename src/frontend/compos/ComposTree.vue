<template>
  <div class="compos-tree">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :highlight-current="true"
      :expand-on-click-node="false"
      @node-click="select">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ComposTree',
  data() {
      return {
        data: [],
        selecting: false,
        highDensity: false
      }
  },

  computed: {
    ...mapState('components', [
      'instances'
    ]),
  },
  watch: {
    instances: {
      deep: true,
      handler() {
        function pick({id, name, children}) {
          return {
            id,
            label: name,
            children: children.map(pick)
          }
        }
        this.data = JSON.parse(JSON.stringify(this.instances.map(pick)))
        console.log('instances', this.instances, this.data)
      }
    }
  },

  mounted () {
    bridge.on('instance-selected', this.stopSelector)
    bridge.on('stop-component-selector', this.stopSelector)
  },

  beforeDestroy () {
    this.setSelecting(false)
    bridge.off('instance-selected', this.stopSelector)
    bridge.off('stop-selector', this.stopSelector)
  },

  methods: {
    select (instance) {
      bridge.send('select-instance', instance.id)
    },

    stopSelector () {
      this.setSelecting(false)
    },

    setSelecting (value) {
      if (this.selecting !== value) {
        this.selecting = value

        if (this.selecting) {
          bridge.send('start-component-selector')
        } else {
          bridge.send('stop-component-selector')
        }
      }
    },
  }
}

// const isComponentInstance = object => typeof object !== 'undefined' && typeof object.instance !== 'undefined'

// const getAllInstances = list => list.reduce((instances, i) => {
//   if (isComponentInstance(i)) {
//     instances.push(i)
//   }
//   instances = instances.concat(getAllInstances(i.$children))
//   return instances
// }, [])

// function findCurrent (all, check) {
//   for (let i = 0; i < all.length; i++) {
//     if (check(all[i])) {
//       return {
//         current: all[i],
//         currentIndex: i
//       }
//     }
//   }
//   return {
//     current: null,
//     currentIndex: -1
//   }
// }

// function findByIndex (all, index) {
//   if (index < 0) {
//     return all[0]
//   } else if (index >= all.length) {
//     return all[all.length - 1]
//   } else {
//     return all[index]
//   }
// }
</script>

<style lang="stylus" scoped>
.compos-tree {
  /deep/ .el-tree-node__content {
    height: 42px;
  }
}
</style>
