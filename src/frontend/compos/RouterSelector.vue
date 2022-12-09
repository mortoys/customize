<template>
  <div class="router-selector">
    <el-select v-model="value" placeholder="请选择">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
    </el-select>
  </div>
</template>

<script>

export default {
  name: 'RouterSelector',
  data() {
      return {
          value: 'router1',
          options: [{
            value: 'router2',
            label: '/foo'
            }, {
            value: 'router3',
            label: '/bar'
            }, {
            value: 'router4',
            label: '/foo'
            }, {
            value: 'router5',
            label: '/bar'
            }, {
            value: 'router6',
            label: '/bar'
          }]
      }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.router-selector {
    /deep/ .el-select {
        width: 100%;
    }
    /deep/ .el-input__inner {
        border: none;
        height: 80px;
        font-size: 26px;
        text-align: center;
    }
}
</style>
