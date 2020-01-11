<template>
  <div class="app-wrap">
    <app-header class="app-header" />
    <router-view class="app-container" />
  </div>
</template>

<script>
import appHeader from './components/header.vue'
export default {
  components: {
    appHeader
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="scss">
.app-wrap {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  padding-top: 65px;
}
.app-container {
  // flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
