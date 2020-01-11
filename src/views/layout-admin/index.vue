<template>
  <div class="app-wrap">
    <app-header class="app-header" />
    <div class="app-container">
      <el-menu :default-active="active" router class="app-menu">
        <el-menu-item index="index">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="review">
          <i class="el-icon-s-management"></i>
          <span slot="title">审核管理</span>
        </el-menu-item>
      </el-menu>
      <div class="app-inner">
        <router-view class />
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from './components/header.vue'
export default {
  name: 'adminLayout',
  props: {},
  data () {
    return {}
  },
  computed: {},
  created () {
    const route = this.$route.path.split('/')
    this.active = route[route.length - 1]

  },
  mounted () {
  },
  watch: {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {
    appHeader
  }
}
</script>

<style scoped lang="scss">
// .app-wrap {
//   height: 100%;
//   width: 100%;
// }
.app-wrap {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  padding-top: 65px;
}
.app-container {
  // flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.app-container {
  position: relative;
  padding-left: 150px;
}
.app-menu {
  position: absolute;
  left: 0;
  height: 100%;
  width: 150px;
}
.app-inner {
  width: 100%;
  height: 100%;
  overflow: auto;
  // padding-left:
}
</style>
