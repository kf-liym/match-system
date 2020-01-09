<template>
  <div class="home">
    <el-steps
      class="step"
      :active="active"
    >
      <el-step
        v-for="(item, index) in step"
        :key="index"
        :title="item.title"
        @click.native="handleStep(index)"
      />
    </el-steps>
    <el-alert
      class="alert"
      title="操作注意事项"
      type="warning"
      show-icon
    />
    <ul class="description">
      <li>1、出质前盖坐着的著作权是否授权及授权情况说明：若未授权他人使用，填写“否”；若有授权情况，请在授权情况说明栏中填写著作权授权许可（包括专有）</li>
      <li>2、出质前盖坐着的著作权是否授权及授权情况说明：若未授权他人使用，填写“否”；若有授权情况，请在授权情况说明栏中填写著作权授权许可（包括专有）</li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data () {
    return {
      active: 0,
      step: [
        {
          title: '上传责任书'
        },
        {
          title: '填写基本信息'
        },
        {
          title: '填写报项信息'
        },
        {
          title: '报项汇总'
        },
        {
          title: '上传汇款证明'
        },
        {
          title: '提交并等待审核'
        }
      ]
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
    handleStep (index) {
      this.active = index
    }

  }
}
</script>

<style scoped lang="scss">
.home {
 padding: 40px 30px 0;
}
.step {
}
.alert {
  margin-top: 20px;
}
.description {
  font-size: 14px;
  padding: 15px 10px;
  li {
    margin-bottom: 5px
  }
}
</style>
