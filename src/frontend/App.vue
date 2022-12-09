<template>
  <div id="app">
    <el-container style="height: 98vh;border: 1px solid #eee">
      <el-aside width="200px">
        <router-selector/>
        <compos-tree style="margin-top: 30px;"/>
      </el-aside>
      <el-container class="middle-container">
        <!-- <el-header></el-header> -->
        <el-main class="">
          <div class="frame">
            <!-- <iframe id="target" name="target" src="target.html"></iframe> -->
          </div>
        </el-main>
      </el-container>
      <el-aside width="250px">
        <compos-options/>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'

import RouterSelector from './compos/RouterSelector.vue'
import ComposTree from './compos/ComposTree'
import ComposOptions from './compos/CompoOptions'

import throttle from "lodash/throttle"

function follow() {
  const frame = document.querySelector('.frame')
  const target = document.querySelector('#target')
  const rect = frame.getBoundingClientRect()
  
  target.style.top = rect.top + 'px'
  target.style.left = rect.left + 'px'
  target.style.width = rect.width + 'px'
  target.style.height = rect.height + 'px'
}
export default {
  components: {
    RouterSelector,
    ComposTree,
    ComposOptions,
  },
  name: 'app',
  mounted() {
    follow()
    window.addEventListener("resize", throttle(follow, 500))
  }
  // computed: {
  //   ...mapState({
  //     message: state => state.message,
  //     newEventCount: state => state.events.newEventCount,
  //     view: state => state.view
  //   }),

  //   ...mapGetters('components', {
  //     totalComponentCount: 'totalCount'
  //   }),
  // },
}
</script>

<style scoped>
.frame {
  /* 92/736*414 */
  width: 51.75vh;
  height: 92vh;
  background: white;
  box-shadow: 2px 2px 5px 1px #e0e0e05c;
}
.el-main {
    display: flex;
    justify-content: center;
    align-items: center;
}
.middle-container {
  background: #fafafa;
}
</style>
