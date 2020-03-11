<!--
 * @Desc: 描述
 * @Date: 2020-01-10 22:52:17
 * @LastEditTime: 2020-03-11 01:40:05
 -->
<template>
  <div class="admin-index">
    <table class="admin-index-table" border="1" cellspacing="0" cellspadding= "10">
      <tbody>
        <tr>
          <td width="25%">注册队伍总数：{{ info.registered }}</td>
          <td width="25%">未提交审核总数：{{ info.unsubmitted }}</td>
          <td width="25%">待审核总数：{{ info.pending }}</td>
          <td width="25%">审核通过总数：{{ info.pass }}</td>
        </tr>
        <tr>
          <td width="25%">运动员总数：{{ info.sex }}</td>
          <td width="25%">男运动员：{{ info.male }}</td>
          <td width="25%">女运动员：{{ info.female }}</td>
          <td width="25%"></td>
        </tr>
        <tr>
          <td width="25%">报项总数：<br/>{{ info.project }}</td>
          <td width="25%">个人报项总数：<br/>{{ info.personal }}</td>
          <td width="25%">对练报项总数：<br/>{{ info.duel }}</td>
          <td width="25%">集体报项总数：<br/>{{ info.collective }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllCount } from '@/api'
export default {
  name: 'adminIndex',
  props: {},
  data () {
    return {
      info: {}
    }
  },
  computed: {},
  created () {
    getAllCount().then(res => {
      console.log(res)
      this.info = res.data
    }).catch(err => {
      console.log(err)
    })
  },
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
