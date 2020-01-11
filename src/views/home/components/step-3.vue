<template>
  <div class="step-3">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人项目" name="first">
        <el-collapse v-model="activeNames" class="match-item" @change="handleChange">
          <el-collapse-item title="个人项目报名信息" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
        </el-collapse>
        <div>新增报项</div>
      </el-tab-pane>
      <el-tab-pane label="对练项目" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="集体项目" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Step3',
  components: {

  },
  props: {

  },
  data () {
    return {
      activeName: 'second',
      activeNames: ['1']
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
.step-3 {
  padding: 20px 20px;
}
// .match-item{
//   border:1px solid #333;
// }
</style>
