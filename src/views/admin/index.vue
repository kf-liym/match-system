<template>
  <div class="admin-index">
    <table class="admin-index-table" border="1" cellspacing="0" cellspadding= "10">
      <tbody>
        <tr>
          <td width="25%">注册队伍总数：3000</td>
          <td width="25%">未提交审核总数：3000</td>
          <td width="25%">待审核总数：3000</td>
          <td width="25%">审核通过总数：3000</td>
        </tr>
        <tr>
          <td width="25%">运动员总数：2000</td>
          <td width="25%">男运动员：200</td>
          <td width="25%">女运动员：200</td>
          <td width="25%"></td>
        </tr>
        <tr>
          <td width="25%">报项总数：<br/>2000</td>
          <td width="25%">个人报项总数：<br/>2000</td>
          <td width="25%">对练报项总数：<br/>2000</td>
          <td width="25%">集体报项总数：<br/>2000</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'adminIndex',
  props: {},
  data () {
    return {}
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: {}
}
</script>

<style scoped lang="scss">
.admin-index {
  padding: 30px;
}
.admin-index-table {
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
  border-collapse: collapse;
  line-height: 2.5;
  td {
    padding: 10px 20px;
  }
}
</style>
