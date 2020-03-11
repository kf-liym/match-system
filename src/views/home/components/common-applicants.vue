/*
 * @Desc: 选择常用报名人
 * @Author: liym
 * @Date: 2020-02-14 16:40:41
 * @Last Modified by: liym
 * @Last Modified time: 2020-03-09 00:43:15
 */

<template>
  <el-dialog
    class="common-applicants__choose"
    title="选择导入报名人信息"
    width="800px"
    :before-close="handleClose"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-table class="common-table" :data="list" v-loading="loading" stripe border height="400px">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="certificate" label="证件类型" width="100"></el-table-column>
      <el-table-column prop="idcard" label="证件号码" min-width="170"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column prop="birth" label="出生日期" width="100"></el-table-column>
      <el-table-column prop="size" label="纪念服尺寸" width="100"></el-table-column>
      <el-table-column align="center" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleChoose(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getMembers } from '@/api'
export default {
  name: 'commonApplicants',
  props: {},
  data () {
    return {
      loading: true,
      visible: false,
      type: '',
      index: -1
    };
  },
  computed: {
    list () {
      return this.$store.state.project.members
    }
  },
  created () {
    this.getList()
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    show (type, index) {
      console.log(index)
      this.visible = true
      this.index = index
      this.type = type
    },
    hide () {
      this.handleClose()
    },
    // 关闭前的操作
    handleClose () {
      this.visible = false
    },
    handleChoose (row) {
      // console.log('row', row)
      this.$emit('confirm', this.type, row, this.index)
      this.visible = false
    },
    // 获取常用人信息
    getList () {
      this.loading = true
      getMembers({ userId: this.$store.state.user.id }).then(res => {
        console.log(res.data)
        // this.list = res.data.list
        // this.$store.commit('SET_STATUS', res.data.status)
        this.$store.commit('SET_MEMBERS', res.data.list)
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }

  },
  components: {

  }
};
</script>

<style scoped lang="scss">
</style>
