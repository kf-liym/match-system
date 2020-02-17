<template>
  <div class="admin-review">
    <el-form :inline="true" size="small" class="admin-query" label-width="85px">
      <el-form-item label="审核状态：">
        <el-select v-model="query.reviewStatus" placeholder="审核状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="已审核" value="已审核"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提交状态：">
        <el-select v-model="query.comfirmStatus" placeholder="提交状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="已提交" value="已提交"></el-option>
          <el-option label="未提交" value="未提交"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onConfirm">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table class="report-item__body" :data="teamList" border fit style="width: 100%;">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="teamName" label="队伍名称" min-width="150"></el-table-column>
      <el-table-column prop="leaderName" label="领队姓名" width="100"></el-table-column>
      <el-table-column prop="tel" label="联系电话" width="150"></el-table-column>
      <el-table-column prop="cost" label="报名费用" width="80"></el-table-column>
      <el-table-column prop="username" label="账号" width="150"></el-table-column>
      <el-table-column prop="password" label="密码" width="150"></el-table-column>
      <el-table-column prop="comfirmStatus" label="提交状态" width="80"></el-table-column>
      <el-table-column prop="reviewStatus" label="审核状态" width="80"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheck(scope.row)" size="small">查看</el-button>
          <el-button type="text" @click="handleUpdate(scope.row)" size="small">修改</el-button>
          <el-button type="text" @click="handleReject(scope.row)" size="small">打回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="query.page" :page-size="query.limit" layout="total, prev, pager, next" :total="count" style="text-align: center; margin-top: 15px;">
    </el-pagination>
    <check-dialog v-if="checkVisible" :visible.sync="checkVisible" v-model="info"></check-dialog>
  </div>
</template>

<script>
import checkDialog from './components/check'
import { getList, teamReject } from '@/api'
export default {
  props: {},
  data () {
    return {
      info: null,
      checkVisible: false,
      query: {
        reviewStatus: '',
        comfirmStatus: '',
        page: 1,
        limit: 5
      },
      count: 10,
      teamList: []
    }
  },
  computed: {
  },
  created () {
    this.getList()
  },
  mounted () { },
  watch: {},
  methods: {
    getList () {
      getList(this.query).then(res => {
        console.log(res)
        this.teamList = res.data.list
        this.count = res.data.count
      }).catch(err => {
        console.log(err)
      })
    },
    // 搜索
    onConfirm () {
      this.getList()
    },
    handleCheck (row) {
      this.info = row
      this.checkVisible = true
    },
    handleUpdate (row) {

    },
    handleReject (row) {
      this.$confirm('是否确定将该申请打回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        teamReject(row.id).then(res => {
          console.log(res)
          if (res.data.message === 'ok') {
            this.$message({
              type: 'success',
              message: '已成功打回该申请!'
            })
          }
        }).catch(err => {
          console.log(err)
        })

      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      });
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.query.page = val
      this.getList()
    }
  },
  components: {
    checkDialog
  }
}
</script>

<style scoped lang="scss">
.admin-review {
  padding: 30px;
}
</style>
